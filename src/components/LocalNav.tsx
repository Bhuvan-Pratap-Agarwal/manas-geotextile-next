"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Apple-style sticky sub-navigation: page title, in-page sections, one CTA. */
export function LocalNav({
  title,
  sections,
  cta,
}: {
  title: string;
  sections: { id: string; label: string }[];
  cta: { href: string; label: string };
}) {
  const [active, setActive] = useState<string | null>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 260);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, [sections]);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-16 z-40 border-b border-line bg-white/85 backdrop-blur-xl transition-all duration-300 md:top-[108px]",
        stuck ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      )}
    >
      <div className="mx-auto flex h-12 max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <p className="truncate text-[15px] font-semibold text-navy">{title}</p>
        <div className="flex min-w-0 items-center gap-1">
          <nav aria-label="On this page" className="hidden gap-1 md:flex">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[13px] transition-colors",
                  active === s.id ? "bg-navy/[0.06] font-semibold text-navy" : "text-ink-2 hover:text-navy",
                )}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <Link href={cta.href} className="ml-2 shrink-0 rounded-full bg-accent px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-navy">
            {cta.label}
          </Link>
        </div>
      </div>
    </div>
  );
}
