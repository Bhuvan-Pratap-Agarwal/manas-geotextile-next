"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { registerGsapPlugins } from "@/animations/gsap-config";

export function ScrollTriggerBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    registerGsapPlugins();

    const scrollHandler = () => {
      ScrollTrigger.update();
    };

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.animatedScroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", scrollHandler);

    const onRefresh = () => {
      lenis.resize();
    };

    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", scrollHandler);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      ScrollTrigger.clearScrollMemory();
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [lenis]);

  return null;
}
