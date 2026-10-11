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
    <section className="pb-16 pt-28 md:pb-24 md:pt-36">
      <Container>
        {crumbs && <div className="mb-12">{crumbs}</div>}
        <Reveal immediate>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal immediate delay={0.05}>
          <h1 className="display mt-6 max-w-[18ch] text-balance">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal immediate delay={0.1}>
            <p className="lead mt-8 max-w-2xl">{lead}</p>
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
