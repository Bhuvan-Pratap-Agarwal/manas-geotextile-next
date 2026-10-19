import { NextResponse } from "next/server";
import { enquiryText, normaliseEnquiry, validateEnquiry, type Enquiry } from "@/lib/enquiry";

// Stores website enquiries in Supabase (table `enquiries`, see
// supabase/migrations) and optionally emails sales via Resend.
//
// Required env (Vercel → Settings → Environment Variables):
//   SUPABASE_URL                 https://<project>.supabase.co
//   SUPABASE_SERVICE_ROLE_KEY    service_role / secret key — server only, never NEXT_PUBLIC_
// Optional:
//   RESEND_API_KEY, ENQUIRY_NOTIFY_TO, ENQUIRY_NOTIFY_FROM

export const runtime = "nodejs";

const MIN_FILL_MS = 2000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;

// Best-effort per-instance limiter; serverless instances don't share it, but it
// stops a single burst. The honeypot and fill-time check catch most bots.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

async function save(e: Enquiry, meta: { ip: string; userAgent: string; suspicious: boolean }) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { status: "not_configured" as const };

  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };
  // Legacy service_role keys are JWTs and also go in Authorization; new
  // sb_secret_ keys are sent as apikey only.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;

  let res: Response;
  try {
    res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/enquiries?select=id`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: e.name,
        company: e.company || null,
        email: e.email || null,
        phone: e.phone || null,
        product: e.product || null,
        quantity: e.quantity || null,
        location: e.location || null,
        message: e.message || null,
        datasheet: e.datasheet,
        status: meta.suspicious ? "spam" : "new",
        source_page: e.page || null,
        ip: meta.ip || null,
        user_agent: meta.userAgent.slice(0, 300) || null,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    console.error("enquiry: supabase unreachable", err);
    return { status: "error" as const };
  }
  if (!res.ok) {
    console.error("enquiry: supabase insert failed", res.status, await res.text().catch(() => ""));
    return { status: "error" as const };
  }
  const rows = (await res.json().catch(() => [])) as { id?: string }[];
  return { status: "saved" as const, id: rows[0]?.id ?? null };
}

async function notify(e: Enquiry, id: string | null) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_NOTIFY_TO;
  if (!key || !to) return;
  const from = process.env.ENQUIRY_NOTIFY_FROM || "Manas Website <onboarding@resend.dev>";
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email || undefined,
        subject: `New ${e.datasheet ? "datasheet" : "quote"} enquiry — ${e.product || "Geotextile"} — ${e.company || e.name}`,
        text: `${enquiryText(e)}\n\nPage: ${e.page || "-"}\nRef: ${id ?? "-"}`,
      }),
    });
    if (!res.ok) console.error("enquiry: resend failed", res.status, await res.text().catch(() => ""));
  } catch (err) {
    console.error("enquiry: resend error", err);
  }
}

export async function POST(req: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  // Bots fill the hidden honeypot field: drop silently.
  if (typeof raw.website === "string" && raw.website.trim()) {
    return NextResponse.json({ ok: true, id: null });
  }
  // Submitted faster than a person can type. Could still be a human using
  // autofill, so keep it but flag it for review rather than losing a lead.
  const elapsed = Number(raw.elapsed);
  const suspicious = !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS;

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (ip && rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, errors: { form: "Too many enquiries from this connection. Please try again in a few minutes or call us." } },
      { status: 429 },
    );
  }

  const enquiry = normaliseEnquiry(raw);
  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const result = await save(enquiry, { ip, userAgent: req.headers.get("user-agent") ?? "", suspicious });
  if (result.status === "not_configured") {
    return NextResponse.json({ ok: false, errors: { form: "not_configured" } }, { status: 503 });
  }
  if (result.status === "error") {
    return NextResponse.json({ ok: false, errors: { form: "We couldn't save your enquiry." } }, { status: 502 });
  }

  if (!suspicious) await notify(enquiry, result.id);
  return NextResponse.json({ ok: true, id: result.id });
}
