"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

type HeroParticlesProps = {
  quality: HeroSceneQuality;
  scrollProgressRef: MutableRefObject<number>;
};

/** Seeded variance keeps distribution stable frame-to-frame (less shimmer noise). */
function rnd(seed: number): number {
  const x = Math.sin(seed * 12.9898 + seed * 0.001) * 43758.5453;
  return x - Math.floor(x);
}

export function HeroParticles({
  quality,
  scrollProgressRef,
}: HeroParticlesProps) {
  const points = useRef<THREE.Points>(null);
  const smoothScroll = useRef(0);

  const { count, positions } = useMemo(() => {
    const n = quality.particleCount;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const seed = i + n * 0.371;
      const deep = rnd(seed) > (quality.tier === 0 ? 0.42 : 0.38);
      const x = (rnd(seed + 1) - 0.5) * 30;
      const z = deep
        ? -5.5 - rnd(seed + 2) * (quality.tier === 0 ? 18 : 24)
        : -2 - rnd(seed + 2) * 10;
      const y =
        0.25 +
        rnd(seed + 3) *
          (deep ? 3.6 : 2.1) *
          (quality.tier === 0 ? 0.85 : 1);

      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;
    }
    return { count: n, positions: arr };
  }, [quality.particleCount, quality.tier]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame(({ clock }) => {
    const mesh = points.current;
    if (!mesh || count === 0) return;

    smoothScroll.current +=
      (scrollProgressRef.current - smoothScroll.current) * 0.085;

    const attr = mesh.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;

    if (!quality.animateParticles) {
      const s = smoothScroll.current;
      mesh.rotation.y = s * 0.012;
      return;
    }

    const t = clock.elapsedTime * 0.045;
    const scroll = smoothScroll.current;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const baseX = positions[ix];
      const baseY = positions[ix + 1];
      const baseZ = positions[ix + 2];
      const deep = baseZ < -8 ? 1 : 0.45;
      arr[ix] =
        baseX + Math.sin(t * 0.8 + baseZ * 0.09 + i * 0.01) * 0.035 * deep;
      arr[ix + 1] =
        baseY +
        Math.cos(t * 0.65 + baseX * 0.08) * 0.028 * deep +
        scroll * 0.02;
      arr[ix + 2] =
        baseZ + Math.sin(t * 0.5 + i * 0.015) * 0.028 * deep;
    }

    attr.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        color="#a8a199"
        depthWrite={false}
        opacity={quality.tier === 0 ? 0.07 : 0.1}
        size={
          quality.tier === 0 ? 0.022 : quality.tier === 1 ? 0.026 : 0.03
        }
        sizeAttenuation
        transparent
      />
    </points>
  );
}
