"use client";

import {
  Suspense,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

export type HeroCanvasProps = {
  quality: HeroSceneQuality;
  children: ReactNode;
};

export function HeroCanvas({ quality, children }: HeroCanvasProps) {
  const [perfDpr, setPerfDpr] = useState(1);

  useEffect(() => {
    setPerfDpr(quality.dprCap);
  }, [quality.dprCap]);

  return (
    <Canvas
      shadows={quality.tier > 0}
      className="h-full w-full"
      camera={{
        fov: 38,
        near: 0.12,
        far: 120,
        position: [0, 3.05, 9.2],
      }}
      dpr={[1, Math.min(perfDpr, quality.dprCap)]}
      gl={{
        alpha: false,
        antialias: quality.tier > 0,
        powerPreference: "high-performance",
        stencil: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.96,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor("#070708", 1);
        if (quality.tier > 0) {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        } else {
          gl.shadowMap.enabled = false;
        }
      }}
    >
      <PerformanceMonitor
        factor={0.55}
        onDecline={() => setPerfDpr(1)}
        onIncline={() => setPerfDpr(quality.dprCap)}
      />
      <AdaptiveDpr pixelated />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
