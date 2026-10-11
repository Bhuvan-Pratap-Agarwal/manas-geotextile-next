import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "light";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-12 items-center gap-2 rounded-full pl-6 pr-5 text-[15px] font-medium transition-colors duration-300",
        variant === "solid" && "bg-ink text-paper hover:bg-accent-ink",
        variant === "ghost" && "border border-ink/15 text-ink hover:border-ink",
        variant === "light" && "bg-paper text-ink hover:bg-accent-ink hover:text-white",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </Link>
  );
}
