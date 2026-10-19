import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { LayerStack } from "@/components/LayerStack";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
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

  const related = projects.filter((pr) => pr.application === a.slug).slice(0, 3);

  return (
    <>
      <section className="pt-24 md:pt-[108px]">
        <Container className="pt-8 md:pt-12">
          <Breadcrumbs items={[{ name: "Applications", path: "/applications" }, { name: a.name, path }]} />
          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal immediate className="lg:col-span-6">
              <p className="eyebrow">Application</p>
              <h1 className="display mt-3 text-balance text-navy">Geotextile for {a.name.toLowerCase()}</h1>
              <p className="lead mt-6 max-w-xl">{a.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?product=${a.products[0]}`}>Get a quote</ButtonLink>
                <ButtonLink href="/tools/geotextile-calculator" variant="outline">Calculate quantity</ButtonLink>
              </div>
            </Reveal>
            <Reveal immediate className="lg:col-span-6" delay={0.05}>
              <Photo src={a.image} alt={a.imageAlt} caption={a.imageAlt} ratio="4/3" priority sizes="(min-width: 1024px) 50vw, 100vw" />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-6">
            <Reveal>
              <h2 className="h3 text-navy">The problem</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{a.problem}</p>
            </Reveal>
            <Reveal>
              <h2 className="h3 text-navy">What the geotextile does</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{a.solution}</p>
            </Reveal>
            <Reveal>
              <h2 className="h3 text-navy">What you gain</h2>
              <ul className="mt-3 space-y-2 text-[17px] text-ink-2">
                {a.benefits.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
            {a.body.map((b) => (
              <Reveal key={b.heading}>
                <h2 className="h3 text-navy">{b.heading}</h2>
                <p className="mt-3 text-[17px] leading-relaxed text-ink-2">{b.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.05}>
            <div className="rounded-[4px] border border-line p-6 lg:sticky lg:top-32">
              <p className="text-[15px] font-semibold text-navy">Typical cross-section</p>
              <div className="mt-5">
                <LayerStack layers={a.layers} />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-paper-2 py-16 md:py-20">
          <Container>
            <h2 className="h2 text-navy">From our project records</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((pr) => (
                <Link key={pr.slug} href={`/projects#${pr.slug}`} className="group block">
                  <Photo src={pr.image} alt={pr.imageAlt} ratio="4/3" sizes="(min-width: 1024px) 33vw, 50vw" />
                  <p className="mt-3 font-semibold text-navy group-hover:text-accent-ink">{pr.title}</p>
                  <p className="text-[14px] text-muted">{pr.where} · {pr.product}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 md:py-20">
        <Container>
          <h2 className="h2 text-navy">Products for {a.name.toLowerCase()}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {prods.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="group overflow-hidden rounded-[4px] border border-line transition-colors hover:border-accent">
                <Photo src={p.image} alt={p.imageAlt} ratio="16/10" sizes="(min-width: 1024px) 25vw, 50vw" className="[&_div]:rounded-none" />
                <div className="p-5">
                  <h3 className="font-semibold text-navy group-hover:text-accent-ink">{p.name}</h3>
                  <p className="mt-1 text-[14px] text-ink-2">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {a.faqs.length > 0 && (
        <section className="border-t border-line py-16 md:py-20">
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

      <CtaBand />
    </>
  );
}
