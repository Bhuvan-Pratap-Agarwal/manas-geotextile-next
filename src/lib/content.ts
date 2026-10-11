// TODO(content): spec ranges below are typical industry ranges used as
// placeholders. Replace with Manas's own datasheet values before launch.

export type Product = {
  slug: string;
  code: string;
  name: string;
  summary: string;
  description: string;
  functions: string[];
  specs: { label: string; value: string }[];
  applications: string[];
};

export const products: Product[] = [
  {
    slug: "non-woven-geotextile",
    code: "NW",
    name: "Non-woven Geotextile",
    summary: "Needle-punched polypropylene for separation, filtration and protection.",
    description:
      "Continuous-filament and staple-fibre needle-punched fabrics with high permeability and puncture resistance. The workhorse layer beneath roads, behind walls and over membranes.",
    functions: ["Separation", "Filtration", "Drainage", "Protection"],
    specs: [
      { label: "Polymer", value: "Polypropylene / Polyester" },
      { label: "Mass per unit area", value: "100 – 1000 g/m²" },
      { label: "Roll width", value: "Up to 6 m" },
      { label: "UV stabilised", value: "Yes" },
    ],
    applications: ["roads", "railways", "landfills", "retaining-walls"],
  },
  {
    slug: "woven-geotextile",
    code: "WV",
    name: "Woven Geotextile",
    summary: "High-modulus tape fabrics for reinforcement and stabilisation.",
    description:
      "Woven slit-film and multifilament fabrics delivering high tensile strength at low elongation — built for soft-soil stabilisation and basal reinforcement.",
    functions: ["Reinforcement", "Stabilisation", "Separation"],
    specs: [
      { label: "Polymer", value: "Polypropylene / Polyester" },
      { label: "Tensile strength", value: "20 – 200 kN/m" },
      { label: "Roll width", value: "Up to 5.2 m" },
      { label: "UV stabilised", value: "Yes" },
    ],
    applications: ["roads", "railways", "coastal"],
  },
  {
    slug: "geogrid",
    code: "GG",
    name: "Geogrid",
    summary: "Biaxial and uniaxial grids that interlock aggregate and soil.",
    description:
      "Polyester and polypropylene grids that confine granular fill, reduce base thickness and carry tensile load in reinforced-soil walls and steep slopes.",
    functions: ["Reinforcement", "Confinement"],
    specs: [
      { label: "Type", value: "Biaxial / Uniaxial" },
      { label: "Tensile strength", value: "20 – 400 kN/m" },
      { label: "Coating", value: "PVC / Bitumen" },
      { label: "Design life", value: "Up to 120 years" },
    ],
    applications: ["roads", "retaining-walls", "railways"],
  },
  {
    slug: "geocell",
    code: "GC",
    name: "Geocell",
    summary: "Three-dimensional HDPE cellular confinement.",
    description:
      "Honeycomb cells expanded on site and filled with soil, aggregate or concrete — stabilising slopes, channels and load-bearing platforms.",
    functions: ["Confinement", "Erosion control", "Load support"],
    specs: [
      { label: "Polymer", value: "HDPE" },
      { label: "Cell depth", value: "50 – 200 mm" },
      { label: "Surface", value: "Textured & perforated" },
      { label: "Weld", value: "Ultrasonic" },
    ],
    applications: ["roads", "canals", "coastal"],
  },
  {
    slug: "geomembrane",
    code: "GM",
    name: "HDPE Geomembrane",
    summary: "Impermeable liners for containment and waterproofing.",
    description:
      "Smooth and textured HDPE and LLDPE liners for landfills, ponds, canals and tunnels, with full welding and testing support.",
    functions: ["Barrier", "Containment", "Waterproofing"],
    specs: [
      { label: "Polymer", value: "HDPE / LLDPE" },
      { label: "Thickness", value: "0.5 – 3.0 mm" },
      { label: "Surface", value: "Smooth / Textured" },
      { label: "Roll width", value: "Up to 7 m" },
    ],
    applications: ["landfills", "canals", "tunnels"],
  },
  {
    slug: "drainage-composite",
    code: "DC",
    name: "Drainage Composite",
    summary: "Geonet cores bonded to filter fabric for in-plane flow.",
    description:
      "Geocomposite drains that replace thick granular layers behind walls, under slabs and in landfill caps — lighter, faster and more predictable.",
    functions: ["Drainage", "Filtration"],
    specs: [
      { label: "Core", value: "HDPE geonet" },
      { label: "Filter", value: "Non-woven, one or both faces" },
      { label: "Thickness", value: "5 – 10 mm" },
      { label: "Roll width", value: "Up to 4 m" },
    ],
    applications: ["retaining-walls", "landfills", "tunnels"],
  },
];

export type Application = {
  slug: string;
  name: string;
  summary: string;
  challenge: string;
  solution: string;
};

export const applications: Application[] = [
  {
    slug: "roads",
    name: "Roads & Highways",
    summary: "Thinner pavements, longer service life on weak subgrades.",
    challenge: "Soft subgrades pump fines into the base and rut under traffic.",
    solution: "A separation fabric plus geogrid or geocell keeps layers clean and spreads load.",
  },
  {
    slug: "railways",
    name: "Railways",
    summary: "Stable track geometry under cyclic heavy-axle loads.",
    challenge: "Ballast fouling and subgrade failure drive costly maintenance cycles.",
    solution: "Filter fabrics and grids isolate ballast and stiffen the formation.",
  },
  {
    slug: "landfills",
    name: "Landfills & Containment",
    summary: "Multi-layer barrier systems that meet regulation.",
    challenge: "Leachate must be contained for decades without leakage.",
    solution: "Geomembrane liners protected by heavy non-wovens with composite drainage.",
  },
  {
    slug: "canals",
    name: "Canals & Reservoirs",
    summary: "Lower seepage losses, protected embankments.",
    challenge: "Unlined channels lose water and erode at the banks.",
    solution: "Geomembrane lining with geocell-confined cover on slopes.",
  },
  {
    slug: "retaining-walls",
    name: "Retaining Walls & Slopes",
    summary: "Reinforced soil that replaces heavy concrete.",
    challenge: "Tall walls and steep slopes demand large, expensive structures.",
    solution: "Uniaxial geogrids with drainage composites build stable reinforced fills.",
  },
  {
    slug: "coastal",
    name: "Coastal & Marine",
    summary: "Erosion protection where land meets water.",
    challenge: "Wave action scours fine soils out from under revetments.",
    solution: "Woven filter fabrics and geotextile tubes hold soil in place.",
  },
  {
    slug: "tunnels",
    name: "Tunnels & Basements",
    summary: "Watertight envelopes below ground.",
    challenge: "Hydrostatic pressure finds every joint and crack.",
    solution: "Membrane liners with protection fleece and drainage layers.",
  },
];

// TODO(content): confirm these figures with the client.
export const stats = [
  { value: "25+", label: "Years in geosynthetics" },
  { value: "6", label: "Product families" },
  { value: "1,000+", label: "Projects supplied" },
  { value: "ISO", label: "Certified manufacturing" },
];

export const process = [
  { step: "01", title: "Brief", body: "Share drawings, soil data or a BOQ. We read it within one working day." },
  { step: "02", title: "Specify", body: "Our engineers recommend the product grade and give you datasheets." },
  { step: "03", title: "Manufacture", body: "Produced and tested in-house, with batch test certificates." },
  { step: "04", title: "Deliver", body: "Dispatched to site on schedule, with installation guidance." },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getApplication(slug: string) {
  return applications.find((a) => a.slug === slug);
}
