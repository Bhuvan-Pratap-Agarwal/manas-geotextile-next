import { Container } from "@/components/layout/Container";

export function FooterPlaceholder() {
  return (
    <footer className="border-t border-border bg-surface-raised/80">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr]">
          <div>
            <p className="type-title text-foreground">Manas Geotextile</p>
            <p className="type-body mt-3 max-w-md text-muted">
              Industrial geosystems engineered for infrastructure scale —
              foundation-grade materials and measurable field performance.
            </p>
          </div>
          <div className="type-caption flex flex-col justify-end gap-4 text-muted">
            <span>Placeholder — link columns &amp; legal</span>
            <span className="text-engine">
              © {new Date().getFullYear()} Manas Geotextile
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
