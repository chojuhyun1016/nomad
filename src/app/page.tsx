import { Hero } from "@/components/sections/hero";
import { CitySection } from "@/components/sections/city-section";
import { getCities } from "@/lib/cities";

export default async function HomePage() {
  const cities = await getCities();

  return (
    <>
      <Hero />
      <CitySection cities={cities} />
    </>
  );
}
