import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ClientLogos } from "@/components/ClientLogos";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SeparationDemo } from "@/components/SeparationDemo";
import { applications } from "@/lib/applications";
import { products } from "@/lib/products";
import { events, projects } from "@/lib/projects";
import { site, tel } from "@/lib/site";

const facts = [
  { value: "1996", label: "Founders working in Indian infrastructure since" },
  { value: "250 t", label: "Non-woven geotextile made every month" },
  { value: "100–1000", label: "GSM, in polypropylene and polyester" },
  { value: "ISO 9001", label: "and ISO 14001 certified, CE marked" },
];

const homeFaqs = [
  {
    q: "What does Manas Geo Tech make?",
    a: "Needle-punched non-woven geotextile in polypropylene (MGT, 120 to 1000 GSM) and polyester (M-Geo, 100 to 1000 GSM), PVC tunnel waterproofing membrane, geo bags, drainage geocomposite and narrow-width pipe wrap fabric. Everything is made at our plant in IMT Bawal, Haryana.",
  },
  {
    q: "Can you deliver to my site?",
    a: "Yes. We dispatch from Bawal to sites all over India, and have sales offices in New Delhi, Mumbai and Bengaluru. Tell us the site location and quantity and we'll quote a delivered price.",
  },
  {
    q: "Do you give test certificates?",
    a: "Every batch is tested in our in-house lab for wide-width tensile strength, thickness, CBR puncture and cone drop, and the results go with the material. Full datasheets are on the downloads page.",
  },
  {
    q: "How quickly can you quote?",
    a: "Send the specification or BOQ on WhatsApp or through the form. If you're not sure which grade you need, tell us the application and we'll recommend one.",
  },
];

export default function Home() {
  const made = products.filter((p) => p.origin === "manufactured");
  // Certificates already appear in the proof band, so show site photos here.
  const homeProjects = projects.filter((p) => !p.image.includes("/cert-")).slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="pt-24 md:pt-[108px]">
        <Container className="grid items-center gap-10 py-10 md:py-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal immediate>
              <p className="eyebrow">Geotextile manufacturer · New Delhi &amp; IMT Bawal</p>
              <h1 className="display mt-4 text-balance text-navy">
                Made in Haryana. Laid under India&apos;s roads, railways and tunnels.
              </h1>
            </Reveal>
            <Reveal immediate delay={0.05}>
              <p className="lead mt-6 max-w-xl">
                We make non-woven geotextile from 100 to 1000 GSM and PVC tunnel waterproofing membrane at our own
                plant. Contractors like L&amp;T, Afcons and Patel Engineering have used it on highways, ports and the
                Kashmir rail link.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Get a quote</ButtonLink>
                <ButtonLink href="/downloads" variant="outline">Download datasheets</ButtonLink>
              </div>
              <p className="mt-5 text-[15px] text-muted">
                Prefer to talk?{" "}
                <a href={tel(site.contact.mobile)} className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
                  {site.contact.mobile}
                </a>
              </p>
            </Reveal>
          </div>
          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[4px]">
              <Image
                src="/images/tunnel-pvc-green.jpg"
                alt="Tunnel lined with Manas PVC waterproofing membrane over geotextile"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <Link
              href="/projects#usbrl-tunnel-t15"
              className="absolute -bottom-6 left-4 right-4 flex items-center gap-4 rounded-[4px] border border-line bg-white p-4 shadow-[0_12px_30px_rgba(15,27,45,0.12)] transition-colors hover:border-accent sm:left-auto sm:right-6 sm:w-[340px]"
            >
              <Image src="/images/cert-patel-usbrl-t15.jpg" alt="" width={56} height={79} className="h-[72px] w-auto rounded-[2px] border border-line" />
              <span className="text-[14px] leading-snug">
                <span className="block font-semibold text-navy">Performance certificate</span>
                <span className="text-ink-2">Patel Engineering, Tunnel T15 of the Udhampur–Srinagar–Baramulla rail link</span>
              </span>
            </Link>
          </div>
        </Container>
        <Container className="mt-8 md:mt-4">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line py-10 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.value}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-4xl font-bold tracking-[-0.02em] text-navy [font-stretch:92%] md:text-5xl">{f.value}</span>
                  <span className="mt-2 block max-w-[22ch] text-[15px] text-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Clients */}
      <section className="bg-paper-2 py-14">
        <Container>
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h2 className="text-lg font-semibold text-navy">Supplied to India&apos;s leading contractors</h2>
            <Link href="/projects#clients" className="text-[15px] font-semibold text-accent-ink hover:text-navy">See all 30 clients</Link>
          </div>
          <ClientLogos limit={12} />
        </Container>
      </section>

      {/* Products */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Products"
            title="Everything here is made at our plant in Bawal"
            lead="One supplier for the separation layer, the tunnel membrane, the geo bags and the drain."
            aside={<ButtonLink href="/products" variant="outline">All products</ButtonLink>}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {made.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05} className={i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}>
                <Link href={`/products/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-line bg-white transition-colors hover:border-accent">
                  <div className={`relative overflow-hidden bg-paper-2 ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[16/10]"}`}>
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <div className="p-6">
                    <p className="spec text-[13px] text-accent-ink">{p.code}</p>
                    <h3 className="h3 mt-1 text-navy">{p.name}</h3>
                    <p className="mt-2 text-[15px] text-ink-2">{p.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Proof: T15 */}
      <section className="bg-navy text-white">
        <Container className="grid items-center gap-12 py-20 md:py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow !text-sky">From our customers</p>
            <blockquote className="mt-5">
              <p className="text-balance text-2xl font-medium leading-snug md:text-[2rem]">
                &ldquo;They have maintained the quality of the material as per the desired standards and
                specifications. Their contribution in our project and the supply of quality material is highly
                appreciated.&rdquo;
              </p>
              <footer className="mt-6 text-[15px] text-white/75">
                <span className="font-semibold text-white">Patel Engineering Ltd.</span>, performance certificate for
                non-woven geotextile supplied to Tunnel T15, Udhampur–Srinagar–Baramulla Rail Link. 22 July 2022.
              </footer>
            </blockquote>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-white/75">
              The Kashmir rail link opened in June 2025. Our geotextile is part of tunnel T15, between Sangaldan and
              Reasi.
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-4 lg:col-span-5" delay={0.05}>
            <figure>
              <Image src="/images/cert-patel-usbrl-t15.jpg" alt="Patel Engineering performance certificate, 22 July 2022" width={885} height={1250} className="w-full rounded-[2px] bg-white" />
              <figcaption className="mt-2 text-[13px] text-white/70">Patel Engineering, USBRL T15</figcaption>
            </figure>
            <figure className="self-end">
              <Image src="/images/cert-patel-world-record.jpg" alt="Patel Infrastructure world record certificate awarded to Manas Geo Tech, 2 February 2021" width={885} height={660} className="w-full rounded-[2px] bg-white" />
              <figcaption className="mt-2 text-[13px] text-white/70">Patel Infrastructure, world-record paving, Feb 2021</figcaption>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* Demo */}
      <section className="py-20 md:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Why it matters</p>
            <h2 className="h2 mt-3 text-balance text-navy">A 2 mm fabric that saves the road above it</h2>
            <p className="lead mt-5">
              On clay or silt, traffic pushes the stone base into the soil and pumps mud up into the stone. The base
              loses strength and the road ruts. A layer of non-woven geotextile keeps the two apart and lets water
              out.
            </p>
            <p className="mt-4 text-ink-2">Drag the slider to see ten years of traffic, with and without it.</p>
            <div className="mt-8">
              <ButtonLink href="/applications/roads" variant="outline">Geotextile for roads</ButtonLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.05}>
            <div className="rounded-[4px] border border-line p-5 sm:p-8">
              <SeparationDemo />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Applications */}
      <section className="bg-paper-2 py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Applications"
            title="Where our geotextile goes"
            aside={<ButtonLink href="/applications" variant="outline">All applications</ButtonLink>}
          />
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.05}>
                <Link href={`/applications/${a.slug}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-white">
                    <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="h3 mt-4 text-navy group-hover:text-accent-ink">{a.name}</h3>
                  <p className="mt-1.5 text-[15px] text-ink-2">{a.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Manufacturing */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Manufacturing"
            title="European lines, our own lab, one plant"
            lead="Fibre is carded, needle-punched, thermo-calendered and wound into 5 m rolls at IMT Bawal. Every batch is tested before it leaves."
            aside={<ButtonLink href="/about" variant="outline">See the plant</ButtonLink>}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <Photo src="/images/plant-hall.jpg" alt="Needle-punching line inside the Manas plant at IMT Bawal" caption="Needle-punching line, IMT Bawal" ratio="4/3" sizes="(min-width: 640px) 33vw, 100vw" />
            <Photo src="/images/plant-carding.jpg" alt="High-speed carding machine" caption="High-speed carding machine for web formation" ratio="4/3" sizes="(min-width: 640px) 33vw, 100vw" />
            <Photo src="/images/plant-ramina-winder.jpg" alt="Ramina roll winder" caption="Ramina winder for even, tight rolls" ratio="4/3" sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
          <ul className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Indo-Italian know-how", "Technical collaboration on process and product."],
              ["In-house laboratory", "Wide-width tensile, thickness, CBR puncture and cone drop tests."],
              ["Certified", "ISO 9001:2015, ISO 14001:2015 and CE."],
              ["Own PVC plant", "Membrane extrusion next to the geotextile lines."],
            ].map(([t, b]) => (
              <li key={t}>
                <p className="font-semibold text-navy">{t}</p>
                <p className="mt-1 text-[15px] text-ink-2">{b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Projects */}
      <section className="bg-paper-2 py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Projects"
            title="On site, across India"
            lead="Photos from our customers' sites. Captions are from our project records."
            aside={<ButtonLink href="/projects" variant="outline">All projects</ButtonLink>}
          />
          <div className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {homeProjects.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.05}>
                <Link href={`/projects#${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-white">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  </div>
                  <h3 className="mt-4 text-[17px] font-semibold leading-snug text-navy group-hover:text-accent-ink">{p.title}</h3>
                  <p className="mt-1 text-[14px] text-muted">{p.where} · {p.product}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* People */}
      <section className="py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">The people behind Manas</p>
            <h2 className="h2 mt-3 text-balance text-navy">A family business, run by engineers and builders</h2>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {site.people.slice(0, 2).map((p) => (
                <li key={p.name} className="py-5">
                  <p className="font-semibold text-navy">{p.name}</p>
                  <p className="text-[14px] text-accent-ink">{p.role}</p>
                  <p className="mt-2 text-[15px] text-ink-2">{p.bio}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <Photo className="sm:row-span-2" src={events[0].image} alt={events[0].caption} caption={events[0].caption} ratio="3/4" sizes="(min-width: 1024px) 29vw, 50vw" />
            <Photo src={events[1].image} alt={events[1].caption} caption={events[1].caption} ratio="3/2" sizes="(min-width: 1024px) 29vw, 50vw" />
            <Photo src={events[2].image} alt={events[2].caption} caption={events[2].caption} ratio="3/2" sizes="(min-width: 1024px) 29vw, 50vw" />
          </div>
        </Container>
      </section>

      {/* Tools */}
      <section className="pb-20 md:pb-28">
        <Container className="grid gap-6 md:grid-cols-2">
          <Link href="/tools/geotextile-calculator" className="group rounded-[4px] border border-line p-8 transition-colors hover:border-accent md:p-10">
            <p className="eyebrow">Free tool</p>
            <h3 className="h2 mt-3 text-navy">How much geotextile do you need?</h3>
            <p className="mt-3 text-ink-2">Area, roll size and overlap in. Square metres, rolls and a suggested GSM out.</p>
            <p className="mt-6 font-semibold text-accent-ink group-hover:text-navy">Open the calculator →</p>
          </Link>
          <Link href="/downloads" className="group rounded-[4px] border border-line p-8 transition-colors hover:border-accent md:p-10">
            <p className="eyebrow">Downloads</p>
            <h3 className="h2 mt-3 text-navy">Datasheets and brochures</h3>
            <p className="mt-3 text-ink-2">MGT and M-Geo datasheets with ASTM values for every grade, plus the tunnel waterproofing brochure.</p>
            <p className="mt-6 font-semibold text-accent-ink group-hover:text-navy">Download PDFs →</p>
          </Link>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 className="h2 mt-3 text-navy">Before you order</h2>
          </div>
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
