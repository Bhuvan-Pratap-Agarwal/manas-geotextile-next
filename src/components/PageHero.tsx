import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  crumbs?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-line bg-paper-2 pt-24 md:pt-[108px]">
      <Container className="py-12 md:py-16">
        {crumbs && <div className="mb-8">{crumbs}</div>}
        <Reveal immediate>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-3 max-w-[22ch] text-balance text-navy">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal immediate delay={0.05}>
            <p className="lead mt-5 max-w-2xl">{lead}</p>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
