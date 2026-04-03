import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { ValueProposition } from "@/components/sections/value-proposition";
import { SeasonalBanner } from "@/components/sections/seasonal-banner";
import { FilterBar } from "@/components/sections/filter-bar";
import { CityGrid } from "@/components/sections/city-grid";
import { VisaGuide } from "@/components/sections/visa-guide";
import { StickyBottomBar } from "@/components/sections/sticky-bottom-bar";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <ValueProposition />
      <SeasonalBanner />
      <FilterBar />
      <CityGrid />
      <VisaGuide />
      <StickyBottomBar />
    </>
  );
}
