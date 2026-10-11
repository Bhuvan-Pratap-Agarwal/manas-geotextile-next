import { site } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function CtaBand({
  title = "Send us your drawings.",
  sub = "Get the right grade and a firm quote from the factory.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="bg-ink text-paper">
      <Container className="grid gap-10 py-24 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          <p className="eyebrow !text-paper/50">Start a project</p>
          <h2 className="h2 mt-6 text-balance">
            {title} <span className="text-paper/45">{sub}</span>
          </h2>
        </Reveal>
        <Reveal className="flex flex-col items-start justify-end gap-4 lg:col-span-4 lg:items-end" delay={0.1}>
          <ButtonLink href="/contact" variant="light">Get a quote</ButtonLink>
          <a href={`mailto:${site.contact.salesEmail}`} className="text-paper/60 hover:text-paper">{site.contact.salesEmail}</a>
        </Reveal>
      </Container>
    </section>
  );
}
