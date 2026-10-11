import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Geotextile Products — Non-Woven Geotextile, PVC Geomembrane, Geo Bags",
  description:
    "Geosynthetic products from Manas: non-woven geotextile (150–1500 GSM), PVC geomembrane, geo bags, pipe-wrap geotextile, woven geotextile, geogrid and geocell.",
  path: "/products",
});

export default function ProductsPage() {
  const groups = [
    { title: "Manufactured by Manas", items: products.filter((p) => p.origin === "manufactured") },
    { title: "Also supplied", items: products.filter((p) => p.origin === "supplied") },
  ];
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Products", path: "/products" }]} />}
        eyebrow="Products"
        title="Geotextiles and geosynthetics, specified to the job."
        lead="Every grade we make is produced at our IMT Bawal factory. Tell us the application and we'll recommend the right one."
      />
      <section className="pb-24 md:pb-36">
        <Container className="space-y-20">
          {groups.map((g) => (
            <div key={g.title}>
              <h2 className="eyebrow mb-6">{g.title}</h2>
              <ul className="border-t border-line">
                {g.items.map((p, i) => (
                  <li key={p.slug}>
                    <Reveal delay={i * 0.03}>
                      <Link href={`/products/${p.slug}`} className="group grid gap-6 border-b border-line py-10 md:grid-cols-12">
                        <span className="font-mono text-sm text-muted transition-colors group-hover:text-accent-ink md:col-span-1">{p.code}</span>
                        <div className="md:col-span-5">
                          <h3 className="text-3xl font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{p.name}</h3>
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
            </div>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
