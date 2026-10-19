import { FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Datasheets & Brochures | Non-Woven Geotextile and PVC Membrane",
  description:
    "Download the Manas MGT polypropylene and M-Geo polyester geotextile datasheets (ASTM values, 100 to 1000 GSM), the tunnel waterproofing PVC membrane brochure and the company brochure.",
  path: "/downloads",
});

const files = [
  {
    href: "/downloads/manas-mgt-polypropylene-geotextile-datasheet.pdf",
    title: "MGT polypropylene geotextile datasheet",
    body: "120 to 1000 GSM. Grab, tensile, tear, CBR puncture, permeability, AOS, thickness, roll sizes. 4 pages.",
    size: "1.2 MB",
  },
  {
    href: "/downloads/manas-m-geo-polyester-geotextile-datasheet.pdf",
    title: "M-Geo polyester geotextile datasheet",
    body: "100 to 1000 GSM, tested to ASTM methods. 4 pages.",
    size: "1.3 MB",
  },
  {
    href: "/downloads/manas-tunnel-waterproofing-pvc-geomembrane-brochure.pdf",
    title: "Tunnel waterproofing brochure",
    body: "PVC membrane and protection geotextile system, plant photos, certifications and customer letters. 12 pages.",
    size: "4.1 MB",
  },
  {
    href: "/downloads/manas-company-brochure.pdf",
    title: "Company brochure",
    body: "Plant, quality control and testing, product range. 2 pages.",
    size: "1.0 MB",
  },
];

export default function DownloadsPage() {
  return (
    <>
      <PageHero
        crumbs={<Breadcrumbs items={[{ name: "Downloads", path: "/downloads" }]} />}
        eyebrow="Downloads"
        title="Datasheets and brochures"
        lead="Free to download, no form to fill. For a signed datasheet or test certificate for a specific batch, ask our sales team."
      />
      <section className="py-16 md:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          {files.map((f) => (
            <a
              key={f.href}
              href={f.href}
              download
              className="group flex gap-5 rounded-[4px] border border-line p-6 transition-colors hover:border-accent md:p-8"
            >
              <FileText className="mt-1 size-8 shrink-0 text-accent" strokeWidth={1.5} aria-hidden />
              <span>
                <span className="block text-lg font-semibold text-navy group-hover:text-accent-ink">{f.title}</span>
                <span className="mt-1 block text-[15px] text-ink-2">{f.body}</span>
                <span className="mt-3 block text-[14px] font-semibold text-accent-ink">Download PDF · {f.size}</span>
              </span>
            </a>
          ))}
        </Container>
        <Container>
          <p className="mt-10 text-[15px] text-ink-2">
            Need something else, like a test report for a batch or a spec compliance sheet?{" "}
            <a href={`mailto:${site.contact.salesEmail}`} className="font-semibold text-accent-ink hover:text-navy">
              {site.contact.salesEmail}
            </a>
          </p>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
