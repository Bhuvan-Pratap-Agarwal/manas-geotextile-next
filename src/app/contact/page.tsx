import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a quote, datasheet or technical advice from Manas Geotextile.",
};

type Props = { searchParams: Promise<{ product?: string }> };

export default async function ContactPage({ searchParams }: Props) {
  const { product } = await searchParams;
  const { contact } = site;

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your project." />
      <section className="pb-24 md:pb-36">
        <Container className="grid gap-16 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="space-y-10 lg:col-span-4">
            <div>
              <p className="eyebrow">Sales & technical</p>
              <a href={`mailto:${contact.email}`} className="mt-3 block text-xl hover:text-accent">{contact.email}</a>
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="mt-1 block text-xl hover:text-accent">{contact.phone}</a>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block text-xl hover:text-accent"
              >
                WhatsApp
              </a>
            </div>
            <div>
              <p className="eyebrow">Works</p>
              <address className="mt-3 not-italic text-ink-2">
                {contact.address.map((line) => (
                  <span key={line} className="block">{line}</span>
                ))}
              </address>
            </div>
            <div>
              <p className="eyebrow">Hours</p>
              <p className="mt-3 text-ink-2">{contact.hours}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <EnquiryForm defaultProduct={product} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
