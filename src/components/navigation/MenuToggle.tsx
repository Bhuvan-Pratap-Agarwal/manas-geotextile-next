"use client";

import { motion } from "framer-motion";

export function MenuToggle({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      aria-controls="cinematic-nav-fs"
      aria-expanded={open}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-[2px] border border-[color-mix(in_oklab,var(--text-primary)_11%,transparent)] bg-[color-mix(in_oklab,#0c0e14_42%,transparent)] outline-none transition-[border-color,background-color] duration-500 hover:border-[color-mix(in_oklab,var(--accent-primary)_32%,transparent)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-primary)_40%,transparent)] lg:hidden"
      type="button"
      onClick={onToggle}
    >
      <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      <div className="flex w-[1.15rem] flex-col gap-[6px]">
        <motion.span
          animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
          className="block h-px w-full origin-center bg-[var(--text-primary)]"
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0.15 } : { opacity: 1, scaleX: 1 }}
          className="block h-px w-full bg-[var(--text-primary)]"
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
          className="block h-px w-full origin-center bg-[var(--text-primary)]"
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </button>
  );
}
