// The real domain. Until it points at Vercel, the site runs on its
// *.vercel.app address and stays out of search engines (see `indexable`).
const PRODUCTION_DOMAIN = "https://manasgeotextile.com";

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time; once
// manasgeotextile.com is added in Vercel it becomes that domain automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : PRODUCTION_DOMAIN);

/** True only on the real domain — staging copies are noindex. */
export const indexable = /^https:\/\/(www\.)?manasgeotextile\.com$/.test(siteUrl);

// Contact details taken from the current manasgeotextile.com contact page
// (Oct 2026). Confirm with the client before launch.
export const site = {
  name: "Manas Geotextile",
  legalName: "Manas Geo Tech India Pvt. Ltd.",
  tagline: "Non-woven geotextile manufacturer in India",
  description:
    "Manas Geo Tech India manufactures needle-punched non-woven geotextiles (150–1500 GSM, up to 5 m wide), PVC geomembranes and geo bags at IMT Bawal, Haryana — for roads, railways, tunnels, landfills and coastal protection.",
  url: siteUrl,
  foundingDate: "1995-12-12",
  cin: "U17120DL1995PTC068486",
  contact: {
    email: "info@manasgeotextile.com",
    salesEmail: "sales@manasgeotextile.com",
    phone: "+91 11 4600 0770",
    mobile: "+91 96430 03960",
    whatsapp: "919643003960",
    hours: "Mon–Sat · 9:30–18:30 IST",
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
    { href: "/guides", label: "Guides" },
    { href: "/tools/geotextile-calculator", label: "Calculator" },
    { href: "/about", label: "Company" },
  ],
} as const;

export const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;

export const absoluteUrl = (path = "") => `${site.url}${path}`;
