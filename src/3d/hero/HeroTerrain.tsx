"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

type HeroTerrainProps = {
  quality: HeroSceneQuality;
  scrollProgressRef: MutableRefObject<number>;
};

export function HeroTerrain({
  quality,
  scrollProgressRef,
}: HeroTerrainProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const frameCount = useRef(0);
  const smoothScroll = useRef(0);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(
      42,
      54,
      quality.terrainSegments,
      quality.terrainSegments,
    );
    g.rotateX(-Math.PI / 2);
    return g;
  }, [quality.terrainSegments]);

  const base = useMemo(() => {
    const arr = geometry.attributes.position.array as Float32Array;
    return new Float32Array(arr);
  }, [geometry]);

  const amp =
    quality.tier === 0 ? 0.55 : quality.tier === 1 ? 0.68 : 0.78;

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh || !quality.animateTerrain) return;

    frameCount.current += 1;
    smoothScroll.current +=
      (scrollProgressRef.current - smoothScroll.current) * 0.088;
    const scroll = smoothScroll.current;

    const pos = mesh.geometry.attributes.position.array as Float32Array;
    const tSlow =
      clock.elapsedTime *
      (quality.tier === 0 ? 0.11 : quality.tier === 1 ? 0.14 : 0.16);
    const tMid = clock.elapsedTime * 0.22;

    for (let i = 0; i < pos.length; i += 3) {
      const x = base[i];
      const y0 = base[i + 1];
      const z = base[i + 2];

      // Mass-scale undulation in far field; calmer near the viewpoint
      const horizon = THREE.MathUtils.smoothstep(-z, -6, 20);
      const crest = THREE.MathUtils.smoothstep(Math.abs(x), 0, 16);
      const fieldEnvelope = horizon * (0.55 + 0.45 * (1 - crest * 0.35));

      const continental =
        Math.sin(x * 0.065 + z * 0.048 + tSlow * 0.35) * amp * 0.52 +
        Math.cos(z * 0.042 - x * 0.035 + tSlow * 0.28) * amp * 0.38;

      const ridge =
        Math.sin((x + z * 0.55) * 0.095 + tMid * 0.5) * amp * 0.14;

      const micro =
        Math.sin(x * 0.22 + tMid * 0.55) *
          amp *
          0.05 *
          (quality.tier > 0 ? 1 : 0.55) +
        Math.cos(z * 0.19 + tMid * 0.4) * amp * 0.045 * (quality.tier > 0 ? 1 : 0.5);

      const scrollHeave = scroll * 0.12 * Math.sin(x * 0.055 + z * 0.04);

      const h =
        (continental + ridge + micro) * fieldEnvelope + scrollHeave;

      pos[i + 1] = y0 + h;
    }

    mesh.geometry.attributes.position.needsUpdate = true;

    if (
      quality.refineTerrainNormals &&
      (quality.tier === 2 || frameCount.current % 2 === 0)
    ) {
      mesh.geometry.computeVertexNormals();
    }
  });

  return (
    <mesh
      ref={meshRef}
      castShadow={quality.tier > 0}
      geometry={geometry}
      position={[0, -0.92, -4.2]}
      receiveShadow={quality.tier > 0}
    >
      <meshStandardMaterial
        attach="material"
        color="#0e1016"
        envMapIntensity={quality.environmentIntensity * 1.08}
        flatShading={!quality.refineTerrainNormals}
        metalness={0.72}
        roughness={0.5}
      />
    </mesh>
  );
}
