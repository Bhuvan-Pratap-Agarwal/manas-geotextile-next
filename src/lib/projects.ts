// Every entry here comes from the old manasgeotextile.com "Case Studies" page
// captions, or from documents in the company's own brochures. Don't add a
// project, client name or number that can't be traced back to the client.

export type Project = {
  slug: string;
  title: string;
  where: string;
  product: string;
  application: string;
  image: string;
  imageAlt: string;
  note?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "usbrl-tunnel-t15",
    title: "Tunnel T15, Udhampur–Srinagar–Baramulla Rail Link",
    where: "Sangaldan, Jammu & Kashmir",
    product: "Non-woven geotextile",
    application: "tunnels",
    image: "/images/cert-patel-usbrl-t15.jpg",
    imageAlt: "Performance certificate from Patel Engineering Ltd for supply to USBRL Tunnel T15",
    note: "Supplied to Patel Engineering against several purchase orders. Performance certificate issued 22 July 2022. The rail link opened in June 2025.",
    featured: true,
  },
  {
    slug: "delhi-mumbai-expressway-world-record",
    title: "World-record concrete paving, Delhi–Mumbai Expressway",
    where: "Vadodara–Mumbai section, Gujarat",
    product: "Non-woven geotextile",
    application: "roads",
    image: "/images/cert-patel-world-record.jpg",
    imageAlt: "Patel Infrastructure certificate awarded to Manas Geo Tech for the world record on 2 February 2021",
    note: "Certificate from Patel Infrastructure for our contribution to four world records for pavement quality concrete laid in 24 hours, 2 February 2021.",
    featured: true,
  },
  {
    slug: "tunnel-waterproofing",
    title: "Tunnel waterproofing",
    where: "Road and rail tunnels",
    product: "PVC membrane + MGT geotextile",
    application: "tunnels",
    image: "/images/tunnel-pvc-green.jpg",
    imageAlt: "PVC waterproofing membrane installed over geotextile inside a tunnel",
    featured: true,
  },
  {
    slug: "oberoi-new-delhi",
    title: "Roof waterproofing, Oberoi hotel",
    where: "New Delhi",
    product: "Non-woven geotextile",
    application: "waterproofing",
    image: "/images/roof-oberoi.jpg",
    imageAlt: "Workers laying Manas geotextile on the roof of the Oberoi hotel, New Delhi",
    featured: true,
  },
  {
    slug: "defence-port",
    title: "Defence port project",
    where: "India",
    product: "Non-woven geotextile",
    application: "ports",
    image: "/images/defence-port.jpg",
    imageAlt: "Geotextile laid for soil stabilisation at a defence port project",
    note: "Soil stabilisation.",
    featured: true,
  },
  {
    slug: "coastal-north-east",
    title: "Coastal and riverbank protection",
    where: "North East India",
    product: "Non-woven geo bags",
    application: "coastal-riverbank",
    image: "/images/geobags-north-east.jpg",
    imageAlt: "Sand-filled geo bags along a riverbank in North East India",
    featured: true,
  },
  {
    slug: "karnataka-road",
    title: "Road project, MoRTH Section 700 Type 3",
    where: "Karnataka",
    product: "MGT-15, 150 GSM polypropylene",
    application: "roads",
    image: "/images/road-karnataka-mgt15.jpg",
    imageAlt: "MGT-15 geotextile laid on a road project in Karnataka",
  },
  {
    slug: "nh-extension",
    title: "National highway extension",
    where: "India",
    product: "Non-woven geotextile",
    application: "roads",
    image: "/images/nh-extension.jpg",
    imageAlt: "Roller compacting fill over geotextile on a national highway extension",
    note: "Soil stabilisation.",
  },
  {
    slug: "port-project",
    title: "Port project",
    where: "India",
    product: "Non-woven geotextile",
    application: "ports",
    image: "/images/port-stabilisation.jpg",
    imageAlt: "Geotextile laid over a large area for soil stabilisation at a port",
    note: "Soil stabilisation.",
  },
  {
    slug: "andhra-road",
    title: "Road project",
    where: "Andhra Pradesh",
    product: "Non-woven geotextile",
    application: "roads",
    image: "/images/road-andhra.jpg",
    imageAlt: "Geotextile laid for filtration and separation on a road project in Andhra Pradesh",
    note: "Filtration and separation.",
  },
  {
    slug: "road-north-east",
    title: "Road project",
    where: "North East India",
    product: "Non-woven geotextile",
    application: "roads",
    image: "/images/road-north-east.jpg",
    imageAlt: "Geotextile used for soil stabilisation on a road in North East India",
    note: "Soil stabilisation.",
  },
  {
    slug: "maharashtra-drainage",
    title: "Subsurface drainage",
    where: "Maharashtra",
    product: "Geotextile-wrapped perforated PVC pipes",
    application: "drainage",
    image: "/images/subsurface-drainage-maharashtra.jpg",
    imageAlt: "Workers laying geotextile-wrapped perforated pipes in Maharashtra",
  },
  {
    slug: "up-road-drainage",
    title: "Road drainage",
    where: "Uttar Pradesh",
    product: "Non-woven geotextile",
    application: "drainage",
    image: "/images/road-drainage-up.jpg",
    imageAlt: "Geotextile lining a road drainage trench in Uttar Pradesh",
  },
  {
    slug: "up-stone-pitching",
    title: "Filter below stone pitching",
    where: "Uttar Pradesh",
    product: "Non-woven geotextile",
    application: "coastal-riverbank",
    image: "/images/stone-pitching-up.jpg",
    imageAlt: "Geotextile used as a filter below stone pitching on an embankment",
  },
  {
    slug: "re-wall-north-india",
    title: "RE wall",
    where: "North India",
    product: "Drainage geocomposite",
    application: "re-walls",
    image: "/images/re-wall-geocomposite.jpg",
    imageAlt: "Manas geocomposite at an RE wall project in North India",
  },
  {
    slug: "slope-stabilisation",
    title: "Slope stabilisation",
    where: "India",
    product: "Non-woven geotextile",
    application: "re-walls",
    image: "/images/slope-filter.jpg",
    imageAlt: "Geotextile used as filter media on a steep slope",
  },
  {
    slug: "gabion-filter",
    title: "Filter behind gabion boxes",
    where: "India",
    product: "Non-woven geotextile",
    application: "re-walls",
    image: "/images/gabion-filter.jpg",
    imageAlt: "Geotextile used as filter media with gabion boxes",
  },
  {
    slug: "roof-delhi-ncr",
    title: "Roof waterproofing protection",
    where: "Delhi NCR",
    product: "Non-woven geotextile",
    application: "waterproofing",
    image: "/images/roof-delhi-ncr.jpg",
    imageAlt: "Geotextile protecting a waterproofing coat on a large roof in Delhi NCR",
  },
  {
    slug: "pipe-socks",
    title: "Socks over perforated PVC pipe",
    where: "India",
    product: "Pipe wrap geotextile",
    application: "drainage",
    image: "/images/pipe-sock.jpg",
    imageAlt: "Perforated PVC pipe in a geotextile sock",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

// From the old site's picture gallery. Captions only where the event is
// readable on the banner in the photo.
export const events = [
  {
    image: "/images/event-conference-2022.jpg",
    caption: "Presenting at the international conference on technical textiles, New Delhi, 12 March 2022",
  },
  { image: "/images/event-assam-wrd.jpg", caption: "Workshop for the Water Resources Department, Assam" },
  { image: "/images/event-stall.jpg", caption: "Manas stall at an infrastructure exhibition" },
];
