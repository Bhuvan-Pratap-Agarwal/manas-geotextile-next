"use client";

import { motion, useReducedMotion as useFmReducedMotion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { ApplicationAmbientVariant } from "@/sections/applications/applications-data";

type ApplicationsAmbientVisualProps = {
  variant: ApplicationAmbientVariant;
  /** When false (e.g. save-data tier), freeze subtle motion cues */
  ambientMotion: boolean;
};

const driftTransition = {
  duration: 18,
  repeat: Infinity,
  ease: "linear" as const,
};

const breathTransition = {
  duration: 11,
  repeat: Infinity,
  ease: [0.45, 0, 0.55, 1] as const,
};

export function ApplicationsAmbientVisual({
  variant,
  ambientMotion,
}: ApplicationsAmbientVisualProps) {
  const prefersReduced = useFmReducedMotion();
  const motionOn = ambientMotion && !prefersReduced;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--surface-base)]"
      aria-hidden
    >
      {variant === "road" && (
        <RoadLayers motionOn={motionOn} />
      )}
      {variant === "rail" && (
        <RailLayers motionOn={motionOn} />
      )}
      {variant === "tunnel" && (
        <TunnelLayers motionOn={motionOn} />
      )}
      {variant === "landfill" && (
        <LandfillLayers motionOn={motionOn} />
      )}
      {variant === "waterproofing" && (
        <WaterproofingLayers motionOn={motionOn} />
      )}
      {variant === "retaining" && (
        <RetainingLayers motionOn={motionOn} />
      )}
      {variant === "marine" && (
        <MarineLayers motionOn={motionOn} />
      )}
      {variant === "canal" && (
        <CanalLayers motionOn={motionOn} />
      )}
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(ellipse_85%_60%_at_50%_18%,transparent_40%,rgba(7,7,8,0.92)_76%)]",
        )}
      />
    </div>
  );
}

function RoadLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface-raised)_92%,#0a0b0e)_0%,transparent_52%,color-mix(in_oklab,var(--surface-base)_55%,#050507)_100%)]"
        aria-hidden
      />
      <div
        className="absolute -left-[8%] top-[42%] h-[38%] w-[118%] origin-center rotate-[5.5deg] bg-[linear-gradient(90deg,transparent,rgba(200,169,107,0.07),transparent),repeating-linear-gradient(180deg,color-mix(in_oklab,var(--engineering-line)_18%,transparent)_0px,color-mix(in_oklab,var(--engineering-line)_18%,transparent)_1px,transparent_1px,transparent_56px)]"
        aria-hidden
      />
      <div
        className="absolute left-[-14%] top-[62%] h-px w-[130%] bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent-primary)_32%,transparent),transparent)] opacity-85"
        aria-hidden
      />
      <motion.div
        className="absolute left-[-14%] top-[58%] h-px w-[130%] bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--text-primary)_9%,transparent),transparent)]"
        aria-hidden
        animate={
          motionOn ? { x: ["-4%", "4%", "-4%"], opacity: [0.08, 0.18, 0.08] } : {}
        }
        transition={{ ...breathTransition, duration: 14 }}
      />
      <motion.div
        className="absolute left-[6%] top-[48%] h-[160%] w-[110%] origin-top bg-[linear-gradient(120deg,color-mix(in_oklab,var(--surface-overlay)_42%,transparent),transparent_45%)]"
        aria-hidden
        animate={
          motionOn ? { opacity: [0.18, 0.32, 0.18], y: ["-1%", "0.6%", "-1%"] } : {}
        }
        transition={{ ...breathTransition, duration: 16 }}
      />
    </>
  );
}

function RailLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(200deg,color-mix(in_oklab,var(--surface-overlay)_70%,#0b0d12)_0%,var(--surface-base)_48%,color-mix(in_oklab,var(--surface-raised)_80%,transparent)_100%)]"
        aria-hidden
      />
      {[0.12, 0.28].map((o) => (
        <div
          key={o}
          className={cn(
            "absolute inset-0 bg-[repeating-linear-gradient(148deg,color-mix(in_oklab,var(--engineering-line)_16%,transparent)_0,color-mix(in_oklab,var(--engineering-line)_16%,transparent)_1px,transparent_1px,transparent_58px)]",
            o === 0.12 ? "opacity-50" : "opacity-85 mix-blend-screen",
          )}
          aria-hidden
        />
      ))}
      <motion.div
        className="absolute -left-[20%] top-[52%] h-[120%] w-[140%] origin-top skew-x-[8deg] bg-[linear-gradient(90deg,color-mix(in_oklab,var(--accent-muted)_35%,transparent),transparent)]"
        aria-hidden
        animate={
          motionOn ? { skewX: [7.8, 8.35, 7.8], opacity: [0.12, 0.26, 0.12] } : {}
        }
        transition={{ ...breathTransition, duration: 9 }}
      />
    </>
  );
}

function TunnelLayers({ motionOn }: { motionOn: boolean }) {
  const rings = [
    { scale: 0.88, ringAlpha: 18, baseOpacity: 0.22 },
    { scale: 0.62, ringAlpha: 24, baseOpacity: 0.17 },
    { scale: 0.42, ringAlpha: 30, baseOpacity: 0.12 },
  ] as const;

  return (
    <>
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_52%_40%,transparent_36%,rgba(12,13,17,1)_71%)] opacity-92"
        aria-hidden
      />
      {rings.map(({ scale, ringAlpha, baseOpacity }, i) => (
        <motion.div
          key={scale}
          className="pointer-events-none absolute left-1/2 top-[40%] h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
          aria-hidden
          style={{
            boxShadow: `inset 0 0 0 1px color-mix(in oklab, var(--engineering-line) ${ringAlpha}%, transparent)`,
            opacity: baseOpacity,
          }}
          initial={{ scale }}
          animate={
            motionOn
              ? { scale: [scale * 0.992, scale * 1.006, scale * 0.992] }
              : { scale }
          }
          transition={{ ...breathTransition, duration: 13 + i * 2 }}
        />
      ))}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,color-mix(in_oklab,var(--accent-primary)_10%,transparent),transparent_58%)]"
        aria-hidden
      />
    </>
  );
}

function LandfillLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface-raised)_55%,#08090c)_0%,var(--surface-base)_100%)]"
        aria-hidden
      />
      {[24, 38, 52, 66].map((top, i) => (
        <motion.div
          key={top}
          className="absolute left-[-10%] h-[12%] w-[120%] bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--engineering-line)_22%,transparent),transparent)]"
          style={{ top: `${top}%` }}
          aria-hidden
          animate={
            motionOn
              ? { opacity: [0.15, 0.28, 0.15], x: ["-0.6%", "0.6%", "-0.6%"] }
              : {}
          }
          transition={{ ...breathTransition, duration: 15 + i * 1.4, delay: i * 0.5 }}
        />
      ))}
      <div
        className="absolute inset-x-0 bottom-0 h-[42%] bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--accent-muted)_12%,transparent))]"
        aria-hidden
      />
    </>
  );
}

function WaterproofingLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(195deg,color-mix(in_oklab,var(--surface-overlay)_88%,#0c0e14)_0%,var(--surface-base)_55%)]"
        aria-hidden
      />
      <motion.div
        className="absolute left-[-12%] top-[30%] h-[70%] w-[124%] bg-[repeating-linear-gradient(180deg,color-mix(in_oklab,var(--text-primary)_7%,transparent)_0px,color-mix(in_oklab,var(--text-primary)_7%,transparent)_1px,transparent_1px,transparent_22px)] opacity-25"
        aria-hidden
        animate={motionOn ? { y: ["-1.2%", "1.2%", "-1.2%"] } : {}}
        transition={driftTransition}
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,transparent_40%,color-mix(in_oklab,var(--accent-primary)_8%,transparent)_50%,transparent_60%)] mix-blend-screen opacity-60"
        aria-hidden
      />
    </>
  );
}

function RetainingLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(168deg,color-mix(in_oklab,var(--surface-raised)_70%,#07080a)_0%,var(--surface-base)_65%)]"
        aria-hidden
      />
      {[18, 36, 54].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute -left-[15%] top-[32%] h-[120%] w-[130%] origin-top-left bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--engineering-line)_18%,transparent),transparent)]"
          style={{ transform: `rotate(${deg}deg)` }}
          aria-hidden
          animate={
            motionOn ? { opacity: [0.12, 0.24, 0.12] } : {}
          }
          transition={{ ...breathTransition, duration: 12 + i }}
        />
      ))}
      <div
        className="absolute bottom-0 left-0 right-0 h-[44%] bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--accent-muted)_14%,transparent))]"
        aria-hidden
      />
    </>
  );
}

function MarineLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(185deg,#0a1018_0%,var(--surface-base)_48%,color-mix(in_oklab,var(--surface-raised)_65%,#050608)_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-[-8%] top-[46%] h-[28%] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--text-primary)_6%,transparent),transparent)] opacity-60"
        aria-hidden
      />
      <motion.div
        className="absolute left-[-20%] top-[58%] h-px w-[140%] bg-[linear-gradient(90deg,transparent,color-mix(in_oklab,var(--accent-primary)_22%,transparent),transparent)]"
        aria-hidden
        animate={motionOn ? { x: ["-2%", "2%", "-2%"], opacity: [0.2, 0.45, 0.2] } : {}}
        transition={{ ...breathTransition, duration: 17 }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_110%,color-mix(in_oklab,var(--surface-overlay)_75%,transparent),transparent_65%)]"
        aria-hidden
      />
    </>
  );
}

function CanalLayers({ motionOn }: { motionOn: boolean }) {
  return (
    <>
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface-overlay)_55%,#070809)_0%,var(--surface-base)_55%)]"
        aria-hidden
      />
      <motion.div
        className="absolute left-[10%] top-[-8%] h-[140%] w-[18%] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--text-primary)_5%,transparent),transparent)] opacity-40"
        aria-hidden
        animate={motionOn ? { y: ["-0.8%", "0.8%", "-0.8%"] } : {}}
        transition={{ ...driftTransition, duration: 14 }}
      />
      <motion.div
        className="absolute right-[14%] top-[-6%] h-[140%] w-[14%] bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--accent-primary)_8%,transparent))] opacity-35"
        aria-hidden
        animate={motionOn ? { y: ["0.6%", "-0.6%", "0.6%"] } : {}}
        transition={{ ...driftTransition, duration: 16 }}
      />
      <div
        className="absolute inset-x-[-5%] top-[44%] h-[32%] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--engineering-line)_12%,transparent),transparent)]"
        aria-hidden
      />
    </>
  );
}
