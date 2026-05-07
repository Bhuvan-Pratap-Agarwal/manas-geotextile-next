"use client";

import Link from "next/link";
import { useNavigationOptional } from "@/components/navigation/NavigationContext";

export function NavLogo() {
  const { menuOpen, setMenuOpen } = useNavigationOptional();

  return (
    <Link
      href="/"
      className="group relative flex flex-col gap-0.5 outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-primary)_40%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      onClick={() => {
        if (menuOpen) setMenuOpen(false);
      }}
    >
      <span className="type-caption text-[0.58rem] font-medium tracking-[0.34em] text-[color-mix(in_oklab,var(--text-muted)_88%,var(--accent-primary)_12%)] transition-colors duration-500 group-hover:text-[color-mix(in_oklab,var(--text-muted)_70%,var(--accent-primary)_30%)]">
        Infrastructure Systems
      </span>
      <span className="font-[family-name:var(--font-display)] text-[0.95rem] font-semibold leading-none tracking-[0.04em] text-[var(--text-primary)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-1px] sm:text-[1.02rem] md:text-[1.08rem]">
        <span className="text-[color-mix(in_oklab,var(--text-primary)_92%,var(--accent-primary)_8%)]">
          Manas
        </span>
        <span className="mx-1.5 inline-block h-[1px] w-4 translate-y-[-0.12em] bg-[color-mix(in_oklab,var(--accent-primary)_45%,transparent)] align-middle transition-opacity duration-500 group-hover:opacity-90" />
        <span className="font-medium text-[color-mix(in_oklab,var(--text-primary)_88%,var(--accent-muted)_12%)]">
          Geotextile
        </span>
      </span>
    </Link>
  );
}
