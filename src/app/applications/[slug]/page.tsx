import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { LayerStack } from "@/components/LayerStack";
import { Reveal } from "@/components/Reveal";
import { applications, getApplication } from "@/lib/applications";
import { getProduct } from "@/lib/products";
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

  return (
    <>
      <section className="pb-20 pt-28 md:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: "Applications", path: "/applications" }, { name: a.name, path }]} />
          <div className="mt-12 grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow">Application</p>
              <h1 className="display mt-6 text-balance">Geotextile for {a.name.toLowerCase()}</h1>
              <p className="lead mt-8 max-w-xl">{a.summary}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?product=${a.products[0]}`}>Get a quote</ButtonLink>
                <ButtonLink href="/tools/geotextile-calculator" variant="ghost">Calculate quantity</ButtonLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-6" delay={0.1}>
              <p className="eyebrow mb-6">Typical cross-section</p>
              <LayerStack layers={a.layers} />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <Container className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <p className="mt-6 text-2xl leading-snug tracking-[-0.02em]">{a.problem}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow !text-accent">The solution</p>
            <p className="mt-6 text-2xl leading-snug tracking-[-0.02em]">{a.solution}</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink py-20 text-paper md:py-28">
        <Container>
          <p className="eyebrow !text-paper/50">What you gain</p>
          <ul className="mt-10 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {a.benefits.map((b, i) => (
              <li key={b} className="bg-ink py-8 pr-6 sm:px-6 lg:first:pl-0">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 text-xl leading-snug tracking-[-0.01em]">{b}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {a.body.length > 0 && (
        <section className="py-20 md:py-28">
          <Container className="grid gap-12 md:grid-cols-2">
            {a.body.map((b) => (
              <Reveal key={b.heading}>
                <h2 className="h3">{b.heading}</h2>
                <p className="mt-4 text-ink-2">{b.text}</p>
              </Reveal>
            ))}
          </Container>
        </section>
      )}

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <p className="eyebrow">Products for {a.name.toLowerCase()}</p>
          <div className="mt-8 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {prods.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="border-b border-r border-line bg-paper p-8 transition-colors hover:bg-paper-2">
                <span className="font-mono text-sm text-muted">{p.code}</span>
                <h3 className="h3 mt-8">{p.name}</h3>
                <p className="mt-2 text-[15px] text-ink-2">{p.summary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {a.faqs.length > 0 && (
        <section className="pb-20 md:pb-28">
          <Container className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="h2 mt-6">Common questions</h2>
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
