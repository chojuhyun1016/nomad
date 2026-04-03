import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentSeason } from "@/lib/get-season";
import { seasonalRecommendations } from "@/data/seasonal";
import { getAqiEmoji } from "@/lib/constants";

export function SeasonalBanner() {
  const month = new Date().getMonth() + 1;
  const season = getCurrentSeason(month);
  const rec = seasonalRecommendations[season];

  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start sm:justify-between gap-6">
          <div>
            <Badge variant="outline" className="mb-3 text-sm">
              {rec.emoji} {month}월의 추천 도시 / {rec.headline}
            </Badge>
            <h2 className="text-2xl font-bold">{rec.season} 추천 도시</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {rec.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:flex-nowrap">
            {rec.cities.map((city) => (
              <Card key={city.cityName} className="min-w-[140px]">
                <CardContent className="p-4 text-center">
                  <span className="text-2xl">{city.emoji}</span>
                  <p className="mt-1 font-semibold text-sm">{city.cityName}</p>
                  <p className="text-xs text-muted-foreground">{city.cityNameEn}</p>
                  <p className="mt-1 text-xs">
                    {getAqiEmoji(city.aqi)} AQI {city.aqi}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-4 text-center sm:text-right">
          <a href="#" className="text-sm font-medium text-primary hover:underline">
            계절 가이드 보기 →
          </a>
        </div>
      </div>
    </section>
  );
}
