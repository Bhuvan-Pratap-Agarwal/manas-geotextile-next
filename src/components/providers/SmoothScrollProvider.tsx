"use client";

import type { LenisOptions } from "lenis";
import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { ScrollTriggerBridge } from "@/components/providers/ScrollTriggerBridge";

type SmoothScrollProviderProps = {
  children: ReactNode;
  enabled: boolean;
};

const lenisOptions: LenisOptions = {
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.35,
  lerp: 0.085,
  autoRaf: true,
};

export function SmoothScrollProvider({
  children,
  enabled,
}: SmoothScrollProviderProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={lenisOptions}>
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
