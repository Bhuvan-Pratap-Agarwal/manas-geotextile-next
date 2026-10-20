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
  image: string;
  imageAlt: string;
};

export const applications: Application[] = [
  {
    slug: "roads",
    name: "Roads & Highways",
    seoTitle: "Geotextile for Road Construction | Separation & Stabilisation",
    metaDescription:
      "How geotextile works in road construction: subgrade separation, filtration and stabilisation, IRC:SP:59 and IS 16391, grades and supply across India.",
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
    image: "/images/road-karnataka-mgt15.jpg",
    imageAlt: "MGT-15 geotextile laid on a road project in Karnataka",
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
    seoTitle: "Geotextile for Railway Track Formation & Ballast",
    metaDescription:
      "Geotextile keeps railway ballast clean, stops mud pumping and stabilises weak subgrade under heavy axle loads. Grades for Indian Railways and metro.",
    summary: "Stop mud pumping and keep ballast clean under heavy, repeated axle loads.",
    problem:
      "Each passing wheel pumps water and fine soil up from the formation into the ballast. Fouled ballast drains poorly, loses its interlock and the track geometry deteriorates, driving constant maintenance.",
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
    image: "/images/railway-track.jpg",
    imageAlt: "Railway track on ballast",
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
    image: "/images/tunnel-gantry.jpg",
    imageAlt: "Tunnel lined with PVC membrane, with the lining gantry in place",
    faqs: [
      {
        q: "How are tunnels waterproofed?",
        a: "Most modern drained tunnels use a protection geotextile fixed to the primary lining, a welded PVC or similar geomembrane over it, and then the cast-in-place final lining.",
      },
    ],
  },
  {
    slug: "landfills",
    name: "Landfills & Canals",
    seoTitle: "Geotextile for Landfills: Liner Protection & Filtration",
    metaDescription:
      "Heavy non-woven geotextiles protect landfill geomembranes from puncture and filter leachate drainage layers. Grades from 600 to 1000 GSM.",
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
    image: "/images/canal.jpg",
    imageAlt: "Lined water channel",
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
    seoTitle: "Geo Bags & Geotextile for Riverbank and Coastal Protection",
    metaDescription:
      "Geotextile filters and sand-filled geo bags protect riverbanks, coastlines and bridge piers from erosion and scour. 300–500 GSM non-woven grades.",
    summary: "Hold soil in place where water moves fastest.",
    problem:
      "Waves and currents wash fine soil out from under stone revetments and from riverbanks, leading to slumping, breaches and loss of land.",
    solution:
      "A non-woven geotextile filter under the armour layer retains the soil while relieving water pressure. Sand-filled geo bags build flexible revetments and bunds with local material.",
    benefits: ["Soil retained under armour", "Flexible, self-adjusting protection", "Uses local sand fill", "Used for emergency flood embankments"],
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
    image: "/images/geobags-north-east.jpg",
    imageAlt: "Geo bags protecting a riverbank in North East India",
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
    seoTitle: "Geotextile for Drainage: French Drains & Filter Fabric",
    metaDescription:
      "Non-woven filter geotextile for French drains, subsurface drains, retaining wall backfill and perforated pipe wrapping. Prevents clogging and extends drain life.",
    summary: "Drains that keep working, because the soil stays out.",
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
    image: "/images/subsurface-drainage-maharashtra.jpg",
    imageAlt: "Geotextile-wrapped perforated pipes on a subsurface drainage project in Maharashtra",
    faqs: [
      {
        q: "What is the best geotextile for French drains?",
        a: "A non-woven geotextile of around 150–200 GSM, which balances high water flow with good soil retention.",
      },
    ],
  },
  {
    slug: "ports",
    name: "Ports & Land Reclamation",
    seoTitle: "Geotextile for Ports: Soil Stabilisation & Reclamation",
    metaDescription:
      "Non-woven geotextile stabilises soft reclaimed soil under container yards and filters behind sea walls. Supplied to port and defence port projects.",
    summary: "Stabilise reclaimed ground so it carries heavy axle loads.",
    problem:
      "Port yards are often built on soft, reclaimed coastal soil. Under container handlers and heavy trucks the aggregate punches into the subgrade and the pavement fails early.",
    solution:
      "A non-woven geotextile between the subgrade and the granular layers stabilises the soil and raises its effective CBR, so the yard carries heavy axle loads. The same fabric filters behind sea walls, jetties and breakwaters.",
    benefits: ["Higher bearing on soft reclaimed soil", "Thinner granular layers", "Filter layer behind sea walls", "Faster reclamation works"],
    layers: [
      { label: "Paving / yard surface", kind: "concrete" },
      { label: "Granular base", kind: "aggregate" },
      { label: "Non-woven geotextile", kind: "geo" },
      { label: "Reclaimed soil", kind: "sand" },
    ],
    body: [
      {
        heading: "Where we've supplied",
        text: "Manas non-woven geotextile has been used for soil stabilisation on a major port project and on a defence port project in India.",
      },
    ],
    products: ["non-woven-geotextile", "geo-bags"],
    image: "/images/defence-port.jpg",
    imageAlt: "Manas geotextile used for soil stabilisation at a defence port project",
    faqs: [
      {
        q: "How does geotextile help in port construction?",
        a: "It separates soft reclaimed soil from the granular layers and stabilises the subgrade, so the yard can carry heavy axle loads from container handlers.",
      },
    ],
  },
  {
    slug: "waterproofing",
    name: "Roof & Building Waterproofing",
    seoTitle: "Geotextile for Roof Waterproofing: Protection Layer",
    metaDescription:
      "Non-woven geotextile protects roof and basement waterproofing coatings from damage and adds durability. Used on hotel and commercial projects in Delhi NCR.",
    summary: "Protect the waterproofing coat so it lasts as long as the building.",
    problem:
      "Waterproofing coatings on roofs and basements get damaged by foot traffic, screed, tiles and backfill, and then leak.",
    solution:
      "A non-woven geotextile laid over (or within) the waterproofing coat protects it from damage and reinforces it, which adds years to its life.",
    benefits: ["Protects the coating during construction", "Adds durability", "Easy to lay on large roofs"],
    layers: [
      { label: "Screed / tiles", kind: "concrete" },
      { label: "Protection geotextile", kind: "geo" },
      { label: "Waterproofing coating", kind: "membrane" },
      { label: "Roof slab", kind: "concrete" },
    ],
    body: [
      {
        heading: "Where it's been used",
        text: "Manas non-woven geotextile was used on the roof waterproofing of the Oberoi hotel in New Delhi and on other projects across Delhi NCR.",
      },
    ],
    products: ["non-woven-geotextile"],
    image: "/images/roof-oberoi.jpg",
    imageAlt: "Manas geotextile on the roof waterproofing of the Oberoi hotel, New Delhi",
    faqs: [
      {
        q: "Why use geotextile in roof waterproofing?",
        a: "It protects the waterproofing coat from damage by screed, tiles and site traffic, and reinforces it so it lasts longer.",
      },
    ],
  },
  {
    slug: "re-walls",
    name: "RE Walls & Slopes",
    seoTitle: "Geotextile & Geocomposite for RE Walls: Drainage Layer",
    metaDescription:
      "Non-woven geotextile and drainage geocomposite as the filter and drainage layer in reinforced earth (RE) walls, gabions and slope protection.",
    summary: "Keep water pressure off the wall and the fill where it belongs.",
    problem:
      "Water trapped behind a reinforced earth wall builds up pressure, and fine fill can wash out through the facing joints or gabions.",
    solution:
      "A non-woven geotextile or drainage geocomposite behind the facing filters the fill and drains the water, so pressure stays low and the fill stays in place.",
    benefits: ["Low pore water pressure", "No fines lost through the facing", "Replaces graded filter material", "Works with gabions and stone pitching"],
    layers: [
      { label: "Wall facing / gabion", kind: "concrete" },
      { label: "Geotextile or geocomposite", kind: "geo" },
      { label: "Reinforced fill", kind: "sand" },
      { label: "Retained soil", kind: "soil" },
    ],
    body: [],
    products: ["drainage-geocomposite", "non-woven-geotextile"],
    image: "/images/gabion-filter.jpg",
    imageAlt: "Non-woven geotextile used as a filter behind gabion boxes",
    faqs: [
      {
        q: "What does geotextile do in an RE wall?",
        a: "It works as the filter and drainage layer behind the facing, keeping the fill in place while letting water escape.",
      },
    ],
  },
];

export const getApplication = (slug: string) => applications.find((a) => a.slug === slug);
