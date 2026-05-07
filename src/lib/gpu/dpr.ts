import { clamp } from "@/utils/math";

export interface AdaptiveDprOptions {
  max?: number;
  min?: number;
  capForMobile?: number;
}

export function getDevicePixelRatio(): number {
  if (typeof window === "undefined") return 1;
  return window.devicePixelRatio || 1;
}

export function getAdaptiveDpr(options: AdaptiveDprOptions = {}): number {
  const { max = 2, min = 1, capForMobile = 1.5 } = options;
  const raw = getDevicePixelRatio();
  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)")?.matches;
  const cap = isCoarse ? Math.min(max, capForMobile) : max;
  return clamp(raw, min, cap);
}
