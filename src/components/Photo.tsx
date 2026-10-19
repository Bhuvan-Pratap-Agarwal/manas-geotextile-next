import Image from "next/image";
import { cn } from "@/lib/utils";

/** Real site / plant photo with an optional plain caption underneath. */
export function Photo({
  src,
  alt,
  caption,
  ratio = "4/3",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority = false,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  caption?: React.ReactNode;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className="relative overflow-hidden rounded-[4px] bg-paper-2" style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
      </div>
      {caption && <figcaption className="mt-2.5 text-[14px] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}
