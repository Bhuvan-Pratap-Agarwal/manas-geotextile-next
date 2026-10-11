"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { products } from "@/lib/products";
import { site, tel } from "@/lib/site";

// TODO(launch): post to a real endpoint (Resend, Formspree or a CRM) so leads
// are captured server-side. Until then the enquiry is handed to WhatsApp or the
// visitor's email app, already written out.

type Channel = "whatsapp" | "email";
type Errors = Partial<Record<"name" | "contact", string>>;

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
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<Channel | null>(null);

  function read() {
    const data = new FormData(formRef.current!);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    return {
      name: get("name"),
      company: get("company"),
      email: get("email"),
      phone: get("phone"),
      product: get("product"),
      quantity: get("quantity"),
      location: get("location"),
      message: get("message"),
    };
  }

  function validate(v: ReturnType<typeof read>): Errors {
    const e: Errors = {};
    if (!v.name) e.name = "Please tell us your name.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email);
    const phoneOk = v.phone.replace(/\D/g, "").length >= 10;
    if (!emailOk && !phoneOk) e.contact = "Add a valid email or a 10-digit phone number so we can reply.";
    return e;
  }

  function send(channel: Channel) {
    const v = read();
    const e = validate(v);
    setErrors(e);
    if (Object.keys(e).length) {
      const first = e.name ? "name" : v.phone ? "phone" : "email";
      (formRef.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    const kind = datasheet ? "Datasheet request" : "Quote request";
    const lines = [
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
    ].filter(Boolean) as string[];
    const body = lines.join("\n");
    const url =
      channel === "whatsapp"
        ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(body)}`
        : `mailto:${site.contact.salesEmail}?subject=${encodeURIComponent(`${kind} — ${v.product || "Geotextile"} — ${v.company || v.name}`)}&body=${encodeURIComponent(body)}`;
    if (channel === "whatsapp") window.open(url, "_blank", "noopener");
    else window.location.href = url;
    setSent(channel);
  }

  if (sent) {
    return (
      <div role="status" className="border border-line bg-paper-2/60 p-8 sm:p-10">
        <span className="flex size-10 items-center justify-center rounded-full bg-ink text-paper">
          <Check className="size-5" strokeWidth={2} />
        </span>
        <h2 className="h3 mt-6">Almost done — press send in {sent === "whatsapp" ? "WhatsApp" : "your email app"}.</h2>
        <p className="mt-3 max-w-lg text-ink-2">
          We&apos;ve written your enquiry out for you. Once you send it, our sales team will reply with a grade
          recommendation and a quote.
        </p>
        <p className="mt-6 text-[15px] text-ink-2">
          Didn&apos;t open?{" "}
          {sent === "email" ? (
            <button type="button" onClick={() => send("whatsapp")} className="underline underline-offset-4 hover:text-ink">
              Send on WhatsApp instead
            </button>
          ) : (
            <button type="button" onClick={() => send("email")} className="underline underline-offset-4 hover:text-ink">
              Send by email instead
            </button>
          )}{" "}
          or call{" "}
          <a href={tel(site.contact.mobile)} className="underline underline-offset-4 hover:text-ink">
            {site.contact.mobile}
          </a>
          .
        </p>
        <button type="button" onClick={() => setSent(null)} className="mt-8 text-[14px] text-muted underline underline-offset-4 hover:text-ink">
          Edit enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        send("whatsapp");
      }}
      className="grid gap-x-8 gap-y-7 sm:grid-cols-2"
    >
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
        {errors.contact ?? "Phone or email — whichever you prefer we reply on."}
      </p>
      <label className="block">
        <span className="eyebrow">Product</span>
        <select name="product" defaultValue={products.find((p) => p.slug === defaultProduct)?.name ?? ""} className={field}>
          <option value="">Not sure — advise me</option>
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
        <input name="location" placeholder="City / state — for a delivered price" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className="eyebrow">Project details</span>
        <textarea name="message" rows={3} className={`${field} resize-none`} placeholder="Application, GSM or spec, timeline…" />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <button
          type="submit"
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink pl-6 pr-5 text-[15px] font-medium text-paper transition-colors hover:bg-accent-ink"
        >
          Send on WhatsApp
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => send("email")}
          className="inline-flex h-12 items-center justify-center rounded-full border border-ink/15 px-6 text-[15px] font-medium transition-colors hover:border-ink"
        >
          Send by email
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
