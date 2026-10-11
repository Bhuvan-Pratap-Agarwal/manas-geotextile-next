"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site, tel } from "@/lib/site";
import { cn } from "@/lib/utils";
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
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-b border-line bg-paper/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2.5 text-[14px] transition-colors",
                  active
                    ? "text-ink after:absolute after:bottom-1 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-accent"
                    : "text-ink-2 hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="ml-3 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-paper transition-colors hover:bg-accent-ink"
          >
            Get a quote
          </Link>
        </nav>
        <button
          type="button"
          className="relative -mr-2 size-10 lg:hidden"
          ref={toggleRef}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "absolute left-2 right-2 h-px bg-ink transition-transform duration-300",
              open ? "top-1/2 rotate-45" : "top-[16px]",
            )}
          />
          <span
            className={cn(
              "absolute left-2 right-2 h-px bg-ink transition-transform duration-300",
              open ? "top-1/2 -rotate-45" : "top-[24px]",
            )}
          />
        </button>
      </Container>

      {open && (
        <nav
          id="mobile-menu"
          ref={menuRef}
          className="menu-in h-[calc(100dvh-4rem)] overflow-y-auto bg-paper lg:hidden"
          aria-label="Mobile"
        >
          <Container className="flex h-full flex-col justify-between py-10">
            <ul className="space-y-2">
              {[...site.nav, { href: "/contact", label: "Contact" }].map((item, i) => (
                <li key={item.href} className="menu-in" style={{ animationDelay: `${0.05 * i}s` }}>
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    className="block py-2 text-4xl font-medium tracking-[-0.03em]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-1 text-ink-2">
              <a href={`mailto:${site.contact.email}`} className="block py-1">{site.contact.email}</a>
              <a href={tel(site.contact.mobile)} className="block py-1">{site.contact.mobile}</a>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
