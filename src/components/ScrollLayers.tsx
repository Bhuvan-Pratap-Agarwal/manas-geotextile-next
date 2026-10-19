"use client";

import { useEffect, useRef, useState } from "react";
import type { Layer as LayerSpec } from "@/lib/applications";

// Scroll-driven exploded cross-section. Drawn as isometric SVG prisms so it
// stays crisp at any size. Transforms are written straight to the DOM inside
// requestAnimationFrame, so scrolling never re-renders React.

const A = 230; // half-width of the isometric top face
const B = 133; // half-height of the isometric top face
const CX = 300;
const VIEW_W = 820;
const VIEW_H = 760;
const MAX_GAP = 78;

type Kind = LayerSpec["kind"];
type Style = { t: number; top: string; left: string; right: string; pattern?: string; stroke?: string };

const STYLES: Record<Kind, Style> = {
  asphalt: { t: 24, top: "#2a313d", left: "#1b2029", right: "#151921", pattern: "url(#p-asphalt)" },
  aggregate: { t: 60, top: "#d8d2c4", left: "#bab2a0", right: "#a69e8c", pattern: "url(#p-stone)" },
  geo: { t: 7, top: "#eef3fb", left: "#1f6fc5", right: "#1a5aa3", pattern: "url(#p-felt)", stroke: "#1f6fc5" },
  membrane: { t: 8, top: "#e9dc8a", left: "#20242b", right: "#14171c", pattern: "url(#p-membrane)", stroke: "#b8a640" },
  soil: { t: 84, top: "#c9b494", left: "#b39c7b", right: "#9c8667", pattern: "url(#p-soil)" },
  concrete: { t: 40, top: "#cfd3d8", left: "#aeb4bb", right: "#9aa1a9", pattern: "url(#p-concrete)" },
  sand: { t: 46, top: "#e3d3ad", left: "#cdbb91", right: "#baa77d", pattern: "url(#p-sand)" },
  water: { t: 30, top: "#9fc6e6", left: "#6fa3cf", right: "#5b8fbb", pattern: "url(#p-water)" },
};

export type SceneLayer = { label: string; detail?: string; kind: Kind };
export type SceneStep = { title: string; body: string };

const ROAD_LAYERS: SceneLayer[] = [
  { label: "Bituminous surface", detail: "40 mm", kind: "asphalt" },
  { label: "Crushed stone base", detail: "250 to 300 mm", kind: "aggregate" },
  { label: "Manas MGT geotextile", detail: "2 mm, 200 to 300 GSM", kind: "geo" },
  { label: "Clay subgrade", detail: "The ground you build on", kind: "soil" },
];

const ROAD_STEPS: SceneStep[] = [
  { title: "This is a road.", body: "What you drive on is only the top 40 millimetres." },
  { title: "Under it, a bed of crushed stone.", body: "It carries the load, but only as long as it stays clean and stays put." },
  { title: "Then 2 mm of Manas geotextile.", body: "Water drains through it. Soil can't get into the stone, and stone can't sink into the soil." },
  { title: "On top of the ground itself.", body: "Soft clay that would otherwise swallow the stone. With the fabric in place, the road keeps its shape for years longer." },
];

const prism = (y: number, t: number) => ({
  top: `${CX},${y} ${CX + A},${y + B} ${CX},${y + 2 * B} ${CX - A},${y + B}`,
  left: `${CX - A},${y + B} ${CX},${y + 2 * B} ${CX},${y + 2 * B + t} ${CX - A},${y + B + t}`,
  right: `${CX},${y + 2 * B} ${CX + A},${y + B} ${CX + A},${y + B + t} ${CX},${y + 2 * B + t}`,
});

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const ISO = "matrix(0.866 0.5 -0.866 0.5 0 0)";

export function ScrollLayers({
  layers = ROAD_LAYERS,
  steps = ROAD_STEPS,
  label = "What is inside a road",
}: {
  layers?: SceneLayer[];
  steps?: SceneStep[];
  label?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const labelRefs = useRef<(SVGGElement | null)[]>([]);
  const glowRef = useRef<SVGPolygonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const styled = layers.map((l) => ({ ...l, ...STYLES[l.kind] }));
  const geoIndex = styled.findIndex((l) => l.kind === "geo");

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const section = sectionRef.current;
    if (!section) return;
    setReduced(mq.matches);

    let raf = 0;
    let lastStep = -1;
    const totalT = styled.reduce((s, l) => s + l.t, 0);
    const gap = Math.min(MAX_GAP, (VIEW_H - 40 - 2 * B - totalT) / Math.max(1, styled.length - 1));

    const apply = (p: number) => {
      const e = ease(clamp((p - 0.12) / 0.6));
      const height = 2 * B + totalT + gap * (styled.length - 1) * e;
      let y = (VIEW_H - height) / 2;
      styled.forEach((l, i) => {
        const g = groupRefs.current[i];
        if (g) g.setAttribute("transform", `translate(0 ${y.toFixed(1)})`);
        const lab = labelRefs.current[i];
        if (lab) {
          lab.setAttribute("transform", `translate(0 ${y.toFixed(1)})`);
          lab.style.opacity = String(clamp((e - 0.3 - i * 0.1) / 0.25));
        }
        y += l.t + gap * e;
      });
      if (glowRef.current) glowRef.current.style.opacity = String(clamp((p - 0.45) / 0.15) * 0.9);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const s = Math.min(steps.length - 1, Math.floor(clamp(p, 0, 0.999) * steps.length));
      if (s !== lastStep) {
        lastStep = s;
        setStep(s);
      }
    };

    if (mq.matches) {
      apply(0.9);
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
    // Layers and steps are static per page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} aria-label={label} className={reduced ? "relative py-10" : "relative h-[300vh] md:h-[340vh]"}>
      <div className={reduced ? "" : "sticky top-16 h-[calc(100svh-4rem)] md:top-[108px] md:h-[calc(100svh-108px)]"}>
        <div className="mx-auto grid h-full w-full max-w-[1360px] grid-rows-[auto_1fr] items-center gap-2 px-5 sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-8 lg:px-12">
          <div className="relative pt-6 lg:col-span-5 lg:pt-0">
            <div className={reduced ? "" : "relative min-h-[170px] sm:min-h-[190px] lg:min-h-[300px]"}>
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={!reduced && i !== step}
                  className={
                    reduced
                      ? "mb-6"
                      : `absolute inset-x-0 top-0 transition-all duration-500 ease-out ${
                          i === step ? "translate-y-0 opacity-100" : i < step ? "-translate-y-4 opacity-0" : "translate-y-4 opacity-0"
                        }`
                  }
                >
                  <p className="text-[14px] font-semibold text-accent-ink">
                    {i + 1} of {steps.length}
                  </p>
                  <h2 className="mt-2 text-[clamp(1.6rem,3.4vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy [font-stretch:92%]">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-md text-[clamp(0.98rem,1.25vw,1.12rem)] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              ))}
            </div>
            {!reduced && (
              <div className="mt-4 hidden h-[3px] w-40 overflow-hidden rounded-full bg-line lg:block" aria-hidden>
                <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
              </div>
            )}
          </div>

          <div className={reduced ? "relative aspect-[820/760] lg:col-span-7" : "relative h-full min-h-0 lg:col-span-7"}>
            <svg
              viewBox={narrow ? `${CX - A - 20} 0 ${2 * A + 40} ${VIEW_H}` : `0 0 ${VIEW_W} ${VIEW_H}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={`Exploded cross-section: ${layers.map((l) => l.label).join(", ")}`}
            >
              <defs>
                <pattern id="p-asphalt" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="7" height="7" fill="#2a313d" />
                  <circle cx="2" cy="2" r="0.8" fill="#3a4352" />
                  <circle cx="5.5" cy="5" r="0.6" fill="#454f60" />
                </pattern>
                <pattern id="p-stone" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="26" height="26" fill="#d8d2c4" />
                  <circle cx="6" cy="7" r="5" fill="#c4bcaa" stroke="#a9a08c" strokeWidth="0.8" />
                  <circle cx="18" cy="17" r="6" fill="#cbc4b3" stroke="#a9a08c" strokeWidth="0.8" />
                  <circle cx="20" cy="4" r="2.5" fill="#bdb5a2" />
                  <circle cx="7" cy="21" r="3" fill="#c0b8a5" />
                </pattern>
                <pattern id="p-felt" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="12" height="12" fill="#eef3fb" />
                  <path d="M0 3 Q4 1 8 4 T12 3 M0 9 Q3 7 6 10 T12 8 M2 0 Q4 6 3 12 M9 0 Q7 5 10 12" stroke="#c9d8ee" strokeWidth="0.6" fill="none" />
                </pattern>
                <pattern id="p-soil" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="14" height="14" fill="#c9b494" />
                  <circle cx="3" cy="4" r="0.9" fill="#a8916f" />
                  <circle cx="10" cy="9" r="0.7" fill="#a8916f" />
                  <circle cx="7" cy="12" r="0.6" fill="#b29c7a" />
                </pattern>
                <pattern id="p-concrete" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="18" height="18" fill="#cfd3d8" />
                  <circle cx="4" cy="5" r="1.2" fill="#b8bec5" />
                  <circle cx="13" cy="12" r="1.6" fill="#bcc2c9" />
                  <circle cx="9" cy="16" r="0.8" fill="#a9b0b8" />
                </pattern>
                <pattern id="p-sand" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="6" height="6" fill="#e3d3ad" />
                  <circle cx="2" cy="2" r="0.7" fill="#c9b78c" />
                  <circle cx="5" cy="4.5" r="0.5" fill="#d0bf95" />
                </pattern>
                <pattern id="p-water" width="24" height="10" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="24" height="10" fill="#9fc6e6" />
                  <path d="M0 5 q6 -4 12 0 t12 0" fill="none" stroke="#c7def2" strokeWidth="1.2" />
                </pattern>
                <pattern id="p-membrane" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform={ISO}>
                  <rect width="40" height="40" fill="#e9dc8a" />
                  <path d="M0 20 H40" stroke="#d6c66d" strokeWidth="1.5" />
                </pattern>
                <filter id="f-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>

              {[...styled].reverse().map((l) => {
                const i = styled.indexOf(l);
                const pr = prism(0, l.t);
                const isGeo = i === geoIndex;
                return (
                  <g key={`${l.label}-${i}`} ref={(el) => { groupRefs.current[i] = el; }}>
                    {isGeo && <polygon ref={glowRef} points={pr.top} fill="#3fb7e4" filter="url(#f-glow)" style={{ opacity: 0 }} />}
                    <polygon points={pr.left} fill={l.left} />
                    <polygon points={pr.right} fill={l.right} />
                    <polygon points={pr.top} fill={l.pattern ?? l.top} stroke={l.stroke ?? "rgba(0,0,0,0.12)"} strokeWidth={l.stroke ? 1.5 : 1} />
                    {isGeo && (
                      <text transform={`matrix(0.866 0.5 -0.866 0.5 ${CX - 70} ${B - 4})`} fontSize="20" fontWeight="800" fill="#1f6fc5" opacity="0.55" fontFamily="var(--font-archivo), sans-serif" letterSpacing="2">
                        MANAS MGT
                      </text>
                    )}
                  </g>
                );
              })}

              {styled.map((l, i) => {
                const hi = l.kind === "geo" || l.kind === "membrane";
                const color = l.kind === "geo" ? "#1a62b0" : "#0f1b2d";
                return (
                  <g key={`${l.label}-label-${i}`} ref={(el) => { labelRefs.current[i] = el; }} style={{ opacity: 0 }} className="max-sm:hidden">
                    <line x1={CX + A + 10} x2={CX + A + 48} y1={B + l.t / 2} y2={B + l.t / 2} stroke={l.kind === "geo" ? "#1f6fc5" : "#8a93a1"} strokeWidth="1.5" />
                    <circle cx={CX + A + 10} cy={B + l.t / 2} r="3.5" fill={l.kind === "geo" ? "#1f6fc5" : "#8a93a1"} />
                    <text x={CX + A + 58} y={B + l.t / 2 + (l.detail ? -2 : 6)} fontSize={l.label.length > 22 ? 16 : 20} fontWeight={hi ? 700 : 600} fill={color} fontFamily="var(--font-archivo), sans-serif">
                      {l.label}
                    </text>
                    {l.detail && (
                      <text x={CX + A + 58} y={B + l.t / 2 + 21} fontSize="16" fill="#5a6472" fontFamily="var(--font-archivo), sans-serif">
                        {l.detail}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
