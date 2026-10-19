import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { CountUp } from "@/components/CountUp";
import { MakingStory } from "@/components/MakingStory";
import { Reveal } from "@/components/Reveal";
import { events } from "@/lib/projects";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Manufacturing & Company | Geotextile Plant at IMT Bawal, Haryana",
  description:
    "Manas Geo Tech India Pvt. Ltd.: European needle-punching lines, Ramina winder, PVC membrane extrusion and an in-house lab at IMT Bawal, Haryana. 250 tonnes a month. ISO 9001:2015 and ISO 14001:2015.",
  path: "/about",
});

const lab = [
  { img: "/images/lab-wide-width.jpg", title: "Wide-width tensile strength" },
  { img: "/images/lab-tensile.jpg", title: "Tensile test" },
  { img: "/images/lab-thickness.jpg", title: "Thickness at specified pressure" },
  { img: "/images/lab-cone-drop.jpg", title: "Dynamic puncture (cone drop)" },
];

export default function AboutPage() {
  const { facts } = site;
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Manufacturing", path: "/about" }]} />}
        eyebrow="Manufacturing & company"
        title="Our plant at IMT Bawal"
        lead={`${site.legalName} is headquartered in New Delhi, with sales offices in Mumbai and Bengaluru and a factory at IMT Bawal, Haryana. The founders have worked on Indian infrastructure since ${facts.foundersSince}.`}
      />

      <section className="py-16 md:py-24">
        <Container className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Photo src="/images/factory-bawal.jpg" alt="Manas Geo Tech factory building at IMT Bawal, Haryana" caption="The factory at Plot 189, Sector 3, IMT Bawal" ratio="4/3" sizes="(min-width: 1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal className="lg:col-span-6" delay={0.05}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
              {[
                [<CountUp key="c" to={facts.capacityTonnesPerMonth} suffix=" t" />, "Non-woven geotextile per month"],
                [<CountUp key="w" to={facts.rollWidthM} suffix=" m" />, "Roll width"],
                [<CountUp key="g" to={1000} prefix="100–" />, "GSM range"],
                ["2", "Product lines: geotextile and PVC membrane"],
              ].map(([v, l]) => (
                <div key={String(l)}>
                  <dt className="sr-only">{String(l)}</dt>
                  <dd>
                    <span className="block text-4xl font-bold text-navy [font-stretch:92%]">{v}</span>
                    <span className="mt-1 block text-[15px] text-muted">{l}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-[17px] leading-relaxed text-ink-2">
              The geotextile lines use European fully automated needle-punching machinery, set up under an
              Indo-Italian technical collaboration. Next to them is our PVC membrane extrusion plant, which we built
              after close to six years of supplying tunnel waterproofing projects.
            </p>
            <p className="mt-4 text-[15px] font-semibold text-navy">{facts.certifications.join(" · ")}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 md:py-24">
        <Container>
          <h2 className="h2 text-navy">How a roll is made</h2>
          <div className="mt-6">
            <MakingStory />
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="h2 text-navy">Tested before it leaves</h2>
            <p className="lead mt-4">
              Our laboratory runs mechanical, hydraulic and accelerated ageing tests. Every batch is checked, and the
              results go with the material.
            </p>
            <div className="mt-6">
              <ButtonLink href="/downloads" variant="outline">Datasheets</ButtonLink>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:col-span-8 lg:grid-cols-4">
            {lab.map((l) => (
              <Photo key={l.title} src={l.img} alt={l.title} caption={l.title} ratio="3/4" sizes="(min-width: 1024px) 16vw, 50vw" />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper-2 py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="h2 text-navy">The people</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {site.people.map((p) => (
                <li key={p.name} className="py-5">
                  <p className="font-semibold text-navy">{p.name}</p>
                  <p className="text-[14px] text-accent-ink">{p.role}</p>
                  <p className="mt-2 text-[15px] text-ink-2">{p.bio}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <h2 className="h2 text-navy">Out in the industry</h2>
            <p className="mt-3 text-ink-2">
              We present at NHAI, NHIDCL and state water resources workshops, technical textile conferences and
              infrastructure exhibitions.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {events.map((e) => (
                <Photo key={e.image} src={e.image} alt={e.caption} caption={e.caption} ratio="3/4" sizes="(min-width: 1024px) 19vw, 33vw" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-20">
        <Container className="grid gap-6 text-[15px] text-ink-2 sm:grid-cols-3">
          <div>
            <p className="mb-1 font-semibold text-navy">Legal name</p>
            {site.legalName}
          </div>
          <div>
            <p className="mb-1 font-semibold text-navy">CIN</p>
            {site.cin}
          </div>
          <div>
            <p className="mb-1 font-semibold text-navy">In the press</p>
            <a
              href="https://worldoftechnicaltextile.com/manas-geo-tech-india-breaking-new-ground-in-geotextiles/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-ink underline underline-offset-4 hover:text-navy"
            >
              &ldquo;Manas Geo Tech India: breaking new ground in geotextiles&rdquo;, World of Technical Textiles
            </a>
          </div>
        </Container>
      </section>

      <CtaBand title="Come and see the plant." sub="Bawal is two hours from Delhi on NH-48. Call us to arrange a visit." />
    </>
  );
}
