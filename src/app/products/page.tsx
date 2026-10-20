import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ExploredCount, SeenBadge } from "@/components/Explored";
import { products } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Geotextile Products: Non-Woven, PVC Membrane, Geo Bags",
  absoluteTitle: true,
  description:
    "MGT and M-Geo non-woven geotextile 100–1000 GSM, PVC tunnel waterproofing membrane, geo bags, drainage geocomposite and pipe wrap. Free datasheets.",
  path: "/products",
});

export default function ProductsPage() {
  const made = products.filter((p) => p.origin === "manufactured");
  const supplied = products.filter((p) => p.origin === "supplied");
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Products", path: "/products" }]} />}
        eyebrow="Products"
        title="Geosynthetics we make at IMT Bawal"
        lead="Tell us the application and the specification, and we'll recommend the grade. Datasheets for every product are free to download."
      >
        <div className="mt-8">
          <ExploredCount paths={made.map((p) => `/products/${p.slug}`)} noun="products" />
        </div>
      </PageHero>
      <section className="py-16 md:py-24">
        <Container className="space-y-6">
          {made.map((p, i) => (
            <Reveal key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="group grid overflow-hidden rounded-[10px] border border-line bg-white transition-colors hover:border-accent md:grid-cols-12"
              >
                <div className={`relative aspect-[16/9] overflow-hidden bg-paper-2 md:col-span-5 md:aspect-auto md:min-h-[260px] ${i % 2 ? "md:order-2" : ""}`}>
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
                  <SeenBadge path={`/products/${p.slug}`} className="absolute left-3 top-3" />
                </div>
                <div className="flex flex-col justify-center p-6 md:col-span-7 md:p-10">
                  <p className="spec text-[13px] text-accent-ink">{p.code}</p>
                  <h2 className="h2 mt-1 text-navy group-hover:text-accent-ink">{p.name}</h2>
                  <p className="mt-3 max-w-xl text-ink-2">{p.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.functions.map((f) => (
                      <li key={f} className="rounded-[3px] bg-paper-2 px-2.5 py-1 text-[13px] text-ink-2">{f}</li>
                    ))}
                  </ul>
                  <p className="mt-6 font-semibold text-accent-ink">View details and datasheet →</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>
      <section className="border-t border-line bg-paper-2 py-14">
        <Container>
          <h2 className="text-lg font-semibold text-navy">Also supplied with our geotextile</h2>
          <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
            {supplied.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="inline-block py-1 text-ink-2 underline decoration-line underline-offset-4 hover:text-navy hover:decoration-navy">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
