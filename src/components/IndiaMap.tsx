"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { INDIA_PATH, INDIA_VIEWBOX, project } from "@/lib/india-map";
import { cn } from "@/lib/utils";

type Pin = {
  id: string;
  lat: number;
  lon: number;
  place: string;
  title: string;
  body: string;
  href?: string;
  kind: "project" | "factory" | "office";
};

// Locations come from the project records. Where a record only names a
// state, the pin sits in that state and says so.
const PINS: Pin[] = [
  { id: "t15", lat: 33.26, lon: 75.24, place: "Sangaldan, J&K", title: "Kashmir rail link, Tunnel T15", body: "Non-woven geotextile for Patel Engineering. Performance certificate, 2022.", href: "/projects#usbrl-tunnel-t15", kind: "project" },
  { id: "factory", lat: 28.08, lon: 76.58, place: "IMT Bawal, Haryana", title: "Our factory", body: "Needle-punching lines, PVC membrane plant and lab. 250 tonnes a month.", href: "/about", kind: "factory" },
  { id: "delhi", lat: 28.58, lon: 77.2, place: "New Delhi", title: "Head office · Oberoi hotel roof", body: "Head office in Vasant Kunj. Geotextile on the Oberoi's roof waterproofing.", href: "/projects#oberoi-new-delhi", kind: "office" },
  { id: "expressway", lat: 22.24, lon: 73.08, place: "Vadodara, Gujarat", title: "Delhi–Mumbai Expressway", body: "Part of Patel Infrastructure's world-record concrete paving, 2021.", href: "/projects#delhi-mumbai-expressway-world-record", kind: "project" },
  { id: "up", lat: 26.9, lon: 80.9, place: "Uttar Pradesh", title: "Road drainage and stone pitching", body: "Filter geotextile under stone pitching and in road drains.", href: "/projects#up-road-drainage", kind: "project" },
  { id: "ne", lat: 26.2, lon: 92.4, place: "North East India", title: "Riverbank protection and roads", body: "Geo bags for coastal and river protection; soil stabilisation on roads.", href: "/projects#coastal-north-east", kind: "project" },
  { id: "mh", lat: 19.6, lon: 75.9, place: "Maharashtra", title: "Subsurface drainage", body: "Geotextile-wrapped perforated pipes.", href: "/projects#maharashtra-drainage", kind: "project" },
  { id: "mumbai", lat: 19.08, lon: 72.88, place: "Mumbai", title: "Sales office", body: "Sales and technical support for western India.", kind: "office" },
  { id: "ap", lat: 16.2, lon: 80.2, place: "Andhra Pradesh", title: "Road project", body: "Filtration and separation under the pavement.", href: "/projects#andhra-road", kind: "project" },
  { id: "ka", lat: 14.6, lon: 75.9, place: "Karnataka", title: "Road to MoRTH Section 700", body: "MGT-15, 150 GSM polypropylene.", href: "/projects#karnataka-road", kind: "project" },
  { id: "blr", lat: 12.97, lon: 77.59, place: "Bengaluru", title: "Sales office", body: "Sales and technical support for southern India.", kind: "office" },
];

export function IndiaMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [active, setActive] = useState<string>("t15");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const current = PINS.find((p) => p.id === active)!;
  const projectsCount = PINS.filter((p) => p.kind === "project").length;

  return (
    <div ref={ref} className="grid items-center gap-10 lg:grid-cols-12">
      <div className="relative lg:col-span-7">
        <svg viewBox={INDIA_VIEWBOX} className="h-auto w-full" role="img" aria-label={`Map of India with ${PINS.length} Manas locations`}>
          <defs>
            <pattern id="map-dots" width="7" height="7" patternUnits="userSpaceOnUse">
              <circle cx="3.5" cy="3.5" r="1.1" fill="#b9c8e0" />
            </pattern>
          </defs>
          <path d={INDIA_PATH} fill="url(#map-dots)" stroke="#9fb3d6" strokeWidth="1" strokeLinejoin="round" />
          {PINS.map((p, i) => {
            const { x, y } = project(p.lat, p.lon);
            const isActive = p.id === active;
            const color = p.kind === "project" ? "#1f6fc5" : p.kind === "factory" ? "#10347a" : "#3fb7e4";
            return (
              <g
                key={p.id}
                transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                className="cursor-pointer"
                onClick={() => setActive(p.id)}
                onMouseEnter={() => setActive(p.id)}
              >
                <g
                  style={{
                    transform: shown ? "scale(1)" : "scale(0)",
                    transition: `transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${shown ? i * 140 : 0}ms`,
                  }}
                >
                  {isActive && <circle r="16" fill={color} opacity="0.18" className="animate-ping [animation-duration:1.8s] motion-reduce:animate-none" />}
                  <circle r="18" fill="transparent" />
                  {p.kind === "factory" ? (
                    <rect x={-7} y={-7} width={14} height={14} rx={2} fill={color} stroke="white" strokeWidth="2.5" />
                  ) : (
                    <circle r={isActive ? 8 : 6} fill={color} stroke="white" strokeWidth="2.5" style={{ transition: "r 200ms" }} />
                  )}
                </g>
              </g>
            );
          })}
        </svg>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-muted" aria-hidden>
          <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-accent" /> Project</li>
          <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-[2px] bg-navy" /> Factory</li>
          <li className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-sky" /> Office</li>
        </ul>
      </div>

      <div className="lg:col-span-5">
        <div className="min-h-[170px] rounded-[10px] bg-navy p-7 text-white" aria-live="polite">
          <p className="text-[13px] font-semibold text-sky">{current.place}</p>
          <p className="mt-1 text-2xl font-bold leading-tight">{current.title}</p>
          <p className="mt-2 text-white/80">{current.body}</p>
          {current.href && (
            <Link href={current.href} className="mt-4 inline-block py-1 text-[15px] font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
              See it →
            </Link>
          )}
        </div>
        <ul className="mt-4 grid grid-cols-2 gap-1.5">
          {PINS.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => setActive(p.id)}
                aria-pressed={p.id === active}
                className={cn(
                  "w-full rounded-[6px] px-3 py-2 text-left text-[14px] transition-colors",
                  p.id === active ? "bg-paper-2 font-semibold text-navy" : "text-ink-2 hover:bg-paper-2",
                )}
              >
                {p.place}
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-[13px] text-muted">
          {projectsCount} project regions shown from our records. Pins in a state mark the state, not the exact site.
        </p>
      </div>
    </div>
  );
}
