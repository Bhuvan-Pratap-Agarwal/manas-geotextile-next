"use client";

import { type MutableRefObject, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

type HeroCameraRigProps = {
  quality: HeroSceneQuality;
  scrollProgressRef: MutableRefObject<number>;
};

export function HeroCameraRig({
  quality,
  scrollProgressRef,
}: HeroCameraRigProps) {
  const clockOffset = useRef(Math.random() * 12);
  const smoothScroll = useRef(0);

  useFrame(({ camera, clock }) => {
    const raw = scrollProgressRef.current;
    const lerp =
      quality.tier === 0 ? 0.11 : quality.tier === 1 ? 0.078 : 0.062;
    smoothScroll.current += (raw - smoothScroll.current) * lerp;
    const p = smoothScroll.current;

    const t = clock.elapsedTime + clockOffset.current;
    const sway =
      quality.tier > 0
        ? Math.sin(t * 0.064) * 0.038 + Math.cos(t * 0.048) * 0.024
        : 0;

    // Heavier dolly — sense of mass and infrastructure depth
    camera.position.z = 9.65 + p * 2.35 + sway * 0.22;
    camera.position.y = 3.12 + p * 0.58;
    camera.position.x = sway * 1.35 + p * 0.48;

    const lookY = -0.42 + p * 0.26;
    const lookZ = -4.35 - p * 1.05;
    camera.lookAt(0, lookY, lookZ);
  });

  return null;
}
