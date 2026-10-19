"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Panel } from "./SeparationDemo";
import { buttonClass } from "./ButtonLink";

type LayerId = "soil" | "geo" | "base" | "surface";

const LAYERS: Record<LayerId, { name: string; hint: string; fill: string; y: number; h: number }> = {
  soil: { name: "Clay subgrade", hint: "The ground everything sits on", fill: "url(#g-soil)", y: 150, h: 100 },
  geo: { name: "Manas geotextile", hint: "2 mm of needle-punched fabric", fill: "#1f6fc5", y: 146, h: 6 },
  base: { name: "Crushed stone", hint: "Carries the load", fill: "url(#g-stone)", y: 58, h: 90 },
  surface: { name: "Bituminous surface", hint: "What you drive on", fill: "#0f1b2d", y: 40, h: 18 },
};

// Correct order from the ground up. The geotextile is optional on purpose:
// leaving it out is the lesson.
const ORDER: LayerId[] = ["soil", "geo", "base", "surface"];
const TRAY: LayerId[] = ["surface", "geo", "soil", "base"];

type Phase = "build" | "traffic" | "done";

export function BuildRoadGame() {
  const [placed, setPlaced] = useState<LayerId[]>([]);
  const [shake, setShake] = useState<LayerId | null>(null);
  const [message, setMessage] = useState("Start with the ground. Tap a layer to place it.");
  const [phase, setPhase] = useState<Phase>("build");
  const [t, setT] = useState(0);
  const [copied, setCopied] = useState(false);
  const raf = useRef(0);

  const withGeo = placed.includes("geo");
  const year = Math.round(t * 10);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  function place(id: LayerId) {
    if (phase !== "build" || placed.includes(id)) return;
    const nextIndex = placed.length === 0 ? 0 : ORDER.indexOf(placed[placed.length - 1]) + 1;
    const allowed = ORDER.slice(nextIndex).filter((l, i) => i === 0 || (ORDER[nextIndex] === "geo" && i === 1));
    if (!allowed.includes(id)) {
      setShake(id);
      setTimeout(() => setShake(null), 450);
      setMessage(
        placed.length === 0
          ? "Roads are built from the ground up. What's at the very bottom?"
          : id === "surface"
            ? "Not yet. The surface goes on last."
            : "That goes higher up. What comes next?",
      );
      return;
    }
    const next = [...placed, id];
    setPlaced(next);
    if (id === "soil") setMessage("Good. Now, what goes on the clay?");
    if (id === "geo") setMessage("Fabric down. Now the stone base.");
    if (id === "base") setMessage(next.includes("geo") ? "Nearly there. Finish the road." : "Stone straight onto clay. Bold. Finish the road and see.");
    if (id === "surface") runTraffic();
  }

  function runTraffic() {
    setPhase("traffic");
    setMessage("Opening to traffic…");
    const start = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 1 : 4200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setT(Math.round(p * 60) / 60);
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else setPhase("done");
    };
    setTimeout(() => (raf.current = requestAnimationFrame(tick)), reduced ? 0 : 500);
  }

  function reset() {
    cancelAnimationFrame(raf.current);
    setPlaced([]);
    setPhase("build");
    setT(0);
    setMessage("Start with the ground. Tap a layer to place it.");
  }

  async function share() {
    const url = `${window.location.origin}/tools/build-a-road`;
    const text = withGeo ? "I built a road that lasts 10 years. Can you?" : "My road failed in year 3. Can you do better?";
    try {
      if (navigator.share) await navigator.share({ title: "Build a road", text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="grid gap-8 rounded-[10px] border border-line bg-white p-5 shadow-[0_20px_60px_rgba(16,52,122,0.08)] sm:p-8 lg:grid-cols-12 lg:gap-10">
      {/* Road */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-[6px] border border-line bg-[linear-gradient(#eef3fb,#ffffff_45%)]">
          {phase === "build" ? (
            <svg viewBox="0 0 300 250" className="block h-auto w-full" aria-label={`Road so far: ${placed.map((p) => LAYERS[p].name).join(", ") || "empty"}`} role="img">
              <defs>
                <pattern id="g-soil" width="10" height="10" patternUnits="userSpaceOnUse">
                  <rect width="10" height="10" fill="#e9e3d8" />
                  <circle cx="3" cy="4" r="1" fill="#b9a789" />
                  <circle cx="8" cy="8" r="0.8" fill="#b9a789" />
                </pattern>
                <pattern id="g-stone" width="16" height="16" patternUnits="userSpaceOnUse">
                  <rect width="16" height="16" fill="#f2f4f7" />
                  <circle cx="4" cy="5" r="3.4" fill="#d3d0c7" stroke="#a9a59a" strokeWidth="0.6" />
                  <circle cx="12" cy="12" r="3.8" fill="#d3d0c7" stroke="#a9a59a" strokeWidth="0.6" />
                </pattern>
              </defs>
              {placed.length === 0 && (
                <text x="150" y="140" textAnchor="middle" fontSize="12" fill="#5a6472" fontFamily="var(--font-archivo), sans-serif">
                  Your road goes here
                </text>
              )}
              {placed.map((id) => {
                const l = LAYERS[id];
                return <rect key={id} x="0" y={l.y} width="300" height={l.h} fill={l.fill} className="menu-in" />;
              })}
            </svg>
          ) : (
            <Panel t={t} withGeo={withGeo} />
          )}
          {phase !== "build" && (
            <div className="absolute left-3 top-3 rounded-full bg-navy px-3 py-1 text-[13px] font-semibold text-white">
              Year <span className="spec">{year}</span> of 10
            </div>
          )}
        </div>
        <p className="mt-4 min-h-[3rem] text-lg font-semibold leading-snug text-navy" aria-live="polite">
          {phase === "done"
            ? withGeo
              ? "Ten years of traffic. Still flat. That's the fabric doing its job."
              : "Ruts by year 3. The stone sank into the clay and mud pumped up into it."
            : message}
        </p>
      </div>

      {/* Tray */}
      <div className="flex flex-col lg:col-span-5">
        {phase === "build" ? (
          <>
            <p className="text-[14px] font-semibold text-accent-ink">
              Layer {placed.length + 1}: tap to place it
            </p>
            <ul className="mt-3 grid gap-2.5">
              {TRAY.map((id) => {
                const l = LAYERS[id];
                const used = placed.includes(id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => place(id)}
                      disabled={used}
                      className={`flex w-full items-center gap-4 rounded-[8px] border p-3 text-left transition-all duration-200 ${
                        used ? "border-transparent bg-paper-2 opacity-40" : "border-line bg-white hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_8px_24px_rgba(16,52,122,0.12)]"
                      } ${shake === id ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
                    >
                      <svg viewBox="0 0 40 24" className="h-8 w-12 shrink-0 overflow-hidden rounded-[3px]" aria-hidden>
                        <rect width="40" height="24" fill={id === "soil" ? "#e9e3d8" : id === "base" ? "#d3d0c7" : id === "geo" ? "#1f6fc5" : "#0f1b2d"} />
                        {id === "base" && <circle cx="12" cy="12" r="5" fill="#bdb8ad" />}
                        {id === "geo" && <path d="M0 12 Q10 6 20 12 T40 12" stroke="#cfe0f7" fill="none" />}
                      </svg>
                      <span>
                        <span className="block font-semibold text-navy">{l.name}</span>
                        <span className="block text-[13px] text-muted">{l.hint}</span>
                      </span>
                      {used && <span className="ml-auto text-[13px] font-semibold text-accent-ink">✓ Placed</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
            {placed.length > 0 && (
              <button type="button" onClick={reset} className="mt-4 self-start py-1 text-[14px] font-medium text-muted hover:text-navy">
                Start again
              </button>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col justify-center">
            <p className="text-[14px] font-semibold text-accent-ink">{phase === "traffic" ? "Simulating traffic" : withGeo ? "Road passed" : "Road failed"}</p>
            <p className="mt-2 text-[clamp(1.8rem,3.5vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.02em] text-navy [font-stretch:92%]">
              {phase === "traffic" ? "Lorries, buses, monsoons…" : withGeo ? "Built to last." : "Try it with the fabric."}
            </p>
            {phase === "done" && (
              <div className="mt-6 flex flex-wrap gap-3">
                {withGeo ? (
                  <Link href="/contact?product=non-woven-geotextile" className={buttonClass("solid")}>
                    Get geotextile for your road
                  </Link>
                ) : (
                  <button type="button" onClick={reset} className={buttonClass("solid")}>
                    Build it again
                  </button>
                )}
                <button type="button" onClick={withGeo ? reset : share} className={buttonClass("outline")}>
                  {withGeo ? "Play again" : copied ? "Link copied" : "Challenge a friend"}
                </button>
                {withGeo && (
                  <button type="button" onClick={share} className="px-2 py-3 text-[15px] font-semibold text-accent-ink hover:text-navy">
                    {copied ? "Link copied" : "Challenge a friend →"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
