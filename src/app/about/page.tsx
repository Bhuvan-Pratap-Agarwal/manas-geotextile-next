import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Manas Geo Tech India — Geotextile Manufacturer Since 1995",
  description:
    "Manas Geo Tech India Pvt. Ltd. manufactures non-woven geotextiles and PVC geomembranes on European needle-punching lines at IMT Bawal, Haryana. Incorporated 1995.",
  path: "/about",
});

// TODO(content): add milestones, capacity, certifications (BIS licence, ISO),
// client logos and plant photography once supplied by the client.
const values = [
  {
    title: "Made in-house",
    body: "Fibre to finished roll on our own fully automated European needle-punching lines at IMT Bawal — so quality is controlled at every step.",
  },
  {
    title: "Wide range, one source",
    body: "From 150 GSM drain wraps to 1500 GSM tunnel cushions, plus PVC membranes and geo bags — fewer suppliers on your project.",
  },
  {
    title: "Close to the projects",
    body: "Head office in New Delhi, factory in Haryana, on the Delhi–Jaipur corridor with direct road links to the rest of India.",
  },
];

const timeline = [
  { year: "1995", text: "Manas Geo Tech India Pvt. Ltd. incorporated in New Delhi." },
  { year: "IMT Bawal", text: "Factory set up with imported European wide-width needle-punching lines." },
  { year: "Today", text: "Non-woven geotextile, PVC geomembrane, geo bags and pipe-wrap fabric for infrastructure across India." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Company", path: "/about" }]} />}
        eyebrow="Company"
        title="Quiet materials. Serious engineering."
        lead={`${site.legalName} has manufactured geosynthetics for India's infrastructure since 1995 — the layer under the roads, railways and tunnels that nobody sees, and everybody depends on.`}
      />
      <section className="border-y border-line">
        <Container>
          <ol className="grid gap-px bg-line md:grid-cols-3">
            {timeline.map((t) => (
              <li key={t.year} className="bg-paper py-10 md:px-6 md:first:pl-0">
                <p className="text-4xl font-medium tracking-[-0.04em]">{t.year}</p>
                <p className="mt-3 text-ink-2">{t.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <section className="py-24 md:py-36">
        <Container>
          <SectionHead eyebrow="Why Manas" title="Three reasons contractors come back." />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="border-t border-ink pt-6">
                <h3 className="h3">{v.title}</h3>
                <p className="mt-3 text-ink-2">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-line py-20">
        <Container className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3">In the press</p>
          <a
            href="https://worldoftechnicaltextile.com/manas-geo-tech-india-breaking-new-ground-in-geotextiles/"
            target="_blank"
            rel="noopener noreferrer"
            className="group lg:col-span-9"
          >
            <p className="text-2xl leading-snug tracking-[-0.02em] transition-colors group-hover:text-accent-ink md:text-3xl">
              &ldquo;Manas Geo Tech India — breaking new ground in geotextiles&rdquo;
            </p>
            <p className="mt-3 text-ink-2">Techtextiles &amp; Nonwovens — profile of the Bawal plant and its European needle-punching line ↗</p>
          </a>
        </Container>
      </section>
      <section className="bg-paper-2 py-20">
        <Container className="grid gap-6 text-[15px] text-ink-2 sm:grid-cols-3">
          <div>
            <p className="eyebrow mb-2">Legal name</p>
            {site.legalName}
          </div>
          <div>
            <p className="eyebrow mb-2">CIN</p>
            {site.cin}
          </div>
          <div>
            <p className="eyebrow mb-2">Factory</p>
            {site.factory.street}, {site.factory.city}, {site.factory.region}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
