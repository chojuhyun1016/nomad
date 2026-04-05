import { Hero } from "@/components/sections/hero";
import { CitySection } from "@/components/sections/city-section";
import { getCities, getUserReactions } from "@/lib/cities";

export default async function HomePage() {
  const [cities, userReactions] = await Promise.all([
    getCities(),
    getUserReactions(),
  ]);

  return (
    <>
      <Hero />
      <CitySection cities={cities} userReactions={userReactions} />
    </>
  );
}
