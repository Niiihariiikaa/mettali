import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { MarqueeSection } from "@/components/sections/marquee-section";
import { CategoriesSection } from "@/components/sections/categories-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { QuickBuySection } from "@/components/sections/quick-buy-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <MarqueeSection />
      <CategoriesSection />
      <TechnologySection />
      <QuickBuySection />
      <EditorialSection />
      <FooterSection />
    </main>
  );
}
