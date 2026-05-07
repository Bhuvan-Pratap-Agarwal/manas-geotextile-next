"use client";

import { Suspense, type MutableRefObject } from "react";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { HeroCameraRig } from "@/3d/hero/HeroCameraRig";
import { HeroEngineeringGrid } from "@/3d/hero/HeroEngineeringGrid";
import { HeroFog } from "@/3d/hero/HeroFog";
import { HeroInfrastructureLines } from "@/3d/hero/HeroInfrastructureLines";
import { HeroLighting } from "@/3d/hero/HeroLighting";
import { HeroParticles } from "@/3d/hero/HeroParticles";
import { HeroTerrain } from "@/3d/hero/HeroTerrain";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

export type HeroSceneProps = {
  quality: HeroSceneQuality;
  scrollProgressRef: MutableRefObject<number>;
};

export function HeroScene({ quality, scrollProgressRef }: HeroSceneProps) {
  return (
    <>
      <HeroFog quality={quality} scrollProgressRef={scrollProgressRef} />
      <HeroCameraRig quality={quality} scrollProgressRef={scrollProgressRef} />
      <HeroLighting enableShadows={quality.tier > 0} />
      <Suspense fallback={null}>
        <Environment
          blur={0.72}
          environmentIntensity={quality.environmentIntensity * 0.72}
          preset="warehouse"
        />
      </Suspense>
      <group>
        <HeroEngineeringGrid quality={quality} />
        <HeroTerrain quality={quality} scrollProgressRef={scrollProgressRef} />
        <HeroInfrastructureLines
          quality={quality}
          scrollProgressRef={scrollProgressRef}
        />
        <HeroParticles
          quality={quality}
          scrollProgressRef={scrollProgressRef}
        />
      </group>
      {/* Distant read — reinforces scale (arch-viz silence) without extra passes */}
      <mesh
        position={[0, -1.35, -46]}
        renderOrder={-2}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[280, 120]} />
        <meshBasicMaterial
          color="#040506"
          depthTest
          depthWrite={false}
          opacity={0.94}
          transparent
        />
      </mesh>
      <mesh
        position={[0, 1.2, -38]}
        rotation={[0.08, 0, 0]}
        renderOrder={-3}
      >
        <planeGeometry args={[320, 90]} />
        <meshBasicMaterial
          color="#060708"
          depthTest
          depthWrite={false}
          opacity={0.45}
          side={THREE.DoubleSide}
          transparent
        />
      </mesh>
    </>
  );
}
