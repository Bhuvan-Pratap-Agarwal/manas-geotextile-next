// The real domain. Until it points at Vercel, the site runs on its
// *.vercel.app address and stays out of search engines (see `indexable`).
// www is the host Google already knows from the old site, so keep it.
const PRODUCTION_DOMAIN = "https://www.manasgeotextile.com";

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; once
// manasgeotextile.com is added in Vercel it becomes that domain automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : PRODUCTION_DOMAIN);

/** True only on the real domain — staging copies are noindex. */
export const indexable = /^https:\/\/(www\.)?manasgeotextile\.com$/.test(siteUrl);

// Everything below is taken from the current manasgeotextile.com, the
// company brochures and the MGT / M-Geo datasheets (scraped Oct 2026).
export const site = {
  name: "Manas Geo Tech",
  legalName: "Manas Geo Tech India Pvt. Ltd.",
  tagline: "Non-woven geotextile and PVC geomembrane, made in Haryana",
  description:
    "Manas Geo Tech India makes needle-punched non-woven geotextile (100 to 1000 GSM, 5 m rolls), PVC tunnel waterproofing membrane, geo bags and drainage geocomposite at IMT Bawal, Haryana. ISO 9001 certified. Supplied to L&T, Afcons, Patel Engineering and other major contractors.",
  metaDescription:
    "Non-woven geotextile (100–1000 GSM), PVC tunnel membrane, geo bags and geocomposite, made at IMT Bawal, Haryana. ISO 9001. Supplied across India.",
  url: siteUrl,
  foundingDate: "1995-12-12",
  cin: "U17120DL1995PTC068486",
  facts: {
    foundersSince: 1996,
    capacityTonnesPerMonth: 250,
    rollWidthM: 5,
    gsmRange: "100 to 1000 GSM",
    collaboration: "Indo-Italian technical collaboration",
    certifications: ["ISO 9001:2015", "ISO 14001:2015", "CE"],
    salesOffices: ["New Delhi", "Mumbai", "Bengaluru"],
  },
  people: [
    {
      name: "Dinesh Kanodia",
      role: "Founder & Chairman",
      bio: "Over 40 years in Indian infrastructure. Sets the company's direction and its standards for quality.",
    },
    {
      name: "Kartik Kanodia",
      role: "Director, Sales & Operations",
      bio: "Runs sales and plant operations and works directly with contractors and government agencies. Studied business at Lancaster University.",
    },
    {
      name: "Ruby Kanodia",
      role: "Director",
      bio: "Director of the company since incorporation.",
    },
  ],
  social: {
    linkedin: "https://www.linkedin.com/company/manas-geo-tech-india-private-limited",
    facebook: "https://www.facebook.com/Manas-Geo-Tech-India-Pvt-Ltd-790567034314134/",
    youtube: "https://www.youtube.com/channel/UCa_vwfwSv7bTFN-APIMy9HA",
  },
  contact: {
    email: "info@manasgeotextile.com",
    salesEmail: "sales@manasgeotextile.com",
    phone: "+91 11 4600 0770",
    mobile: "+91 96430 03960",
    whatsapp: "919643003960",
    hours: "Mon to Sat, 9:30 am to 6:30 pm",
  },
  office: {
    label: "Head office",
    street: "FF-25, Vasant Square Mall, Plot A, Community Centre, Pocket V, Sector B, Vasant Kunj",
    city: "New Delhi",
    region: "Delhi",
    postalCode: "110070",
    country: "IN",
  },
  factory: {
    label: "Factory",
    street: "Plot No. 189, Phase 1, Sector 3, IMT Bawal",
    city: "Rewari",
    region: "Haryana",
    postalCode: "123501",
    country: "IN",
    phone: "+91 1284 264044",
    email: "works@manasgeotextile.com",
  },
  nav: [
    { href: "/products", label: "Products" },
    { href: "/applications", label: "Applications" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "Manufacturing" },
    { href: "/guides", label: "Guides" },
  ],
} as const;

export const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

export const absoluteUrl = (path = "") => `${site.url}${path}`;
