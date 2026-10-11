import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { LayerStack } from "@/components/LayerStack";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { SeparationDemo } from "@/components/SeparationDemo";
import { applications } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";

const facts = [
  { value: "1995", label: "Incorporated in New Delhi" },
  { value: "150–1500", label: "GSM non-woven range" },
  { value: "5 m", label: "Maximum roll width" },
  { value: "EU", label: "Fully automated needle-punch lines" },
];

const homeFaqs = [
  {
    q: "What does Manas Geotextile manufacture?",
    a: "Needle-punched non-woven geotextiles in polypropylene and polyester from 150 to 1500 GSM and up to 5 m wide, PVC geomembranes for tunnel waterproofing, geo bags and custom-width pipe-wrap geotextile — at our factory in IMT Bawal, Haryana.",
  },
  {
    q: "Do you supply geotextile across India?",
    a: "Yes. We dispatch from Haryana to project sites across India. Share the site location and quantity for a delivered quote.",
  },
  {
    q: "How do I choose the right geotextile?",
    a: "Start with the function — separation, filtration, drainage, reinforcement or protection — then the GSM and strength your specification requires. Our GSM guide and calculator help, or send us your drawings and our engineers will recommend a grade.",
  },
];

export default function Home() {
  const made = products.filter((p) => p.origin === "manufactured");
  const supplied = products.filter((p) => p.origin === "supplied");

  return (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36">
        <Container className="grid gap-14 pb-20 lg:grid-cols-12 lg:gap-10 lg:pb-28">
          <div className="lg:col-span-6 lg:pt-6">
            <Reveal>
              <p className="eyebrow">Geotextile manufacturer · India · Since 1995</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-[clamp(2.6rem,6vw,5.4rem)] font-medium leading-[0.95] tracking-[-0.045em]">
                The geotextile that keeps roads <span className="text-muted">from failing.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead mt-8 max-w-lg">
                Needle-punched non-woven geotextile from 150 to 1500 GSM, PVC geomembranes and geo bags — made on
                European lines in Haryana for India&apos;s roads, railways, tunnels and coastlines.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/contact">Get a quote</ButtonLink>
                <ButtonLink href="/tools/geotextile-calculator" variant="ghost">Calculate quantity</ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal className="lg:col-span-6" delay={0.15}>
            <SeparationDemo />
          </Reveal>
        </Container>
      </section>

      {/* Facts */}
      <section className="border-y border-line">
        <Container>
          <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
            {facts.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05} className="bg-paper px-1 py-10 sm:px-6 lg:first:pl-0">
                <p className="text-4xl font-medium tracking-[-0.04em] tabular-nums md:text-6xl">{s.value}</p>
                <p className="mt-2 text-[15px] text-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-b border-line py-5" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-mono text-sm uppercase tracking-[0.18em] text-muted">
          {[0, 1].map((k) => (
            <div key={k} className="flex gap-12">
              {["Highways", "Railways", "Metro tunnels", "Landfills", "Riverbanks", "Coastlines", "Canals", "Drains", "Ports"].map((w) => (
                <span key={w} className="flex items-center gap-12">
                  {w} <span className="size-1.5 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <section className="py-24 md:py-36">
        <Container>
          <SectionHead
            eyebrow="01 — Products"
            title="Made in our own factory. Tested before it leaves."
            lead="Four product lines manufactured at IMT Bawal, plus the geosynthetics that complete the system."
            aside={<ButtonLink href="/products" variant="ghost">All products</ButtonLink>}
          />
          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {made.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 2) * 0.06} className="bg-paper">
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full min-h-80 flex-col justify-between p-8 transition-colors duration-500 hover:bg-ink hover:text-paper md:p-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-muted group-hover:text-accent">{p.code}</span>
                    <ArrowUpRight className="size-6 opacity-30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">{p.name}</h3>
                    <p className="mt-3 max-w-md text-ink-2 transition-colors duration-500 group-hover:text-paper/60">{p.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.highlights.slice(0, 3).map((h) => (
                        <span key={h.title} className="rounded-full border border-line px-3 py-1 text-[13px] transition-colors duration-500 group-hover:border-paper/20">
                          {h.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[15px] text-ink-2">
            Also supplied:{" "}
            {supplied.map((p, i) => (
              <span key={p.slug}>
                <Link href={`/products/${p.slug}`} className="underline decoration-line underline-offset-4 hover:decoration-ink">{p.name}</Link>
                {i < supplied.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </Container>
      </section>

      {/* Applications */}
      <section className="bg-paper-2 py-24 md:py-36">
        <Container>
          <SectionHead
            eyebrow="02 — Applications"
            title="Every structure has a layer you never see."
            lead="Here's where ours goes — and what it does there."
            aside={<ButtonLink href="/applications" variant="ghost">All applications</ButtonLink>}
          />
          <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.06} className="bg-paper-2">
                <Link href={`/applications/${a.slug}`} className="group flex h-full flex-col gap-8 p-8 transition-colors hover:bg-paper">
                  <div className="opacity-90 transition-opacity group-hover:opacity-100">
                    <LayerStack layers={a.layers} compact />
                  </div>
                  <div>
                    <h3 className="h3 flex items-center justify-between gap-4">
                      {a.name}
                      <ArrowUpRight className="size-5 shrink-0 text-muted transition-colors group-hover:text-accent" strokeWidth={1.5} />
                    </h3>
                    <p className="mt-2 text-[15px] text-ink-2">{a.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Calculator teaser */}
      <section className="py-24 md:py-36">
        <Container className="grid items-end gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">Free tool</p>
            <h2 className="h2 mt-6 text-balance">How much geotextile do you need?</h2>
            <p className="lead mt-6 max-w-xl">
              Enter your area, roll size and overlap. Get square metres, number of rolls and a suggested GSM in
              seconds — then a quote in one click.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:justify-self-end" delay={0.1}>
            <ButtonLink href="/tools/geotextile-calculator">Open the calculator</ButtonLink>
          </Reveal>
        </Container>
      </section>

      {/* Guides */}
      <section className="border-t border-line py-24 md:py-36">
        <Container>
          <SectionHead
            eyebrow="03 — Guides"
            title="Know exactly what to specify."
            aside={<ButtonLink href="/guides" variant="ghost">All guides</ButtonLink>}
          />
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {guides.slice(0, 3).map((g, i) => (
              <Reveal key={g.slug} delay={i * 0.06}>
                <Link href={`/guides/${g.slug}`} className="group block border-t border-ink pt-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{g.readingMinutes} min read</p>
                  <h3 className="h3 mt-4 transition-colors group-hover:text-accent">{g.title}</h3>
                  <p className="mt-3 text-ink-2">{g.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-24 md:pb-36">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Questions</p>
            <h2 className="h2 mt-6">Asked often.</h2>
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
