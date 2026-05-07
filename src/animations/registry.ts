import type { Variants } from "framer-motion";
import { fadeUp, scaleIn, staggerContainer } from "./variants";

export const motionPresets = {
  fadeUp,
  staggerContainer,
  scaleIn,
} as const satisfies Record<string, Variants>;

export type MotionPresetId = keyof typeof motionPresets;

export function getMotionPreset(id: MotionPresetId): Variants {
  return motionPresets[id];
}
