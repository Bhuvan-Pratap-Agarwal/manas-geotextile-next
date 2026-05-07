"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import type { RefObject } from "react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.58,
      staggerChildren: 0.15,
      duration: 0.5,
    },
  },
};

const lineReveal: Variants = {
  hidden: { y: "104%", rotate: 0.001 },
  visible: {
    y: "0%",
    transition: { duration: 1.18, ease: [0.2, 0.9, 0.2, 1] },
  },
};

const fadeBand: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.05, ease: [0.2, 0.9, 0.2, 1], delay: 0.95 },
  },
};

const ctaMotion = {
  rest: { y: 0 },
  hover: { y: -2 },
  tap: { y: 0, transition: { duration: 0.2 } },
} as const;

const ctaTransition = {
  type: "tween" as const,
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
};

const ctaPrimaryClass =
  "type-caption relative inline-flex min-h-[3.25rem] w-full min-w-0 items-center justify-center overflow-hidden rounded-[2px] border border-[color-mix(in_oklab,var(--accent-primary)_38%,#14161e_62%)] px-8 py-3 text-[0.7rem] font-semibold tracking-[0.22em] text-[var(--text-primary)] outline-none transition-[box-shadow,border-color,background-color,transform] duration-500 focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-primary)_45%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)] sm:w-auto md:min-h-[3.75rem] md:px-11 hover:border-[color-mix(in_oklab,var(--accent-primary)_62%,#14161e_38%)] hover:shadow-[inset_0_1px_0_0_color-mix(in_oklab,#fff7e8_11%,transparent),0_18px_48px_-16px_rgba(200,169,107,0.09)]";

const ctaSecondaryClass =
  "type-caption relative inline-flex min-h-[3.25rem] w-full min-w-0 items-center justify-center overflow-hidden rounded-[2px] border border-[color-mix(in_oklab,var(--text-primary)_14%,#1a1d24_86%)] px-8 py-3 text-[0.7rem] font-semibold tracking-[0.22em] text-[color-mix(in_oklab,var(--text-primary)_92%,var(--accent-primary)_8%)] outline-none transition-[box-shadow,border-color,background-color,transform] duration-500 focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--text-primary)_28%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-base)] sm:w-auto md:min-h-[3.75rem] md:px-11 hover:border-[color-mix(in_oklab,var(--text-primary)_26%,#1a1d24_74%)] hover:shadow-[inset_0_1px_0_0_color-mix(in_oklab,#fff_8%,transparent),0_16px_40px_-18px_rgba(0,0,0,0.55)]";

type HeroContentProps = {
  sectionRef: RefObject<HTMLElement | null>;
};

export function HeroContent({ sectionRef }: HeroContentProps) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const layerShift = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const microContrast = useTransform(scrollYProgress, [0, 0.72], [1, 0.9]);

  return (
    <div className="relative z-10 flex min-h-screen-fill flex-col justify-end pb-[max(4rem,env(safe-area-inset-bottom))] md:justify-center md:pb-24 lg:pb-28 min-[160rem]:justify-center min-[160rem]:pb-32">
      <motion.div
        className="pointer-events-none absolute left-[var(--gutter-x)] top-[max(6.5rem,env(safe-area-inset-top)+5rem)] h-px w-14 origin-left bg-[linear-gradient(90deg,transparent_0%,color-mix(in_oklab,var(--accent-primary)_65%,transparent)_35%,color-mix(in_oklab,var(--accent-primary)_45%,transparent)_100%)] md:top-36 lg:top-40 min-[1800px]:left-[max(var(--gutter-x),3vw)] min-[1800px]:w-[min(4.5rem,5vw)]"
        style={{ opacity: microContrast, scaleX: microContrast }}
      />

      <motion.div
        className="relative mx-auto w-full max-w-[min(100%,var(--container-max))] px-[var(--gutter-x)] lg:max-w-[min(100%,96rem)] min-[1800px]:max-w-[min(100%,112rem)] min-[2200px]:px-[max(var(--gutter-x),4vw)]"
        style={{ y: layerShift }}
      >
        <motion.div
          className="max-w-[min(100%,52rem)] md:max-w-[min(100%,56rem)] lg:max-w-[min(100%,60rem)] xl:max-w-[min(100%,64rem)] min-[1800px]:max-w-[min(100%,68rem)]"
          animate="visible"
          initial="hidden"
          variants={container}
        >
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.8vw+0.85rem,5.35rem)] font-semibold leading-[1.02] tracking-[var(--tracking-title)] text-[var(--text-primary)] md:mt-0 md:leading-[0.98] md:text-[clamp(2.35rem,4.2vw+1rem,5.85rem)] xl:text-[clamp(2.85rem,3.6vw+1.15rem,6.15rem)] min-[1800px]:text-[clamp(3.1rem,2.9vw+1.5rem,6.55rem)] min-[2200px]:text-[clamp(3.25rem,2.4vw+1.75rem,6.85rem)]">
            <div className="overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={lineReveal}>
                Engineering The Future Beneath
              </motion.span>
            </div>
            <div className="overflow-hidden pb-[0.04em] md:mt-1 md:pb-[0.06em]">
              <motion.span
                className="block text-[color-mix(in_oklab,var(--text-primary)_78%,var(--accent-primary)_22%)]"
                variants={lineReveal}
              >
                Every Structure
              </motion.span>
            </div>
          </h1>

          <motion.p
            className="type-body mt-9 max-w-[min(100%,34rem)] text-[color-mix(in_oklab,var(--text-muted)_90%,var(--text-primary)_10%)] md:mt-12 md:max-w-[min(100%,40rem)] lg:max-w-[min(100%,44rem)] xl:leading-relaxed"
            variants={fadeBand}
          >
            Advanced geosynthetic systems powering infrastructure across roads,
            railways, tunnels and industrial development.
          </motion.p>

          <motion.div
            className="mt-11 flex flex-col gap-4 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-6"
            variants={fadeBand}
          >
            <motion.span
              className="inline-flex sm:w-auto"
              initial="rest"
              transition={ctaTransition}
              variants={ctaMotion}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                className={ctaPrimaryClass}
                href="#applications"
                style={{
                  background:
                    "linear-gradient(168deg, color-mix(in oklab, #1a1e28 88%, #000 12%) 0%, color-mix(in oklab, #151820 94%, var(--accent-primary) 6%) 100%)",
                  boxShadow:
                    "inset 0 1px 0 0 color-mix(in oklab, #fff7e8 7%, transparent), 0 14px 42px -20px rgba(0,0,0,0.88)",
                }}
              >
                <span className="relative z-10">Explore Applications</span>
              </Link>
            </motion.span>
            <motion.span
              className="inline-flex sm:w-auto"
              initial="rest"
              transition={ctaTransition}
              variants={ctaMotion}
              whileHover="hover"
              whileTap="tap"
            >
              <Link
                className={ctaSecondaryClass}
                href="#manufacturing"
                style={{
                  background:
                    "linear-gradient(168deg, color-mix(in oklab, #12151b 96%, #fff 4%) 0%, color-mix(in oklab, #0f1218 98%, var(--text-primary) 2%) 100%)",
                  boxShadow:
                    "inset 0 1px 0 0 color-mix(in oklab, #fff 5%, transparent), 0 12px 36px -24px rgba(0,0,0,0.85)",
                }}
              >
                <span className="relative z-10 text-[color-mix(in_oklab,var(--text-primary)_88%,var(--accent-primary)_12%)]">
                  Manufacturing Excellence
                </span>
              </Link>
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
