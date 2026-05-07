"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HeroCanvas } from "@/3d/hero/HeroCanvas";
import { HeroScene } from "@/3d/hero/HeroScene";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { useHeroSceneQuality } from "@/hooks/useHeroSceneQuality";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useNavigationOptional } from "@/components/navigation/NavigationContext";
import { HeroBackdropFallback } from "@/sections/hero/HeroBackdropFallback";
import { HeroContent } from "@/sections/hero/HeroContent";
import { useHeroScrollProgress } from "@/sections/hero/motion/useHeroScrollProgress";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const scrollProgressRef = useHeroScrollProgress(heroRef);
  const quality = useHeroSceneQuality();
  const reducedMotion = useReducedMotion();
  const { gpu, ready } = useDeviceCapability();
  const { menuOpen } = useNavigationOptional();

  const webglHero = ready && gpu.webgl !== "none" && !reducedMotion;

  return (
    <motion.section
      ref={heroRef}
      animate={{
        filter: menuOpen
          ? "brightness(0.81) saturate(0.87) contrast(1.04)"
          : "brightness(1) saturate(1) contrast(1)",
      }}
      className="relative min-h-screen-fill w-full overflow-hidden border-b border-border/50"
      id="hero"
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0 z-0 h-full min-h-[100svh]">
        {webglHero ? (
          <HeroCanvas quality={quality}>
            <HeroScene
              quality={quality}
              scrollProgressRef={scrollProgressRef}
            />
          </HeroCanvas>
        ) : (
          <HeroBackdropFallback />
        )}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#030406]/98 via-transparent to-background"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] shadow-[inset_0_0_min(140px,14vw)_rgba(0,0,0,0.62)] min-[2000px]:shadow-[inset_0_0_min(200px,10vw)_rgba(0,0,0,0.68)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] hidden w-[min(12vw,200px)] bg-gradient-to-r from-[#050607] to-transparent opacity-90 min-[2000px]:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] hidden w-[min(12vw,200px)] bg-gradient-to-l from-[#050607] to-transparent opacity-90 min-[2000px]:block"
      />

      <HeroContent sectionRef={heroRef} />
    </motion.section>
  );
}
