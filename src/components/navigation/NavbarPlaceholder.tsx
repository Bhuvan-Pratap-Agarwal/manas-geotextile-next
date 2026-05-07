import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function NavbarPlaceholder() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 backdrop-blur-md bg-background/75">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="type-subtitle font-semibold font-[family-name:var(--font-display)]">
          Manas Geotextile
        </Link>
        <nav
          aria-label="Primary"
          className="type-caption hidden gap-10 text-muted md:flex"
        >
          <span className="cursor-default">Systems</span>
          <span className="cursor-default">Engineering</span>
          <span className="cursor-default">Contact</span>
        </nav>
      </Container>
    </header>
  );
}
