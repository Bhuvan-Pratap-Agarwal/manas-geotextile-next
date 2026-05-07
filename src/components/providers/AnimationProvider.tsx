"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsapPlugins } from "@/animations/gsap-config";

type AnimationContextValue = {
  reducedMotion: boolean;
};

const AnimationContext = createContext<AnimationContextValue>({
  reducedMotion: false,
});

export function useAnimationContext(): AnimationContextValue {
  return useContext(AnimationContext);
}

type AnimationProviderProps = {
  children: ReactNode;
  reducedMotion: boolean;
};

export function AnimationProvider({
  children,
  reducedMotion,
}: AnimationProviderProps) {
  useEffect(() => {
    registerGsapPlugins();
    const ctx = gsap.context(() => {
      gsap.defaults({
        ease: "power3.out",
        duration: reducedMotion ? 0 : 0.85,
      });
      ScrollTrigger.config({
        ignoreMobileResize: true,
      });
    });

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  const value = useMemo(
    () => ({ reducedMotion }),
    [reducedMotion],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
