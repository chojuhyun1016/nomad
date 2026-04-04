import { Hero } from "@/components/sections/hero";
import { CitySection } from "@/components/sections/city-section";
import { cities } from "@/data/cities";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CitySection cities={cities} />
    </>
  );
}
