import Link from "next/link";
import { applications } from "@/lib/applications";
import { guides } from "@/lib/guides";
import { products } from "@/lib/products";
import { site, tel } from "@/lib/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-1 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 text-ink-2 hover:text-ink">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { office, factory, contact } = site;
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-ink-2">
            {site.legalName} — non-woven geotextiles and PVC geomembranes, made in Haryana. Incorporated 1995.
          </p>
          <div className="mt-6 text-[15px]">
            <a href={tel(contact.phone)} className="block py-1 hover:text-accent-ink">{contact.phone}</a>
            <a href={tel(contact.mobile)} className="block py-1 hover:text-accent-ink">{contact.mobile}</a>
            <a href={`mailto:${contact.email}`} className="block py-1 hover:text-accent-ink">{contact.email}</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-2 lg:col-span-8">
          <Col title="Products" links={products.map((p) => ({ href: `/products/${p.slug}`, label: p.name }))} />
          <Col title="Applications" links={applications.map((a) => ({ href: `/applications/${a.slug}`, label: a.name }))} />
          <Col
            title="Resources"
            links={[
              { href: "/tools/geotextile-calculator", label: "Geotextile calculator" },
              ...guides.slice(0, 5).map((g) => ({ href: `/guides/${g.slug}`, label: g.title.split(":")[0] })),
              { href: "/about", label: "Company" },
              { href: "/contact", label: "Contact" },
            ]}
          />
        </div>
      </Container>
      <Container className="grid gap-8 border-t border-line py-10 text-[14px] text-ink-2 sm:grid-cols-2">
        {[office, factory].map((a) => (
          <address key={a.label} className="not-italic">
            <p className="eyebrow mb-2">{a.label}</p>
            {a.street}, {a.city}, {a.region} {a.postalCode}
          </address>
        ))}
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-line pb-24 pt-6 text-[13px] text-muted sm:flex-row sm:pb-6">
        <p>© {new Date().getFullYear()} {site.legalName} · CIN {site.cin}</p>
        <p className="flex gap-6">
          <Link href="/privacy" className="-my-1 inline-block py-1 hover:text-ink">Privacy</Link>
          <span className="font-mono uppercase tracking-[0.14em]">Made in India</span>
        </p>
      </Container>
    </footer>
  );
}
