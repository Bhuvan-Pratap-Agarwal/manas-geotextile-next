"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CINEMATIC_NAV_LINKS } from "@/components/navigation/navigation.constants";

function NavTraceLink({
  href,
  label,
  compressed,
  onNavigate,
}: {
  href: string;
  label: string;
  compressed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/" ? pathname === "/" : !href.includes("#") && pathname === href;

  return (
    <Link
      href={href}
      className="group relative inline-flex py-1 outline-none focus-visible:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklab,var(--accent-primary)_35%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      onClick={onNavigate}
    >
      <span
        className={[
          "type-caption relative text-[0.62rem] font-medium tracking-[0.22em] transition-[color,opacity] duration-500",
          isActive
            ? "text-[color-mix(in_oklab,var(--text-primary)_96%,var(--accent-primary)_4%)]"
            : "text-[color-mix(in_oklab,var(--text-muted)_94%,transparent)]",
          "group-hover:text-[var(--text-primary)]",
          compressed ? "md:text-[0.58rem]" : "",
        ].join(" ")}
      >
        {label}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-[color-mix(in_oklab,var(--accent-primary)_50%,transparent)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-px left-0 h-px w-full bg-[color-mix(in_oklab,var(--text-primary)_10%,transparent)]"
        />
      </span>
    </Link>
  );
}

export function NavDesktopLinks({
  compressed,
  onNavigate,
}: {
  compressed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav
      aria-label="Primary desktop"
      className="hidden items-center gap-x-7 lg:flex xl:gap-x-9 min-[1800px]:gap-x-11"
    >
      {CINEMATIC_NAV_LINKS.map((item) => (
        <NavTraceLink
          key={item.href}
          compressed={compressed}
          href={item.href}
          label={item.label}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
