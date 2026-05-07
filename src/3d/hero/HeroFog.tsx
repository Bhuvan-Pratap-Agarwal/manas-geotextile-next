"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { FogExp2 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

const FOG_COLOR = "#0a0b0f";

/** Scroll-tightened fog for a heavier, more cinematic hand-off past the hero. */
export function HeroFog({
  quality,
  scrollProgressRef,
}: {
  quality: HeroSceneQuality;
  scrollProgressRef: MutableRefObject<number>;
}) {
  const { scene } = useThree();
  const baseDensity = useRef(quality.fogDensity);
  const smoothScroll = useRef(0);

  useEffect(() => {
    baseDensity.current = quality.fogDensity;
    scene.fog = new FogExp2(FOG_COLOR, quality.fogDensity);
    return () => {
      scene.fog = null;
    };
  }, [quality.fogDensity, scene]);

  useFrame(() => {
    smoothScroll.current +=
      (scrollProgressRef.current - smoothScroll.current) * 0.09;
    const s = smoothScroll.current;
    const fog = scene.fog;
    if (fog instanceof FogExp2) {
      const breathe = 1 + s * 0.11 + Math.sin(s * 2.7) * 0.012;
      fog.density = baseDensity.current * breathe;
    }
  });

  return null;
}
