"use client";

import { useMemo } from "react";
import { getGpuCapabilities } from "@/lib/gpu/capabilities";
import { prefersReducedData } from "@/lib/performance/mobile";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { mediaUp } from "@/utils/responsive";
import type { HeroSceneQuality } from "@/3d/hero/hero-scene-types";

/**
 * GPU- and viewport-aware quality preset for the cinematic hero WebGL scene.
 */
export function useHeroSceneQuality(): HeroSceneQuality {
  const reducedMotion = useReducedMotion();
  const isMdUp = useMediaQuery(mediaUp("md"));
  const isXlUp = useMediaQuery(mediaUp("xl"));

  return useMemo(() => {
    if (typeof window === "undefined") {
      return makeQuality(0, true);
    }

    if (reducedMotion) {
      return makeQuality(0, true);
    }

    const gpu = getGpuCapabilities();
    if (gpu.webgl === "none") {
      return makeQuality(0, false);
    }

    const saveData = prefersReducedData();
    const gpuTierCap = gpu.webgl === "full" ? 2 : 1;

    let tier: 0 | 1 | 2 = 0;
    if (isXlUp) tier = 2;
    else if (isMdUp) tier = 1;

    if (saveData) tier = 0;
    tier = Math.min(tier, gpuTierCap) as 0 | 1 | 2;

    return makeQuality(tier, false, gpu.webgl);
  }, [isMdUp, isXlUp, reducedMotion]);
}

function makeQuality(
  tier: 0 | 1 | 2,
  ssrOrReduced: boolean,
  gpuClass: "basic" | "full" | "none" = "full",
): HeroSceneQuality {
  if (ssrOrReduced) {
    return {
      tier: 0,
      terrainSegments: 16,
      particleCount: 0,
      gridFadeDistance: 18,
      lineCount: 3,
      fogDensity: 0.052,
      dprCap: 1,
      environmentIntensity: 0.3,
      animateTerrain: false,
      animateParticles: false,
      refineTerrainNormals: false,
    };
  }

  if (tier === 0 || gpuClass === "none") {
    return {
      tier: 0,
      terrainSegments: 22,
      particleCount: 88,
      gridFadeDistance: 22,
      lineCount: 4,
      fogDensity: 0.044,
      dprCap: 1.25,
      environmentIntensity: 0.38,
      animateTerrain: true,
      animateParticles: false,
      refineTerrainNormals: false,
    };
  }

  if (tier === 1) {
    return {
      tier: 1,
      terrainSegments: 38,
      particleCount: 190,
      gridFadeDistance: 30,
      lineCount: 7,
      fogDensity: 0.035,
      dprCap: 1.5,
      environmentIntensity: 0.5,
      animateTerrain: true,
      animateParticles: true,
      refineTerrainNormals: gpuClass === "full",
    };
  }

  return {
    tier: 2,
    terrainSegments: 54,
    particleCount: 320,
    gridFadeDistance: 40,
    lineCount: 10,
    fogDensity: 0.028,
    dprCap: 2,
    environmentIntensity: 0.6,
    animateTerrain: true,
    animateParticles: true,
    refineTerrainNormals: true,
  };
}
