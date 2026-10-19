"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, tel } from "@/lib/site";
import { cn } from "@/lib/utils";
import { buttonClass } from "./ButtonLink";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300",
        scrolled || open ? "shadow-[0_1px_0_var(--line),0_6px_20px_rgba(15,27,45,0.06)]" : "shadow-[0_1px_0_var(--line)]",
      )}
    >
      <div className="hidden bg-navy text-[13px] text-white/85 md:block">
        <Container className="flex h-9 items-center justify-between">
          <p>ISO 9001:2015 certified manufacturer · Factory at IMT Bawal, Haryana</p>
          <p className="flex items-center gap-5">
            <a href={tel(site.contact.mobile)} className="hover:text-white">{site.contact.mobile}</a>
            <a href={`mailto:${site.contact.salesEmail}`} className="hover:text-white">{site.contact.salesEmail}</a>
          </p>
        </Container>
      </div>
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 px-3 py-6 text-[15px] font-medium transition-colors",
                  active ? "border-accent text-navy" : "border-transparent text-ink-2 hover:text-navy",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/contact" className={buttonClass("solid", "ml-4 h-11 px-5")}>
            Get a quote
          </Link>
        </nav>
        <div className="flex items-center gap-1 lg:hidden">
          <a href={tel(site.contact.mobile)} className="px-3 py-2 text-[14px] font-semibold text-navy" aria-label={`Call ${site.contact.mobile}`}>
            Call
          </a>
          <button
            type="button"
            className="relative -mr-2 size-11"
            ref={toggleRef}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={cn("absolute left-2.5 right-2.5 h-0.5 bg-navy transition-transform duration-300", open ? "top-1/2 rotate-45" : "top-[16px]")} />
            <span className={cn("absolute left-2.5 right-2.5 h-0.5 bg-navy transition-opacity duration-300", open ? "top-1/2 opacity-0" : "top-[21px]")} />
            <span className={cn("absolute left-2.5 right-2.5 h-0.5 bg-navy transition-transform duration-300", open ? "top-1/2 -rotate-45" : "top-[26px]")} />
          </button>
        </div>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          ref={menuRef}
          className="menu-in h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white lg:hidden"
          aria-label="Mobile"
        >
          <Container className="flex h-full flex-col justify-between py-8">
            <ul className="divide-y divide-line">
              {[...site.nav, { href: "/tools/geotextile-calculator", label: "Quantity calculator" }, { href: "/contact", label: "Contact" }].map((item, i) => (
                <li key={item.href} className="menu-in" style={{ animationDelay: `${0.04 * i}s` }}>
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    className="block py-4 text-2xl font-semibold text-navy"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <Link href="/contact" className={buttonClass("solid")}>Get a quote</Link>
              <a href={tel(site.contact.mobile)} className={buttonClass("outline")}>Call {site.contact.mobile}</a>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
