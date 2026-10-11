import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: "Geotextiles, geogrids, geocells, geomembranes and drainage composites.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Geosynthetics, specified to the job."
        lead="Six product families, each available across a range of grades. Tell us the application and we'll recommend the right one."
      />
      <section className="pb-24 md:pb-36">
        <Container>
          <ul className="border-t border-line">
            {products.map((p, i) => (
              <li key={p.slug}>
                <Reveal delay={i * 0.03}>
                  <Link href={`/products/${p.slug}`} className="group grid gap-6 border-b border-line py-10 md:grid-cols-12 md:py-12">
                    <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent md:col-span-1">{p.code}</span>
                    <div className="md:col-span-5">
                      <h2 className="text-3xl font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{p.name}</h2>
                      <p className="mt-3 text-ink-2">{p.summary}</p>
                    </div>
                    <div className="flex flex-wrap content-start gap-2 md:col-span-5">
                      {p.functions.map((f) => (
                        <span key={f} className="rounded-full border border-line px-3 py-1 text-[13px] text-ink-2">{f}</span>
                      ))}
                    </div>
                    <ArrowUpRight className="hidden size-6 justify-self-end text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink md:col-span-1 md:block" strokeWidth={1.5} />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
