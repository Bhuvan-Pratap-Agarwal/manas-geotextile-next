import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { guides } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Geotextile Guides: Types, GSM, Price & BIS Standards",
  absoluteTitle: true,
  description:
    "Practical geotextile guides for engineers and contractors: what geotextile is, woven vs non-woven, GSM selection, prices in India, BIS standards and installation.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Guides", path: "/guides" }]} />}
        eyebrow="Guides"
        title="Everything you need to specify geotextile."
        lead="Written by the people who make it. No jargon you don't need."
      />
      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid gap-px border border-line bg-line md:grid-cols-2">
            {guides.map((g, i) => (
              <Reveal key={g.slug} delay={(i % 2) * 0.05} className="bg-paper">
                <Link href={`/guides/${g.slug}`} className="group flex h-full min-h-64 flex-col justify-between gap-10 p-8 transition-colors hover:bg-paper-2 md:p-10">
                  <p className="text-[14px] text-muted">
                    {String(i + 1).padStart(2, "0")} · {g.readingMinutes} min read
                  </p>
                  <div>
                    <h2 className="text-2xl font-medium tracking-[-0.03em] transition-colors group-hover:text-accent-ink md:text-3xl">{g.title}</h2>
                    <p className="mt-3 text-ink-2">{g.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
