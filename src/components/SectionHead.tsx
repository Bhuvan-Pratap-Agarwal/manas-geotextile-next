import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  lead,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid gap-8 border-t border-line pt-6 lg:grid-cols-12">
      <Reveal className="lg:col-span-3">
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal className="lg:col-span-6" delay={0.05}>
        <h2 className="h2 text-balance">{title}</h2>
        {lead && <p className="lead mt-6 max-w-xl">{lead}</p>}
      </Reveal>
      {aside && (
        <Reveal className="flex items-end lg:col-span-3 lg:justify-end" delay={0.1}>
          {aside}
        </Reveal>
      )}
    </div>
  );
}
