"use client";

import { useEffect, useRef } from "react";

// One shared observer for every reveal on the page.
let observer: IntersectionObserver | null = null;
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            observer?.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
  }
  return observer;
}

/**
 * Fades content up as it scrolls into view. Pass `immediate` for above-the-fold
 * content: it animates with pure CSS on first paint and never waits for JS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  immediate = false,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (immediate || !el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [immediate]);

  return (
    <div
      ref={ref}
      className={className}
      data-reveal={immediate ? "rise" : ""}
      style={{ "--d": `${delay}s` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
