import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  lead,
  aside,
  invert = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  aside?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        {eyebrow && <p className={invert ? "eyebrow !text-sky" : "eyebrow"}>{eyebrow}</p>}
        <h2 className={`h2 text-balance ${invert ? "" : "text-navy"} ${eyebrow ? "mt-3" : ""}`}>{title}</h2>
        {lead && <p className={`lead mt-4 ${invert ? "!text-white/75" : ""}`}>{lead}</p>}
      </Reveal>
      {aside && <Reveal className="shrink-0" delay={0.05}>{aside}</Reveal>}
    </div>
  );
}
