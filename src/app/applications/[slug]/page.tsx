import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { MarkSeen, SeenBadge } from "@/components/Explored";
import { Faq } from "@/components/Faq";
import { LocalNav } from "@/components/LocalNav";
import { NextUp } from "@/components/NextUp";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { Reveal } from "@/components/Reveal";
import { ScrollLayers } from "@/components/ScrollLayers";
import { SeparationDemo } from "@/components/SeparationDemo";
import { applications, getApplication } from "@/lib/applications";
import { getProduct } from "@/lib/products";
import { projects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return applications.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const a = getApplication((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.seoTitle, description: a.metaDescription, path: `/applications/${a.slug}`, absoluteTitle: true });
}

export default async function ApplicationPage({ params }: Props) {
  const a = getApplication((await params).slug);
  if (!a) notFound();
  const path = `/applications/${a.slug}`;
  const prods = a.products.map(getProduct).filter((p) => p !== undefined);
  const related = projects.filter((pr) => pr.application === a.slug);
  const idx = applications.findIndex((x) => x.slug === a.slug);
  const next = applications[(idx + 1) % applications.length];

  const steps = [
    { title: "How it's built.", body: `A typical cross-section, from the surface down. Keep scrolling to see what each layer does.` },
    { title: "Where it goes wrong.", body: a.problem },
    { title: "Where Manas fits.", body: a.solution },
    { title: "What you get.", body: `${a.benefits.join(". ")}.` },
  ];

  const sections = [
    { id: "overview", label: "Overview" },
    { id: "inside", label: "Inside" },
    ...(related.length ? [{ id: "projects", label: "Projects" }] : []),
    { id: "products", label: "Products" },
    ...(a.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <MarkSeen path={path} />
      <LocalNav title={a.name} sections={sections} cta={{ href: `/contact?product=${a.products[0]}`, label: "Get a quote" }} />

      <section id="overview" className="scroll-mt-40 pt-24 md:pt-[108px]">
        <Container className="pt-6 md:pt-8">
          <Breadcrumbs items={[{ name: "Applications", path: "/applications" }, { name: a.name, path }]} />
          <div className="mx-auto mt-10 max-w-4xl text-center md:mt-14">
            <p className="eyebrow">Application</p>
            <h1 className="mt-4 text-balance text-[clamp(2.4rem,6vw,5.25rem)] font-bold leading-[0.98] tracking-[-0.035em] text-navy [font-stretch:90%]">
              Geotextile for {a.name.toLowerCase()}
            </h1>
            <p className="lead mx-auto mt-6 max-w-2xl text-balance">{a.summary}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={`/contact?product=${a.products[0]}`}>Get a quote</ButtonLink>
              <ButtonLink href="/tools/geotextile-calculator" variant="outline">Calculate quantity</ButtonLink>
            </div>
          </div>
          <figure className="mx-auto mt-12 max-w-5xl md:mt-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] bg-paper-2">
              <Image src={a.image} alt={a.imageAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
            </div>
            <figcaption className="mt-3 text-center text-[14px] text-muted">{a.imageAlt}</figcaption>
          </figure>
        </Container>
      </section>

      <div id="inside" className="scroll-mt-40 pt-10">
        <ScrollLayers layers={a.layers} steps={steps} label={`Inside ${a.name.toLowerCase()}`} />
      </div>

      {a.body.length > 0 && (
        <section className="py-16 md:py-20">
          <Container className="grid gap-10 md:grid-cols-2">
            {a.body.map((b) => (
              <Reveal key={b.heading}>
                <h2 className="h3 text-navy">{b.heading}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{b.text}</p>
              </Reveal>
            ))}
          </Container>
        </section>
      )}

      {a.slug === "roads" && (
        <section className="border-t border-line py-16 md:py-24">
          <Container className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="h2 text-navy">Ten years of traffic, with and without</h2>
              <p className="lead mt-4">Drag the slider and watch what happens to the stone base when nothing separates it from the clay.</p>
            </div>
            <div className="rounded-[8px] border border-line p-5 sm:p-8 lg:col-span-7">
              <SeparationDemo />
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section id="projects" className="scroll-mt-40 overflow-hidden bg-paper-2 py-16 md:py-24">
          <Container>
            <h2 className="h2 text-navy">On site</h2>
            <p className="lead mt-3">From our project records.</p>
            <div className="mt-4">
              <ProjectCarousel items={related} />
            </div>
          </Container>
        </section>
      )}

      <section id="products" className="scroll-mt-40 py-16 md:py-24">
        <Container>
          <h2 className="h2 text-navy">What to use</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {prods.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 0.04}>
                <Link href={`/products/${p.slug}`} className="group block overflow-hidden rounded-[8px] border border-line transition-colors hover:border-accent">
                  <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                    <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                    <SeenBadge path={`/products/${p.slug}`} className="absolute left-3 top-3" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-navy group-hover:text-accent-ink">{p.name}</h3>
                    <p className="mt-1 text-[14px] text-ink-2">{p.summary}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {a.faqs.length > 0 && (
        <section id="faq" className="scroll-mt-40 border-t border-line py-16 md:py-20">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Questions</p>
              <h2 className="h2 mt-3 text-navy">Common questions</h2>
            </div>
            <div className="lg:col-span-8">
              <Faq items={a.faqs} />
            </div>
          </Container>
        </section>
      )}

      <NextUp href={`/applications/${next.slug}`} kicker="Application" title={next.name} body={next.summary} image={next.image} />

      <CtaBand />
    </>
  );
}
