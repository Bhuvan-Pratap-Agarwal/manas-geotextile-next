import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { applications, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Applications",
  description: "Geosynthetic solutions for roads, railways, landfills, canals, walls, coastal works and tunnels.",
};

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Applications"
        title="Every project starts in the ground."
        lead="Where geosynthetics replace material, cut cost and extend design life — and which of our products does the work."
      />
      <section className="pb-24 md:pb-36">
        <Container className="space-y-0">
          {applications.map((a, i) => {
            const used = products.filter((p) => p.applications.includes(a.slug));
            return (
              <article key={a.slug} id={a.slug} className="grid gap-8 border-t border-line py-14 lg:grid-cols-12">
                <Reveal className="lg:col-span-5">
                  <p className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="h2 mt-4">{a.name}</h2>
                </Reveal>
                <Reveal className="grid gap-8 sm:grid-cols-2 lg:col-span-7" delay={0.08}>
                  <div>
                    <p className="eyebrow">Challenge</p>
                    <p className="mt-3 text-ink-2">{a.challenge}</p>
                  </div>
                  <div>
                    <p className="eyebrow !text-accent">Solution</p>
                    <p className="mt-3 text-ink-2">{a.solution}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 sm:col-span-2">
                    {used.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="rounded-full border border-line px-3 py-1 text-[13px] transition-colors hover:border-ink"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </Reveal>
              </article>
            );
          })}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
