import type { Faq } from "./content-types";
import { absoluteUrl, site } from "./site";

const address = (a: typeof site.office | typeof site.factory) => ({
  "@type": "PostalAddress",
  streetAddress: a.street,
  addressLocality: a.city,
  addressRegion: a.region,
  postalCode: a.postalCode,
  addressCountry: a.country,
});

export const orgId = absoluteUrl("/#organization");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "Manufacturer"],
        "@id": orgId,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: absoluteUrl("/images/logo-go.png"),
        description: site.description,
        foundingDate: site.foundingDate,
        email: site.contact.email,
        telephone: site.contact.phone,
        address: address(site.office),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: site.contact.mobile,
            email: site.contact.salesEmail,
            areaServed: "IN",
            availableLanguage: ["en", "hi"],
          },
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": absoluteUrl("/#factory"),
        name: `${site.name} | Factory, IMT Bawal`,
        parentOrganization: { "@id": orgId },
        telephone: site.factory.phone,
        email: site.factory.email,
        address: address(site.factory),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: site.url,
        name: site.name,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function productSchema(p: { name: string; description: string; path: string; category?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    url: absoluteUrl(p.path),
    image: absoluteUrl(`${p.path}/opengraph-image`),
    category: p.category ?? "Geosynthetics",
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@id": orgId },
  };
}

export function articleSchema(g: { title: string; description: string; path: string; updated: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    url: absoluteUrl(g.path),
    image: absoluteUrl(`${g.path}/opengraph-image`),
    dateModified: g.updated,
    datePublished: g.updated,
    author: { "@id": orgId },
    publisher: { "@id": orgId },
    mainEntityOfPage: absoluteUrl(g.path),
  };
}
