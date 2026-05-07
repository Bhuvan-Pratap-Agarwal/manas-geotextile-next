"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, type RefObject } from "react";
import { registerGsapPlugins } from "@/animations/gsap-config";

/**
 * Vertical scroll scrubs a horizontal applications track (Lenis scrollerProxy aware).
 */
export function useApplicationsRailScroll(
  pinRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void {
  useLayoutEffect(() => {
    if (!enabled) return undefined;

    registerGsapPlugins();

    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return undefined;

    const tween = gsap.to(track, {
      x: () => {
        const distance = track.scrollWidth - pin.offsetWidth;
        return distance > 0 ? -distance : 0;
      },
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        pin: true,
        start: "top top",
        end: () => {
          const distance = track.scrollWidth - pin.offsetWidth;
          return `+=${Math.max(1, distance)}`;
        },
        scrub: 0.95,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", onResize);
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener("resize", onResize);
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [enabled, pinRef, trackRef]);
}
