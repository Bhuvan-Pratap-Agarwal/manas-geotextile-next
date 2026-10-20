import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BuildRoadGame } from "@/components/BuildRoadGame";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { NextUp } from "@/components/NextUp";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Build a Road: Can It Survive 10 Years of Traffic?",
  absoluteTitle: true,
  description: "A one-minute game: stack the layers of a road from the ground up and open it to ten years of traffic. See why geotextile matters.",
  path: "/tools/build-a-road",
});

export default function BuildARoadPage() {
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Build a road", path: "/tools/build-a-road" }]} />}
        eyebrow="One-minute game"
        title="Can your road survive ten years?"
        lead="Stack the layers from the ground up, then open it to traffic. Leave one out and see what happens."
      />
      <section className="py-14 md:py-20">
        <Container>
          <BuildRoadGame />
        </Container>
      </section>
      <NextUp href="/applications/roads" kicker="Application" title="Geotextile for roads" body="The real cross-section, the standards, and which grade to use." image="/images/road-karnataka-mgt15.jpg" />
      <CtaBand />
    </>
  );
}
