import type { Faq } from "./content-types";

// Core lines (non-woven, pipe wrap, geo bags, PVC geomembrane) are taken from
// the current manasgeotextile.com. "supplied" lines are listed in third-party
// profiles — TODO(content): confirm with the client before launch.

export type Product = {
  slug: string;
  code: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  intro: string[];
  functions: string[];
  highlights: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  grades?: { head: string[]; rows: string[][] };
  applications: string[];
  faqs: Faq[];
  origin: "manufactured" | "supplied";
};

export const products: Product[] = [
  {
    slug: "non-woven-geotextile",
    code: "NW",
    name: "Non-Woven Geotextile",
    seoTitle: "Non-Woven Geotextile Manufacturer in India — 150 to 1500 GSM",
    metaDescription:
      "Needle-punched PP and PET non-woven geotextile, 150–1500 GSM, up to 5 m wide, UV stabilised. Made at IMT Bawal, Haryana. Request a quote.",
    summary: "Needle-punched PP and PET fabric for separation, filtration, drainage and protection.",
    intro: [
      "Non-woven geotextile is a felt-like fabric made by mechanically interlocking polymer fibres with thousands of barbed needles. The result is a strong, permeable sheet that lets water through while holding soil back — the single most used geosynthetic on Indian infrastructure projects.",
      "We manufacture it on fully automated European needle-punching lines at our plant in IMT Bawal, Haryana, in polypropylene (PP) and polyester (PET) staple fibre, from 150 to 1500 GSM and up to 5 metres wide. Carbon black is added for UV resistance during site exposure.",
    ],
    functions: ["Separation", "Filtration", "Drainage", "Protection"],
    highlights: [
      { title: "150 – 1500 GSM", body: "One of the widest weight ranges in India — from light drainage wraps to heavy membrane cushioning." },
      { title: "Up to 5 m wide", body: "Wide rolls mean fewer overlaps, less waste and faster laying on highway-width formations." },
      { title: "PP or PET", body: "Polypropylene for chemical resistance, polyester for higher heat and creep performance." },
      { title: "UV stabilised", body: "Carbon black protects the fabric during the time it lies exposed on site." },
    ],
    specs: [
      { label: "Polymer", value: "Polypropylene (PP) / Polyester (PET) staple fibre" },
      { label: "Process", value: "Needle-punched, European fully automated line" },
      { label: "Mass per unit area", value: "150 – 1500 g/m²" },
      { label: "Roll width", value: "Up to 5 m (custom widths available)" },
      { label: "UV protection", value: "Carbon black stabilised" },
      { label: "Colour", value: "White / grey / black" },
    ],
    grades: {
      head: ["GSM", "Typical use"],
      rows: [
        ["150 – 200", "Pipe and drain wrapping, French drains, light separation"],
        ["250 – 300", "Road subgrade separation, filtration behind walls, geo bags"],
        ["400 – 500", "Railway formations, riverbank and coastal filters, geo bags"],
        ["600 – 800", "Geomembrane protection in landfills, ponds and canals"],
        ["1000 – 1500", "Heavy cushioning under membranes in tunnels and on rock"],
      ],
    },
    applications: ["roads", "railways", "tunnels", "landfills", "coastal-riverbank", "drainage"],
    origin: "manufactured",
    faqs: [
      {
        q: "What is non-woven geotextile used for?",
        a: "It separates soil layers, filters water while retaining soil, drains water in the plane of the fabric and protects geomembranes from puncture. The most common uses are road subgrades, railway formations, drains, landfills, tunnels and riverbank or coastal protection.",
      },
      {
        q: "Which GSM of non-woven geotextile should I use?",
        a: "As a rule of thumb: 150–200 GSM for drain wrapping, 250–300 GSM for road separation, 400–500 GSM for rail and erosion control, and 600 GSM and above for protecting geomembranes. The project specification (often IRC:SP:59 or the relevant IS standard) decides the final grade — our engineers can check it for you.",
      },
      {
        q: "What is the difference between PP and PET non-woven geotextile?",
        a: "Polypropylene is lighter and more resistant to acids and alkalis. Polyester has a higher melting point and better creep resistance, which matters under hot bituminous layers or long-term load.",
      },
      {
        q: "What roll sizes do you supply?",
        a: "Widths up to 5 m, with roll lengths set by GSM. Custom narrow widths from 0.1 m are slit for pipe wrapping and strip drains.",
      },
    ],
  },
  {
    slug: "pvc-geomembrane",
    code: "PM",
    name: "PVC Geomembrane",
    seoTitle: "PVC Geomembrane for Tunnel Waterproofing — Manufacturer in India",
    metaDescription:
      "Flexible PVC geomembrane waterproofing sheet for tunnels, basements and canals. Welded seams, high puncture resistance, supplied with non-woven protection layer.",
    summary: "Flexible, weldable waterproofing membrane for tunnels and underground structures.",
    intro: [
      "PVC geomembrane is a flexible, impermeable sheet used to keep water out of tunnels, metro stations, basements and cut-and-cover structures. Its flexibility lets it follow irregular rock and shotcrete surfaces without cracking.",
      "We supply it as a system: the membrane is laid over a non-woven geotextile that cushions it against sharp shotcrete and drains seepage water away. Seams are hot-air or wedge welded for continuous water-tightness.",
    ],
    functions: ["Waterproofing", "Barrier", "Containment"],
    highlights: [
      { title: "Welded seams", body: "Double-track welds can be air-tested on site for proof of water-tightness." },
      { title: "Puncture resistant", body: "Handles shotcrete, rock bolts and backfill when paired with a protection geotextile." },
      { title: "Flexible", body: "Follows uneven rock and concrete surfaces without stress cracking." },
      { title: "Complete system", body: "Membrane, protection fleece and accessories from one manufacturer." },
    ],
    specs: [
      { label: "Material", value: "Plasticised PVC (P-PVC)" },
      { label: "Jointing", value: "Hot-air / hot-wedge welding" },
      { label: "Typical use", value: "Tunnel, metro and basement waterproofing" },
      { label: "Used with", value: "Non-woven geotextile protection layer (500–1000 GSM)" },
    ],
    applications: ["tunnels", "landfills"],
    origin: "manufactured",
    faqs: [
      {
        q: "Why use PVC geomembrane in tunnels?",
        a: "PVC is flexible and weldable, so it can follow the irregular profile of a tunnel lining and form a continuous, testable waterproof envelope between the primary and final lining.",
      },
      {
        q: "Is a geotextile needed under PVC geomembrane?",
        a: "Yes. A heavy non-woven geotextile protects the membrane from sharp shotcrete and rock, and carries seepage water to the drains.",
      },
      {
        q: "How are PVC geomembrane joints made?",
        a: "Overlapping sheets are welded with hot air or a hot wedge. Double-track welds leave a channel that can be pressure-tested on site.",
      },
    ],
  },
  {
    slug: "geo-bags",
    code: "GB",
    name: "Geo Bags",
    seoTitle: "Geo Bags Manufacturer — Non-Woven Geotextile Bags for Erosion Control",
    metaDescription:
      "Non-woven geotextile geo bags (300 & 400 GSM, PP/PET) for riverbank, coastal and flood protection. Custom sizes, sand-filled on site. Made in India.",
    summary: "Sand-filled non-woven geotextile bags for river, coastal and flood protection.",
    intro: [
      "Geo bags are large bags sewn from non-woven geotextile and filled with sand or soil on site. Stacked or dumped, they form flexible, permeable revetments and bunds that resist waves and river currents — at a fraction of the cost and carbon of rock or concrete.",
      "We make geo bags most commonly from 300 and 400 GSM PP or PET non-woven, in standard and custom sizes, with strong seams designed for filling, handling and placement.",
    ],
    functions: ["Erosion control", "Scour protection", "Containment"],
    highlights: [
      { title: "300 & 400 GSM", body: "Grades proven in riverbank and coastal protection across India." },
      { title: "Custom sizes", body: "Sized for manual filling or mechanical placement from barges and excavators." },
      { title: "Local fill", body: "Filled with site sand, avoiding long rock haulage." },
      { title: "Permeable", body: "Water drains through, so bags stay stable under fluctuating levels." },
    ],
    specs: [
      { label: "Fabric", value: "Non-woven geotextile, PP / PET" },
      { label: "Common grades", value: "300 GSM, 400 GSM" },
      { label: "Sizes", value: "Standard and custom" },
      { label: "Fill", value: "Sand or soil, filled on site" },
    ],
    applications: ["coastal-riverbank"],
    origin: "manufactured",
    faqs: [
      {
        q: "What are geo bags used for?",
        a: "Riverbank and coastal erosion protection, flood bunds, scour protection around bridge piers and temporary cofferdams.",
      },
      {
        q: "What GSM is used for geo bags?",
        a: "300 GSM and 400 GSM non-woven geotextile are the most common. Heavier fabric is used where bags are dumped from height or face strong currents.",
      },
    ],
  },
  {
    slug: "pipe-wrap-geotextile",
    code: "PW",
    name: "Pipe Wrap Geotextile",
    seoTitle: "Geotextile for PVC Pipe Wrapping — Custom Width Non-Woven Rolls",
    metaDescription:
      "Narrow-width non-woven geotextile for wrapping perforated PVC drain pipes and strip drains. Custom widths from 0.1 m to 5 m. MOQ 1000 m².",
    summary: "Custom narrow rolls for wrapping perforated drain pipes and strip drains.",
    intro: [
      "Perforated drain pipes clog quickly when fine soil washes into them. A sleeve of non-woven geotextile acts as a filter: water passes freely, soil stays out, and the drain keeps working for decades.",
      "We slit non-woven geotextile to custom widths from 0.1 m up to 5 m, so pipe manufacturers and contractors can wrap pipes on the line or on site with no waste.",
    ],
    functions: ["Filtration", "Drainage"],
    highlights: [
      { title: "0.1 – 5 m widths", body: "Slit to your pipe circumference for clean, single-pass wrapping." },
      { title: "Light grades", body: "Typically 100–200 GSM for high permeability with good soil retention." },
      { title: "Line-ready rolls", body: "Wound for continuous feeding on pipe-wrapping machines." },
      { title: "MOQ 1000 m²", body: "Small enough for site jobs, large enough for factory runs." },
    ],
    specs: [
      { label: "Fabric", value: "Non-woven geotextile, PP / PET" },
      { label: "Width", value: "0.1 – 5 m (custom slit)" },
      { label: "Minimum order", value: "1000 m²" },
    ],
    applications: ["drainage", "roads"],
    origin: "manufactured",
    faqs: [
      {
        q: "Why wrap drain pipes in geotextile?",
        a: "The geotextile filters fine soil out of the water before it enters the pipe perforations, preventing clogging and extending drain life.",
      },
    ],
  },
  {
    slug: "woven-geotextile",
    code: "WV",
    name: "Woven Geotextile",
    seoTitle: "Woven Geotextile for Railways and Roads — High Strength Fabric",
    metaDescription:
      "High-modulus woven geotextile for railway track foundations, soft-soil stabilisation and embankment reinforcement. Supplied across India.",
    summary: "High-strength, low-stretch fabric for stabilisation and reinforcement.",
    intro: [
      "Woven geotextile is made by weaving polymer tapes or yarns into a tight, strong fabric. It stretches far less than non-woven, which makes it the right choice when the job is to carry load — stabilising soft subgrades and railway formations.",
    ],
    functions: ["Stabilisation", "Reinforcement", "Separation"],
    highlights: [
      { title: "High tensile strength", body: "Carries load at low elongation over soft ground." },
      { title: "Railway proven", body: "Used under ballast to keep formations stable under cyclic loads." },
    ],
    specs: [
      { label: "Polymer", value: "Polypropylene / Polyester" },
      { label: "Construction", value: "Woven tape / multifilament" },
    ],
    applications: ["railways", "roads"],
    origin: "supplied",
    faqs: [
      {
        q: "When should I use woven instead of non-woven geotextile?",
        a: "Use woven where strength and low stretch matter most — stabilising soft soil and reinforcing embankments. Use non-woven where water must pass through: filtration, drainage and protection.",
      },
    ],
  },
  {
    slug: "geogrid",
    code: "GG",
    name: "Geogrid",
    seoTitle: "Geogrid Supplier in India — Biaxial and Uniaxial Geogrids",
    metaDescription:
      "Biaxial and uniaxial geogrids for base reinforcement, reinforced soil walls and steep slopes. Supplied with non-woven geotextile as a complete system.",
    summary: "Biaxial and uniaxial grids that lock aggregate and reinforce soil.",
    intro: [
      "Geogrids are open grids whose apertures interlock with aggregate. Biaxial grids stiffen road and yard bases; uniaxial grids carry tension in reinforced soil walls and steep slopes.",
    ],
    functions: ["Reinforcement", "Confinement"],
    highlights: [
      { title: "Biaxial", body: "Base reinforcement for roads, yards and platforms." },
      { title: "Uniaxial", body: "Primary reinforcement for walls and slopes." },
    ],
    specs: [{ label: "Types", value: "Biaxial / Uniaxial" }],
    applications: ["roads", "railways"],
    origin: "supplied",
    faqs: [],
  },
  {
    slug: "geocell",
    code: "GC",
    name: "Geocell",
    seoTitle: "Geocell Supplier in India — HDPE Cellular Confinement",
    metaDescription: "HDPE geocells for slope protection, channel lining and load support on weak soils.",
    summary: "3D honeycomb confinement for slopes, channels and weak ground.",
    intro: [
      "Geocells are expandable HDPE honeycombs filled on site with soil, aggregate or concrete. The cell walls confine the fill, increasing bearing capacity and holding soil on slopes.",
    ],
    functions: ["Confinement", "Erosion control", "Load support"],
    highlights: [{ title: "Slope protection", body: "Holds topsoil and vegetation on steep embankments." }],
    specs: [{ label: "Material", value: "HDPE" }],
    applications: ["roads", "coastal-riverbank"],
    origin: "supplied",
    faqs: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const manufactured = products.filter((p) => p.origin === "manufactured");
