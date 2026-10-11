import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { LayerStack } from "@/components/LayerStack";
import { Prose } from "@/components/Prose";
import { Reveal } from "@/components/Reveal";
import { getApplication } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { getProduct, products } from "@/lib/products";
import { productSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

const highlightCols: Record<number, string> = {
  1: "grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.seoTitle, description: p.metaDescription, path: `/products/${p.slug}`, absoluteTitle: true });
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const path = `/products/${p.slug}`;
  const apps = p.applications.map(getApplication).filter((a) => a !== undefined);
  const relatedGuides = guides.filter((g) =>
    p.slug.includes("non-woven") || p.slug.includes("pipe")
      ? ["geotextile-gsm-guide", "geotextile-price-in-india", "woven-vs-non-woven-geotextile"].includes(g.slug)
      : ["what-is-geotextile", "woven-vs-non-woven-geotextile", "how-to-install-geotextile"].includes(g.slug),
  );

  return (
    <>
      <JsonLd data={productSchema({ name: p.name, description: p.metaDescription, path })} />

      <section className="pb-20 pt-28 md:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: "Products", path: "/products" }, { name: p.name, path }]} />
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">{p.code} — {p.functions.join(" · ")}</p>
              <h1 className="display mt-6 text-balance">{p.name}</h1>
              <div className="lead mt-8 max-w-xl space-y-4">
                {p.intro.map((t) => <p key={t}>{t}</p>)}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?product=${p.slug}`}>Get a quote</ButtonLink>
                <ButtonLink href={`/contact?product=${p.slug}&datasheet=1`} variant="ghost">Request datasheet</ButtonLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="border border-line bg-paper-2/60 p-8">
                <p className="eyebrow">Specification</p>
                <dl className="mt-6 divide-y divide-line">
                  {p.specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 py-4 text-[15px]">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="text-right font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px] text-muted">Grade-wise test values on the datasheet.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container>
          <div className={`grid gap-px bg-line ${highlightCols[Math.min(p.highlights.length, 4)]}`}>
            {p.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 0.05} className="bg-paper py-10 sm:px-6 lg:first:pl-0">
                <h2 className="h3">{h.title}</h2>
                <p className="mt-3 text-[15px] text-ink-2">{h.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {p.grades && (
        <section className="border-t border-line py-20 md:py-28">
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Grade selector</p>
              <h2 className="h2 mt-6">Which GSM for which job</h2>
            </div>
            <div className="lg:col-span-8">
              <Prose blocks={[{ type: "table", head: p.grades.head, rows: p.grades.rows }]} />
              <Link href="/guides/geotextile-gsm-guide" className="mt-4 inline-flex items-center gap-1 text-[15px] text-ink-2 hover:text-accent">
                Full GSM guide <ArrowUpRight className="size-4" strokeWidth={1.5} />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {apps.length > 0 && (
        <section className="bg-paper-2 py-20 md:py-28">
          <Container>
            <p className="eyebrow">Where it goes</p>
            <h2 className="h2 mt-6">Applications</h2>
            <div className="mt-12 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((a) => (
                <Link key={a.slug} href={`/applications/${a.slug}`} className="group flex flex-col gap-6 border-b border-r border-line bg-paper-2 p-8 transition-colors hover:bg-paper">
                  <LayerStack layers={a.layers} compact />
                  <div>
                    <h3 className="h3">{a.name}</h3>
                    <p className="mt-2 text-[15px] text-ink-2">{a.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {p.faqs.length > 0 && (
        <section className="py-20 md:py-28">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="h2 mt-6">{p.name} questions</h2>
            </div>
            <div className="lg:col-span-8">
              <Faq items={p.faqs} />
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-line py-20">
        <Container>
          <p className="eyebrow">Read next</p>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            {relatedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group block border-t border-ink pt-6">
                <h3 className="h3 transition-colors group-hover:text-accent">{g.title}</h3>
                <p className="mt-3 text-ink-2">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={`Need ${p.name.toLowerCase()}?`} sub="Send the spec and quantity — we'll quote from the factory." />
    </>
  );
}
