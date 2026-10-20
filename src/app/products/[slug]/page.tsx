import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink, buttonClass } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { DatasheetTable } from "@/components/DatasheetTable";
import { MarkSeen, SeenBadge } from "@/components/Explored";
import { FabricZoom } from "@/components/FabricZoom";
import { Faq } from "@/components/Faq";
import { GradeFinder } from "@/components/GradeFinder";
import { JsonLd } from "@/components/JsonLd";
import { LocalNav } from "@/components/LocalNav";
import { NextUp } from "@/components/NextUp";
import { Prose } from "@/components/Prose";
import { Reveal } from "@/components/Reveal";
import { StretchDemo } from "@/components/StretchDemo";
import { getApplication } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { getProduct, products } from "@/lib/products";
import { productSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.seoTitle, description: p.metaDescription, path: `/products/${p.slug}`, absoluteTitle: true });
}

const interactive: Record<string, { title: string; lead: string; node: React.ReactNode }> = {
  "non-woven-geotextile": {
    title: "Find your grade.",
    lead: "Slide through all twelve MGT weights and watch the real datasheet values change.",
    node: <GradeFinder />,
  },
  "pvc-geomembrane": {
    title: "Pull it. It holds.",
    lead: "Tunnels settle and concrete cracks. The membrane has to move with them without tearing.",
    node: <StretchDemo />,
  },
};

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
  const made = products.filter((x) => x.origin === "manufactured");
  const idx = made.findIndex((x) => x.slug === p.slug);
  const next = made[(idx + 1) % made.length];
  const demo = interactive[p.slug];
  const [lead, ...restHighlights] = p.highlights;

  const sections = [
    { id: "overview", label: "Overview" },
    ...(p.slug === "non-woven-geotextile" ? [{ id: "zoom", label: "Zoom in" }] : []),
    { id: "features", label: "Features" },
    ...(demo ? [{ id: "try", label: "Try it" }] : []),
    ...(p.datasheets ? [{ id: "datasheet", label: "Datasheet" }] : []),
    ...(apps.length ? [{ id: "uses", label: "Uses" }] : []),
    ...(p.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <JsonLd data={productSchema({ name: p.name, description: p.metaDescription, path })} />
      <MarkSeen path={path} />
      <LocalNav title={p.name} sections={sections} cta={{ href: `/contact?product=${p.slug}`, label: "Get a quote" }} />

      {/* Hero */}
      <section id="overview" className="scroll-mt-40 pt-24 md:pt-[108px]">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs items={[{ name: "Products", path: "/products" }, { name: p.name, path }]} />
          <div className="mx-auto mt-10 max-w-4xl text-center md:mt-14">
            <p className="eyebrow">{p.functions.join(" · ")}</p>
            <h1 className="mt-4 text-balance text-[clamp(2.6rem,6.4vw,5.5rem)] font-bold leading-[0.98] tracking-[-0.035em] text-navy [font-stretch:90%]">
              {p.name}
            </h1>
            <p className="lead mx-auto mt-6 max-w-2xl text-balance">{p.summary}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={`/contact?product=${p.slug}`}>Get a quote</ButtonLink>
              {p.datasheets ? (
                <a href={p.datasheets[0].download} download className={buttonClass("outline")}>Download datasheet</a>
              ) : (
                <ButtonLink href={`/contact?product=${p.slug}&datasheet=1`} variant="outline">Request datasheet</ButtonLink>
              )}
            </div>
          </div>
          <div className="relative mx-auto mt-12 aspect-[16/9] max-w-5xl overflow-hidden rounded-[10px] bg-paper-2 md:mt-16">
            <Image src={p.image} alt={p.imageAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      {/* Statement */}
      <section className="py-20 md:py-28">
        <Container className="max-w-4xl">
          {p.intro.map((t, i) => (
            <Reveal key={t} delay={i * 0.05}>
              <p className={`text-balance text-[clamp(1.25rem,2.2vw,1.75rem)] font-medium leading-snug tracking-[-0.01em] ${i === 0 ? "text-navy" : "mt-6 text-ink-2"}`}>{t}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      {p.slug === "non-woven-geotextile" && <FabricZoom />}

      {/* Features bento */}
      <section id="features" className="scroll-mt-40 bg-paper-2 py-20 md:py-28">
        <Container>
          <h2 className="h2 text-center text-navy">Why engineers pick it</h2>
          <div className="mt-12 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-3">
            {lead && (
              <Reveal className="md:row-span-2">
                <div className="flex h-full flex-col justify-end rounded-[10px] bg-navy p-8 text-white md:p-10">
                  <p className="text-[clamp(2.4rem,4.6vw,4rem)] font-bold leading-none tracking-[-0.03em] [font-stretch:90%]">{lead.title}</p>
                  <p className="mt-4 text-lg text-white/80">{lead.body}</p>
                </div>
              </Reveal>
            )}
            {restHighlights.map((h, i) => (
              <Reveal key={h.title} delay={(i % 2) * 0.05}>
                <div className="flex h-full flex-col justify-end rounded-[10px] bg-white p-7">
                  <p className="text-2xl font-bold tracking-[-0.02em] text-navy">{h.title}</p>
                  <p className="mt-2 text-[15px] text-ink-2">{h.body}</p>
                </div>
              </Reveal>
            ))}
            <Reveal className={restHighlights.length % 2 === 0 ? "md:col-span-2" : ""}>
              <div className="h-full rounded-[10px] bg-white p-7">
                <p className="text-[14px] font-semibold text-accent-ink">At a glance</p>
                <dl className="mt-3 divide-y divide-line">
                  {p.specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 py-2.5 text-[15px]">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="text-right font-medium text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {demo && (
        <section id="try" className="scroll-mt-40 py-20 md:py-28">
          <Container>
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="text-[clamp(2.2rem,5vw,4rem)] font-bold leading-none tracking-[-0.03em] text-navy [font-stretch:90%]">{demo.title}</h2>
              <p className="lead mt-4">{demo.lead}</p>
            </div>
            {demo.node}
          </Container>
        </section>
      )}

      {p.datasheets && (
        <section id="datasheet" className="scroll-mt-40 border-t border-line py-16 md:py-24">
          <Container>
            <p className="eyebrow">Datasheet</p>
            <h2 className="h2 mt-3 text-navy">Every value, every grade</h2>
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
        <section id="uses" className="scroll-mt-40 bg-paper-2 py-16 md:py-24">
          <Container>
            <h2 className="h2 text-navy">Where it goes</h2>
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {apps.map((a, i) => (
                <Reveal key={a.slug} delay={(i % 4) * 0.04}>
                  <Link href={`/applications/${a.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
                      <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                      <SeenBadge path={`/applications/${a.slug}`} className="absolute left-3 top-3" />
                    </div>
                    <h3 className="mt-3 text-[17px] font-semibold text-navy group-hover:text-accent-ink">{a.name}</h3>
                    <p className="mt-1 text-[14px] text-ink-2">{a.summary}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {p.faqs.length > 0 && (
        <section id="faq" className="scroll-mt-40 py-16 md:py-24">
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

      <section className="border-t border-line pt-14">
        <Container>
          <p className="eyebrow">Read next</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {relatedGuides.map((g) => (
              <Link key={g.slug} href={`/guides/${g.slug}`} className="group block rounded-[8px] border border-line p-6 transition-colors hover:border-accent">
                <h3 className="text-[17px] font-semibold text-navy group-hover:text-accent-ink">{g.title}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{g.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <NextUp href={`/products/${next.slug}`} kicker="Product" title={next.name} body={next.summary} image={next.image} />

      <CtaBand title={`Need ${p.name.toLowerCase()}?`} sub="Send the specification and quantity. We'll confirm the grade and quote a delivered price." />
    </>
  );
}
