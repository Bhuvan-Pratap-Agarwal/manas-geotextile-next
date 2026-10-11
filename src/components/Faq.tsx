import { Plus } from "lucide-react";
import type { Faq as FaqItem } from "@/lib/content-types";
import { faqSchema } from "@/lib/schema";
import { JsonLd } from "./JsonLd";

export function Faq({ items, schema = true }: { items: FaqItem[]; schema?: boolean }) {
  if (!items.length) return null;
  return (
    <>
      {schema && <JsonLd data={faqSchema(items)} />}
      <div className="border-t border-line">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden md:text-xl">
              <h3>{f.q}</h3>
              <Plus className="mt-1 size-5 shrink-0 text-muted transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} />
            </summary>
            <p className="max-w-3xl pb-6 text-ink-2">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
