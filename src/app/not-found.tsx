import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-16">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 max-w-[12ch]">This ground hasn&apos;t been surveyed.</h1>
        <div className="mt-10">
          <ButtonLink href="/">Back to home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
