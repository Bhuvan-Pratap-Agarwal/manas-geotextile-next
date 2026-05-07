"use client";

import { Canvas } from "@react-three/fiber";
import {
  AdaptiveDpr,
  Environment,
  PerformanceMonitor,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";
import { SignatureOrb } from "@/3d/scenes/SignatureOrb";

export function WebGLDevBadge() {
  const { dpr, deferHeavyExperience, ready } = useDeviceCapability();
  const [perfDpr, setPerfDpr] = useState(1);

  useEffect(() => {
    setPerfDpr(dpr);
  }, [dpr]);

  if (!ready || deferHeavyExperience) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed bottom-6 right-6 z-20 h-28 w-28 opacity-90 md:h-32 md:w-32"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        dpr={Math.min(perfDpr, 2)}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <PerformanceMonitor
          factor={0.65}
          onDecline={() => setPerfDpr(1)}
          onIncline={() => setPerfDpr(dpr)}
        />
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 3]} intensity={1.15} />
        <Suspense fallback={null}>
          <SignatureOrb />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
