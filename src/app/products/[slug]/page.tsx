import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, buttonClass } from "@/components/ButtonLink";
import { DatasheetTable } from "@/components/DatasheetTable";
import { Photo } from "@/components/Photo";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
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

      <section className="pb-16 pt-24 md:pt-[108px]">
        <Container className="pt-8 md:pt-12">
          <Breadcrumbs items={[{ name: "Products", path: "/products" }, { name: p.name, path }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal immediate className="lg:col-span-6">
              <p className="eyebrow">{p.functions.join(" · ")}</p>
              <h1 className="display mt-3 text-balance text-navy">{p.name}</h1>
              <div className="lead mt-6 max-w-xl space-y-4">
                {p.intro.map((t) => <p key={t}>{t}</p>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?product=${p.slug}`}>Get a quote</ButtonLink>
                {p.datasheets ? (
                  <a href={p.datasheets[0].download} download className={buttonClass("outline")}>Download datasheet</a>
                ) : (
                  <ButtonLink href={`/contact?product=${p.slug}&datasheet=1`} variant="outline">Request datasheet</ButtonLink>
                )}
              </div>
            </Reveal>
            <Reveal immediate className="lg:col-span-6" delay={0.05}>
              <Photo src={p.image} alt={p.imageAlt} ratio="4/3" priority sizes="(min-width: 1024px) 50vw, 100vw" />
              <dl className="mt-6 divide-y divide-line border-y border-line">
                {p.specs.map((s) => (
                  <div key={s.label} className="flex justify-between gap-6 py-3 text-[15px]">
                    <dt className="text-muted">{s.label}</dt>
                    <dd className="text-right font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-14">
        <Container>
          <ul className={`grid gap-8 ${highlightCols[Math.min(p.highlights.length, 4)]}`}>
            {p.highlights.map((h) => (
              <li key={h.title} className="border-l-2 border-accent pl-4">
                <h2 className="text-[17px] font-semibold text-navy">{h.title}</h2>
                <p className="mt-1.5 text-[15px] text-ink-2">{h.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {p.datasheets && (
        <section id="datasheet" className="py-16 md:py-24">
          <Container>
            <p className="eyebrow">Datasheet</p>
            <h2 className="h2 mt-3 text-navy">Technical values, grade by grade</h2>
            <div className="mt-10 space-y-14">
              {p.datasheets.map((d) => (
                <DatasheetTable key={d.id} sheet={d} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {p.grades && (
        <section className="border-t border-line py-16 md:py-24">
          <Container className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Choosing a grade</p>
              <h2 className="h2 mt-3 text-navy">Which GSM for which job</h2>
              <p className="mt-4 text-ink-2">A starting point. Your contract specification decides, and we&apos;re happy to check it.</p>
            </div>
            <div className="lg:col-span-8">
              <Prose blocks={[{ type: "table", head: p.grades.head, rows: p.grades.rows }]} />
              <Link href="/guides/geotextile-gsm-guide" className="mt-4 inline-block py-1 text-[15px] font-semibold text-accent-ink hover:text-navy">
                Read the full GSM guide →
              </Link>
            </div>
          </Container>
        </section>
      )}

      {apps.length > 0 && (
        <section className="bg-paper-2 py-16 md:py-24">
          <Container>
            <p className="eyebrow">Where it&apos;s used</p>
            <h2 className="h2 mt-3 text-navy">Applications</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {apps.map((a) => (
                <Link key={a.slug} href={`/applications/${a.slug}`} className="group block">
                  <Photo src={a.image} alt={a.imageAlt} ratio="16/10" sizes="(min-width: 1024px) 25vw, 50vw" />
                  <h3 className="mt-3 text-[17px] font-semibold text-navy group-hover:text-accent-ink">{a.name}</h3>
                  <p className="mt-1 text-[14px] text-ink-2">{a.summary}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {p.faqs.length > 0 && (
        <section className="py-16 md:py-24">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Questions</p>
              <h2 className="h2 mt-3 text-navy">About {p.name.toLowerCase()}</h2>
            </div>
            <div className="lg:col-span-8">
              <Faq items={p.faqs} />
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-line py-16">
        <Container>
          <p className="eyebrow">Read next</p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {relatedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group block rounded-[4px] border border-line p-6 transition-colors hover:border-accent">
                <h3 className="text-[17px] font-semibold text-navy group-hover:text-accent-ink">{g.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title={`Need ${p.name.toLowerCase()}?`} sub="Send the specification and quantity. We'll confirm the grade and quote a delivered price." />
    </>
  );
}
