import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientLogos } from "@/components/ClientLogos";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { clients } from "@/lib/clients";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Projects & Clients | Geotextile Supplied Across India",
  description:
    "Manas Geo Tech geotextile on site: USBRL Tunnel T15, Delhi–Mumbai Expressway, the Oberoi New Delhi, port and defence port projects, highways and coastal protection. Clients include L&T, Afcons, Tata Projects, HCC and IRCON.",
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

      <section className="bg-paper-2 py-16 md:py-24">
        <Container>
          <h2 className="h2 text-navy">On site</h2>
          <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <article id={p.slug} className="scroll-mt-36">
                  <Photo src={p.image} alt={p.imageAlt} ratio="4/3" sizes="(min-width: 1024px) 33vw, 50vw" />
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug text-navy">{p.title}</h3>
                  <p className="mt-1 text-[14px] text-muted">{p.where} · {p.product}</p>
                  {p.note && <p className="mt-1.5 text-[15px] text-ink-2">{p.note}</p>}
                </article>
              </Reveal>
            ))}
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
