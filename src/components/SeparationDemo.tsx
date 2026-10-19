"use client";

import { memo, useEffect, useMemo, useRef, useState } from "react";

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

const PARTICLES = (() => {
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
})();

const r1 = (n: number) => Math.round(n * 10) / 10;

// Two rut troughs under the wheel paths.
const rutAt = (x: number, depth: number) =>
  depth * (Math.exp(-(((x - 85) / 28) ** 2)) + Math.exp(-(((x - 215) / 28) ** 2)));

// All circles of one kind are drawn as a single <path> — far cheaper to
// re-render every animation frame than hundreds of <circle> elements.
const circle = (cx: number, cy: number, r: number) =>
  `M${r1(cx - r)} ${r1(cy)}a${r1(r)} ${r1(r)} 0 1 0 ${r1(2 * r)} 0a${r1(r)} ${r1(r)} 0 1 0 ${r1(-2 * r)} 0`;

function geometry(t: number, withGeo: boolean) {
  const rut = withGeo ? 3 * t : 16 * t;
  const stones = PARTICLES.stones
    .map((s) => {
      const dy = withGeo ? 2 * t * s.sink : (rutAt(s.x, 1) * 24 + 26 * s.sink) * t;
      return circle(s.x, s.y + dy + rutAt(s.x, rut) * 0.6, s.r);
    })
    .join("");
  const fines = PARTICLES.fines
    .map((f) => {
      const pumped = !withGeo && f.rise > 0.55;
      const dy = pumped ? -(f.rise - 0.55) * 2.2 * (INTERFACE - BASE_TOP) * t - (f.y - INTERFACE) * 0.4 * t : 0;
      return circle(f.x, f.y + dy, 1.3);
    })
    .join("");
  const top = Array.from({ length: 31 }, (_, i) => {
    const x = (i / 30) * W;
    return `${r1(x)},${r1(SURFACE + rutAt(x, rut))}`;
  });
  const bottom = Array.from({ length: 31 }, (_, i) => {
    const x = W - (i / 30) * W;
    return `${r1(x)},${r1(BASE_TOP + rutAt(x, rut * 0.8))}`;
  });
  return { stones, fines, asphalt: [...top, ...bottom].join(" ") };
}

export const Panel = memo(function Panel({ t, withGeo }: { t: number; withGeo: boolean }) {
  const g = useMemo(() => geometry(t, withGeo), [t, withGeo]);
  return (
    <svg viewBox={`0 0 ${W} ${BOTTOM}`} className="block h-auto w-full" aria-hidden>
      <rect x="0" y={INTERFACE} width={W} height={BOTTOM - INTERFACE} fill="var(--soil)" />
      <rect x="0" y={BASE_TOP} width={W} height={INTERFACE - BASE_TOP} fill="var(--paper-2)" />
      <path d={g.stones} fill="var(--stone)" stroke="var(--stone-edge)" strokeWidth="0.8" />
      <path d={g.fines} fill="var(--fines)" />
      {withGeo && <rect x="0" y={INTERFACE - 2 + 2 * t} width={W} height="4" fill="var(--accent)" />}
      <polygon points={g.asphalt} fill="var(--ink)" />
    </svg>
  );
});

const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2);

export function SeparationDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const touched = useRef(false);

  // Auto-play once when scrolled into view, after the page has settled.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(1);
      return;
    }
    let raf = 0;
    let timer = 0;
    const play = () => {
      const start = performance.now();
      const step = (now: number) => {
        if (touched.current) return;
        const p = Math.min(1, (now - start) / 3200);
        // Quantise to ~60 steps so React only re-renders when the picture changes.
        setT(Math.round(easeInOut(p) * 60) / 60);
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(play, 600);
      },
      { rootMargin: "-15% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, []);

  const years = Math.round(t * 10);
  const lossWithout = Math.round(t * 38);
  const lossWith = Math.round(t * 4);

  return (
    <div ref={ref} className="select-none">
      <div className="grid grid-cols-2 gap-3 sm:gap-5">
        {[false, true].map((withGeo) => (
          <figure key={String(withGeo)} className="min-w-0">
            <figcaption className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
              <span className={withGeo ? "eyebrow !text-accent-ink" : "eyebrow"}>
                {withGeo ? "With geotextile" : "Without"}
              </span>
              <span className="spec text-xs text-muted tabular-nums">
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
          <span className="eyebrow">Drag to add years of traffic</span>
          <span className="spec text-sm tabular-nums" aria-hidden>{years} yr</span>
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={t}
          onChange={(e) => {
            touched.current = true;
            setT(Number(e.target.value));
          }}
          aria-valuetext={`${years} years: ${lossWithout}% base lost without geotextile, ${lossWith}% with`}
          className="range mt-2 w-full"
          style={{ backgroundSize: `${t * 100}% 2px, 100% 2px` }}
        />
      </label>
      <p className="mt-4 text-[13px] leading-relaxed text-muted">
        Illustrative. Without separation, aggregate punches into the subgrade and fines pump up into the base, the
        road ruts. A geotextile keeps both layers intact.
      </p>
    </div>
  );
}
