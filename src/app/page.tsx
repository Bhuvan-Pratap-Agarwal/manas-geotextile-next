import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { SectionHead } from "@/components/SectionHead";
import { StrataVisual } from "@/components/StrataVisual";
import { applications, process, products, stats } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 md:pt-40">
        <Container>
          <Reveal>
            <p className="eyebrow">Geosynthetics manufacturer · India</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-6 max-w-[14ch] text-balance">
              The layer that holds <span className="text-muted">infrastructure</span> together.
            </h1>
          </Reveal>
          <div className="mt-12 grid items-end gap-12 pb-20 lg:grid-cols-12 lg:pb-28">
            <Reveal className="lg:col-span-5" delay={0.1}>
              <p className="lead max-w-md">
                Woven and non-woven geotextiles, geogrids, geocells and geomembranes — manufactured, tested and
                specified for roads, railways, landfills and water.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/products">Explore products</ButtonLink>
                <ButtonLink href="/contact" variant="ghost">Talk to an engineer</ButtonLink>
              </div>
            </Reveal>
            <div className="lg:col-span-7">
              <StrataVisual />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-line">
        <Container>
          <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05} className="bg-paper px-1 py-10 sm:px-6 lg:first:pl-0">
              <p className="text-5xl font-medium tracking-[-0.04em] md:text-6xl">{s.value}</p>
              <p className="mt-2 text-[15px] text-muted">{s.label}</p>
            </Reveal>
          ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section className="py-24 md:py-36">
        <Container>
          <SectionHead
            eyebrow="01 — Products"
            title="Six product families. One standard of quality."
            lead="Every roll is produced in-house and shipped with batch test certificates."
            aside={<ButtonLink href="/products" variant="ghost">All products</ButtonLink>}
          />
          <div className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.06} className="bg-paper">
                <Link href={`/products/${p.slug}`} className="group flex h-full min-h-72 flex-col justify-between p-8 transition-colors duration-500 hover:bg-ink hover:text-paper">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-muted group-hover:text-accent">{p.code}</span>
                    <ArrowUpRight className="size-5 opacity-30 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="h3">{p.name}</h3>
                    <p className="mt-3 text-[15px] text-ink-2 transition-colors duration-500 group-hover:text-paper/60">{p.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Applications */}
      <section className="bg-paper-2 py-24 md:py-36">
        <Container>
          <SectionHead
            eyebrow="02 — Applications"
            title="Engineered for the ground you build on."
            aside={<ButtonLink href="/applications" variant="ghost">All applications</ButtonLink>}
          />
          <ul className="mt-16 border-t border-line">
            {applications.map((a, i) => (
              <li key={a.slug}>
                <Reveal delay={i * 0.03}>
                  <Link
                    href={`/applications#${a.slug}`}
                    className="group grid items-baseline gap-2 border-b border-line py-7 md:grid-cols-12"
                  >
                    <span className="font-mono text-sm text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-2xl font-medium tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-2 md:col-span-5 md:text-3xl">
                      {a.name}
                    </span>
                    <span className="text-ink-2 md:col-span-5">{a.summary}</span>
                    <ArrowUpRight className="hidden size-5 justify-self-end text-muted transition-colors group-hover:text-accent md:col-span-1 md:block" strokeWidth={1.5} />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24 md:py-36">
        <Container>
          <SectionHead eyebrow="03 — How we work" title="From soil report to site delivery." />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06} className="border-t border-ink pt-6">
                <p className="font-mono text-sm text-accent">{p.step}</p>
                <h3 className="h3 mt-6">{p.title}</h3>
                <p className="mt-3 text-ink-2">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
