"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/animations/gsap-config";

/**
 * Drives scroll-linked depth in the hero WebGL layer (scrubbed, Lenis-compatible).
 */
export function useHeroScrollProgress(
  sectionRef: RefObject<HTMLElement | null>,
): RefObject<number> {
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    registerGsapPlugins();
    const el = sectionRef.current;
    if (!el) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom top",
      scrub: 0.95,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      trigger.kill();
    };
  }, [sectionRef]);

  return progressRef;
}
