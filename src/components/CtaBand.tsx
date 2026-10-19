import { site, tel } from "@/lib/site";
import { ButtonLink } from "./ButtonLink";
import { Container } from "./Container";
import { FibreField } from "./FibreField";
import { Reveal } from "./Reveal";

export function CtaBand({
  title = "Send us your drawing or BOQ.",
  sub = "We'll come back with the right grade and a delivered price, straight from the factory.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <FibreField color="255, 255, 255" opacity={0.09} density={0.7} />
      <Container className="relative grid gap-10 py-20 md:py-24 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-7">
          <h2 className="h2 text-balance">{title}</h2>
          <p className="lead mt-4 max-w-xl !text-white/80">{sub}</p>
        </Reveal>
        <Reveal className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end" delay={0.05}>
          <ButtonLink href="/contact" variant="light">Get a quote</ButtonLink>
          <a
            href={tel(site.contact.mobile)}
            className="inline-flex h-12 items-center justify-center rounded-[4px] border border-white/30 px-6 text-[15px] font-semibold transition-colors hover:border-white"
          >
            Call {site.contact.mobile}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
