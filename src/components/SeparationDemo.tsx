"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Deterministic PRNG so server and client render identical particles.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 300;
const SURFACE = 40;
const BASE_TOP = 58;
const INTERFACE = 150;
const BOTTOM = 250;

type Stone = { x: number; y: number; r: number; sink: number };
type Fine = { x: number; y: number; rise: number };

function useParticles() {
  return useMemo(() => {
    const rnd = mulberry32(7);
    const stones: Stone[] = [];
    for (let y = BASE_TOP + 8; y < INTERFACE - 4; y += 15) {
      for (let x = 6 + rnd() * 6; x < W - 4; x += 13 + rnd() * 6) {
        stones.push({ x, y: y + rnd() * 6 - 3, r: 4 + rnd() * 3.2, sink: rnd() });
      }
    }
    const fines: Fine[] = [];
    for (let i = 0; i < 260; i++) {
      fines.push({ x: rnd() * W, y: INTERFACE + 4 + rnd() * (BOTTOM - INTERFACE - 8), rise: rnd() });
    }
    return { stones, fines };
  }, []);
}

const round = (n: number) => Math.round(n * 10) / 10;

// Two rut troughs under the wheel paths.
const rutAt = (x: number, depth: number) =>
  depth * (Math.exp(-(((x - 85) / 28) ** 2)) + Math.exp(-(((x - 215) / 28) ** 2)));

function Panel({ t, withGeo }: { t: number; withGeo: boolean }) {
  const { stones, fines } = useParticles();
  const rut = withGeo ? 3 * t : 16 * t;

  const surface = Array.from({ length: 31 }, (_, i) => {
    const x = (i / 30) * W;
    return `${round(x)},${round(SURFACE + rutAt(x, rut))}`;
  }).join(" ");
  const asphaltBottom = Array.from({ length: 31 }, (_, i) => {
    const x = W - (i / 30) * W;
    return `${round(x)},${round(BASE_TOP + rutAt(x, rut * 0.8))}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${BOTTOM}`} className="h-auto w-full" aria-hidden>
      <rect x="0" y={INTERFACE} width={W} height={BOTTOM - INTERFACE} fill="var(--soil)" />
      <rect x="0" y={BASE_TOP} width={W} height={INTERFACE - BASE_TOP} fill="var(--paper-2)" />

      {stones.map((s, i) => {
        const dy = withGeo ? 2 * t * s.sink : (rutAt(s.x, 1) * 24 + 26 * s.sink) * t;
        return (
          <circle
            key={i}
            cx={round(s.x)}
            cy={round(s.y + dy + rutAt(s.x, rut) * 0.6)}
            r={round(s.r)}
            fill="var(--stone)"
            stroke="var(--stone-edge)"
            strokeWidth="0.8"
          />
        );
      })}

      {fines.map((f, i) => {
        // Without separation, fines pump up into the base.
        const pumped = !withGeo && f.rise > 0.55;
        const dy = pumped ? -(f.rise - 0.55) * 2.2 * (INTERFACE - BASE_TOP) * t - (f.y - INTERFACE) * 0.4 * t : 0;
        return <circle key={i} cx={round(f.x)} cy={round(f.y + dy)} r="1.3" fill="var(--fines)" />;
      })}

      {withGeo && (
        <rect x="0" y={INTERFACE - 2 + 2 * t} width={W} height="4" fill="var(--accent)" />
      )}

      <polygon points={`${surface} ${asphaltBottom}`} fill="var(--ink)" />
    </svg>
  );
}

export function SeparationDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || touched) return;
    if (reduce) {
      setT(1);
      return;
    }
    const controls = animate(0, 1, { duration: 3.2, delay: 0.4, ease: [0.45, 0, 0.2, 1], onUpdate: setT });
    return () => controls.stop();
  }, [inView, reduce, touched]);

  const years = Math.round(t * 10);
  const lossWithout = Math.round(t * 38);
  const lossWith = Math.round(t * 4);

  return (
    <div ref={ref} className="select-none">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {[false, true].map((withGeo) => (
          <figure key={String(withGeo)} className="min-w-0">
            <figcaption className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
              <span className={withGeo ? "eyebrow !text-accent" : "eyebrow"}>
                {withGeo ? "With geotextile" : "Without"}
              </span>
              <span className="font-mono text-[11px] text-muted tabular-nums sm:text-xs">
                −{withGeo ? lossWith : lossWithout}% base
              </span>
            </figcaption>
            <div className="overflow-hidden rounded-[3px] border border-line">
              <Panel t={t} withGeo={withGeo} />
            </div>
          </figure>
        ))}
      </div>

      <label className="mt-6 block">
        <span className="flex items-baseline justify-between">
          <span className="eyebrow">Drag — years of traffic</span>
          <span className="font-mono text-sm tabular-nums">{years} yr</span>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.001}
          value={t}
          onChange={(e) => {
            setTouched(true);
            setT(Number(e.target.value));
          }}
          className="range mt-3 w-full"
          aria-label="Years of traffic"
        />
      </label>
      <p className="mt-4 text-[13px] leading-relaxed text-muted">
        Illustrative. Without separation, aggregate punches into the subgrade and fines pump up into the base —
        the road ruts. A geotextile keeps both layers intact.
      </p>
    </div>
  );
}
