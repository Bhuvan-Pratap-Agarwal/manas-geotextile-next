import { CinematicNav } from "@/components/navigation/CinematicNav";
import { HeroSection } from "@/sections/hero/HeroSection";
import { FooterPlaceholder } from "@/components/footer/FooterPlaceholder";
import { SectionsPlaceholder } from "@/sections/home/SectionsPlaceholder";

export function HomePage() {
  return (
    <div className="site-root flex min-h-screen-fill flex-col">
      <CinematicNav />
      <main className="flex-1">
        <HeroSection />
        <SectionsPlaceholder />
      </main>
      <FooterPlaceholder />
    </div>
  );
}
