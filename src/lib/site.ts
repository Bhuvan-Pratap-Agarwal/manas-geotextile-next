// TODO(content): replace placeholder contact details with the real ones.
export const site = {
  name: "Manas Geotextile",
  shortName: "Manas",
  tagline: "Geosynthetics engineered for infrastructure that lasts.",
  description:
    "Manas Geotextile manufactures woven and non-woven geotextiles, geogrids, geocells and geomembranes for roads, railways, landfills, canals and coastal works.",
  url: "https://www.manasgeotextile.com",
  contact: {
    email: "sales@manasgeotextile.com",
    phone: "+91 00000 00000",
    whatsapp: "910000000000",
    address: ["Plant address line 1", "City, State — PIN", "India"],
    hours: "Mon–Sat · 9:30–18:30 IST",
  },
  nav: [
    { href: "/products", label: "Products" },
    { href: "/applications", label: "Applications" },
    { href: "/about", label: "Company" },
    { href: "/contact", label: "Contact" },
  ],
} as const;
