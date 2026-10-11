import type { Layer } from "@/lib/applications";

const heights: Record<Layer["kind"], number> = {
  asphalt: 34,
  concrete: 44,
  aggregate: 66,
  sand: 52,
  geo: 14,
  membrane: 14,
  soil: 80,
  water: 40,
};

const fills: Record<Layer["kind"], string> = {
  asphalt: "var(--ink)",
  concrete: "url(#ls-concrete)",
  aggregate: "url(#ls-aggregate)",
  sand: "url(#ls-sand)",
  geo: "var(--accent)",
  membrane: "var(--ink-2)",
  soil: "url(#ls-soil)",
  water: "url(#ls-water)",
};

export function LayerStack({ layers, compact = false }: { layers: Layer[]; compact?: boolean }) {
  const gap = 6;
  let y = 0;
  const placed = layers.map((l) => {
    const h = heights[l.kind];
    const out = { ...l, y, h };
    y += h + gap;
    return out;
  });
  const total = y - gap;
  const barW = compact ? 400 : 300;
  const width = compact ? 400 : 560;

  return (
    <svg
      viewBox={`0 0 ${width} ${total}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Cross-section: ${layers.map((l) => l.label).join(", ")}`}
    >
      <defs>
        <pattern id="ls-aggregate" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="var(--paper-2)" />
          <circle cx="4" cy="5" r="3" fill="var(--stone)" stroke="var(--stone-edge)" strokeWidth="0.6" />
          <circle cx="12" cy="12" r="3.4" fill="var(--stone)" stroke="var(--stone-edge)" strokeWidth="0.6" />
        </pattern>
        <pattern id="ls-sand" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="var(--paper-2)" />
          <circle cx="2" cy="2" r="0.9" fill="var(--muted)" />
          <circle cx="5" cy="5" r="0.7" fill="var(--muted)" />
        </pattern>
        <pattern id="ls-soil" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="var(--soil)" />
          <path d="M0 10 L10 0" stroke="var(--line)" strokeWidth="1" />
        </pattern>
        <pattern id="ls-concrete" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="var(--line)" />
          <path d="M3 4 l3 2 l-3 1z M13 13 l3 1 l-2 3z" fill="var(--muted)" />
        </pattern>
        <pattern id="ls-water" width="24" height="8" patternUnits="userSpaceOnUse">
          <rect width="24" height="8" fill="var(--paper)" />
          <path d="M0 4 q6 -4 12 0 t12 0" fill="none" stroke="var(--muted)" strokeWidth="1" />
        </pattern>
      </defs>
      {placed.map((l) => {
        const accent = l.kind === "geo";
        return (
          <g key={l.label}>
            <rect x="0" y={l.y} width={barW} height={l.h} fill={fills[l.kind]} />
            {!compact && (
              <>
                <line
                  x1={barW + 10}
                  x2={barW + 34}
                  y1={l.y + l.h / 2}
                  y2={l.y + l.h / 2}
                  stroke={accent ? "var(--accent)" : "var(--muted)"}
                />
                <text
                  x={barW + 42}
                  y={l.y + l.h / 2 + 4}
                  fontSize="12"
                  letterSpacing="1.2"
                  fontFamily="var(--font-geist-mono), monospace"
                  fill={accent ? "var(--accent-ink)" : "var(--ink-2)"}
                >
                  {l.label.toUpperCase()}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}
