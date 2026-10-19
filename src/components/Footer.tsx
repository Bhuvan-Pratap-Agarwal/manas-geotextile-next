import Link from "next/link";
import { applications } from "@/lib/applications";
import { products } from "@/lib/products";
import { site, tel } from "@/lib/site";
import { Container } from "./Container";
import { Logo } from "./Logo";

function Col({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-[15px] font-semibold text-white">{title}</p>
      <ul className="space-y-0.5 text-[15px]">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block py-1 text-white/70 hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const { office, factory, contact, facts } = site;
  return (
    <footer className="bg-navy-2 text-white">
      <Container className="grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">
            {site.legalName}. Non-woven geotextile and PVC geomembrane, made at IMT Bawal, Haryana.
            Sales offices in {facts.salesOffices.join(", ")}.
          </p>
          <div className="mt-6 text-[15px]">
            <a href={tel(contact.mobile)} className="block py-1 font-semibold hover:text-sky">{contact.mobile}</a>
            <a href={tel(contact.phone)} className="block py-1 text-white/80 hover:text-sky">{contact.phone}</a>
            <a href={`mailto:${contact.salesEmail}`} className="block py-1 text-white/80 hover:text-sky">{contact.salesEmail}</a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          <Col title="Products" links={products.filter((p) => p.origin === "manufactured").map((p) => ({ href: `/products/${p.slug}`, label: p.name }))} />
          <Col title="Applications" links={applications.map((a) => ({ href: `/applications/${a.slug}`, label: a.name }))} />
          <Col
            title="Company"
            links={[
              { href: "/about", label: "Manufacturing & company" },
              { href: "/projects", label: "Projects & clients" },
              { href: "/downloads", label: "Datasheets & brochures" },
              { href: "/tools/geotextile-calculator", label: "Quantity calculator" },
              { href: "/tools/build-a-road", label: "Build a road (game)" },
              { href: "/guides", label: "Guides" },
              { href: "/contact", label: "Contact" },
            ]}
          />
        </div>
      </Container>
      <Container className="grid gap-8 border-t border-white/10 py-10 text-[14px] text-white/70 sm:grid-cols-2">
        {[office, factory].map((a) => (
          <address key={a.label} className="not-italic">
            <p className="mb-1.5 font-semibold text-white">{a.label}</p>
            {a.street}, {a.city}, {a.region} {a.postalCode}
          </address>
        ))}
      </Container>
      <Container className="flex flex-col justify-between gap-3 border-t border-white/10 pb-24 pt-6 text-[13px] text-white/60 sm:flex-row sm:pb-6">
        <p>© {new Date().getFullYear()} {site.legalName} · CIN {site.cin}</p>
        <p className="flex flex-wrap gap-x-5 gap-y-1">
          <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white">LinkedIn</a>
          <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white">YouTube</a>
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="py-1 hover:text-white">Facebook</a>
          <Link href="/privacy" className="py-1 hover:text-white">Privacy</Link>
        </p>
      </Container>
    </footer>
  );
}
