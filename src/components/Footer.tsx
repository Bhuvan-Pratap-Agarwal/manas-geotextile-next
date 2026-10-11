import Link from "next/link";
import { products } from "@/lib/content";
import { site } from "@/lib/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <Container className="grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-ink-2">{site.tagline}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Products</p>
          <ul className="space-y-2 text-[15px]">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="text-ink-2 hover:text-ink">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4">Company</p>
          <ul className="space-y-2 text-[15px]">
            {site.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink-2 hover:text-ink">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Contact</p>
          <address className="space-y-2 text-[15px] not-italic text-ink-2">
            <a href={`mailto:${site.contact.email}`} className="block hover:text-ink">{site.contact.email}</a>
            <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`} className="block hover:text-ink">{site.contact.phone}</a>
            <p className="pt-2">{site.contact.address.join(", ")}</p>
          </address>
        </div>
      </Container>
      <Container className="flex flex-col justify-between gap-2 border-t border-line py-6 text-[13px] text-muted sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p className="font-mono uppercase tracking-[0.14em]">Engineered in India</p>
      </Container>
    </footer>
  );
}
