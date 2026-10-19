"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { buttonClass } from "./ButtonLink";

const sheet = products.find((p) => p.slug === "non-woven-geotextile")!.datasheets![0];
const row = (name: string) => sheet.rows.find((r) => r.property.startsWith(name))!;
const tensile = row("Wide-width tensile");
const cbr = row("Static puncture");
const flow = row("Flow rate");
const thick = row("Thickness");
const rolls = row("Roll size");

const uses: [number, string][] = [
  [150, "Pipe socks, light filtration, MoRTH Section 700 Type 3"],
  [300, "Road subgrade separation, drains, wall backfill, geo bags"],
  [500, "Railway formations, riverbank and coastal filters"],
  [700, "Protection layer under tunnel waterproofing membrane"],
  [1000, "Landfill liner cushion, membranes over rough rock"],
];

const max = (r: typeof tensile) => Math.max(...r.values.map((v) => parseFloat(v.replace(/[^\d.]/g, ""))));

function Bar({ label, unit, value, of, note }: { label: string; unit: string; value: string; of: number; note?: string }) {
  const n = parseFloat(value.replace(/[^\d.]/g, ""));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-ink-2">{label}</span>
        <span className="spec text-[15px] text-navy">
          <span className="text-xl font-medium">{value}</span> {unit}
        </span>
      </div>
      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-paper-2">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-sky transition-[width] duration-500 ease-out motion-reduce:transition-none"
          style={{ width: `${Math.max(4, (n / of) * 100)}%` }}
        />
      </div>
      {note && <p className="mt-1 text-[13px] text-muted">{note}</p>}
    </div>
  );
}

export function GradeFinder() {
  const [i, setI] = useState(4); // 300 GSM
  const gsm = Number(sheet.grades[i]);
  const code = `MGT-${gsm / 10}`;
  const use = uses.find(([g]) => gsm <= g)?.[1] ?? uses[uses.length - 1][1];

  return (
    <div className="grid gap-8 rounded-[6px] border border-line bg-white p-6 shadow-[0_20px_60px_rgba(16,52,122,0.08)] sm:p-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className="text-[14px] font-semibold text-accent-ink">Drag to choose a weight</p>
        <p className="mt-2 flex items-baseline gap-3">
          <span className="spec text-[clamp(3.5rem,8vw,6rem)] font-medium leading-none tracking-[-0.04em] text-navy">{gsm}</span>
          <span className="text-xl font-semibold text-navy">GSM</span>
        </p>
        <p className="mt-2 text-[15px] text-muted">
          Grade <span className="spec font-medium text-ink">{code}</span> · polypropylene · roll {rolls.values[i]} m
        </p>
        <input
          type="range"
          min={0}
          max={sheet.grades.length - 1}
          step={1}
          value={i}
          onChange={(e) => setI(Number(e.target.value))}
          aria-label="Geotextile weight in GSM"
          aria-valuetext={`${gsm} GSM, grade ${code}`}
          className="range mt-6 w-full"
          style={{ backgroundSize: `${(i / (sheet.grades.length - 1)) * 100}% 3px, 100% 3px` }}
        />
        <div className="spec mt-1 flex justify-between text-[12px] text-muted" aria-hidden>
          <span>{sheet.grades[0]}</span>
          <span>{sheet.grades[sheet.grades.length - 1]}</span>
        </div>
        <div className="mt-8 rounded-[4px] bg-paper-2 p-4">
          <p className="text-[13px] font-semibold text-accent-ink">Typically used for</p>
          <p className="mt-1 text-[16px] font-medium text-navy">{use}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6 lg:col-span-7">
        <div className="space-y-6">
          <Bar label="Wide-width tensile strength" unit="kN/m" value={tensile.values[i]} of={max(tensile)} />
          <Bar label="CBR puncture resistance" unit="N" value={cbr.values[i]} of={max(cbr)} />
          <Bar label="Water flow through the fabric" unit="l/m²/s" value={flow.values[i]} of={max(flow)} note="Lighter grades drain faster. Heavier grades protect better." />
          <Bar label="Thickness" unit="mm" value={thick.values[i]} of={max(thick)} />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/contact?product=non-woven-geotextile&grade=${code}`} className={buttonClass("solid")}>
            Get a quote for {code}
          </Link>
          <Link href="/products/non-woven-geotextile#datasheet" className="px-2 py-3 text-[15px] font-semibold text-accent-ink hover:text-navy">
            Full datasheet →
          </Link>
        </div>
        <p className="text-[13px] text-muted">Typical values from the MGT datasheet, tested to ASTM methods.</p>
      </div>
    </div>
  );
}
