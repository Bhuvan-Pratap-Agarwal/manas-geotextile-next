// Shared by the enquiry form (client) and /api/enquiry (server) so the rules
// can never drift apart.

export const ENQUIRY_LIMITS = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  product: 120,
  quantity: 80,
  location: 160,
  message: 4000,
} as const;

export type EnquiryField = keyof typeof ENQUIRY_LIMITS;
export type Enquiry = Record<EnquiryField, string> & { datasheet: boolean; page: string };
export type EnquiryErrors = Partial<Record<"name" | "contact" | "form", string>>;

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "";

/** Normalises untrusted input: trims, collapses whitespace, caps lengths. */
export function normaliseEnquiry(raw: Record<string, unknown>): Enquiry {
  const out = {} as Enquiry;
  for (const k of Object.keys(ENQUIRY_LIMITS) as EnquiryField[]) {
    out[k] =
      k === "message"
        ? typeof raw[k] === "string"
          ? (raw[k] as string).trim().slice(0, ENQUIRY_LIMITS.message)
          : ""
        : clean(raw[k], ENQUIRY_LIMITS[k]);
  }
  out.datasheet = raw.datasheet === true;
  out.page = clean(raw.page, 200);
  return out;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
export const isPhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
};

export function validateEnquiry(v: Enquiry): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (!v.name) e.name = "Please tell us your name.";
  if (!isEmail(v.email) && !isPhone(v.phone)) {
    e.contact = "Add a valid email or a 10-digit phone number so we can reply.";
  }
  return e;
}

/** Plain-text summary used for WhatsApp, email hand-off and notifications. */
export function enquiryText(v: Enquiry) {
  const kind = v.datasheet ? "Datasheet request" : "Quote request";
  return [
    `${kind} — ${v.product || "Geotextile"}`,
    "",
    `Name: ${v.name}`,
    v.company && `Company: ${v.company}`,
    v.phone && `Phone: ${v.phone}`,
    v.email && `Email: ${v.email}`,
    `Product: ${v.product || "Not sure — please advise"}`,
    v.quantity && `Quantity: ${v.quantity}`,
    v.location && `Site location: ${v.location}`,
    v.message && `\n${v.message}`,
  ]
    .filter(Boolean)
    .join("\n");
}
