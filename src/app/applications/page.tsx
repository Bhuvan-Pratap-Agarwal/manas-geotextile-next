import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
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
        lead="What goes wrong without a geotextile, what the fabric does about it, and which of our products to use."
      />
      <section className="py-16 md:py-24">
        <Container className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {applications.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 0.05}>
              <Link href={`/applications/${a.slug}`} className="group block">
                <Photo src={a.image} alt={a.imageAlt} ratio="4/3" sizes="(min-width: 1024px) 33vw, 50vw" />
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
