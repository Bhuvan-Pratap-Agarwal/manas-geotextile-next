"use client";

import { motion, useReducedMotion } from "framer-motion";

const layers = [
  { label: "Wearing course", y: 40, h: 46, fill: "var(--ink)" },
  { label: "Granular base", y: 90, h: 92, fill: "url(#aggregate)" },
  { label: "Geotextile layer", y: 186, h: 10, fill: "var(--accent)", accent: true },
  { label: "Subgrade", y: 200, h: 160, fill: "url(#soil)" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function StrataVisual() {
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 660 380" className="h-auto w-full" role="img" aria-label="Pavement cross-section with a geotextile separation layer">
      <defs>
        <pattern id="aggregate" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="var(--paper-2)" />
          <circle cx="4" cy="5" r="2.2" fill="var(--line)" />
          <circle cx="13" cy="12" r="3" fill="var(--line)" />
          <circle cx="15" cy="3" r="1.2" fill="var(--muted)" opacity="0.5" />
        </pattern>
        <pattern id="soil" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill="var(--paper)" />
          <path d="M0 10 L10 0" stroke="var(--line)" strokeWidth="1" />
        </pattern>
      </defs>

      {layers.map((l, i) => (
        <motion.g
          key={l.label}
          initial={reduce ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease }}
        >
          <rect x="0" y={l.y} width="460" height={l.h} fill={l.fill} />
          <line
            x1="470"
            x2="500"
            y1={l.y + l.h / 2}
            y2={l.y + l.h / 2}
            stroke={l.accent ? "var(--accent)" : "var(--muted)"}
            strokeWidth="1"
          />
          <text
            x="508"
            y={l.y + l.h / 2 + 4}
            fontSize="12"
            letterSpacing="1.4"
            fontFamily="var(--font-geist-mono), monospace"
            fill={l.accent ? "var(--accent)" : "var(--ink-2)"}
          >
            {l.label.toUpperCase()}
          </text>
        </motion.g>
      ))}

      {/* load arrows */}
      {[90, 230, 370].map((x, i) => (
        <motion.g
          key={x}
          initial={reduce ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 + i * 0.08, ease }}
        >
          <line x1={x} x2={x} y1="0" y2="30" stroke="var(--ink)" strokeWidth="1" />
          <path d={`M${x - 4} 24 L${x} 32 L${x + 4} 24`} fill="none" stroke="var(--ink)" strokeWidth="1" />
        </motion.g>
      ))}

      {/* load spread under the geotextile */}
      <motion.path
        d="M60 196 L-20 360 M400 196 L480 360"
        stroke="var(--accent)"
        strokeWidth="1"
        strokeDasharray="4 5"
        fill="none"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay: 1.2, ease }}
      />
    </svg>
  );
}
