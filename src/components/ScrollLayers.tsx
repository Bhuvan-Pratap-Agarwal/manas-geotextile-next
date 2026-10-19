"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-driven exploded cross-section of a road. Drawn as isometric SVG
// prisms so it stays crisp at any size. Transforms are written straight to
// the DOM inside requestAnimationFrame, so scrolling never re-renders React.

const A = 230; // half-width of the isometric top face
const B = 133; // half-height of the isometric top face
const CX = 300;
const VIEW_W = 820;
const VIEW_H = 760;
const GAP = 78; // extra space between layers when fully exploded

type Layer = {
  id: string;
  label: string;
  detail: string;
  t: number; // thickness in px
  top: string;
  left: string;
  right: string;
  pattern?: string;
  accent?: boolean;
};

const LAYERS: Layer[] = [
  { id: "asphalt", label: "Bituminous surface", detail: "40 mm", t: 24, top: "#2a313d", left: "#1b2029", right: "#151921", pattern: "url(#p-asphalt)" },
  { id: "base", label: "Crushed stone base", detail: "250 to 300 mm", t: 62, top: "#d8d2c4", left: "#bab2a0", right: "#a69e8c", pattern: "url(#p-stone)" },
  { id: "geo", label: "Manas MGT geotextile", detail: "2 mm, 200 to 300 GSM", t: 7, top: "#eef3fb", left: "#1f6fc5", right: "#1a5aa3", pattern: "url(#p-felt)", accent: true },
  { id: "soil", label: "Clay subgrade", detail: "The ground you build on", t: 92, top: "#c9b494", left: "#b39c7b", right: "#9c8667", pattern: "url(#p-soil)" },
];

const STEPS = [
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

export function ScrollLayers() {
  const sectionRef = useRef<HTMLElement>(null);
  const groupRefs = useRef<(SVGGElement | null)[]>([]);
  const labelRefs = useRef<(SVGGElement | null)[]>([]);
  const glowRef = useRef<SVGPolygonElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [narrow, setNarrow] = useState(false);

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
    const totalT = LAYERS.reduce((s, l) => s + l.t, 0);

    const apply = (p: number) => {
      // 0 to 0.15: assembled. 0.15 to 0.85: layers separate. Rest: hold.
      const e = ease(clamp((p - 0.12) / 0.6));
      const height = 2 * B + totalT + GAP * (LAYERS.length - 1) * e;
      let y = (VIEW_H - height) / 2;
      LAYERS.forEach((l, i) => {
        const g = groupRefs.current[i];
        if (g) g.setAttribute("transform", `translate(0 ${y.toFixed(1)})`);
        const lab = labelRefs.current[i];
        if (lab) {
          lab.setAttribute("transform", `translate(0 ${y.toFixed(1)})`);
          lab.style.opacity = String(clamp((e - 0.35 - i * 0.12) / 0.25));
        }
        y += l.t + GAP * e;
      });
      if (glowRef.current) glowRef.current.style.opacity = String(clamp((p - 0.45) / 0.15) * 0.9);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      const s = Math.min(STEPS.length - 1, Math.floor(clamp(p, 0, 0.999) * STEPS.length));
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
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="What is inside a road"
      className={reduced ? "relative" : "relative h-[300vh] md:h-[340vh]"}
    >
      <div className={reduced ? "" : "sticky top-16 h-[calc(100svh-4rem)] md:top-[108px] md:h-[calc(100svh-108px)]"}>
        <div className="mx-auto grid h-full w-full max-w-[1360px] grid-rows-[auto_1fr] items-center gap-2 px-5 sm:px-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-8 lg:px-12">
          {/* Story text */}
          <div className="relative pt-6 lg:col-span-5 lg:pt-0">
            <div className="relative min-h-[150px] sm:min-h-[170px] lg:min-h-[260px]">
              {STEPS.map((s, i) => (
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
                    {i + 1} of {STEPS.length}
                  </p>
                  <h2 className="mt-2 text-[clamp(1.7rem,3.6vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy [font-stretch:92%]">
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-md text-[clamp(1rem,1.3vw,1.15rem)] leading-relaxed text-ink-2">{s.body}</p>
                </div>
              ))}
            </div>
            {!reduced && (
              <div className="mt-4 hidden h-[3px] w-40 overflow-hidden rounded-full bg-line lg:block" aria-hidden>
                <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
              </div>
            )}
          </div>

          {/* Exploded cross-section */}
          <div className="relative h-full min-h-0 lg:col-span-7">
            <svg
              viewBox={narrow ? `${CX - A - 20} 0 ${2 * A + 40} ${VIEW_H}` : `0 0 ${VIEW_W} ${VIEW_H}`}
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Exploded cross-section of a road: bituminous surface, crushed stone base, Manas geotextile, clay subgrade"
            >
              <defs>
                <pattern id="p-asphalt" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="matrix(0.866 0.5 -0.866 0.5 0 0)">
                  <rect width="7" height="7" fill="#2a313d" />
                  <circle cx="2" cy="2" r="0.8" fill="#3a4352" />
                  <circle cx="5.5" cy="5" r="0.6" fill="#454f60" />
                </pattern>
                <pattern id="p-stone" width="26" height="26" patternUnits="userSpaceOnUse" patternTransform="matrix(0.866 0.5 -0.866 0.5 0 0)">
                  <rect width="26" height="26" fill="#d8d2c4" />
                  <circle cx="6" cy="7" r="5" fill="#c4bcaa" stroke="#a9a08c" strokeWidth="0.8" />
                  <circle cx="18" cy="17" r="6" fill="#cbc4b3" stroke="#a9a08c" strokeWidth="0.8" />
                  <circle cx="20" cy="4" r="2.5" fill="#bdb5a2" />
                  <circle cx="7" cy="21" r="3" fill="#c0b8a5" />
                </pattern>
                <pattern id="p-felt" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="matrix(0.866 0.5 -0.866 0.5 0 0)">
                  <rect width="12" height="12" fill="#eef3fb" />
                  <path d="M0 3 Q4 1 8 4 T12 3 M0 9 Q3 7 6 10 T12 8 M2 0 Q4 6 3 12 M9 0 Q7 5 10 12" stroke="#c9d8ee" strokeWidth="0.6" fill="none" />
                </pattern>
                <pattern id="p-soil" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="matrix(0.866 0.5 -0.866 0.5 0 0)">
                  <rect width="14" height="14" fill="#c9b494" />
                  <circle cx="3" cy="4" r="0.9" fill="#a8916f" />
                  <circle cx="10" cy="9" r="0.7" fill="#a8916f" />
                  <circle cx="7" cy="12" r="0.6" fill="#b29c7a" />
                </pattern>
                <filter id="f-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
              </defs>

              {/* Draw bottom layer first so upper layers sit in front. */}
              {[...LAYERS].reverse().map((l) => {
                const i = LAYERS.indexOf(l);
                const pr = prism(0, l.t);
                return (
                  <g key={l.id} ref={(el) => { groupRefs.current[i] = el; }}>
                    {l.accent && (
                      <polygon ref={glowRef} points={pr.top} fill="#3fb7e4" filter="url(#f-glow)" style={{ opacity: 0 }} />
                    )}
                    <polygon points={pr.left} fill={l.left} />
                    <polygon points={pr.right} fill={l.right} />
                    <polygon points={pr.top} fill={l.pattern ?? l.top} stroke={l.accent ? "#1f6fc5" : "rgba(0,0,0,0.12)"} strokeWidth={l.accent ? 1.5 : 1} />
                    {l.accent && (
                      <text
                        transform={`matrix(0.866 0.5 -0.866 0.5 ${CX - 70} ${B - 4})`}
                        fontSize="20"
                        fontWeight="800"
                        fill="#1f6fc5"
                        opacity="0.55"
                        fontFamily="var(--font-archivo), sans-serif"
                        letterSpacing="2"
                      >
                        MANAS MGT
                      </text>
                    )}
                  </g>
                );
              })}

              {LAYERS.map((l, i) => (
                <g key={l.id} ref={(el) => { labelRefs.current[i] = el; }} style={{ opacity: 0 }} className="max-sm:hidden">
                  <line x1={CX + A + 10} x2={CX + A + 48} y1={B + l.t / 2} y2={B + l.t / 2} stroke={l.accent ? "#1f6fc5" : "#8a93a1"} strokeWidth="1.5" />
                  <circle cx={CX + A + 10} cy={B + l.t / 2} r="3.5" fill={l.accent ? "#1f6fc5" : "#8a93a1"} />
                  <text x={CX + A + 58} y={B + l.t / 2 - 2} fontSize="20" fontWeight={l.accent ? 700 : 600} fill={l.accent ? "#1a62b0" : "#0f1b2d"} fontFamily="var(--font-archivo), sans-serif">
                    {l.label}
                  </text>
                  <text x={CX + A + 58} y={B + l.t / 2 + 21} fontSize="16" fill="#5a6472" fontFamily="var(--font-archivo), sans-serif">
                    {l.detail}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
