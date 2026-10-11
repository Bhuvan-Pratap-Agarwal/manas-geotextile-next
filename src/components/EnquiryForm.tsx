"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

// TODO: swap the mailto handoff for a real endpoint (Resend, Formspree or a CRM) before launch.
export function EnquiryForm({
  defaultProduct = "",
  defaultArea = "",
  datasheet = false,
}: {
  defaultProduct?: string;
  defaultArea?: string;
  datasheet?: boolean;
}) {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const subject = `${datasheet ? "Datasheet request" : "Enquiry"} — ${get("product") || "General"} — ${get("company") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Company: ${get("company")}`,
      `Phone: ${get("phone")}`,
      `Email: ${get("email")}`,
      `Product: ${get("product") || "Not sure"}`,
      `Quantity: ${get("quantity")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${site.contact.salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "w-full border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      <label className="block">
        <span className="eyebrow">Name *</span>
        <input name="name" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow">Company</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow">Email *</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow">Phone</span>
        <input name="phone" type="tel" autoComplete="tel" className={field} />
      </label>
      <label className="block">
        <span className="eyebrow">Product / GSM</span>
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
        <span className="eyebrow">Project details</span>
        <textarea name="message" rows={4} className={`${field} resize-none`} placeholder="Location, application, timeline…" />
      </label>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink pl-6 pr-5 text-[15px] font-medium text-paper transition-colors hover:bg-accent"
        >
          Send enquiry
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
        </button>
        {sent && <p className="text-[14px] text-muted" role="status">Your email app should open with the enquiry ready to send.</p>}
      </div>
    </form>
  );
}
