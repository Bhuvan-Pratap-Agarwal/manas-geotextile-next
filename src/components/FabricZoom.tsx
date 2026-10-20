"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Scroll-driven zoom from a 5 m roll into the fibres of one square metre of
// MGT-30. Units are millimetres. Facts use the MGT datasheet for 300 GSM.

type VB = [number, number, number, number];
const STAGES: VB[] = [
  [-450, -1150, 5900, 5200], // the roll and a run of fabric
  [1880, 880, 1240, 1240], // one square metre
  [2440, 1440, 120, 120], // 100 mm
  [2493.5, 1493.5, 13, 13], // a few millimetres
];
const SCALE = ["5 m", "1 m", "100 mm", "10 mm"];

const STEPS = [
  { title: "A 5 metre roll.", body: "Made and wound at Bawal. MGT-30, 300 grams per square metre." },
  { title: "One square metre.", body: "300 grams of fabric that holds a pull of 17 kN per metre of width. That's about 1.7 tonnes." },
  { title: "Closer.", body: "Push a 50 mm plunger through it and it takes 3,100 newtons, about 316 kg, before it gives. And 40 litres of water pass through every second." },
  { title: "Fibre by fibre.", body: "Thousands of polypropylene fibres, locked together by needles. The gaps are under 75 microns, about the width of a hair. Water gets through. Soil doesn't." },
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fibres(seed: number, n: number, cx: number, cy: number, spread: number, minL: number, maxL: number) {
  const rnd = mulberry32(seed);
  let d = "";
  for (let i = 0; i < n; i++) {
    const x = cx + (rnd() - 0.5) * spread;
    const y = cy + (rnd() - 0.5) * spread;
    const a = rnd() * Math.PI;
    const len = minL + rnd() * (maxL - minL);
    const hx = (Math.cos(a) * len) / 2;
    const hy = (Math.sin(a) * len) / 2;
    const b = (rnd() - 0.5) * 0.8 * len;
    const r = (v: number) => Math.round(v * 100) / 100;
    d += `M${r(x - hx)} ${r(y - hy)}Q${r(x - Math.sin(a) * b)} ${r(y + Math.cos(a) * b)} ${r(x + hx)} ${r(y + hy)}`;
  }
  return d;
}

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const smooth = (x: number) => x * x * (3 - 2 * x);

function lerpVB(a: VB, b: VB, k: number): VB {
  // Interpolate size geometrically so the zoom feels constant-speed.
  const w = a[2] * Math.pow(b[2] / a[2], k);
  const h = a[3] * Math.pow(b[3] / a[3], k);
  const cxA = a[0] + a[2] / 2;
  const cyA = a[1] + a[3] / 2;
  const cxB = b[0] + b[2] / 2;
  const cyB = b[1] + b[3] / 2;
  const m = (a[2] - w) / (a[2] - b[2] || 1);
  const cx = cxA + (cxB - cxA) * m;
  const cy = cyA + (cyB - cyA) * m;
  return [cx - w / 2, cy - h / 2, w, h];
}

export function FabricZoom() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  const paths = useMemo(
    () => ({
      medium: fibres(3, 1300, 2500, 1500, 1100, 18, 60),
      fine: fibres(7, 420, 2500, 1500, 70, 3, 14),
      micro: fibres(11, 160, 2500, 1500, 12, 0.8, 3.5),
    }),
    [],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const section = sectionRef.current;
    const svg = svgRef.current;
    if (!section || !svg) return;
    let raf = 0;
    let last = -1;

    const apply = (p: number) => {
      const seg = clamp((p - 0.06) / 0.84) * (STAGES.length - 1);
      const i = Math.min(STAGES.length - 2, Math.floor(seg));
      const vb = lerpVB(STAGES[i], STAGES[i + 1], smooth(clamp(seg - i)));
      svg.setAttribute("viewBox", vb.map((v) => v.toFixed(3)).join(" "));
      const s = Math.min(STEPS.length - 1, Math.round(seg));
      if (s !== last) {
        last = s;
        setStep(s);
      }
    };

    if (mq.matches) {
      apply(0.34);
      return;
    }
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = section.getBoundingClientRect();
        const travel = r.height - window.innerHeight;
        apply(travel > 0 ? clamp(-r.top / travel) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="zoom" aria-label="Zoom into one square metre of geotextile" className={reduced ? "relative py-10" : "relative h-[340vh]"}>
      <div className={reduced ? "" : "sticky top-16 h-[calc(100svh-4rem)] md:top-[108px] md:h-[calc(100svh-108px)]"}>
        <div className="mx-auto grid h-full max-w-[1360px] grid-rows-[auto_1fr] items-center gap-4 px-5 sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-10 lg:px-12">
          <div className="relative pt-6 lg:col-span-5 lg:pt-0">
            <div className={reduced ? "" : "relative min-h-[180px] lg:min-h-[300px]"}>
              {STEPS.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={!reduced && i !== step}
                  className={
                    reduced
                      ? "mb-6"
                      : `absolute inset-x-0 top-0 transition-all duration-500 ease-out ${i === step ? "translate-y-0 opacity-100" : i < step ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0"}`
                  }
                >
                  <p className="spec text-[14px] text-accent-ink">Scale · {SCALE[i]}</p>
                  <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy [font-stretch:92%]">{s.title}</h2>
                  <p className="mt-3 max-w-md text-[clamp(0.98rem,1.25vw,1.12rem)] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-full min-h-0 lg:col-span-7">
            <div className="absolute inset-0 overflow-hidden rounded-[12px] bg-[#eef2f8] shadow-[inset_0_0_0_1px_rgba(16,52,122,0.08)]">
              <svg ref={svgRef} viewBox={STAGES[0].join(" ")} preserveAspectRatio="xMidYMid meet" className="h-full w-full" role="img" aria-label="Geotextile roll, zooming into its fibres">
                <defs>
                  <pattern id="z-felt" width="60" height="60" patternUnits="userSpaceOnUse">
                    <rect width="60" height="60" fill="#f5f8fc" />
                    <path d="M2 12 Q20 4 38 14 M18 40 Q34 30 56 44 M6 52 Q14 34 4 24 M40 2 Q50 22 44 36 M24 22 Q32 28 30 50 M48 50 Q54 40 58 56" stroke="#bccbe0" strokeWidth="2.4" fill="none" />
                  </pattern>
                  <linearGradient id="z-roll" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ffffff" />
                    <stop offset="0.45" stopColor="#e3eaf4" />
                    <stop offset="1" stopColor="#8fa3c2" />
                  </linearGradient>
                  <linearGradient id="z-shadow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#10347a" stopOpacity="0.18" />
                    <stop offset="1" stopColor="#10347a" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Unrolled fabric */}
                <rect x="0" y="0" width="5000" height="3400" fill="url(#z-felt)" />
                <rect x="0" y="0" width="5000" height="260" fill="url(#z-shadow)" />
                <rect x="0" y="0" width="5000" height="3400" fill="none" stroke="#b7c5da" strokeWidth="10" />
                {/* Roll: a cylinder with wound layers visible on the end */}
                <rect x="0" y="-760" width="5000" height="760" fill="url(#z-roll)" />
                {[-640, -520, -400, -280, -160].map((y) => (
                  <line key={y} x1="40" x2="4960" y1={y} y2={y} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="6" />
                ))}
                <ellipse cx="5000" cy="-380" rx="150" ry="380" fill="#dfe6f1" stroke="#9fb0c9" strokeWidth="8" />
                <ellipse cx="0" cy="-380" rx="150" ry="380" fill="#f3f6fa" stroke="#9fb0c9" strokeWidth="8" />
                {[0.85, 0.7, 0.55, 0.4].map((k) => (
                  <ellipse key={k} cx="0" cy="-380" rx={150 * k} ry={380 * k} fill="none" stroke="#c3cfe1" strokeWidth="6" />
                ))}
                <ellipse cx="0" cy="-380" rx="42" ry="105" fill="#3c4656" />
                <text x="2500" y="-300" textAnchor="middle" fontSize="190" fontWeight="800" fill="#1f6fc5" opacity="0.75" fontFamily="var(--font-archivo), sans-serif">MANAS MGT-30</text>
                {/* 5 m dimension */}
                <path d="M0 3600 H5000 M0 3540 V3660 M5000 3540 V3660" stroke="#10347a" strokeWidth="12" />
                <text x="2500" y="3830" textAnchor="middle" fontSize="170" fontWeight="700" fill="#10347a" fontFamily="var(--font-archivo), sans-serif">5 m</text>
                {/* One square metre */}
                <rect x="2000" y="1000" width="1000" height="1000" fill="#ffffff" />
                <path d={paths.medium} stroke="#7d95bd" strokeWidth="0.55" fill="none" strokeLinecap="round" />
                <path d={paths.fine} stroke="#5f7aa8" strokeWidth="0.11" fill="none" strokeLinecap="round" />
                <path d={paths.micro} stroke="#3f5c8f" strokeWidth="0.04" fill="none" strokeLinecap="round" />
                <rect x="2000" y="1000" width="1000" height="1000" fill="none" stroke="#1f6fc5" strokeWidth="10" />
                <text x="2500" y="975" textAnchor="middle" fontSize="60" fontWeight="700" fill="#1f6fc5" fontFamily="var(--font-archivo), sans-serif">1 m²</text>
                {/* 100 mm frame */}
                <rect x="2450" y="1450" width="100" height="100" fill="none" stroke="#1f6fc5" strokeWidth="0.8" strokeDasharray="3 3" />
                {/* Soil grains held back, shown at the smallest scale */}
                <circle cx="2497.2" cy="1497.6" r="0.55" fill="#b9a789" opacity="0.9" />
                <circle cx="2502.4" cy="1501.8" r="0.4" fill="#a8916f" opacity="0.9" />
                <circle cx="2499.6" cy="1503.1" r="0.3" fill="#b9a789" opacity="0.9" />
              </svg>
            </div>
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[13px] font-semibold text-navy shadow-sm" aria-hidden>
              <span className="spec">{SCALE[step]}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
