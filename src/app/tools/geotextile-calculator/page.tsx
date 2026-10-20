import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculator } from "@/components/Calculator";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { absoluteUrl } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

const path = "/tools/geotextile-calculator";

export const metadata = pageMetadata({
  title: "Geotextile Calculator: Square Metres, Rolls & Overlap",
  absoluteTitle: true,
  description:
    "Free geotextile quantity calculator: enter area, roll size, overlap and wastage to get total square metres, number of rolls and a suggested GSM.",
  path,
});

const faqs = [
  {
    q: "How do I calculate how much geotextile I need?",
    a: "Multiply length by width for the net area, then add for side and end overlaps (typically 300–500 mm) and a wastage allowance of around 5%. Divide by the roll area to get the number of rolls.",
  },
  {
    q: "How much extra geotextile should I allow for overlaps?",
    a: "With 300 mm overlaps on 5 m wide rolls, side laps add about 6%. Narrower rolls or wider overlaps add more, the calculator works it out for your inputs.",
  },
];

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Geotextile Calculator",
          url: absoluteUrl(path),
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
        }}
      />
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Geotextile calculator", path }]} />}
        eyebrow="Free tool"
        title="Geotextile calculator"
        lead="Work out the square metres and rolls you need, including overlaps and wastage, and get a suggested grade for your application."
      />
      <section className="py-14 md:py-20">
        <Container className="border-t border-line pt-12">
          <Calculator />
        </Container>
      </section>
      <section className="py-14 md:py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">How it works</p>
            <h2 className="h2 mt-6">The maths</h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={faqs} />
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
