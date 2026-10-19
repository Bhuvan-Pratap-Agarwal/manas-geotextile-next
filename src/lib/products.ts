import type { Faq } from "./content-types";

// Source: old manasgeotextile.com product pages, the MGT (polypropylene) and
// M-Geo (polyester) datasheets, and the company / PVC brochures.
// "supplied" lines are mentioned on the old site or in third-party listings
// but are not made at Bawal. TODO(content): confirm these with the client.

export type Datasheet = {
  id: string;
  title: string;
  note: string;
  download: string;
  grades: string[];
  rows: { property: string; method: string; unit: string; values: string[] }[];
};

export type Product = {
  slug: string;
  code: string;
  name: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  image: string;
  imageAlt: string;
  intro: string[];
  functions: string[];
  highlights: { title: string; body: string }[];
  specs: { label: string; value: string }[];
  datasheets?: Datasheet[];
  grades?: { head: string[]; rows: string[][] };
  applications: string[];
  faqs: Faq[];
  origin: "manufactured" | "supplied";
};

const MGT: Datasheet = {
  id: "mgt",
  title: "MGT: polypropylene non-woven geotextile",
  note: "100% virgin polypropylene, UV stabilised, thermo-calendered. Values are typical, MD/CD.",
  download: "/downloads/manas-mgt-polypropylene-geotextile-datasheet.pdf",
  grades: ["120", "150", "200", "250", "300", "350", "400", "500", "600", "700", "800", "1000"],
  rows: [
    { property: "Grab strength", method: "ASTM D4632", unit: "N", values: ["425", "580", "750", "860", "1180", "1250", "1410", "1750", "2050", "2300", "2700", "3250"] },
    { property: "Wide-width tensile strength", method: "ASTM D4595", unit: "kN/m", values: ["7.5", "9", "12", "14", "17", "20", "23", "28", "32", "36", "40", "48"] },
    { property: "Elongation at break", method: "ASTM D4595", unit: "%", values: Array(12).fill(">50") },
    { property: "Trapezoidal tear strength", method: "ASTM D4533", unit: "N", values: ["145", "180", "240", "300", "360", "425", "470", "650", "800", "950", "1100", "1400"] },
    { property: "Static puncture (CBR)", method: "ASTM D6241", unit: "N", values: ["1150", "1550", "2100", "2600", "3100", "3600", "4150", "5275", "6400", "7500", "8500", "11000"] },
    { property: "Permeability", method: "ASTM D4491", unit: "cm/s", values: ["0.22", "0.26", "0.26", "0.24", "0.21", "0.21", "0.21", "0.18", "0.16", "0.14", "0.10", "0.06"] },
    { property: "Flow rate", method: "ASTM D4491", unit: "l/m²/s", values: ["80", "70", "60", "50", "40", "35", "30", "30", "30", "30", "20", "20"] },
    { property: "Apparent opening size O95", method: "ASTM D4751", unit: "µm", values: ["100", "80", "80", "<75", "<75", "<75", "<75", "<75", "<75", "<75", "<75", "<75"] },
    { property: "Thickness at 2 kPa", method: "ASTM D5199", unit: "mm", values: ["0.9", "1.1", "1.5", "1.8", "2.1", "2.5", "2.9", "3.2", "3.7", "4.2", "4.6", "5.3"] },
    { property: "Roll size (width × length)", method: "", unit: "m", values: ["5×100", "5×100", "5×100", "5×100", "5×100", "5×100", "5×100", "5×50", "5×50", "5×50", "5×40", "5×25"] },
  ],
};

const MGEO: Datasheet = {
  id: "m-geo",
  title: "M-Geo: polyester non-woven geotextile",
  note: "Made from high-quality regenerated polyester. Values are typical.",
  download: "/downloads/manas-m-geo-polyester-geotextile-datasheet.pdf",
  grades: ["100", "120", "150", "200", "250", "300", "400", "500", "600", "800", "1000"],
  rows: [
    { property: "Wide-width tensile strength", method: "ASTM D4595", unit: "kN/m", values: ["3", "4", "5", "7", "9", "12", "16", "18", "20", "24", "29"] },
    { property: "Grab tensile strength", method: "ASTM D4632", unit: "N", values: ["220", "255", "310", "425", "520", "625", "830", "1000", "1120", "1380", "1700"] },
    { property: "Trapezoidal tear strength", method: "ASTM D4533", unit: "N", values: ["80", "95", "140", "185", "240", "280", "375", "485", "560", "750", "910"] },
    { property: "Puncture strength (CBR)", method: "ASTM D6241", unit: "N", values: ["650", "780", "970", "1300", "1500", "1750", "2250", "2470", "2950", "3350", "4000"] },
    { property: "Flow rate, 5 cm head", method: "ASTM D4491", unit: "l/m²/s", values: ["100", "90", "70", "60", "50", "40", "30", "30", "30", "20", "20"] },
    { property: "Apparent opening size", method: "ASTM D4751", unit: "µm", values: ["100", "100", "80", "80", "<75", "<75", "<75", "<75", "<75", "<75", "<75"] },
    { property: "Thickness", method: "", unit: "mm", values: ["0.9", "0.9", "1.1", "1.4", "1.7", "2.0", "2.5", "2.9", "3.4", "4.5", "5.6"] },
    { property: "Roll size (width × length)", method: "", unit: "m", values: ["5×100", "5×100", "5×100", "5×100", "5×100", "5×100", "5×100", "5×50", "5×50", "5×50", "5×50"] },
  ],
};

export const products: Product[] = [
  {
    slug: "non-woven-geotextile",
    code: "MGT",
    name: "Non-Woven Geotextile",
    seoTitle: "Non-Woven Geotextile Manufacturer in India | 100 to 1000 GSM, PP & PET",
    metaDescription:
      "Needle-punched non-woven geotextile in polypropylene (MGT) and polyester (M-Geo), 100 to 1000 GSM, 5 m rolls, tested to ASTM. Made at IMT Bawal, Haryana. Download the datasheet.",
    summary: "Needle-punched polypropylene and polyester fabric, 100 to 1000 GSM, in 5 m wide rolls.",
    image: "/images/line-fabric.jpg",
    imageAlt: "Needle-punched non-woven fabric coming off the line",
    intro: [
      "Our non-woven geotextile is made at Bawal on European needle-punching lines. Staple fibre is carded into a web, locked together by needles and thermo-calendered, then wound on a Ramina winder into 5 metre wide rolls.",
      "We make two families. MGT is 100% virgin polypropylene, UV stabilised with carbon black, from 120 to 1000 GSM. M-Geo is polyester, from 100 to 1000 GSM. Every batch is tested in our own lab before it is dispatched.",
    ],
    functions: ["Separation", "Filtration", "Drainage", "Cushion", "Reinforcement"],
    highlights: [
      { title: "12 PP grades", body: "MGT from 120 to 1000 GSM, so you can match the exact class in your contract." },
      { title: "5 m rolls", body: "Wide rolls mean fewer laps and less waste on highway formations." },
      { title: "Tested to ASTM", body: "Grab, tensile, CBR puncture, permeability and AOS for every grade." },
      { title: "Narrow widths too", body: "Slit from 0.1 m for pipe wrapping and strip pasting at site." },
    ],
    specs: [
      { label: "Polymer", value: "Polypropylene (MGT) or polyester (M-Geo)" },
      { label: "Process", value: "Needle-punched, thermo-calendered" },
      { label: "Weight", value: "100 to 1000 g/m²" },
      { label: "Roll width", value: "5 m standard, custom slit from 0.1 m" },
      { label: "UV protection", value: "Carbon black stabilised (PP)" },
      { label: "Testing", value: "In-house lab, ASTM methods" },
    ],
    datasheets: [MGT, MGEO],
    grades: {
      head: ["GSM", "Typical use"],
      rows: [
        ["120 – 150", "Pipe socks, light filtration, MoRTH Section 700 Type 3 (MGT-15)"],
        ["200 – 300", "Road subgrade separation, drains, wall backfill, geo bags"],
        ["350 – 500", "Railway formations, riverbank and coastal filters, heavy geo bags"],
        ["500 – 700", "Tunnel waterproofing protection layer (MGT-50 to MGT-70)"],
        ["800 – 1000", "Landfill liner cushion, membranes over rough rock"],
      ],
    },
    applications: ["roads", "railways", "tunnels", "landfills", "coastal-riverbank", "drainage", "ports", "waterproofing"],
    origin: "manufactured",
    faqs: [
      {
        q: "What GSM non-woven geotextile do you make?",
        a: "Polypropylene (MGT) in 120, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800 and 1000 GSM, and polyester (M-Geo) from 100 to 1000 GSM. Other weights can be made to order.",
      },
      {
        q: "Which grade should I use?",
        a: "It depends on the job and your specification. As a starting point: 150 GSM for pipe socks and light filtration, 200 to 300 GSM for road separation, 400 to 500 GSM for rail and erosion work, and 500 GSM and above under membranes. Send us the spec and we'll confirm.",
      },
      {
        q: "What is the difference between PP and polyester geotextile?",
        a: "Polypropylene is lighter and very resistant to acids and alkalis. Polyester handles higher temperatures and has better long-term creep behaviour. Both are needle-punched the same way.",
      },
      {
        q: "Do you supply test certificates?",
        a: "Yes. Every batch is tested in our in-house laboratory (wide-width tensile, thickness, CBR puncture and cone drop) and the results go with the material.",
      },
    ],
  },
  {
    slug: "pvc-geomembrane",
    code: "PVC",
    name: "PVC Tunnel Waterproofing Membrane",
    seoTitle: "PVC Geomembrane for Tunnel Waterproofing | Manufacturer in India",
    metaDescription:
      "Manas PVC waterproofing membrane for tunnels and underground structures: over 300% elongation, Fire Class E, signal layer, hot-air welded seams. Supplied with 500 to 700 GSM protection geotextile.",
    summary: "Two-colour PVC sheet with a signal layer, over 300% elongation, welded on site.",
    image: "/images/tunnel-pvc-green.jpg",
    imageAlt: "Tunnel lined with PVC waterproofing membrane before the final concrete",
    intro: [
      "We worked in tunnel waterproofing for close to six years before setting up our own PVC membrane plant. The membrane goes between the shotcrete and the final concrete lining, over a layer of our non-woven geotextile.",
      "It is a single sheet with two colours: light on one side and black on the other. The light side shows any damage during installation, so it can be repaired before the concrete is poured. Elongation is over 300%, so the membrane moves with the structure instead of tearing.",
    ],
    functions: ["Waterproofing", "Barrier"],
    highlights: [
      { title: "Over 300% elongation", body: "Moves with the structure without splitting." },
      { title: "Signal layer", body: "The light face makes on-site damage easy to spot and fix." },
      { title: "Fire Class E", body: "Available to the reaction-to-fire class most tunnel specs ask for." },
      { title: "Welded seams", body: "Hot-air or wedge welded, then tested before the concrete goes in." },
    ],
    specs: [
      { label: "Material", value: "Plasticised PVC, two-colour with signal layer" },
      { label: "Elongation", value: "Over 300%" },
      { label: "Fire class", value: "Class E available" },
      { label: "Jointing", value: "Hot-air / hot-wedge welding" },
      { label: "Used with", value: "MGT-50 to MGT-70 protection geotextile (500 to 700 GSM)" },
      { label: "Standard", value: "Geotextile to EN 13256 for tunnels" },
    ],
    applications: ["tunnels", "waterproofing"],
    origin: "manufactured",
    faqs: [
      {
        q: "How is a tunnel waterproofed with PVC membrane?",
        a: "After excavation the rock is sprayed with shotcrete. Our non-woven geotextile is fixed to it with steel bolts and polymer discs, the PVC membrane is welded to those discs, the welds are tested, and then the final concrete ring is cast.",
      },
      {
        q: "Why is a geotextile needed under the membrane?",
        a: "It protects the membrane from sharp shotcrete and rock, and its in-plane permeability carries seepage water down to the side drains.",
      },
      {
        q: "What does the signal layer do?",
        a: "The membrane is light on one face and black on the other. Scratches and punctures show up clearly on the light face, so they can be repaired before the final lining is poured.",
      },
    ],
  },
  {
    slug: "geo-bags",
    code: "GB",
    name: "Geo Bags",
    seoTitle: "Geo Bags Manufacturer | Non-Woven Geotextile Bags for River & Coastal Protection",
    metaDescription:
      "Non-woven geo bags in 300 and 400 GSM polyester or polypropylene for riverbank, coastal and flood protection. Custom sizes, filled with local sand. Made in India.",
    summary: "300 and 400 GSM sand-filled bags for riverbanks, coasts and flood bunds.",
    image: "/images/geobags-north-east.jpg",
    imageAlt: "Sand-filled geo bags protecting a riverbank in North East India",
    intro: [
      "Geo bags are sewn from our non-woven geotextile and filled with sand at site. Laid along a riverbank or shoreline they form a flexible, permeable barrier that holds up against currents and waves.",
      "They have been used to build emergency flood embankments in several parts of India. Because they are filled with local sand, there is no need to truck in boulders, which keeps cost and time down.",
    ],
    functions: ["Erosion control", "Flood protection", "Scour protection"],
    highlights: [
      { title: "300 & 400 GSM", body: "Polyester or polypropylene, the two grades used most on river and coastal work." },
      { title: "Custom sizes", body: "Sized for manual filling or for placing by machine and barge." },
      { title: "Local sand", body: "No long haulage of rock. Fill with what is on site." },
      { title: "Reversible", body: "Can be repositioned or removed, unlike concrete or stone." },
    ],
    specs: [
      { label: "Fabric", value: "Non-woven geotextile, PET or PP" },
      { label: "Standard grades", value: "300 GSM and 400 GSM" },
      { label: "Sizes", value: "Standard and custom" },
      { label: "Fill", value: "Sand or soil, filled at site" },
    ],
    applications: ["coastal-riverbank", "ports"],
    origin: "manufactured",
    faqs: [
      {
        q: "What are geo bags used for?",
        a: "Riverbank and coastline protection, flood bunds, scour protection around bridge piers and temporary cofferdams.",
      },
      {
        q: "What sizes are available?",
        a: "We make standard sizes and custom sizes to suit the design and how the bags will be placed. Tell us the dimensions or the filled weight you need.",
      },
    ],
  },
  {
    slug: "drainage-geocomposite",
    code: "GCD",
    name: "Drainage Geocomposite",
    seoTitle: "Drainage Geocomposite for RE Walls | Manas Geo Tech",
    metaDescription:
      "Manas drainage geocomposite: a drainage core wrapped in non-woven geotextile. Replaces graded filter layers behind RE walls and under slabs. Lighter, faster to lay, does not clog.",
    summary: "A drainage core inside a non-woven filter jacket. Replaces graded filter behind RE walls.",
    image: "/images/re-wall-geocomposite.jpg",
    imageAlt: "Drainage geocomposite installed at an RE wall project in North India",
    intro: [
      "Behind a reinforced earth wall, water pressure must stay low. A conventional graded filter can clog over the years and is getting harder to source in many areas.",
      "Our geocomposite has an inner core that carries water and an outer jacket of non-woven geotextile that filters the soil. It is light, quick to lay, and protects the drainage path for the life of the wall.",
    ],
    functions: ["Drainage", "Filtration", "Protection"],
    highlights: [
      { title: "Replaces filter media", body: "No graded stone filter needed behind the wall." },
      { title: "Light to handle", body: "Rolls are carried and laid by hand." },
      { title: "Won't clog", body: "The geotextile jacket keeps fines out of the core." },
    ],
    specs: [
      { label: "Core", value: "Drainage core" },
      { label: "Filter", value: "Non-woven geotextile jacket" },
      { label: "Typical use", value: "RE walls, retaining walls, under slabs" },
    ],
    applications: ["re-walls", "drainage"],
    origin: "manufactured",
    faqs: [
      {
        q: "Why use a geocomposite instead of a graded filter?",
        a: "It is cheaper to install, does not clog the way a graded filter can, is far lighter to handle, and good filter material is scarce in many regions.",
      },
    ],
  },
  {
    slug: "pipe-wrap-geotextile",
    code: "PW",
    name: "Pipe Wrap Geotextile",
    seoTitle: "Geotextile for Perforated PVC Pipe Wrapping | Custom Width 0.1 to 5 m",
    metaDescription:
      "Non-woven geotextile slit to custom widths from 0.1 m to 5 m for wrapping perforated PVC drain pipes (geotextile socks) and for pasting at site.",
    summary: "Slit to any width from 0.1 m for pipe socks and site pasting.",
    image: "/images/pipe-sock.jpg",
    imageAlt: "Perforated PVC pipe wrapped in Manas non-woven geotextile",
    intro: [
      "Wrapped around a perforated PVC pipe, our geotextile works as a sock: water passes freely, sand and silt stay out, and the drain does not choke.",
      "We slit the fabric to the exact width you need, from 0.1 m to 5 m, on automated machines. Narrow widths are also supplied for pasting at site, which saves cutting by hand and gives a cleaner finish.",
    ],
    functions: ["Filtration", "Drainage"],
    highlights: [
      { title: "0.1 to 5 m", body: "Cut to your pipe circumference for one-pass wrapping." },
      { title: "Machine-cut edges", body: "Uniform strips that paste cleanly at site." },
      { title: "MOQ 1000 m²", body: "Practical for site jobs and pipe factories alike." },
    ],
    specs: [
      { label: "Fabric", value: "Non-woven geotextile, PP or PET" },
      { label: "Width", value: "0.1 to 5 m, custom slit" },
      { label: "Minimum order", value: "1000 m²" },
    ],
    applications: ["drainage", "roads"],
    origin: "manufactured",
    faqs: [
      {
        q: "Why wrap drain pipes in geotextile?",
        a: "The fabric filters out sand and silt before they reach the perforations, so the pipe stays clear for decades.",
      },
    ],
  },
  {
    slug: "woven-geotextile",
    code: "WV",
    name: "Woven Geotextile",
    seoTitle: "Woven Geotextile for Railways and Roads | Manas Geo Tech",
    metaDescription: "High-strength woven geotextile for railway formations, soft-soil stabilisation and embankments, supplied by Manas Geo Tech.",
    summary: "High-strength, low-stretch fabric for stabilising soft ground.",
    image: "/images/railway-track.jpg",
    imageAlt: "Railway track",
    intro: [
      "Woven geotextile is made from polymer tapes woven into a tight, strong fabric. It stretches much less than non-woven, which makes it the right choice when the fabric has to carry load over soft ground.",
    ],
    functions: ["Stabilisation", "Reinforcement", "Separation"],
    highlights: [
      { title: "High tensile strength", body: "Carries load at low elongation." },
      { title: "Railway formations", body: "Used under ballast to stabilise weak subgrades." },
    ],
    specs: [{ label: "Polymer", value: "Polypropylene / polyester" }],
    applications: ["railways", "roads"],
    origin: "supplied",
    faqs: [],
  },
  {
    slug: "geogrid",
    code: "GG",
    name: "Geogrid",
    seoTitle: "Geogrid Supplier in India | Manas Geo Tech",
    metaDescription: "Geogrids supplied with Manas geotextile for railway track stabilisation, base reinforcement and RE walls.",
    summary: "Used with geotextile under railway tracks and in reinforced soil.",
    image: "/images/railway-track.jpg",
    imageAlt: "Railway track",
    intro: [
      "Geogrids interlock with aggregate and carry tension in soil. Used together with our geotextile under railway tracks, they add stabilisation and reinforcement to the formation.",
    ],
    functions: ["Reinforcement", "Confinement"],
    highlights: [{ title: "With geotextile", body: "Supplied as a system with the separation layer." }],
    specs: [{ label: "Types", value: "Biaxial / uniaxial" }],
    applications: ["railways", "roads"],
    origin: "supplied",
    faqs: [],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const manufactured = products.filter((p) => p.origin === "manufactured");
