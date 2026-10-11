import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { LayerStack } from "@/components/LayerStack";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { applications } from "@/lib/applications";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Geotextile Applications — Roads, Railways, Tunnels, Landfills, Coastal",
  description:
    "Where and why geotextiles are used: road subgrade separation, railway formations, tunnel waterproofing, landfill liners, riverbank and coastal protection, and drainage.",
  path: "/applications",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Applications", path: "/applications" }]} />}
        eyebrow="Applications"
        title="Every project starts in the ground."
        lead="The problem each application faces, the layer that solves it, and which of our products does the work."
      />
      <section className="pb-24 md:pb-36">
        <Container>
          {applications.map((a, i) => (
            <Reveal key={a.slug}>
              <Link href={`/applications/${a.slug}`} className="group grid items-center gap-10 border-t border-line py-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <p className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="h2 mt-4 flex items-start gap-4">
                    {a.name}
                    <ArrowUpRight className="mt-2 size-7 shrink-0 text-muted transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" strokeWidth={1.25} />
                  </h2>
                  <p className="mt-4 max-w-md text-ink-2">{a.summary}</p>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <LayerStack layers={a.layers} />
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
