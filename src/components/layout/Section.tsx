import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  as?: "section" | "div";
  padY?: boolean;
};

export function Section({
  children,
  id,
  className,
  as: Tag = "section",
  padY = true,
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        padY && "py-[var(--section-pad-y)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
