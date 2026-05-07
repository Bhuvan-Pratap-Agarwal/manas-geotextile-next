import { LazyWebGLBadge } from "@/components/webgl/LazyWebGLBadge";
import { FooterPlaceholder } from "@/components/footer/FooterPlaceholder";
import { NavbarPlaceholder } from "@/components/navigation/NavbarPlaceholder";
import { HeroPlaceholder } from "@/sections/home/HeroPlaceholder";
import { SectionsPlaceholder } from "@/sections/home/SectionsPlaceholder";

export function HomePage() {
  return (
    <div className="site-root flex min-h-screen-fill flex-col">
      <NavbarPlaceholder />
      <main className="flex-1">
        <HeroPlaceholder />
        <SectionsPlaceholder />
      </main>
      <FooterPlaceholder />
      <LazyWebGLBadge />
    </div>
  );
}
