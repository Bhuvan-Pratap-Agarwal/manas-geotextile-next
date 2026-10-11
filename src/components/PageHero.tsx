import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: React.ReactNode; lead?: string }) {
  return (
    <section className="pb-16 pt-36 md:pb-24 md:pt-44">
      <Container>
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="display mt-6 max-w-[16ch] text-balance">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.1}>
            <p className="lead mt-8 max-w-2xl">{lead}</p>
          </Reveal>
        )}
      </Container>
    </section>
  );
}
