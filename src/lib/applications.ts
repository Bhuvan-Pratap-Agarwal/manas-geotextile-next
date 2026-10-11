import type { Faq } from "./content-types";

export type Layer = { label: string; kind: "asphalt" | "aggregate" | "geo" | "soil" | "membrane" | "concrete" | "water" | "sand" };

export type Application = {
  slug: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  problem: string;
  solution: string;
  benefits: string[];
  layers: Layer[];
  body: { heading: string; text: string }[];
  products: string[];
  faqs: Faq[];
};

export const applications: Application[] = [
  {
    slug: "roads",
    name: "Roads & Highways",
    seoTitle: "Geotextile for Road Construction — Subgrade Separation & Stabilisation",
    metaDescription:
      "How geotextile is used in road construction: separation of subgrade and aggregate, filtration and stabilisation. Grades, standards (IRC:SP:59, IS 16391) and supply across India.",
    summary: "Keep aggregate clean, spread load and extend pavement life on weak subgrades.",
    problem:
      "On clay and silty subgrades, traffic pushes aggregate down into the soil and pumps fines up into the base. The granular layer loses strength, the road ruts and potholes appear years early.",
    solution:
      "A non-woven geotextile laid on the subgrade keeps the two layers apart and lets water drain out. On very soft ground, a woven geotextile or geogrid adds stabilisation.",
    benefits: [
      "Granular base keeps its design thickness and strength",
      "Less aggregate lost into the subgrade",
      "Faster construction over wet or soft ground",
      "Longer interval between overlays",
    ],
    layers: [
      { label: "Bituminous surface", kind: "asphalt" },
      { label: "Granular base / sub-base", kind: "aggregate" },
      { label: "Non-woven geotextile", kind: "geo" },
      { label: "Subgrade", kind: "soil" },
    ],
    body: [
      {
        heading: "Which standards apply?",
        text: "In India, IRC:SP:59 is the guideline for geosynthetics in road pavements, covering separation, stabilisation, filtration and drainage. Geotextiles used for sub-grade separation are covered by IS 16391, and those for stabilisation by IS 16362. Check your contract specification for the required class.",
      },
      {
        heading: "Typical grades",
        text: "250–300 GSM non-woven geotextile is common for subgrade separation on highways. Heavier grades or woven fabric are used on very soft ground or under heavy construction traffic.",
      },
    ],
    products: ["non-woven-geotextile", "woven-geotextile", "geogrid", "pipe-wrap-geotextile"],
    faqs: [
      {
        q: "Why is geotextile used in road construction?",
        a: "To separate the granular base from the subgrade soil, filter water, and, on soft ground, stabilise the formation. This keeps the base layer at full strength and extends pavement life.",
      },
      {
        q: "Where is geotextile placed in a road?",
        a: "Directly on the prepared subgrade, below the granular sub-base. Rolls are laid with overlaps (typically 300–500 mm) or sewn joints.",
      },
    ],
  },
  {
    slug: "railways",
    name: "Railways",
    seoTitle: "Geotextile for Railway Track Formation — Ballast & Subgrade Protection",
    metaDescription:
      "Geotextile in railway formations keeps ballast clean, stops mud pumping and stabilises subgrade under heavy axle loads. Non-woven and woven grades for Indian Railways and metro projects.",
    summary: "Stop mud pumping and keep ballast clean under heavy, repeated axle loads.",
    problem:
      "Each passing wheel pumps water and fine soil up from the formation into the ballast. Fouled ballast drains poorly, loses its interlock and the track geometry deteriorates — driving constant maintenance.",
    solution:
      "A geotextile layer between blanket and subgrade filters the water, stops fines migrating and adds stability under cyclic loading.",
    benefits: ["Cleaner ballast for longer", "Fewer track geometry corrections", "Stable formation on weak soils", "Lower lifecycle maintenance"],
    layers: [
      { label: "Ballast", kind: "aggregate" },
      { label: "Blanket layer", kind: "sand" },
      { label: "Geotextile", kind: "geo" },
      { label: "Formation / subgrade", kind: "soil" },
    ],
    body: [
      {
        heading: "Typical grades",
        text: "400–500 GSM non-woven geotextile is common for filtration and separation in formations. Woven geotextile is used where the subgrade needs stabilisation.",
      },
    ],
    products: ["non-woven-geotextile", "woven-geotextile", "geogrid"],
    faqs: [
      {
        q: "What does geotextile do in a railway track?",
        a: "It separates the blanket or ballast from the formation soil, filters water and prevents mud pumping, which keeps ballast clean and track geometry stable.",
      },
    ],
  },
  {
    slug: "tunnels",
    name: "Tunnels & Metro",
    seoTitle: "Tunnel Waterproofing with PVC Geomembrane and Geotextile",
    metaDescription:
      "Tunnel waterproofing system: heavy non-woven geotextile protection and drainage layer with welded PVC geomembrane. For road, rail and metro tunnels.",
    summary: "A welded, testable waterproof envelope between primary and final lining.",
    problem:
      "Groundwater under pressure finds every joint and crack in a tunnel lining, causing leaks, corrosion of reinforcement and costly remediation.",
    solution:
      "A heavy non-woven geotextile is fixed to the shotcrete to cushion and drain, then a PVC geomembrane is welded over it to form a continuous waterproof barrier before the final lining is cast.",
    benefits: ["Continuous, welded barrier", "Seams can be pressure-tested", "Seepage drained to side drains", "Protects final lining from water ingress"],
    layers: [
      { label: "Final concrete lining", kind: "concrete" },
      { label: "PVC geomembrane", kind: "membrane" },
      { label: "Protection geotextile", kind: "geo" },
      { label: "Shotcrete / rock", kind: "soil" },
    ],
    body: [
      {
        heading: "Typical system",
        text: "500–1000 GSM non-woven protection geotextile, PVC geomembrane with double-track welded seams, and compartment or waterstop details as specified by the designer.",
      },
    ],
    products: ["pvc-geomembrane", "non-woven-geotextile"],
    faqs: [
      {
        q: "How are tunnels waterproofed?",
        a: "Most modern drained tunnels use a protection geotextile fixed to the primary lining, a welded PVC or similar geomembrane over it, and then the cast-in-place final lining.",
      },
    ],
  },
  {
    slug: "landfills",
    name: "Landfills & Containment",
    seoTitle: "Geotextile for Landfills — Geomembrane Protection & Leachate Filtration",
    metaDescription:
      "Heavy non-woven geotextiles protect landfill geomembranes from puncture and filter leachate drainage layers. Grades from 600 to 1500 GSM.",
    summary: "Protect the liner, filter the leachate, keep the barrier intact for decades.",
    problem:
      "Landfill liners must stay intact for decades under heavy waste loads. Sharp stones in drainage layers and subgrade can puncture the geomembrane, and leachate drains clog with fines.",
    solution:
      "Heavy non-woven geotextiles cushion the geomembrane above and below, while lighter grades filter the leachate collection layer.",
    benefits: ["Puncture protection for liners", "Filtered, long-life leachate drains", "Supports regulatory compliance"],
    layers: [
      { label: "Waste", kind: "soil" },
      { label: "Drainage gravel", kind: "aggregate" },
      { label: "Protection geotextile", kind: "geo" },
      { label: "Geomembrane liner", kind: "membrane" },
      { label: "Compacted clay", kind: "soil" },
    ],
    body: [],
    products: ["non-woven-geotextile", "pvc-geomembrane"],
    faqs: [
      {
        q: "What GSM geotextile protects a landfill geomembrane?",
        a: "Typically 600 GSM and above, selected by puncture calculations based on the drainage stone size and waste height.",
      },
    ],
  },
  {
    slug: "coastal-riverbank",
    name: "Coastal & Riverbank Protection",
    seoTitle: "Geo Bags and Geotextile for Riverbank & Coastal Erosion Protection",
    metaDescription:
      "Geotextile filters and sand-filled geo bags protect riverbanks, coastlines and bridge piers from erosion and scour. 300–500 GSM non-woven grades.",
    summary: "Hold soil in place where water moves fastest.",
    problem:
      "Waves and currents wash fine soil out from under stone revetments and from riverbanks, leading to slumping, breaches and loss of land.",
    solution:
      "A non-woven geotextile filter under the armour layer retains the soil while relieving water pressure. Sand-filled geo bags build flexible revetments and bunds with local material.",
    benefits: ["Soil retained under armour", "Flexible, self-adjusting protection", "Uses local sand fill", "Lower carbon than rock or concrete"],
    layers: [
      { label: "Geo bags / rock armour", kind: "sand" },
      { label: "Filter geotextile", kind: "geo" },
      { label: "Bank soil", kind: "soil" },
      { label: "Water", kind: "water" },
    ],
    body: [
      {
        heading: "Standards",
        text: "Geotextiles for permanent erosion control in hard armour systems are covered by IS 16392.",
      },
    ],
    products: ["geo-bags", "non-woven-geotextile", "geocell"],
    faqs: [
      {
        q: "How do geo bags prevent erosion?",
        a: "Filled with sand, they form heavy, flexible units that resist wave and current forces while their permeable fabric relieves water pressure and retains soil.",
      },
    ],
  },
  {
    slug: "drainage",
    name: "Drainage & Filtration",
    seoTitle: "Geotextile for Drainage — French Drains, Pipe Wrap & Filter Fabric",
    metaDescription:
      "Non-woven filter geotextile for French drains, subsurface drains, retaining wall backfill and perforated pipe wrapping. Prevents clogging and extends drain life.",
    summary: "Drains that keep working — because the soil stays out.",
    problem: "Subsurface drains and wall backfills clog as fine soil migrates into the gravel and pipe, and water pressure builds up.",
    solution: "A non-woven filter geotextile wrapped around the drain or lining the trench keeps soil out while water flows freely.",
    benefits: ["Drains stay clear for decades", "Less gravel needed", "Lower water pressure behind walls"],
    layers: [
      { label: "Backfill soil", kind: "soil" },
      { label: "Filter geotextile", kind: "geo" },
      { label: "Drainage gravel", kind: "aggregate" },
      { label: "Perforated pipe", kind: "water" },
    ],
    body: [],
    products: ["pipe-wrap-geotextile", "non-woven-geotextile"],
    faqs: [
      {
        q: "What is the best geotextile for French drains?",
        a: "A non-woven geotextile of around 150–200 GSM, which balances high water flow with good soil retention.",
      },
    ],
  },
];

export const getApplication = (slug: string) => applications.find((a) => a.slug === slug);
