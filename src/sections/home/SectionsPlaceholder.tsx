import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ApplicationsRailSection } from "@/sections/applications/ApplicationsRailSection";

type Block = {
  id?: string;
  title: string;
  body: string;
};

const blocks: Block[] = [
  {
    id: "about",
    title: "About",
    body: "Placeholder for company scale, global footprint, certification posture, and engineering leadership narrative.",
  },
  {
    id: "products",
    title: "Products",
    body: "Placeholder for product families, specification ladders, and technical differentiation at a glance.",
  },
  {
    id: "manufacturing",
    title: "Manufacturing excellence",
    body: "Placeholder for process precision, QA, and spec traceability narratives that reinforce engineering credibility.",
  },
  {
    id: "case-studies",
    title: "Case studies",
    body: "Placeholder for field performance stories, measurable outcomes, and infrastructure-scale proof points.",
  },
  {
    id: "contact",
    title: "Contact",
    body: "Placeholder for global inquiries, regional presence, and technical consultation routing.",
  },
];

export function SectionsPlaceholder() {
  const [about, ...afterAbout] = blocks;

  return (
    <>
      <Section
        className="border-b border-border/50"
        id={about.id}
      >
        <Container>
          <h2 className="type-title text-foreground">{about.title}</h2>
          <p className="type-body mt-4 max-w-3xl text-muted">{about.body}</p>
        </Container>
      </Section>

      <ApplicationsRailSection />

      {afterAbout.map((block) => (
        <Section
          key={block.title}
          className="border-b border-border/50"
          id={block.id}
        >
          <Container>
            <h2 className="type-title text-foreground">{block.title}</h2>
            <p className="type-body mt-4 max-w-3xl text-muted">{block.body}</p>
          </Container>
        </Section>
      ))}
    </>
  );
}
