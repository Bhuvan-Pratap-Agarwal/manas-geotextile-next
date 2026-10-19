import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-16">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="display mt-3 max-w-[16ch] text-navy">We couldn&apos;t find that page.</h1>
        <div className="mt-10">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
