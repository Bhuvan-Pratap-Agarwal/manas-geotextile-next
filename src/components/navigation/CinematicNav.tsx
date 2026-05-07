"use client";

import { motion } from "framer-motion";
import { FullscreenNavOverlay } from "@/components/navigation/FullscreenNavOverlay";
import { MenuToggle } from "@/components/navigation/MenuToggle";
import { NavDesktopLinks } from "@/components/navigation/NavDesktopLinks";
import { NavLogo } from "@/components/navigation/NavLogo";
import { useNavigation } from "@/components/navigation/NavigationContext";
import { useNavScrollCompressed } from "@/hooks/useNavScrollCompressed";
import { cn } from "@/utils/cn";

export function CinematicNav() {
  const compressed = useNavScrollCompressed(52);
  const { menuOpen, setMenuOpen, toggleMenu } = useNavigation();

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60]">
        <div className="mx-auto w-full max-w-[min(96rem,calc(100%-1.25rem))] pt-3 sm:pt-4 md:max-w-[min(96rem,calc(100%-2.5rem))] md:pt-5 min-[1800px]:max-w-[min(112rem,calc(100%-3.5rem))] min-[2200px]:pt-6">
          <motion.div
            className={cn(
              "pointer-events-auto flex items-center justify-between gap-3 rounded-[2px] border shadow-[inset_0_1px_0_0_color-mix(in_oklab,#fff_5%,transparent)] transition-[background-color,box-shadow,border-color,backdrop-filter] duration-[680ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-4 min-[2200px]:gap-5",
              compressed
                ? "border-[color-mix(in_oklab,var(--accent-primary)_22%,#1a1d24_78%)] bg-[color-mix(in_oklab,#07080c_92%,transparent)] py-2.5 pl-3 pr-2.5 shadow-[inset_0_1px_0_0_color-mix(in_oklab,#fff_4%,transparent),0_18px_48px_-28px_rgba(0,0,0,0.55)] backdrop-blur-[12px] md:py-3 md:pl-4 md:pr-3"
                : "border-[color-mix(in_oklab,var(--text-primary)_14%,#14161c_86%)] bg-[color-mix(in_oklab,#090b10_76%,transparent)] py-3 pl-4 pr-3 shadow-[inset_0_1px_0_0_color-mix(in_oklab,#fff_6%,transparent),0_24px_56px_-32px_rgba(0,0,0,0.45)] backdrop-blur-[8px] md:py-[0.95rem] md:pl-5 md:pr-4",
            )}
          >
            <NavLogo />

            <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:gap-3">
              <NavDesktopLinks compressed={compressed} />

              <button
                className={cn(
                  "type-caption hidden shrink-0 items-center border-l border-[color-mix(in_oklab,var(--text-primary)_12%,transparent)] pl-5 text-[0.58rem] font-semibold tracking-[0.32em] text-[color-mix(in_oklab,var(--text-muted)_92%,transparent)] outline-none transition-[color,opacity] duration-500 hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-primary)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:inline-flex",
                  compressed ? "md:pl-4" : "md:pl-6",
                )}
                type="button"
                onClick={toggleMenu}
              >
                {menuOpen ? "Close" : "Index"}
              </button>

              <MenuToggle open={menuOpen} onToggle={toggleMenu} />
            </div>
          </motion.div>
        </div>
      </header>

      <FullscreenNavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
