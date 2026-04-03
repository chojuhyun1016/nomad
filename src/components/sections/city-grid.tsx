import { cities } from "@/data/cities";
import { CityCard } from "./city-card";
import { MeetupWidget } from "./meetup-widget";

export function CityGrid() {
  // 3개씩 ROW로 분할
  const rows: (typeof cities)[] = [];
  for (let i = 0; i < cities.length; i += 3) {
    rows.push(cities.slice(i, i + 3));
  }

  return (
    <section id="cities" className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex}>
              {/* 도시 카드 ROW */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {row.map((city) => (
                  <CityCard key={city.rank} city={city} />
                ))}
              </div>

              {/* ROW 1 뒤에 밋업 위젯 */}
              {rowIndex === 0 && (
                <div className="mt-8">
                  <MeetupWidget />
                </div>
              )}
            </div>
          ))}

          {/* 더 보기 placeholder */}
          <div className="flex justify-center pt-4">
            <button className="px-8 py-3 text-sm font-medium text-muted-foreground border rounded-lg hover:bg-muted transition-colors">
              더 많은 도시 보기 →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
