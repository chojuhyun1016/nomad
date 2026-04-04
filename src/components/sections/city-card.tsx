"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { City } from "@/types";
import { useReaction } from "@/hooks/useReaction";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const { reaction, likes, dislikes, handleLike, handleDislike } =
    useReaction(city.likes, city.dislikes);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      {/* 이미지 영역 */}
      <div className="relative h-44 bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/80 to-slate-700/80" />
        <div className="absolute bottom-3 left-3">
          <h3 className="text-lg font-bold text-white">{city.cityName}</h3>
          <p className="text-xs text-white/70">{city.cityNameEn}</p>
        </div>
      </div>

      {/* Key-Value 영역 */}
      <div className="p-4">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
          <span className="text-sm text-muted-foreground">예산</span>
          <span className="text-sm font-medium">{city.budgetRange}</span>
          <span className="text-sm text-muted-foreground">지역</span>
          <span className="text-sm font-medium">{city.region}</span>
          <span className="text-sm text-muted-foreground">환경</span>
          <span className="text-sm font-medium">{city.environment.join(", ")}</span>
          <span className="text-sm text-muted-foreground">최고 계절</span>
          <span className="text-sm font-medium">{city.bestSeason.join(", ")}</span>
        </div>
      </div>

      {/* 좋아요/싫어요 영역 */}
      <div className="border-t px-4 py-3 flex items-center gap-4">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            reaction === "like" ? "text-blue-500" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ThumbsUp className="h-4 w-4" />
          <span>{likes}</span>
        </button>
        <button
          onClick={handleDislike}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            reaction === "dislike" ? "text-red-500" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <ThumbsDown className="h-4 w-4" />
          <span>{dislikes}</span>
        </button>
      </div>
    </Card>
  );
}
