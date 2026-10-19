"use client";

import { useState } from "react";

/** Drag to stretch a strip of PVC membrane up to its 300%+ elongation. */
export function StretchDemo() {
  const [pct, setPct] = useState(0);
  const W0 = 160;
  const w = W0 * (1 + pct / 100);
  const neck = 1 - Math.min(0.45, pct / 700); // strip gets thinner as it stretches
  const h = 70 * neck;
  const scale = 680 / (W0 * 4.2);
  const verdict =
    pct < 50 ? "Ground movement, settlement, temperature." : pct < 200 ? "Far beyond what a tunnel lining moves." : pct < 300 ? "Still in one piece." : "Over 300%. Still watertight.";

  return (
    <div className="rounded-[8px] border border-line bg-white p-6 sm:p-10">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[14px] font-semibold text-accent-ink">Drag to stretch the membrane</p>
        <p className="spec text-3xl font-medium text-navy sm:text-4xl">
          +{pct}
          <span className="text-xl">%</span>
        </p>
      </div>
      <svg viewBox="0 0 720 160" className="mt-6 h-auto w-full" aria-hidden>
        <g transform={`translate(${360 - (w * scale) / 2} ${80})`}>
          <rect x={-18} y={-50} width={18} height={100} rx={3} fill="#10347a" />
          <rect x={w * scale} y={-50} width={18} height={100} rx={3} fill="#10347a" />
          <path
            d={`M0 ${-35} C ${(w * scale) / 3} ${-h / 2}, ${(2 * w * scale) / 3} ${-h / 2}, ${w * scale} ${-35} L ${w * scale} 35 C ${(2 * w * scale) / 3} ${h / 2}, ${(w * scale) / 3} ${h / 2}, 0 35 Z`}
            fill="#e9dc8a"
            stroke="#b8a640"
            strokeWidth="1.5"
          />
          <path d={`M0 0 L ${w * scale} 0`} stroke="#d6c66d" strokeDasharray="6 6" />
        </g>
      </svg>
      <input
        type="range"
        min={0}
        max={320}
        step={1}
        value={pct}
        onChange={(e) => setPct(Number(e.target.value))}
        aria-label="Elongation of the PVC membrane in percent"
        aria-valuetext={`${pct} percent elongation`}
        className="range mt-4 w-full"
        style={{ backgroundSize: `${(pct / 320) * 100}% 3px, 100% 3px` }}
      />
      <p className="mt-4 text-lg font-semibold text-navy" aria-live="polite">{verdict}</p>
      <p className="mt-1 text-[14px] text-muted">Illustrative. Manas PVC membrane has an elongation at break of over 300%.</p>
    </div>
  );
}
