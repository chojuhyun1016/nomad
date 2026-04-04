import { CityCard } from "./city-card";
import { City } from "@/types";

interface CityGridProps {
  cities: City[];
}

export function CityGrid({ cities }: CityGridProps) {
  return (
    <section id="cities" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-6">도시 리스트</h2>
        {cities.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            조건에 맞는 도시가 없습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <CityCard key={city.cityName} city={city} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
