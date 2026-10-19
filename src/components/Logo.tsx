import Image from "next/image";
import Link from "next/link";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className={inverted ? "rounded-[3px] bg-white p-1" : ""}>
        <Image src="/images/logo-go.png" alt="" width={44} height={41} className="h-10 w-auto" priority />
      </span>
      <span className="leading-none">
        <span className={`block text-[20px] font-extrabold tracking-[-0.01em] ${inverted ? "text-white" : "text-navy"}`}>
          MANAS
        </span>
        <span className={`block text-[11px] font-semibold tracking-[0.12em] ${inverted ? "text-white/70" : "text-accent-ink"}`}>
          GEO TECH INDIA
        </span>
      </span>
    </Link>
  );
}
