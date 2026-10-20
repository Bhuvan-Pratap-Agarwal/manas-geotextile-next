import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ClientLogos } from "@/components/ClientLogos";
import { CountUp } from "@/components/CountUp";
import { BuildRoadGame } from "@/components/BuildRoadGame";
import { FibreField } from "@/components/FibreField";
import { GradeFinder } from "@/components/GradeFinder";
import { IndiaMap } from "@/components/IndiaMap";
import { MakingStory } from "@/components/MakingStory";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ScrollLayers } from "@/components/ScrollLayers";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { applications } from "@/lib/applications";
import { products } from "@/lib/products";
import { events, projects } from "@/lib/projects";
import { site, tel } from "@/lib/site";

const facts: { value: React.ReactNode; label: string }[] = [
  { value: "1996", label: "Founders working in Indian infrastructure since" },
  { value: <CountUp to={250} suffix=" t" />, label: "Non-woven geotextile made every month" },
  { value: <CountUp to={1000} prefix="100–" />, label: "GSM, in polypropylene and polyester" },
  { value: <CountUp to={30} />, label: "Major contractors supplied, from L&T to Afcons" },
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
  const homeProjects = projects.filter((p) => !p.image.includes("/cert-") && p.slug !== "tunnel-waterproofing").slice(0, 10);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-24 md:pt-[108px]">
        <FibreField opacity={0.09} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.92)_30%,rgba(255,255,255,0)_75%)]" />
        <Container className="relative flex flex-col items-center pb-6 pt-14 text-center md:pt-24">
            <p className="eyebrow">Non-woven geotextile &amp; PVC membrane manufacturer · ISO 9001</p>
            <h1 className="mt-5 max-w-[18ch] text-balance text-[clamp(2.75rem,7.2vw,6.25rem)] font-bold leading-[0.98] tracking-[-0.035em] text-navy [font-stretch:90%]">
              Geotextile made in Haryana. <span className="text-accent">Laid under India&apos;s roads, railways and tunnels.</span>
            </h1>
          <Reveal immediate delay={0.1}>
            <p className="lead mx-auto mt-7 max-w-2xl">
              Needle-punched geotextile from 100 to 1000 GSM and PVC tunnel membrane, made at our own plant near
              Delhi and trusted by L&amp;T, Afcons and Patel Engineering.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/contact">Get a quote</ButtonLink>
              <ButtonLink href="/downloads" variant="outline">Download datasheets</ButtonLink>
            </div>
            <p className="mt-5 text-[15px] text-muted">
              Or call{" "}
              <a href={tel(site.contact.mobile)} className="font-semibold text-navy underline decoration-navy/30 underline-offset-4 hover:decoration-navy">
                {site.contact.mobile}
              </a>
            </p>
          </Reveal>
          <p className="mt-14 flex flex-col items-center gap-2 text-[14px] font-medium text-muted motion-reduce:hidden" aria-hidden>
            Scroll to look inside a road
            <span className="block h-8 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
          </p>
        </Container>
      </section>

      <ScrollLayers />

      <section className="pb-6">
        <Container>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-10 border-y border-line py-12 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block text-[clamp(2.4rem,5vw,4rem)] font-bold leading-none tracking-[-0.03em] text-navy [font-stretch:90%]">{f.value}</span>
                  <span className="mt-3 block max-w-[24ch] text-[15px] text-muted">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Game */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="eyebrow">Your turn</p>
            <h2 className="mt-3 text-[clamp(2.2rem,5vw,4rem)] font-bold leading-none tracking-[-0.03em] text-navy [font-stretch:90%]">Build a road.</h2>
            <p className="lead mt-4">Stack the layers from the ground up, then open it to ten years of traffic. Skip a layer if you dare.</p>
          </div>
          <BuildRoadGame />
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

      {/* Tunnel photos */}
      <section className="pb-20 md:pb-28">
        <Container>
          <div className="grid gap-4 md:grid-cols-5">
            <Reveal className="md:col-span-3">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-[6px] md:aspect-auto md:h-full md:min-h-[460px]">
                <Image src="/images/tunnel-pvc-green.jpg" alt="Tunnel lined with Manas PVC membrane over geotextile, before the final concrete" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-24 text-white md:p-8">
                  <p className="text-[13px] font-semibold text-sky">Tunnel waterproofing</p>
                  <p className="mt-1 max-w-md text-xl font-semibold leading-snug md:text-2xl">Our PVC membrane, welded over our geotextile, before the final concrete goes in.</p>
                </div>
              </div>
            </Reveal>
            <div className="grid gap-4 md:col-span-2">
              <Reveal delay={0.05}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[6px]">
                  <Image src="/images/tunnel-gantry.jpg" alt="Lining gantry inside a tunnel lined with PVC membrane" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-[6px]">
                  <Image src="/images/tunnel-fleece-discs.jpg" alt="Geotextile fixed to shotcrete with fastening discs" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
                  <p className="absolute bottom-3 left-3 rounded-[3px] bg-white/90 px-2.5 py-1 text-[13px] font-medium text-navy">Geotextile fixed with discs, ready for the membrane</p>
                </div>
              </Reveal>
            </div>
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

      {/* Grade finder */}
      <section className="bg-paper-2 py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Find your grade"
            title="Twelve weights. One will be right for your job."
            lead="Heavier fabric is stronger and more puncture resistant. Lighter fabric drains faster. Slide to see how the real numbers change."
          />
          <div className="mt-12">
            <GradeFinder />
          </div>
          <Link
            href="/products/non-woven-geotextile#zoom"
            className="group mt-6 grid overflow-hidden rounded-[10px] bg-navy text-white sm:grid-cols-5"
          >
            <div className="relative aspect-[16/9] sm:col-span-2 sm:aspect-auto sm:min-h-[200px]">
              <Image src="/images/line-fabric.jpg" alt="" fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]" />
            </div>
            <div className="flex flex-col justify-center p-7 sm:col-span-3 sm:p-10">
              <p className="text-[14px] font-semibold text-sky">Look closer</p>
              <p className="mt-2 text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-[-0.02em] [font-stretch:92%]">Zoom from a 5 m roll down to a single fibre.</p>
              <p className="mt-2 text-white/75">See what 300 grams of fabric is made of, and why soil can&apos;t get through it.</p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                Start zooming <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* Applications */}
      <section className="py-20 md:py-28">
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
      <section className="bg-paper-2 py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Manufacturing"
            title="European lines, our own lab, one plant"
            lead="Fibre is carded, needle-punched, thermo-calendered and wound into 5 m rolls at IMT Bawal. Every batch is tested before it leaves."
            aside={<ButtonLink href="/about" variant="outline">See the plant</ButtonLink>}
          />
          <div className="mt-8 lg:mt-4">
            <MakingStory />
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

      {/* Map */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHead eyebrow="Across India" title="From Kashmir to Karnataka" lead="Tap a pin. From our factory in Haryana to tunnels in the Himalaya and riverbanks in the North East." />
          <div className="mt-12">
            <IndiaMap />
          </div>
        </Container>
      </section>

      {/* Projects */}
      <section className="overflow-hidden py-20 md:py-28">
        <Container>
          <SectionHead
            eyebrow="Projects"
            title="On site, across India"
            lead="Photos from our customers' sites. Captions are from our project records."
            aside={<ButtonLink href="/projects" variant="outline">All projects</ButtonLink>}
          />
          <div className="mt-6">
            <ProjectCarousel items={homeProjects} />
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
