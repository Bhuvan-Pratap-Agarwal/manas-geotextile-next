import Link from "next/link";
import { cn } from "@/lib/utils";

export const buttonClass = (variant: "solid" | "outline" | "light" | "navy" = "solid", className?: string) =>
  cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-[4px] px-6 text-[15px] font-semibold transition-colors duration-200",
    variant === "solid" && "bg-accent text-white hover:bg-navy",
    variant === "navy" && "bg-navy text-white hover:bg-accent",
    variant === "outline" && "border border-navy/25 text-navy hover:border-navy hover:bg-navy/[0.03]",
    variant === "light" && "bg-white text-navy hover:bg-sky hover:text-navy",
    className,
  );

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "light" | "navy";
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}
