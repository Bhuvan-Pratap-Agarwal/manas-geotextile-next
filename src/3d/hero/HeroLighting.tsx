"use client";

export function HeroLighting({
  enableShadows,
}: {
  enableShadows: boolean;
}) {
  return (
    <>
      {/* Cool ambient floor tone vs warmer sky bleed — restrained luxury contrast */}
      <ambientLight color="#343a48" intensity={0.14} />
      <hemisphereLight
        color="#283040"
        groundColor="#120f0c"
        intensity={0.42}
        position={[0, 14, 0]}
      />
      {/* Warm key: authority / scale */}
      <directionalLight
        castShadow={enableShadows}
        color="#ffe8d2"
        intensity={1.55}
        position={[6.5, 14, 8.5]}
      />
      {/* Cool fill: technological clarity */}
      <directionalLight
        color="#7a8799"
        intensity={0.32}
        position={[-9.5, 6, -4]}
      />
      {/* Warm low rake — metallic read without harshness */}
      <directionalLight
        color="#d4bc8c"
        intensity={0.26}
        position={[2, 2.4, 11]}
      />
    </>
  );
}
