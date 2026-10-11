import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { stats } from "@/lib/content";

export const metadata: Metadata = {
  title: "Company",
  description: "About Manas Geotextile — manufacturing, quality and people.",
};

// TODO(content): replace with the client's real story, milestones and certifications.
const values = [
  { title: "Made in-house", body: "From polymer to finished roll, production stays under one roof, so we control quality at every step." },
  { title: "Tested, not claimed", body: "Every batch is lab-tested to IS and ASTM methods, and the certificates ship with the material." },
  { title: "Engineers first", body: "You speak to people who read soil reports, not just price lists." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Quiet materials. Serious engineering."
        lead="Manas Geotextile manufactures geosynthetics for contractors, consultants and government agencies across India and abroad."
      />
      <section className="border-y border-line">
        <Container>
          <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-paper px-1 py-10 sm:px-6 lg:first:pl-0">
              <p className="text-5xl font-medium tracking-[-0.04em]">{s.value}</p>
              <p className="mt-2 text-[15px] text-muted">{s.label}</p>
            </div>
          ))}
          </div>
        </Container>
      </section>
      <section className="py-24 md:py-36">
        <Container>
          <SectionHead eyebrow="What we stand for" title="Three things we don't compromise on." />
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
      <CtaBand />
    </>
  );
}
