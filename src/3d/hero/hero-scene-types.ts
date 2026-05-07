export type HeroQualityTier = 0 | 1 | 2;

export type HeroSceneQuality = {
  tier: HeroQualityTier;
  terrainSegments: number;
  particleCount: number;
  gridFadeDistance: number;
  lineCount: number;
  fogDensity: number;
  dprCap: number;
  environmentIntensity: number;
  animateTerrain: boolean;
  animateParticles: boolean;
  refineTerrainNormals: boolean;
};
