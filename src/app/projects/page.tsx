import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientLogos } from "@/components/ClientLogos";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { IndiaMap } from "@/components/IndiaMap";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Reveal } from "@/components/Reveal";
import { applications } from "@/lib/applications";
import { clients } from "@/lib/clients";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Geotextile Projects & Clients Across India | Manas",
  absoluteTitle: true,
  description:
    "USBRL Tunnel T15, Delhi–Mumbai Expressway, the Oberoi New Delhi, ports and highways. Clients include L&T, Afcons, Tata Projects, HCC and IRCON.",
  path: "/projects",
});

export default function ProjectsPage() {
  const [t15, record, ...rest] = projects;
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Projects", path: "/projects" }]} />}
        eyebrow="Projects & clients"
        title="Where our geotextile has gone"
        lead="Photos and captions from our project records, and certificates from the contractors we've supplied."
      />

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          {[t15, record].map((p) => (
            <Reveal key={p.slug}>
              <article id={p.slug} className="grid h-full scroll-mt-36 gap-6 rounded-[4px] border border-line p-6 sm:grid-cols-5 md:p-8">
                <div className="sm:col-span-2">
                  <Image src={p.image} alt={p.imageAlt} width={885} height={1250} className="w-full rounded-[2px] border border-line" />
                </div>
                <div className="sm:col-span-3">
                  <p className="eyebrow">Certificate</p>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-navy">{p.title}</h2>
                  <p className="mt-1 text-[14px] text-muted">{p.where} · {p.product}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-2">{p.note}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <Container>
          <h2 className="h2 text-navy">Across India</h2>
          <p className="lead mt-3">Tap a pin to see what we supplied there.</p>
          <div className="mt-10">
            <IndiaMap />
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 md:py-24">
        <Container>
          <h2 className="h2 text-navy">On site</h2>
          <p className="lead mt-3">Filter by application. Tap any photo to see it full screen.</p>
          <div className="mt-8">
            <ProjectGallery items={rest} filters={applications.map((a) => ({ slug: a.slug, name: a.name }))} />
          </div>
        </Container>
      </section>

      <section id="clients" className="scroll-mt-28 py-16 md:py-24">
        <Container>
          <h2 className="h2 text-navy">Clients</h2>
          <p className="lead mt-3 max-w-2xl">
            {clients.length} contractors and specialists who have bought Manas geotextile, membrane or geo bags.
          </p>
          <div className="mt-10">
            <ClientLogos />
          </div>
        </Container>
      </section>

      <CtaBand title="Working on something similar?" />
    </>
  );
}
