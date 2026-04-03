import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBar } from "./score-bar";
import { City } from "@/types";
import { formatCost, getAqiEmoji } from "@/lib/constants";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  // monthlyCost를 0~100 스코어로 환산 (낮을수록 높은 점수)
  const costScore = Math.max(0, Math.min(100, Math.round(100 - (city.monthlyCost / 20000))));
  // internetSpeed를 0~100 스코어로 환산
  const netScore = Math.min(100, Math.round((city.internetSpeed / 150) * 100));

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* 이미지 영역 */}
      <div className="relative h-44 bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden">
        {/* placeholder 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/80 to-slate-700/80" />

        {/* 순위 */}
        <div className="absolute top-3 left-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 backdrop-blur text-white text-sm font-bold">
            {city.rank}
          </div>
        </div>

        {/* 우상단 지표 */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
          <Badge variant="secondary" className="text-xs font-mono bg-black/50 text-white border-0 backdrop-blur">
            ☕ {city.cafeScore}
          </Badge>
          <Badge variant="secondary" className="text-xs font-mono bg-black/50 text-white border-0 backdrop-blur">
            📶 {city.internetSpeed}
          </Badge>
        </div>

        {/* 도시명 */}
        <div className="absolute bottom-3 left-3">
          <h3 className="text-lg font-bold text-white">{city.cityName}</h3>
          <p className="text-xs text-white/70">{city.cityNameEn}</p>
        </div>
      </div>

      {/* 스코어 영역 */}
      <div className="p-4 space-y-2">
        <ScoreBar icon="⭐" label="Overall" value={city.kNomadScore} />
        <ScoreBar icon="💵" label="Cost" value={costScore} />
        <ScoreBar icon="📡" label="Net" value={netScore} />
        <ScoreBar icon="☕" label="Cafe" value={city.cafeScore} />
        <ScoreBar icon="👮" label="Safe" value={city.safetyScore} />

        {/* 하단 메트릭 */}
        <div className="pt-2 border-t mt-3 grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
          <span>🌤 {city.temperature}°C</span>
          <span className="text-right">{getAqiEmoji(city.aqi)} AQI: {city.aqi}</span>
          <span>💰 {formatCost(city.monthlyCost)}/월</span>
          <span className="text-right">👍 {city.likedPercent}%</span>
          <span className="col-span-2 text-center">🚄 서울까지 {city.ktxToSeoul}</span>
        </div>
      </div>
    </Card>
  );
}
