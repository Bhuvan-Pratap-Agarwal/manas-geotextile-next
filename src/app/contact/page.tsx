import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { Suspense } from "react";
import { EnquiryForm, EnquiryFromParams } from "@/components/EnquiryForm";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site, tel } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact — Geotextile Quote & Technical Advice",
  description:
    "Get a geotextile quote or datasheet from Manas Geo Tech India. Head office Vasant Kunj, New Delhi; factory IMT Bawal, Haryana. Call +91 11 4600 0770.",
  path: "/contact",
});

export default function ContactPage() {
  const { contact, office, factory } = site;

  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />}
        eyebrow="Contact"
        title="Let's talk about your project."
      />
      <section className="pb-24 md:pb-36">
        <Container className="grid gap-16 border-t border-line pt-12 lg:grid-cols-12">
          <Reveal className="space-y-10 lg:col-span-4">
            <div>
              <p className="eyebrow">Sales &amp; technical</p>
              <a href={tel(contact.mobile)} className="mt-3 block text-xl hover:text-accent-ink">{contact.mobile}</a>
              <a href={tel(contact.phone)} className="mt-1 block text-xl hover:text-accent-ink">{contact.phone}</a>
              <a href={`mailto:${contact.salesEmail}`} className="mt-1 block text-xl hover:text-accent-ink">{contact.salesEmail}</a>
              <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-1 block text-xl hover:text-accent-ink">
                WhatsApp →
              </a>
            </div>
            {[office, factory].map((a) => (
              <div key={a.label}>
                <p className="eyebrow">{a.label}</p>
                <address className="mt-3 not-italic text-ink-2">
                  {a.street}
                  <br />
                  {a.city}, {a.region} {a.postalCode}
                </address>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city}, ${a.region} ${a.postalCode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block py-1.5 text-[14px] text-muted underline underline-offset-4 hover:text-ink"
                >
                  Open in Maps
                </a>
              </div>
            ))}
            <div>
              <p className="eyebrow">Factory desk</p>
              <a href={tel(factory.phone)} className="mt-3 block text-ink-2 hover:text-accent-ink">{factory.phone}</a>
              <a href={`mailto:${factory.email}`} className="block text-ink-2 hover:text-accent-ink">{factory.email}</a>
              <p className="mt-3 text-ink-2">{contact.hours}</p>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.08}>
            <Suspense fallback={<EnquiryForm />}>
              <EnquiryFromParams />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
