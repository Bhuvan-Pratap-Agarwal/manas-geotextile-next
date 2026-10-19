"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectGallery({ items, filters }: { items: Project[]; filters: { slug: string; name: string }[] }) {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const touchX = useRef<number | null>(null);

  const shown = filter === "all" ? items : items.filter((p) => p.application === filter);
  const available = filters.filter((f) => items.some((p) => p.application === f.slug));

  const close = useCallback(() => {
    setOpen(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  // Deep links (/projects#slug) scroll the matching card into view.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const i = items.findIndex((p) => p.slug === id);
    if (i >= 0) document.getElementById(id)?.scrollIntoView({ block: "center" });
  }, [items]);

  const current = open === null ? null : shown[open];

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {[{ slug: "all", name: "All projects" }, ...available].map((f) => (
          <button
            key={f.slug}
            type="button"
            aria-pressed={filter === f.slug}
            onClick={() => setFilter(f.slug)}
            className={cn(
              "rounded-full px-4 py-2 text-[14px] font-medium transition-colors",
              filter === f.slug ? "bg-navy text-white" : "bg-white text-ink-2 ring-1 ring-line hover:ring-navy",
            )}
          >
            {f.name}
            {f.slug !== "all" && <span className="ml-1.5 opacity-60">{items.filter((p) => p.application === f.slug).length}</span>}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.slug} id={p.slug} className="scroll-mt-40 animate-[rise_0.5s_ease-out_both]" style={{ animationDelay: `${(i % 6) * 40}ms` }}>
            <button
              type="button"
              onClick={(e) => {
                lastFocus.current = e.currentTarget;
                setOpen(i);
              }}
              className="group block w-full text-left"
              aria-label={`View photo: ${p.title}, ${p.where}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[8px] bg-white">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                <span className="absolute bottom-3 right-3 rounded-full bg-navy/85 px-3 py-1 text-[12px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View
                </span>
              </div>
              <h3 className="mt-4 text-[17px] font-semibold leading-snug text-navy group-hover:text-accent-ink">{p.title}</h3>
              <p className="mt-1 text-[14px] text-muted">{p.where} · {p.product}</p>
              {p.note && <p className="mt-1.5 text-[15px] text-ink-2">{p.note}</p>}
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="menu-in fixed inset-0 z-[70] flex flex-col bg-[#05101f]/95 text-white backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between p-4 sm:p-6">
            <p className="spec text-[14px] text-white/70">
              {(open ?? 0) + 1} / {shown.length}
            </p>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className="flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
              <X className="size-5" />
            </button>
          </div>
          <div className="relative min-h-0 flex-1 px-4 sm:px-20">
            <Image key={current.image} src={current.image} alt={current.imageAlt} fill sizes="100vw" className="menu-in object-contain" />
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:flex">
              <ChevronLeft className="size-6" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-3 top-1/2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:flex">
              <ChevronRight className="size-6" />
            </button>
          </div>
          <div className="mx-auto w-full max-w-3xl p-6 text-center">
            <p className="text-[13px] font-semibold text-sky">{current.where}</p>
            <p className="mt-1 text-xl font-bold">{current.title}</p>
            <p className="mt-1 text-[15px] text-white/75">
              {current.product}
              {current.note ? ` · ${current.note}` : ""}
            </p>
            <p className="mt-3 text-[13px] text-white/50 sm:hidden">Swipe for more</p>
          </div>
        </div>
      )}
    </div>
  );
}
