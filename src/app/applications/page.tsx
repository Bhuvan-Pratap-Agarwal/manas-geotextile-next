import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import Image from "next/image";
import { ExploredCount, SeenBadge } from "@/components/Explored";
import { Reveal } from "@/components/Reveal";
import { applications } from "@/lib/applications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Geotextile Applications | Roads, Railways, Tunnels, Ports, Landfills, Coastal",
  description:
    "Where geotextile is used: road subgrade separation, railway formations, tunnel waterproofing, ports, landfills and canals, riverbank and coastal protection, drainage, roof waterproofing and RE walls.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Applications", path: "/applications" }]} />}
        eyebrow="Applications"
        title="Every project starts in the ground"
        lead="Pick one and look inside. Each page pulls apart a real cross-section, layer by layer."
      >
        <div className="mt-8">
          <ExploredCount paths={applications.map((a) => `/applications/${a.slug}`)} noun="applications" />
        </div>
      </PageHero>
      <section className="py-16 md:py-24">
        <Container className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.05}>
              <Link href={`/applications/${a.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-paper-2">
                  <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  <SeenBadge path={`/applications/${a.slug}`} className="absolute left-3 top-3" />
                  <span className="absolute bottom-3 right-3 rounded-full bg-navy/85 px-3 py-1 text-[12px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">Look inside →</span>
                </div>
                <h2 className="h3 mt-4 text-navy group-hover:text-accent-ink">{a.name}</h2>
                <p className="mt-1.5 text-[15px] text-ink-2">{a.summary}</p>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
