"use client";

import { ApplicationsAmbientVisual } from "@/sections/applications/ApplicationsAmbientVisual";
import { ApplicationsStructuralOverlay } from "@/sections/applications/ApplicationsStructuralOverlay";
import type { ApplicationSpec } from "@/sections/applications/applications-data";
import { cn } from "@/utils/cn";

type ApplicationsPanelProps = {
  spec: ApplicationSpec;
  layout: "rail" | "stack";
  ambientMotion: boolean;
};

export function ApplicationsPanel({
  spec,
  layout,
  ambientMotion,
}: ApplicationsPanelProps) {
  return (
    <article
      className={cn(
        "relative flex shrink-0 flex-col justify-end overflow-hidden bg-[var(--surface-base)]",
        layout === "rail" &&
          "h-[100svh] min-w-[min(100dvw,100svw)] border-r border-border/45",
        layout === "stack" &&
          "min-h-[86svh] w-full border-b border-border/45 last:border-b-0",
      )}
      aria-labelledby={`app-title-${spec.id}`}
    >
      <ApplicationsAmbientVisual
        variant={spec.variant}
        ambientMotion={ambientMotion}
      />
      <div className="pointer-events-none absolute inset-0 surface-grid opacity-[0.1]" />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--accent-primary)_22%,transparent),transparent)] opacity-45"
        aria-hidden
      />
      <ApplicationsStructuralOverlay variant={spec.variant} />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--surface-base)_55%,transparent),transparent)]" />
      <div className="relative z-10 flex h-full flex-col justify-end px-[var(--gutter-x)] pb-[max(3.25rem,env(safe-area-inset-bottom))] pt-28 md:pb-20 md:pt-32 lg:pb-24 min-[1800px]:px-[max(var(--gutter-x),3vw)] min-[2200px]:px-[max(var(--gutter-x),4vw)]">
        <div className="mx-auto w-full max-w-[min(100%,var(--container-max))] min-[1800px]:max-w-[min(100%,112rem)]">
          <p className="type-caption text-[color-mix(in_oklab,var(--accent-primary)_68%,var(--text-muted)_32%)]">
            {spec.indexLabel}
          </p>
          <h2
            id={`app-title-${spec.id}`}
            className="type-display mt-3 max-w-[16ch] text-balance whitespace-pre-line text-[color-mix(in_oklab,var(--text-primary)_97%,var(--accent-primary)_3%)] leading-[0.9] tracking-[-0.045em] min-[1800px]:max-w-[22ch] min-[1800px]:text-[clamp(3.5rem,5.2vw+1rem,7.5rem)]"
          >
            {spec.title}
          </h2>
          <p className="type-caption mt-5 max-w-prose text-[color-mix(in_oklab,var(--accent-primary)_35%,var(--text-muted)_65%)]">
            {spec.dek}
          </p>
          <p className="type-body mt-4 max-w-[36rem] text-muted">{spec.body}</p>
          <div className="type-caption mt-10 max-w-[56rem] border-t border-border/55 pt-4 text-[color-mix(in_oklab,var(--text-muted)_88%,var(--accent-primary)_12%)] tracking-[0.18em]">
            {spec.datum}
          </div>
        </div>
      </div>
    </article>
  );
}
