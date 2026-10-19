import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { Prose } from "@/components/Prose";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy",
  description: `How ${site.legalName} handles information you share through this website.`,
  path: "/privacy",
});

// TODO(launch): have the client's counsel review against the DPDP Act, 2023,
// and update if analytics or a form backend are added.
export default function PrivacyPage() {
  return (
    <>
      <PageHero crumbs={<Breadcrumbs items={[{ name: "Privacy", path: "/privacy" }]} />} eyebrow="Privacy" title="Privacy note" />
      <section className="pb-24 md:pb-36">
        <Container className="max-w-3xl border-t border-line pt-12">
          <Prose
            blocks={[
              { type: "p", text: `This website is operated by ${site.legalName}. We keep data collection to the minimum needed to answer your enquiry.` },
              { type: "h2", text: "What we collect" },
              {
                type: "list",
                items: [
                  "Enquiries: the details you submit through the enquiry form (name, contact details and project information) are stored securely so our sales team can reply. If you choose WhatsApp or email instead, we receive what you send there.",
                  "To protect the form from abuse we also record the IP address and browser type with each enquiry.",
                  "Anonymous, cookie-free visit statistics (Vercel Web Analytics and Speed Insights) — page views and loading speed, never your identity.",
                  "This website does not use advertising or tracking cookies.",
                ],
              },
              { type: "h2", text: "How we use it" },
              { type: "p", text: "Only to reply to your enquiry, prepare quotations and supply orders. We do not sell or share your details with third parties for marketing." },
              { type: "h2", text: "Your choices" },
              { type: "p", text: `To see, correct or delete information you have sent us, write to ${site.contact.email}.` },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
