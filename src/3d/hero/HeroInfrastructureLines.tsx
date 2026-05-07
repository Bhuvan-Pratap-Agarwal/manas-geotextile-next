"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

type HeroInfrastructureLinesProps = {
  quality: HeroSceneQuality;
  scrollProgressRef: MutableRefObject<number>;
};

export function HeroInfrastructureLines({
  quality,
  scrollProgressRef,
}: HeroInfrastructureLinesProps) {
  const group = useRef<THREE.Group>(null);
  const smoothScroll = useRef(0);
  const phase = useRef(Math.random() * 6.28);

  const paths = useMemo(() => {
    const count = quality.lineCount;
    const mid = count / 2;
    return Array.from({ length: count }, (_, i) => {
      const z0 = -10.5 + i * 1.42;
      const y = 0.06 + (i % 4) * 0.05;
      // Subtle convergence toward a distant vanishing band — reads as corridors, not decoration
      const converge = (i - mid) * 0.12;
      const bias = (i / Math.max(1, count - 1) - 0.5) * 0.35;

      return [
        new THREE.Vector3(-15 + converge * 0.35, y, z0 + bias),
        new THREE.Vector3(-6.5, y + 0.02, z0 + 1.35 + bias * 0.4),
        new THREE.Vector3(0.5 - converge * 0.2, y - 0.025, z0 - 0.45),
        new THREE.Vector3(8.5 - converge * 0.45, y + 0.035, z0 + 0.85),
        new THREE.Vector3(17 - converge * 0.7, y, z0 - 0.55 + bias * 0.25),
      ];
    });
  }, [quality.lineCount]);

  const lineWidthCore =
    quality.tier === 0 ? 0.75 : quality.tier === 1 ? 0.95 : 1.12;

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) return;
    smoothScroll.current +=
      (scrollProgressRef.current - smoothScroll.current) * 0.09;
    const p = smoothScroll.current;
    const t = clock.elapsedTime;

    g.position.z = p * 0.78;
    g.position.y = p * 0.052 + (quality.tier > 0 ? Math.sin(t * 0.055 + phase.current) * 0.015 : 0);

    if (quality.tier > 0) {
      g.rotation.y = p * 0.006 + Math.sin(t * 0.04 + phase.current) * 0.002;
    }
  });

  return (
    <group ref={group}>
      {paths.map((pts, i) => (
        <group key={i}>
          {/* Wide, extremely soft shell — reads as haze on steel, not neon */}
          <Line
            color="#8d7a58"
            lineWidth={lineWidthCore * 3.8}
            opacity={0.04}
            points={pts}
            transparent
            toneMapped
          />
          <Line
            color="#a68f65"
            lineWidth={lineWidthCore * 2.1}
            opacity={0.065}
            points={pts}
            transparent
            toneMapped
          />
          {/* Tight core — confident infrastructure trace */}
          <Line
            color="#e6dcc8"
            lineWidth={lineWidthCore}
            opacity={quality.tier === 0 ? 0.22 : 0.28}
            points={pts}
            transparent
            toneMapped
          />
        </group>
      ))}
    </group>
  );
}
