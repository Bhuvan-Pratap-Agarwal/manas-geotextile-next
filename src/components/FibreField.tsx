"use client";

import { useEffect, useRef } from "react";

// Needle-punched fibres drawn on a canvas: long, thin, gently curved strokes
// that drift and part around the pointer. Pauses off-screen; static for
// reduced motion. Purely decorative.

type Fibre = { x: number; y: number; a: number; len: number; bend: number; phase: number; speed: number; dx: number; dy: number };

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function FibreField({
  color = "16, 52, 122",
  opacity = 0.16,
  density = 1,
  className = "",
}: {
  color?: string; // "r, g, b"
  opacity?: number;
  density?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rnd = mulberry32(42);
    let w = 0;
    let h = 0;
    let fibres: Fibre[] = [];
    const pointer = { x: -9999, y: -9999 };
    let raf = 0;
    let visible = true;
    let t = 0;

    const build = () => {
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(((w * h) / (w < 640 ? 4200 : 2600)) * density);
      fibres = Array.from({ length: Math.min(n, 900) }, () => ({
        x: rnd() * w,
        y: rnd() * h,
        a: rnd() * Math.PI,
        len: 40 + rnd() * 110,
        bend: (rnd() - 0.5) * 0.9,
        phase: rnd() * Math.PI * 2,
        speed: 0.2 + rnd() * 0.5,
        dx: 0,
        dy: 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineCap = "round";
      for (const f of fibres) {
        const sway = reduced ? 0 : Math.sin(t * 0.0004 * f.speed + f.phase) * 0.25;
        const a = f.a + sway;
        // Push away from the pointer, then ease back.
        const px = f.x - pointer.x;
        const py = f.y - pointer.y;
        const d2 = px * px + py * py;
        if (d2 < 140 * 140) {
          const d = Math.sqrt(d2) || 1;
          const force = (1 - d / 140) * 26;
          f.dx += ((px / d) * force - f.dx) * 0.12;
          f.dy += ((py / d) * force - f.dy) * 0.12;
        } else {
          f.dx *= 0.94;
          f.dy *= 0.94;
        }
        const cx = f.x + f.dx;
        const cy = f.y + f.dy;
        const hx = (Math.cos(a) * f.len) / 2;
        const hy = (Math.sin(a) * f.len) / 2;
        const bx = -Math.sin(a) * f.len * f.bend;
        const by = Math.cos(a) * f.len * f.bend;
        ctx.strokeStyle = `rgba(${color}, ${opacity * (0.5 + (f.speed - 0.2) * 1.2)})`;
        ctx.lineWidth = 0.6 + f.speed * 0.9;
        ctx.beginPath();
        ctx.moveTo(cx - hx, cy - hy);
        ctx.quadraticCurveTo(cx + bx, cy + by, cx + hx, cy + hy);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      t = now;
      draw();
      if (visible && started) raf = requestAnimationFrame(loop);
    };

    build();
    draw();
    // Draw once now; start moving only after the page has settled, so the
    // animation never competes with the initial load.
    let started = false;
    const start = () => {
      if (started || reduced) return;
      started = true;
      if (visible) raf = requestAnimationFrame(loop);
    };
    const startTimer = window.setTimeout(start, 2500);

    const onMove = (e: PointerEvent) => {
      start();
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const host = canvas.parentElement ?? canvas;
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    const ro = new ResizeObserver(() => {
      build();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && started) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [color, opacity, density]);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
