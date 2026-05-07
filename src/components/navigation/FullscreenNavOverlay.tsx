"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { CINEMATIC_NAV_LINKS } from "@/components/navigation/navigation.constants";

type FullscreenNavOverlayProps = {
  open: boolean;
  onClose: () => void;
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.14,
      staggerChildren: 0.075,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.88,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as const },
  },
};

export function FullscreenNavOverlay({ open, onClose }: FullscreenNavOverlayProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || !containerRef.current) return;
    window.requestAnimationFrame(() => {
      const el = containerRef.current?.querySelector<HTMLElement>(
        "ul a",
      );
      el?.focus();
    });
  }, [open]);

  if (typeof document === "undefined") return null;

  const dur = reduced ? 0.22 : 0.58;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          key="cinematic-nav-fs"
          aria-modal="true"
          className="fixed inset-0 z-[55] flex flex-col bg-[#050607]"
          exit={{ opacity: 0 }}
          id="cinematic-nav-fs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="dialog"
          transition={{ duration: dur, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={
              reduced
                ? { opacity: 0.06 }
                : { opacity: [0.05, 0.08, 0.05] }
            }
            className="surface-grid pointer-events-none absolute inset-0"
            style={{ maskImage: "none" }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 14, repeat: Infinity, ease: "easeInOut" }
            }
          />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_18%,rgba(200,169,107,0.04),transparent_62%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#08090c] via-transparent to-[#030304]" />
          <div className="pointer-events-none absolute inset-0 border border-[color-mix(in_oklab,var(--text-primary)_6%,transparent)]" />
          <div className="pointer-events-none absolute inset-[min(1.25rem,3vw)] border border-[color-mix(in_oklab,var(--engineering-line)_35%,transparent)] opacity-[0.45] min-[2000px]:inset-[max(1.5rem,2vw)]" />

          <div className="pointer-events-none absolute bottom-8 left-[var(--gutter-x)] max-w-[14rem] text-[0.58rem] leading-relaxed tracking-[0.28em] text-muted md:bottom-10 min-[1800px]:left-[max(var(--gutter-x),3vw)]">
            <div className="type-caption text-gold/90">NAV · INDEX</div>
            <div className="type-caption mt-2 text-[color-mix(in_oklab,var(--text-muted)_85%,transparent)]">
              Manas Geotextile — global geosynthetics
            </div>
          </div>

          <div
            ref={containerRef}
            className="relative flex flex-1 flex-col items-stretch justify-center px-[var(--gutter-x)] pt-24 pb-32 md:px-[max(var(--gutter-x),2rem)] lg:mx-auto lg:max-w-[min(92rem,calc(100%-3rem))] min-[1800px]:max-w-[min(112rem,calc(100%-4rem))]"
          >
            <motion.ul
              animate="visible"
              className="flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-4"
              initial="hidden"
              variants={listVariants}
            >
              {CINEMATIC_NAV_LINKS.map((item) => (
                <motion.li key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    className="group block outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-primary)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050607]"
                    onClick={onClose}
                  >
                    <span className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,5.2vw+0.5rem,4rem)] font-semibold leading-[1.02] tracking-[var(--tracking-title)] text-[color-mix(in_oklab,var(--text-primary)_94%,var(--accent-primary)_6%)] transition-[color,transform] duration-[520ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:text-[var(--text-primary)] md:text-[clamp(2rem,4vw+0.75rem,4.25rem)] min-[1800px]:text-[clamp(2.35rem,3.2vw+1rem,4.75rem)] min-[2200px]:text-[clamp(2.5rem,2.8vw+1rem,5rem)]">
                      {item.label}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 block h-px max-w-0 bg-[color-mix(in_oklab,var(--accent-primary)_45%,transparent)] transition-[max-width] duration-[640ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:max-w-[min(100%,12rem)] group-focus-visible:max-w-[min(100%,12rem)]"
                    />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
