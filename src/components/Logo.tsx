import Link from "next/link";
import { site } from "@/lib/site";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — home`}>
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <rect x="2" y="4" width="20" height="3" fill="currentColor" />
        <rect x="2" y="10.5" width="20" height="3" fill="var(--accent)" />
        <rect x="2" y="17" width="20" height="3" fill="currentColor" />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.02em]">
        Manas<span className="font-normal text-muted"> Geotextile</span>
      </span>
    </Link>
  );
}
