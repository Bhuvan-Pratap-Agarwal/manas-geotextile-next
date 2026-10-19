"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const steps = [
  { img: "/images/plant-carding.jpg", title: "Carded", body: "Polypropylene or polyester staple fibre is opened and carded into a thin, even web." },
  { img: "/images/line-fabric.jpg", title: "Needle-punched", body: "Layer after layer of web is locked together by thousands of barbed needles into a strong, permeable felt." },
  { img: "/images/plant-hall.jpg", title: "Calendered", body: "Heat and pressure give the fabric a smooth, durable finish and an even thickness." },
  { img: "/images/plant-ramina-winder.jpg", title: "Wound and tested", body: "A Ramina winder rolls it into tight 5 m rolls. Samples go to our lab before anything is dispatched." },
];

/** Photo stays pinned while the steps scroll past (desktop). Stacks on mobile. */
export function MakingStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="hidden lg:col-span-7 lg:block">
        <div className="sticky top-[140px] aspect-[4/3] overflow-hidden rounded-[6px] bg-paper-2">
          {steps.map((s, i) => (
            <Image
              key={s.img}
              src={s.img}
              alt={s.title}
              fill
              sizes="58vw"
              className={`object-cover transition-all duration-700 ease-out ${i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
            />
          ))}
          <div className="absolute bottom-4 left-4 flex gap-1.5" aria-hidden>
            {steps.map((s, i) => (
              <span key={s.title} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/60"}`} />
            ))}
          </div>
        </div>
      </div>
      <ol className="lg:col-span-5">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-i={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex flex-col justify-center py-6 lg:min-h-[70vh] lg:py-0"
          >
            <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-[6px] lg:hidden">
              <Image src={s.img} alt={s.title} fill sizes="100vw" className="object-cover" />
            </div>
            <p className={`text-[14px] font-semibold transition-colors duration-300 ${i === active ? "text-accent-ink" : "text-muted"}`}>Step {i + 1}</p>
            <h3 className={`mt-1 text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-tight tracking-[-0.02em] transition-colors duration-300 [font-stretch:92%] ${i === active ? "text-navy" : "text-navy lg:text-muted"}`}>
              {s.title}
            </h3>
            <p className={`mt-3 max-w-md text-[17px] leading-relaxed transition-colors duration-300 ${i === active ? "text-ink-2" : "text-ink-2 lg:text-muted"}`}>{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
