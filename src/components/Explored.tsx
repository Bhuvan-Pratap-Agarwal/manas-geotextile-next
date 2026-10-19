"use client";

import { useEffect, useState } from "react";

// Remembers which product / application / guide pages this visitor has seen,
// in this browser only. Nothing is sent anywhere.
const KEY = "manas:seen";
const EVENT = "manas:seen-change";

function read(): string[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

function useSeen() {
  const [seen, setSeen] = useState<string[]>([]);
  useEffect(() => {
    const update = () => setSeen(read());
    update();
    window.addEventListener(EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return seen;
}

/** Drop on a page to mark it as seen. */
export function MarkSeen({ path }: { path: string }) {
  useEffect(() => {
    try {
      const s = read();
      if (!s.includes(path)) {
        localStorage.setItem(KEY, JSON.stringify([...s, path].slice(-200)));
        window.dispatchEvent(new Event(EVENT));
      }
    } catch {
      /* storage unavailable: nothing to remember */
    }
  }, [path]);
  return null;
}

export function SeenBadge({ path, className = "" }: { path: string; className?: string }) {
  const seen = useSeen();
  if (!seen.includes(path)) return null;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-semibold text-navy shadow-sm ${className}`}>
      <svg viewBox="0 0 16 16" className="size-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
        <path d="M3.5 8.5l3 3 6-7" />
      </svg>
      Seen
    </span>
  );
}

export function ExploredCount({ paths, noun }: { paths: string[]; noun: string }) {
  const seen = useSeen();
  const n = paths.filter((p) => seen.includes(p)).length;
  if (n === 0) return null;
  const done = n === paths.length;
  return (
    <div className="flex items-center gap-3" role="status">
      <div className="h-1.5 w-28 overflow-hidden rounded-full bg-line" aria-hidden>
        <div className="h-full rounded-full bg-accent transition-[width] duration-700" style={{ width: `${(n / paths.length) * 100}%` }} />
      </div>
      <p className="text-[14px] font-medium text-ink-2">
        {done ? `You've explored all ${paths.length} ${noun}.` : `You've explored ${n} of ${paths.length} ${noun}.`}
      </p>
    </div>
  );
}
