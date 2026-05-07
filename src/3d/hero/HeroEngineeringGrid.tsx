"use client";

import { Grid } from "@react-three/drei";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

export function HeroEngineeringGrid({ quality }: { quality: HeroSceneQuality }) {
  if (quality.tier === 0) {
    return (
      <Grid
        args={[52, 52]}
        cellColor="#252a34"
        cellSize={0.52}
        cellThickness={0.55}
        fadeDistance={quality.gridFadeDistance * 1.05}
        fadeFrom={0.92}
        fadeStrength={1.08}
        followCamera={false}
        infiniteGrid
        position={[0, 0.015, -2.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        sectionColor="#454038"
        sectionSize={4.5}
        sectionThickness={0.45}
      />
    );
  }

  return (
    <Grid
      args={[60, 60]}
      cellColor="#2a303a"
      cellSize={0.48}
      cellThickness={0.72}
      fadeDistance={quality.gridFadeDistance * 1.06}
      fadeFrom={1}
      fadeStrength={0.98}
      followCamera={false}
      infiniteGrid
      position={[0, 0.015, -2.5]}
      rotation={[-Math.PI / 2, 0, 0]}
      sectionColor="#52483c"
      sectionSize={5.2}
      sectionThickness={0.52}
    />
  );
}
