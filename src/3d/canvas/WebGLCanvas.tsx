"use client";

import { Canvas, type RootState } from "@react-three/fiber";
import {
  AdaptiveDpr,
  PerformanceMonitor,
} from "@react-three/drei";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export type WebGLCanvasProps = {
  children: ReactNode;
  className?: string;
  cameraFov?: number;
  cameraPositionTuple?: [number, number, number];
  onCreated?: (state: RootState) => void;
  adaptiveDprPixelated?: boolean;
};

export function WebGLCanvas({
  children,
  className,
  cameraFov = 42,
  cameraPositionTuple = [0, 0, 6],
  onCreated,
  adaptiveDprPixelated = true,
}: WebGLCanvasProps) {
  const { dpr, deferHeavyExperience, ready } = useDeviceCapability();
  const [perfDpr, setPerfDpr] = useState(1);

  useEffect(() => {
    setPerfDpr(dpr);
  }, [dpr]);

  if (!ready || deferHeavyExperience) {
    return null;
  }

  return (
    <div className={className}>
      <Canvas
        camera={{
          fov: cameraFov,
          position: cameraPositionTuple,
          near: 0.1,
          far: 200,
        }}
        dpr={Math.min(perfDpr, 2)}
        onCreated={onCreated}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <PerformanceMonitor
          factor={0.6}
          onDecline={() => setPerfDpr(1)}
          onIncline={() => setPerfDpr(dpr)}
        />
        <AdaptiveDpr pixelated={adaptiveDprPixelated} />
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
