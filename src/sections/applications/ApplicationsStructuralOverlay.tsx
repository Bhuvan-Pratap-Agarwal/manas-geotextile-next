"use client";

import type { ApplicationAmbientVariant } from "@/sections/applications/applications-data";
import { cn } from "@/utils/cn";

type ApplicationsStructuralOverlayProps = {
  variant: ApplicationAmbientVariant;
  className?: string;
};

const stroke =
  "color-mix(in oklab, var(--engineering-line) 42%, transparent)";

export function ApplicationsStructuralOverlay({
  variant,
  className,
}: ApplicationsStructuralOverlayProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full mix-blend-screen opacity-[0.38]",
        className,
      )}
      viewBox="0 0 1200 800"
      preserveAspectRatio="none"
      aria-hidden
    >
      <g
        stroke={stroke}
        strokeWidth="0.7"
        fill="none"
        className="text-[var(--engineering-line)]"
      >
        {variant === "road" && (
          <>
            <path d="M0 540 L1200 460" opacity="0.55" />
            <path d="M80 800 L1120 360" opacity="0.28" />
            <path d="M0 620 H1200" opacity="0.18" strokeDasharray="6 18" />
          </>
        )}
        {variant === "rail" && (
          <>
            <path d="M0 520 L1200 500" opacity="0.5" />
            <path d="M200 800 L1000 280" opacity="0.22" />
            <path d="M0 505 L1200 495" opacity="0.35" />
          </>
        )}
        {variant === "tunnel" && (
          <>
            <ellipse cx="600" cy="360" rx="520" ry="220" opacity="0.22" />
            <ellipse cx="600" cy="360" rx="420" ry="175" opacity="0.16" />
            <path d="M120 640 Q600 520 1080 640" opacity="0.2" />
          </>
        )}
        {variant === "landfill" && (
          <>
            <path d="M0 430 H1200" opacity="0.2" />
            <path d="M0 480 H1200" opacity="0.18" />
            <path d="M0 530 H1200" opacity="0.16" />
            <path d="M0 580 H1200" opacity="0.14" />
          </>
        )}
        {variant === "waterproofing" && (
          <>
            <path d="M0 360 Q600 320 1200 360" opacity="0.24" />
            <path d="M0 420 Q600 380 1200 420" opacity="0.2" />
            <path d="M0 480 Q600 440 1200 480" opacity="0.16" />
          </>
        )}
        {variant === "retaining" && (
          <>
            <path d="M120 800 L420 200" opacity="0.26" />
            <path d="M320 800 L580 220" opacity="0.22" />
            <path d="M520 800 L760 240" opacity="0.18" />
            <path d="M0 640 L1200 520" opacity="0.16" />
          </>
        )}
        {variant === "marine" && (
          <>
            <path d="M0 520 C300 500 900 460 1200 500" opacity="0.28" />
            <path d="M0 560 C320 540 880 500 1200 540" opacity="0.2" />
            <path d="M0 600 C340 580 860 540 1200 580" opacity="0.14" />
          </>
        )}
        {variant === "canal" && (
          <>
            <path d="M240 0 V800" opacity="0.15" />
            <path d="M600 0 V800" opacity="0.12" />
            <path d="M960 0 V800" opacity="0.1" />
            <path d="M0 420 H1200" opacity="0.18" strokeDasharray="4 14" />
          </>
        )}
      </g>
    </svg>
  );
}
