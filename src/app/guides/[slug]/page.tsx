import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Prose } from "@/components/Prose";
import { MarkSeen } from "@/components/Explored";
import { NextUp } from "@/components/NextUp";
import { ReadingProgress } from "@/components/ReadingProgress";
import { slugify } from "@/lib/content-types";
import { getGuide, guides } from "@/lib/guides";
import { articleSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) return {};
  const meta = pageMetadata({ title: g.seoTitle, description: g.metaDescription, path: `/guides/${g.slug}`, absoluteTitle: true });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article", modifiedTime: g.updated } };
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" });

export default async function GuidePage({ params }: Props) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const path = `/guides/${g.slug}`;
  const toc = g.blocks.filter((b) => b.type === "h2").map((b) => b.text);
  const related = g.related.map(getGuide).filter((r) => r !== undefined);
  const nextGuide = guides[(guides.findIndex((x) => x.slug === g.slug) + 1) % guides.length];

  return (
    <>
      <ReadingProgress />
      <MarkSeen path={path} />
      <JsonLd data={articleSchema({ title: g.title, description: g.metaDescription, path, updated: g.updated })} />
      <article>
        <header className="pb-10 pt-32 md:pt-[148px]">
          <Container>
            <Breadcrumbs items={[{ name: "Guides", path: "/guides" }, { name: g.title.split(":")[0], path }]} />
            <h1 className="display mt-8 max-w-[24ch] text-balance text-navy">
              {g.title}
            </h1>
            <p className="lead mt-6 max-w-2xl">{g.excerpt}</p>
            <p className="mt-8 text-[14px] text-muted">
              {g.readingMinutes} min read · Updated <time dateTime={g.updated}>{dateFmt.format(new Date(g.updated))}</time>
            </p>
          </Container>
        </header>
        <Container className="grid gap-12 border-t border-line pt-12 lg:grid-cols-12 [&>*]:min-w-0">
          {toc.length > 1 && (
            <aside className="lg:col-span-3">
              <nav aria-label="On this page" className="lg:sticky lg:top-24">
                <p className="eyebrow mb-4">On this page</p>
                <ol className="space-y-2 text-[15px]">
                  {toc.map((t) => (
                    <li key={t}>
                      <a href={`#${slugify(t)}`} className="text-ink-2 hover:text-accent-ink">{t}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}
          <div className={toc.length > 1 ? "lg:col-span-7" : "lg:col-span-8"}>
            <Prose blocks={g.blocks} />
            {g.faqs.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-6 text-[clamp(1.5rem,2.4vw,2rem)] font-medium tracking-[-0.03em]">Frequently asked questions</h2>
                <Faq items={g.faqs} />
              </section>
            )}
            <div className="mt-16 flex flex-wrap gap-3 border-t border-line pt-10">
              <ButtonLink href="/contact">Ask an engineer</ButtonLink>
              <ButtonLink href="/tools/geotextile-calculator" variant="outline">Geotextile calculator</ButtonLink>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <p className="eyebrow">Keep reading</p>
            <div className="mt-8 grid gap-10 md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/guides/${r.slug}`} className="group block border-t border-ink pt-6">
                  <h2 className="h3 transition-colors group-hover:text-accent-ink">{r.title}</h2>
                  <p className="mt-3 text-ink-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
      <NextUp href={`/guides/${nextGuide.slug}`} kicker={`Guide · ${nextGuide.readingMinutes} min read`} title={nextGuide.title} body={nextGuide.excerpt} />
      <CtaBand />
    </>
  );
}
