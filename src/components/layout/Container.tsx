import { type ReactNode } from "react";
import { cn } from "@/utils/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  /** Widen max width for cinematic full-bleed layouts */
  wide?: boolean;
};

export function Container({ children, className, wide }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--gutter-x)]",
        wide && "max-w-[min(var(--ultrawide-max),100%)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
