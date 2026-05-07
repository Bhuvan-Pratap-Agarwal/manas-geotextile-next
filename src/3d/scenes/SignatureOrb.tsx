"use client";

import { MeshDistortMaterial } from "@react-three/drei";

export function SignatureOrb() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshDistortMaterial
        color="#c8a96b"
        roughness={0.25}
        metalness={0.65}
        distort={0.32}
        speed={1.6}
      />
    </mesh>
  );
}
