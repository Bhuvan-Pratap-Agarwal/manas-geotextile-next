import type { Block, Faq } from "./content-types";

export type Guide = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  readingMinutes: number;
  updated: string;
  blocks: Block[];
  faqs: Faq[];
  related: string[];
};

export const guides: Guide[] = [
  {
    slug: "what-is-geotextile",
    title: "What is geotextile? Types, functions and uses",
    seoTitle: "What is Geotextile? Types, Functions & Uses | Complete Guide",
    metaDescription:
      "Geotextile explained: what it is, how it's made, woven vs non-woven types, the five functions (separation, filtration, drainage, reinforcement, protection) and where it's used.",
    excerpt: "The plain-English guide to the fabric that sits under almost every modern road, railway and landfill.",
    readingMinutes: 7,
    updated: "2026-10-11",
    related: ["woven-vs-non-woven-geotextile", "geotextile-gsm-guide"],
    blocks: [
      {
        type: "p",
        text: "A geotextile is a permeable fabric made from synthetic polymers, usually polypropylene or polyester, that is placed in or on soil to improve how the ground behaves. It belongs to a wider family called geosynthetics, which also includes geogrids, geocells and geomembranes.",
      },
      {
        type: "p",
        text: "Geotextiles are now standard on roads, railways, landfills, tunnels, canals and coastal works because a few millimetres of fabric can replace hundreds of millimetres of graded aggregate and add years to the life of a structure.",
      },
      { type: "h2", text: "How geotextile is made" },
      {
        type: "list",
        items: [
          "Non-woven: staple fibres are carded into a web and locked together by barbed needles (needle-punching). The result looks and feels like felt.",
          "Woven: polymer tapes or yarns are woven on looms into a tight fabric, like a very strong sack material.",
          "Knitted: yarns are knitted together; used mainly as a component of other products.",
        ],
      },
      { type: "h2", text: "The five functions of geotextile" },
      {
        type: "table",
        head: ["Function", "What it does", "Example"],
        rows: [
          ["Separation", "Keeps two different soils from mixing", "Between road aggregate and clay subgrade"],
          ["Filtration", "Lets water through, holds soil back", "Around drain pipes, under rip-rap"],
          ["Drainage", "Carries water within the plane of the fabric", "Behind retaining walls, in tunnels"],
          ["Reinforcement", "Adds tensile strength to soil", "Embankments on soft ground"],
          ["Protection", "Cushions a membrane against puncture", "Above and below landfill liners"],
        ],
      },
      { type: "h2", text: "Where geotextile is used" },
      {
        type: "list",
        items: [
          "Roads and highways, subgrade separation and stabilisation",
          "Railways, formation filtration, preventing mud pumping",
          "Tunnels and metros, protection and drainage behind waterproofing membranes",
          "Landfills, geomembrane protection and leachate filtration",
          "Rivers and coasts, filters under armour and sand-filled geo bags",
          "Drainage, French drains, pipe wrapping, wall backfill",
        ],
      },
      { type: "h2", text: "Choosing the right geotextile" },
      {
        type: "p",
        text: "Start from the function. If water needs to pass through, choose non-woven. If the fabric must carry load with little stretch, choose woven. Then pick the weight (GSM) and strength required by your project specification and the relevant Indian Standard.",
      },
      {
        type: "callout",
        text: "Not sure what your project needs? Send us the drawing or BOQ and our engineers will recommend a grade.",
      },
    ],
    faqs: [
      {
        q: "What is geotextile in simple words?",
        a: "A strong, permeable fabric laid in the ground to separate, filter, drain, reinforce or protect soil in construction projects.",
      },
      {
        q: "What is geotextile made of?",
        a: "Mostly polypropylene (PP) or polyester (PET). Natural-fibre versions made of jute or coir are also used for short-term erosion control.",
      },
      {
        q: "What are the types of geotextile?",
        a: "The two main types are non-woven (needle-punched, felt-like, permeable) and woven (high strength, low stretch). Knitted geotextiles are less common.",
      },
    ],
  },
  {
    slug: "woven-vs-non-woven-geotextile",
    title: "Woven vs non-woven geotextile: which one do you need?",
    seoTitle: "Woven vs Non-Woven Geotextile | Differences, Uses & How to Choose",
    metaDescription:
      "Woven vs non-woven geotextile compared: strength, permeability, elongation, cost and typical uses. A simple decision guide for engineers and contractors.",
    excerpt: "Strength or flow? A side-by-side comparison and a 30-second decision rule.",
    readingMinutes: 5,
    updated: "2026-10-11",
    related: ["what-is-geotextile", "geotextile-gsm-guide"],
    blocks: [
      {
        type: "p",
        text: "Both are geotextiles, but they solve different problems. The quickest rule: woven for strength, non-woven for water.",
      },
      {
        type: "table",
        caption: "Woven vs non-woven at a glance",
        head: ["Property", "Woven", "Non-woven"],
        rows: [
          ["Manufacture", "Woven tapes or yarns", "Needle-punched fibres"],
          ["Look and feel", "Like a tight sack fabric", "Like thick felt"],
          ["Tensile strength", "High", "Moderate"],
          ["Elongation at break", "Low (stiff)", "High (stretches)"],
          ["Water flow (permittivity)", "Low", "High"],
          ["Main functions", "Stabilisation, reinforcement, separation", "Filtration, drainage, separation, protection"],
          ["Typical uses", "Soft-soil roads, railway stabilisation, embankments", "Drains, road separation, landfills, tunnels, geo bags"],
        ],
      },
      { type: "h2", text: "When to use woven geotextile" },
      {
        type: "list",
        items: [
          "Building over very soft, saturated subgrades",
          "Basal reinforcement of embankments",
          "Where the fabric must carry load with minimal deformation",
        ],
      },
      { type: "h2", text: "When to use non-woven geotextile" },
      {
        type: "list",
        items: [
          "Any drainage or filtration job, drains, wall backfill, pipe wrap",
          "Separation under roads and railways where water must escape",
          "Protecting geomembranes from puncture",
          "Geo bags and erosion control filters",
        ],
      },
      {
        type: "callout",
        text: "Non-woven geotextile accounts for the larger share of India's geotextile market because it covers the widest range of jobs.",
      },
    ],
    faqs: [
      {
        q: "Which is stronger, woven or non-woven geotextile?",
        a: "Woven geotextile has higher tensile strength and much lower elongation. Non-woven is stronger in puncture resistance per unit weight and far more permeable.",
      },
      {
        q: "Can non-woven geotextile be used under roads?",
        a: "Yes. Non-woven geotextile is widely used for subgrade separation under roads because it separates the layers while letting water drain out.",
      },
    ],
  },
  {
    slug: "geotextile-price-in-india",
    title: "Geotextile price in India: what drives the cost per square metre",
    seoTitle: "Geotextile Price in India (2026) | Cost per sq m, GSM & Factors",
    metaDescription:
      "What does geotextile cost in India? Typical non-woven price ranges per square metre by GSM, what affects the price, and how to get an accurate quote.",
    excerpt: "Why one roll costs twice another, and how to compare quotes properly.",
    readingMinutes: 5,
    updated: "2026-10-11",
    related: ["geotextile-gsm-guide", "bis-standards-for-geotextiles"],
    blocks: [
      {
        type: "p",
        text: "Geotextile is priced per square metre, and the biggest driver is weight (GSM): more fibre per square metre means more cost. But two fabrics of the same GSM can perform very differently, so the cheapest quote is not always the cheapest job.",
      },
      { type: "h2", text: "Typical market price ranges" },
      {
        type: "p",
        text: "In October 2026, Indian online marketplace listings for non-woven geotextile mostly ranged between roughly ₹10 and ₹30 per square metre, rising with GSM. These are asking prices from listings, not quotes, and exclude GST and freight.",
      },
      {
        type: "table",
        caption: "Indicative marketplace listings, non-woven geotextile (Oct 2026)",
        head: ["Grade", "Indicative listing range"],
        rows: [
          ["150 GSM", "≈ ₹14 – 26 / m²"],
          ["300 GSM", "≈ ₹20 – 25 / m²"],
          ["400 GSM", "≈ ₹25 – 30 / m²"],
          ["600 GSM and above", "Price on request"],
        ],
      },
      { type: "h2", text: "What affects the price" },
      {
        type: "list",
        items: [
          "GSM (mass per unit area), the single largest factor",
          "Polymer, polyester and polypropylene are priced differently",
          "Roll width, wider rolls reduce overlaps and waste on site",
          "Specification, tested strength, puncture and permeability values and BIS certification",
          "UV stabilisation and colour",
          "Order quantity and delivery location",
        ],
      },
      { type: "h2", text: "How to compare quotes" },
      {
        type: "list",
        ordered: true,
        items: [
          "Compare on the specification, not just GSM: tensile strength, CBR puncture and permeability.",
          "Ask for test certificates for the actual batch.",
          "Check whether the price includes GST, freight and unloading.",
          "Account for overlap: 300–500 mm laps add 10–15% to the area you buy.",
        ],
      },
      {
        type: "callout",
        text: "Use our free geotextile calculator to work out the area including overlaps, then ask us for a firm quote.",
      },
    ],
    faqs: [
      {
        q: "What is the price of geotextile per square metre in India?",
        a: "Marketplace listings for non-woven geotextile in India typically ranged around ₹10–30 per m² in October 2026, depending mainly on GSM. Project prices depend on specification, quantity and delivery location.",
      },
      {
        q: "Why is GSM important for geotextile price?",
        a: "GSM is the weight of fibre per square metre, so heavier fabric uses more raw material and costs more. It also broadly tracks strength and puncture resistance.",
      },
    ],
  },
  {
    slug: "geotextile-gsm-guide",
    title: "Geotextile GSM chart: which weight for which job",
    seoTitle: "Geotextile GSM Chart | Which GSM for Roads, Drains, Landfills & Tunnels",
    metaDescription:
      "Choose the right geotextile GSM: a simple chart from 100 to 1000 GSM with typical applications for drains, roads, railways, erosion control and geomembrane protection.",
    excerpt: "From 120 GSM pipe socks to 1000 GSM liner cushions, on one page.",
    readingMinutes: 4,
    updated: "2026-10-11",
    related: ["geotextile-price-in-india", "what-is-geotextile"],
    blocks: [
      {
        type: "p",
        text: "GSM, grams per square metre, is the weight of a geotextile. It is the easiest way to compare grades, and it broadly tracks thickness, strength and puncture resistance. Use this chart as a starting point; your specification sets the final grade.",
      },
      {
        type: "table",
        caption: "Non-woven geotextile GSM selection chart",
        head: ["GSM", "Typical applications"],
        rows: [
          ["100 – 150", "Pipe wrapping, light filtration, landscaping"],
          ["200", "French drains, subsurface drains, wall backfill filters"],
          ["250 – 300", "Road subgrade separation, geo bags, general filtration"],
          ["400 – 500", "Railway formations, riverbank filters, heavy-duty geo bags"],
          ["500 – 700", "Tunnel waterproofing protection layer (MGT-50 to MGT-70), canal and pond liners"],
          ["800 – 1000", "Landfill liner cushion, membranes over rough rock"],
        ],
      },
      { type: "h2", text: "GSM is not the whole story" },
      {
        type: "p",
        text: "Two fabrics of the same GSM can differ in tensile strength, puncture resistance and permeability depending on fibre, needling and finishing. Always specify the performance values, and ask for the test certificate.",
      },
    ],
    faqs: [
      {
        q: "What GSM geotextile is used for roads?",
        a: "250–300 GSM non-woven geotextile is common for subgrade separation on roads, with heavier grades for very soft ground or heavy construction traffic.",
      },
      {
        q: "What GSM geotextile is used for drainage?",
        a: "Around 150–200 GSM, which offers high water flow with good soil retention.",
      },
    ],
  },
  {
    slug: "bis-standards-for-geotextiles",
    title: "BIS standards and Quality Control Orders for geotextiles in India",
    seoTitle: "BIS Standards for Geotextiles in India | QCO, IS 16391, IS 16362, IRC:SP:59",
    metaDescription:
      "A guide to Indian standards for geotextiles: the Geotextiles Quality Control Order, IS 16391, IS 16362, IS 16090, IS 16392 and IRC:SP:59 for road pavements.",
    excerpt: "Which Indian Standard applies to your geotextile, and why BIS certification now matters.",
    readingMinutes: 5,
    updated: "2026-10-11",
    related: ["geotextile-price-in-india", "what-is-geotextile"],
    blocks: [
      {
        type: "p",
        text: "The Ministry of Textiles has brought geotextiles under mandatory Quality Control Orders (QCOs) issued under the BIS Act, 2016. For covered products, manufacturers need a BIS licence and the Standard Mark, and non-compliant material cannot be sold in India. Goods made for export are excluded.",
      },
      { type: "h2", text: "Key Indian Standards" },
      {
        type: "table",
        head: ["Standard", "Covers"],
        rows: [
          ["IS 16391", "Geotextiles for sub-grade separation in pavement structures"],
          ["IS 16362", "Geotextiles for sub-grade stabilisation in pavement structures"],
          ["IS 16090", "Geotextiles used as protection (cushioning) materials"],
          ["IS 16392", "Geotextiles for permanent erosion control in hard armour systems"],
          ["IRC:SP:59", "Guidelines for use of geosynthetics in road pavements"],
        ],
      },
      { type: "h2", text: "What this means for buyers" },
      {
        type: "list",
        items: [
          "Check that the product carries the BIS Standard Mark for the relevant IS where a QCO applies.",
          "Ask for the BIS licence number and batch test certificates.",
          "Specify the IS class in your tender, not just GSM.",
        ],
      },
      {
        type: "callout",
        text: "Standards and notification dates change, always confirm the current position on the BIS and Ministry of Textiles websites before tendering.",
      },
    ],
    faqs: [
      {
        q: "Is BIS certification mandatory for geotextiles in India?",
        a: "For geotextiles covered by the Ministry of Textiles' Quality Control Orders, yes, products must carry the BIS Standard Mark under a licence. Check the current notification for the product and use.",
      },
      {
        q: "Which IS code applies to geotextile for road separation?",
        a: "IS 16391 covers geotextiles for sub-grade separation in pavement structures. IRC:SP:59 gives the design guidance for geosynthetics in roads.",
      },
    ],
  },
  {
    slug: "how-to-install-geotextile",
    title: "How to install geotextile: step by step",
    seoTitle: "How to Install Geotextile Fabric | Step-by-Step Guide",
    metaDescription:
      "How to lay geotextile correctly: site preparation, unrolling, overlaps, joints, anchoring and cover. Avoid the common mistakes that cause failures.",
    excerpt: "Good fabric laid badly fails. Seven steps to get it right first time.",
    readingMinutes: 4,
    updated: "2026-10-11",
    related: ["what-is-geotextile", "geotextile-gsm-guide"],
    blocks: [
      { type: "h2", text: "Steps" },
      {
        type: "list",
        ordered: true,
        items: [
          "Prepare the surface: remove sharp stones, roots and debris; fill ruts and grade to level.",
          "Unroll the geotextile in the direction of construction traffic, smooth and without wrinkles.",
          "Overlap adjacent rolls, typically 300 mm on firm ground and 500 mm or more on soft ground, or sew the joints.",
          "Shingle the overlaps so the following layer is pushed over, not under, the edge.",
          "Pin or weight the fabric to stop wind lifting it.",
          "Place cover material by end-tipping from the laid fill, never drive directly on the fabric.",
          "Spread and compact the first lift to at least the minimum cover thickness before trafficking.",
        ],
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "list",
        items: [
          "Overlaps too short on soft ground",
          "Driving tracked plant directly on the fabric",
          "Leaving fabric exposed to sunlight for weeks",
          "Dropping large stones from height onto light grades",
        ],
      },
    ],
    faqs: [
      {
        q: "How much should geotextile overlap?",
        a: "Typically 300 mm on firm ground and 500 mm or more on soft ground, or as specified. Sewn joints can be used where overlaps are impractical.",
      },
      {
        q: "Can geotextile be left exposed to sunlight?",
        a: "Only briefly. Even UV-stabilised fabric should be covered as soon as practical, ideally within a few days.",
      },
    ],
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
