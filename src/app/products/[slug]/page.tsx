import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Container } from "@/components/Container";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/Reveal";
import { getApplication, getProduct, products } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.summary } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <section className="pb-20 pt-32 md:pt-40">
        <Container>
          <Link href="/products" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink">
            <ArrowLeft className="size-4" strokeWidth={1.5} /> All products
          </Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow">{product.code} — {product.functions.join(" · ")}</p>
              <h1 className="display mt-6 text-balance">{product.name}</h1>
              <p className="lead mt-8 max-w-xl">{product.description}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?product=${product.slug}`}>Request datasheet</ButtonLink>
                <ButtonLink href="/contact" variant="ghost">Ask an engineer</ButtonLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-5" delay={0.1}>
              <div className="border border-line bg-paper-2/60 p-8">
                <p className="eyebrow">Specification</p>
                <dl className="mt-6 divide-y divide-line">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between gap-6 py-4 text-[15px]">
                      <dt className="text-muted">{s.label}</dt>
                      <dd className="text-right font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-6 text-[13px] text-muted">Indicative ranges. Full grade-wise datasheets on request.</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <p className="eyebrow">Used in</p>
          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
            {product.applications.map((slug) => {
              const a = getApplication(slug);
              if (!a) return null;
              return (
                <Link key={slug} href={`/applications#${slug}`} className="bg-paper p-8 transition-colors hover:bg-paper-2">
                  <h2 className="h3">{a.name}</h2>
                  <p className="mt-3 text-[15px] text-ink-2">{a.summary}</p>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
