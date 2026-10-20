import { applications } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";
import { absoluteUrl, site } from "@/lib/site";

// llms.txt: a plain-text summary for AI assistants and AI search (see llmstxt.org).
export const dynamic = "force-static";

export function GET() {
  const f = site.facts;
  const body = `# ${site.legalName}

> ${site.description}

- Brand: ${site.name} (also known as Manas Geotextile)
- Head office: ${site.office.street}, ${site.office.city} ${site.office.postalCode}, India
- Factory: ${site.factory.street}, ${site.factory.city}, ${site.factory.region} ${site.factory.postalCode}, India
- Sales offices: ${f.salesOffices.join(", ")}
- Capacity: ${f.capacityTonnesPerMonth} tonnes of non-woven geotextile a month; 5 m roll width
- Range: ${f.gsmRange}, polypropylene (MGT) and polyester (M-Geo)
- Certifications: ${f.certifications.join(", ")}; ${f.collaboration}
- Founders in Indian infrastructure since ${f.foundersSince}; company incorporated 1995 (CIN ${site.cin})
- Notable supply: Tunnel T15 of the Udhampur–Srinagar–Baramulla Rail Link (Patel Engineering performance certificate, 2022); Delhi–Mumbai Expressway world-record paving (Patel Infrastructure, 2021)
- Clients include Larsen & Toubro, Afcons, Tata Projects, HCC, IRCON, Patel Engineering, Gammon, Dilip Buildcon
- Contact: ${site.contact.mobile} (WhatsApp), ${site.contact.phone}, ${site.contact.salesEmail}

## Products
${products.map((p) => `- [${p.name}](${absoluteUrl(`/products/${p.slug}`)}): ${p.summary}`).join("\n")}

## Applications
${applications.map((a) => `- [${a.name}](${absoluteUrl(`/applications/${a.slug}`)}): ${a.summary}`).join("\n")}

## Guides
${guides.map((g) => `- [${g.title}](${absoluteUrl(`/guides/${g.slug}`)}): ${g.excerpt}`).join("\n")}

## Other
- [Datasheets and brochures (PDF)](${absoluteUrl("/downloads")})
- [Projects and clients](${absoluteUrl("/projects")})
- [Manufacturing and company](${absoluteUrl("/about")})
- [Geotextile quantity calculator](${absoluteUrl("/tools/geotextile-calculator")})
- [Request a quote](${absoluteUrl("/contact")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
