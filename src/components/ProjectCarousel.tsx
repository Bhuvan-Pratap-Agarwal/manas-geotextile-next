"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/lib/projects";

export function ProjectCarousel({ items }: { items: Project[] }) {
  const track = useRef<HTMLUListElement>(null);
  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 24), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => go(-1)} aria-label="Previous projects" className="flex size-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white">
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next projects" className="flex size-11 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white">
          <ChevronRight className="size-5" />
        </button>
      </div>
      <ul
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto scroll-smooth px-5 pb-4 sm:scroll-px-8 lg:scroll-px-12 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        aria-label="Projects"
      >
        {items.map((p) => (
          <li key={p.slug} className="w-[80vw] shrink-0 snap-start sm:w-[420px]">
            <Link href={`/projects#${p.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[6px] bg-white">
                <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 640px) 420px, 80vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-2/90 via-navy-2/40 to-transparent p-6 pt-20 text-white">
                  <p className="text-[13px] font-semibold text-sky">{p.where}</p>
                  <h3 className="mt-1 text-xl font-bold leading-snug">{p.title}</h3>
                  <p className="mt-1 text-[14px] text-white/80">{p.product}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
