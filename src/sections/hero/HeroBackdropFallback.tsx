export function HeroBackdropFallback() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-0 bg-[var(--surface-base)]"
    >
      <div
        className="surface-grid absolute inset-0 opacity-[0.18] sm:opacity-[0.2]"
        style={{ maskImage: "none" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1016] via-[color-mix(in_oklab,var(--surface-base)_40%,transparent)] to-[var(--surface-base)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_72%_58%_at_50%_36%,rgba(200,169,107,0.045),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_100%,rgba(0,0,0,0.35),transparent_55%)]" />
    </div>
  );
}
