"use client";

import type { ReactNode } from "react";
import { NavigationProvider } from "@/components/navigation/NavigationContext";
import { MotionConfig } from "framer-motion";
import { AnimationProvider } from "@/components/providers/AnimationProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const reducedMotion = useReducedMotion();
  const smoothScrollEnabled = !reducedMotion;

  return (
    <MotionConfig reducedMotion="user">
      <NavigationProvider>
        <AnimationProvider reducedMotion={reducedMotion}>
          <SmoothScrollProvider enabled={smoothScrollEnabled}>
            {children}
          </SmoothScrollProvider>
        </AnimationProvider>
      </NavigationProvider>
    </MotionConfig>
  );
}
