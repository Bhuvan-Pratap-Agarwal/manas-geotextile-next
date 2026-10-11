"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const uses = [
  { id: "drain", label: "Drains & pipe wrap", gsm: "150 – 200 GSM", product: "pipe-wrap-geotextile" },
  { id: "road", label: "Road separation", gsm: "250 – 300 GSM", product: "non-woven-geotextile" },
  { id: "rail", label: "Railway formation", gsm: "400 – 500 GSM", product: "non-woven-geotextile" },
  { id: "erosion", label: "Riverbank / coastal filter", gsm: "300 – 500 GSM", product: "non-woven-geotextile" },
  { id: "liner", label: "Geomembrane protection", gsm: "600 – 1000 GSM", product: "non-woven-geotextile" },
  { id: "tunnel", label: "Tunnel waterproofing", gsm: "500 – 1000 GSM + PVC membrane", product: "pvc-geomembrane" },
] as const;

const fmt = (n: number) => new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);

function NumberField({
  label,
  value,
  onChange,
  unit,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  unit: string;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <span className="mt-2 flex items-baseline border-b border-line focus-within:border-ink">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? NaN : Number(e.target.value))}
          className="w-full bg-transparent py-2 text-2xl font-medium tracking-[-0.02em] tabular-nums outline-none"
        />
        <span className="font-mono text-sm text-muted">{unit}</span>
      </span>
    </label>
  );
}

export function Calculator() {
  const [length, setLength] = useState(1000);
  const [width, setWidth] = useState(10);
  const [rollWidth, setRollWidth] = useState(5);
  const [rollLength, setRollLength] = useState(100);
  const [overlap, setOverlap] = useState(300);
  const [waste, setWaste] = useState(5);
  const [use, setUse] = useState<(typeof uses)[number]["id"]>("road");

  const r = useMemo(() => {
    const lap = (overlap || 0) / 1000;
    const ok = length > 0 && width > 0 && rollWidth > lap && rollLength > lap;
    if (!ok) return null;
    const net = length * width;
    const strips = Math.max(1, Math.ceil((width - lap) / (rollWidth - lap)));
    // Side and end laps scale the area; the last strip is cut to fit on site.
    const sideFactor = rollWidth / (rollWidth - lap);
    const endFactor = rollLength / (rollLength - lap);
    const gross = net * sideFactor * endFactor * (1 + (waste || 0) / 100);
    const rolls = Math.ceil(gross / (rollWidth * rollLength));
    return { net, gross, strips, rolls, extra: (gross / net - 1) * 100 };
  }, [length, width, rollWidth, rollLength, overlap, waste]);

  const selected = uses.find((u) => u.id === use)!;

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-7">
        <div>
          <p className="eyebrow">Application</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {uses.map((u) => (
              <button
                key={u.id}
                type="button"
                onClick={() => setUse(u.id)}
                aria-pressed={use === u.id}
                className={
                  use === u.id
                    ? "rounded-full bg-ink px-4 py-2 text-[14px] text-paper"
                    : "rounded-full border border-line px-4 py-2 text-[14px] text-ink-2 hover:border-ink"
                }
              >
                {u.label}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <NumberField label="Area length" value={length} onChange={setLength} unit="m" />
          <NumberField label="Area width" value={width} onChange={setWidth} unit="m" step={0.5} />
          <label className="block">
            <span className="eyebrow">Roll width</span>
            <select
              value={rollWidth}
              onChange={(e) => setRollWidth(Number(e.target.value))}
              className="mt-2 w-full border-b border-line bg-transparent py-2 text-2xl font-medium tracking-[-0.02em] outline-none focus:border-ink"
            >
              {[2, 3, 4, 5].map((w) => (
                <option key={w} value={w}>{w} m</option>
              ))}
            </select>
          </label>
          <NumberField label="Roll length" value={rollLength} onChange={setRollLength} unit="m" />
          <NumberField label="Overlap" value={overlap} onChange={setOverlap} unit="mm" step={50} />
          <NumberField label="Wastage" value={waste} onChange={setWaste} unit="%" />
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="sticky top-24 bg-ink p-8 text-paper sm:p-10">
          <p className="eyebrow !text-paper/50">You need about</p>
          <p className="mt-4 text-6xl font-medium tracking-[-0.04em] tabular-nums sm:text-7xl">
            {r ? fmt(r.gross) : "—"}
            <span className="ml-2 text-2xl text-paper/50">m²</span>
          </p>
          <dl className="mt-8 divide-y divide-paper/10 border-t border-paper/10 text-[15px]">
            <div className="flex justify-between py-3">
              <dt className="text-paper/60">Net area</dt>
              <dd className="tabular-nums">{r ? `${fmt(r.net)} m²` : "—"}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-paper/60">Laps + wastage</dt>
              <dd className="tabular-nums">{r ? `+${r.extra.toFixed(1)}%` : "—"}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-paper/60">Strips across</dt>
              <dd className="tabular-nums">{r ? r.strips : "—"}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-paper/60">Rolls ({rollWidth} × {rollLength || 0} m)</dt>
              <dd className="tabular-nums">{r ? fmt(r.rolls) : "—"}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-paper/60">Suggested grade</dt>
              <dd className="text-right text-accent">{selected.gsm}</dd>
            </div>
          </dl>
          <Link
            href={`/contact?product=${selected.product}${r ? `&area=${Math.round(r.gross)}` : ""}`}
            className="group mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-paper text-[15px] font-medium text-ink transition-colors hover:bg-accent hover:text-white"
          >
            Get a quote for this quantity
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
          </Link>
          <p className="mt-4 text-[12px] leading-relaxed text-paper/40">
            Estimate only. Grade suggestions are typical; your specification decides.
          </p>
        </div>
      </div>
    </div>
  );
}
