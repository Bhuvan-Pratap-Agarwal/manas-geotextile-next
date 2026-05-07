import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

const blocks = [
  {
    title: "Section scaffold",
    body: "Drop cinematic story blocks, spec grids, or case studies here. Section spacing uses fluid vertical rhythm.",
  },
  {
    title: "Immersive lanes",
    body: "Pair with WebGL canvases via dynamic import and GPU capability gates from lib/gpu.",
  },
  {
    title: "Industrial tone",
    body: "Surface layers, grid masks, and metallic accents are driven from styles/theme.css tokens.",
  },
] as const;

export function SectionsPlaceholder() {
  return (
    <>
      {blocks.map((block) => (
        <Section key={block.title} className="border-b border-border/50">
          <Container>
            <h2 className="type-title text-foreground">{block.title}</h2>
            <p className="type-body mt-4 max-w-3xl text-muted">{block.body}</p>
          </Container>
        </Section>
      ))}
    </>
  );
}
