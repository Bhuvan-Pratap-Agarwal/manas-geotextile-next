"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { products } from "@/lib/products";
import { enquiryText, normaliseEnquiry, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { site, tel } from "@/lib/site";

type Channel = "whatsapp" | "email";
type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "saved"; id: string | null }
  | { kind: "handoff"; channel: Channel }
  | { kind: "failed"; message: string };

const field =
  "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-muted focus:border-ink aria-[invalid=true]:border-accent-ink";

export function EnquiryForm({
  defaultProduct = "",
  defaultArea = "",
  datasheet = false,
}: {
  defaultProduct?: string;
  defaultArea?: string;
  datasheet?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const last = useRef<Enquiry | null>(null);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function read(): Enquiry {
    const data = Object.fromEntries(new FormData(formRef.current!));
    return normaliseEnquiry({ ...data, datasheet, page: window.location.pathname + window.location.search });
  }

  function check(v: Enquiry) {
    const e = validateEnquiry(v);
    setErrors(e);
    if (e.name || e.contact) {
      const first = e.name ? "name" : v.phone ? "phone" : "email";
      (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return false;
    }
    return true;
  }

  function handoff(channel: Channel, v: Enquiry | null = last.current) {
    if (!v) return;
    const body = enquiryText(v);
    const subject = `${v.datasheet ? "Datasheet request" : "Quote request"} | ${v.product || "Geotextile"} | ${v.company || v.name}`;
    if (channel === "whatsapp") {
      window.open(`https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(body)}`, "_blank", "noopener");
    } else {
      window.location.href = `mailto:${site.contact.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  async function submit() {
    if (status.kind === "submitting") return;
    const v = read();
    if (!check(v)) return;
    last.current = v;
    setStatus({ kind: "submitting" });
    try {
      const website = String(new FormData(formRef.current!).get("website") ?? "");
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, website, elapsed: Date.now() - startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; id?: string | null; errors?: EnquiryErrors };
      if (res.ok && json.ok) {
        setStatus({ kind: "saved", id: json.id ?? null });
        return;
      }
      // Database not connected yet (env vars missing): behave like the
      // WhatsApp hand-off so visitors never see a broken form.
      if (res.status === 503 && json.errors?.form === "not_configured") {
        handoff("whatsapp", v);
        setStatus({ kind: "handoff", channel: "whatsapp" });
        return;
      }
      if (res.status === 422 && json.errors) {
        setStatus({ kind: "idle" });
        check(v);
        return;
      }
      setStatus({
        kind: "failed",
        message:
          json.errors?.form ?? "Our enquiry system didn't respond.",
      });
    } catch {
      setStatus({ kind: "failed", message: "You seem to be offline." });
    }
  }

  function viaChannel(channel: Channel) {
    const v = read();
    if (!check(v)) return;
    last.current = v;
    handoff(channel, v);
    setStatus({ kind: "handoff", channel });
  }

  if (status.kind === "saved" || status.kind === "handoff") {
    const saved = status.kind === "saved";
    return (
      <div role="status" className="border border-line bg-paper-2/60 p-8 sm:p-10">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent text-white">
          <Check className="size-5" strokeWidth={2} />
        </span>
        <h2 className="h3 mt-6">
          {saved
            ? "Thank you, your enquiry has reached our sales team."
            : `Almost done, press send in ${status.channel === "whatsapp" ? "WhatsApp" : "your email app"}.`}
        </h2>
        <p className="mt-3 max-w-lg text-ink-2">
          {saved
            ? `We'll reply on ${last.current?.phone ? "the phone number" : "the email"} you gave with a grade recommendation and a quote.`
            : "We've written your enquiry out for you. Once you send it, our sales team will reply with a grade recommendation and a quote."}
        </p>
        {saved && status.id && (
          <p className="mt-4 spec text-[13px] text-muted">Reference: {status.id.slice(0, 8).toUpperCase()}</p>
        )}
        <p className="mt-6 text-[15px] text-ink-2">
          {saved ? "Need it sooner? " : "Didn't open? "}
          <button type="button" onClick={() => handoff("whatsapp")} className="py-1 underline underline-offset-4 hover:text-ink">
            {saved ? "Continue on WhatsApp" : "Send on WhatsApp"}
          </button>{" "}
          or call{" "}
          <a href={tel(site.contact.mobile)} className="py-1 underline underline-offset-4 hover:text-ink">
            {site.contact.mobile}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 py-1 text-[14px] text-muted underline underline-offset-4 hover:text-ink"
        >
          {saved ? "Send another enquiry" : "Edit enquiry"}
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      aria-busy={submitting}
      className="relative grid gap-x-8 gap-y-7 sm:grid-cols-2"
    >
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="text-[15px] text-ink-2 sm:col-span-2">
        {datasheet ? "Tell us which grade you need and we'll send the datasheet." : "Two fields are required. The more you tell us, the more precise the quote."}
      </p>
      <label className="block">
        <span className="eyebrow">Name *</span>
        <input
          name="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "err-name" : undefined}
          className={field}
        />
        {errors.name && <span id="err-name" className="mt-2 block text-[14px] text-accent-ink">{errors.name}</span>}
      </label>
      <label className="block">
        <span className="eyebrow">Company</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow">Phone *</span>
        <input
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "err-contact" : "hint-contact"}
          className={field}
        />
      </label>
      <label className="block">
        <span className="eyebrow">or Email *</span>
        <input
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "err-contact" : "hint-contact"}
          className={field}
        />
      </label>
      <p id={errors.contact ? "err-contact" : "hint-contact"} className={errors.contact ? "-mt-4 text-[14px] text-accent-ink sm:col-span-2" : "-mt-4 text-[13px] text-muted sm:col-span-2"}>
        {errors.contact ?? "Phone or email, whichever you prefer we reply on."}
      </p>
      <label className="block">
        <span className="eyebrow">Product</span>
        <select name="product" defaultValue={products.find((p) => p.slug === defaultProduct)?.name ?? ""} className={field}>
          <option value="">Not sure, advise me</option>
          {products.map((p) => (
            <option key={p.slug} value={p.name}>{p.name}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="eyebrow">Approx. quantity</span>
        <input name="quantity" defaultValue={defaultArea ? `${defaultArea} m²` : ""} placeholder="e.g. 20,000 m²" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className="eyebrow">Site location</span>
        <input name="location" placeholder="City / state, for a delivered price" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className="eyebrow">Project details</span>
        <textarea name="message" rows={3} className={`${field} resize-none`} placeholder="Application, GSM or spec, timeline…" />
      </label>
      {status.kind === "failed" && (
        <div role="alert" className="border-l-2 border-accent-ink bg-paper-2 px-5 py-4 text-[15px] text-ink sm:col-span-2">
          <p>{status.message} Your details are still here, send them another way:</p>
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
            <button type="button" onClick={() => viaChannel("whatsapp")} className="py-1 font-medium underline underline-offset-4">
              WhatsApp
            </button>
            <button type="button" onClick={() => viaChannel("email")} className="py-1 font-medium underline underline-offset-4">
              Email
            </button>
            <a href={tel(site.contact.mobile)} className="py-1 font-medium underline underline-offset-4">
              Call {site.contact.mobile}
            </a>
          </p>
        </div>
      )}
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-[4px] bg-accent px-6 text-[15px] font-semibold text-white transition-colors hover:bg-navy disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Sending…" : datasheet ? "Request datasheet" : "Send enquiry"}
          {!submitting && (
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
          )}
        </button>
        <button
          type="button"
          onClick={() => viaChannel("whatsapp")}
          disabled={submitting}
          className="inline-flex h-12 items-center justify-center rounded-[4px] border border-navy/25 px-6 text-[15px] font-semibold text-navy transition-colors hover:border-navy disabled:opacity-60"
        >
          Or send on WhatsApp
        </button>
      </div>
      <p className="text-[13px] text-muted sm:col-span-2">
        Your details are used only to answer this enquiry. See our{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">privacy note</Link>.
      </p>
    </form>
  );
}

/** Prefills the form from ?product=&area=&datasheet=1 links (calculator, product pages). */
export function EnquiryFromParams() {
  const q = useSearchParams();
  return (
    <EnquiryForm
      key={q.toString()}
      defaultProduct={q.get("product") ?? ""}
      defaultArea={q.get("area")?.replace(/\D/g, "") ?? ""}
      datasheet={q.get("datasheet") === "1"}
    />
  );
}
