import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";
import { FibreField } from "./FibreField";

/** Full-width "Up next" teaser that pulls visitors to the next page in a series. */
export function NextUp({ href, kicker, title, body, image }: { href: string; kicker: string; title: string; body?: string; image?: string }) {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <Link href={href} className={`group relative grid overflow-hidden rounded-[8px] bg-navy text-white ${image ? "md:grid-cols-2" : ""}`}>
          <FibreField color="255, 255, 255" opacity={0.08} density={0.6} />
          <div className="relative flex flex-col justify-center p-8 md:p-12">
            <p className="text-[14px] font-semibold text-sky">Up next · {kicker}</p>
            <h2 className="mt-3 text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.05] tracking-[-0.02em] [font-stretch:92%]">{title}</h2>
            {body && <p className="mt-3 max-w-md text-white/75">{body}</p>}
            <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold">
              Keep exploring
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </div>
          {image && (
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
              <Image src={image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent md:from-navy md:via-navy/20" />
            </div>
          )}
        </Link>
      </Container>
    </section>
  );
}
