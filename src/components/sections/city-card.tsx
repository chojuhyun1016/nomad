"use client";

import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { City } from "@/types";
import { useReaction } from "@/hooks/useReaction";
import { toSlug } from "@/lib/slug";
import type { ReactionType } from "@/app/cities/actions";

interface CityCardProps {
  city: City;
  userReaction?: ReactionType;
}

export function CityCard({ city, userReaction }: CityCardProps) {
  const { reaction, likes, dislikes, handleLike, handleDislike } =
    useReaction({
      cityId: city.id,
      initialLikes: city.likes,
      initialDislikes: city.dislikes,
      initialReaction: userReaction,
    });

  return (
    <Link href={`/cities/${toSlug(city.cityNameEn)}`} className="block">
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
        <div className="border-t px-4 py-3 flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleLike();
            }}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              reaction === "like" ? "text-blue-500" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likes}</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDislike();
            }}
            className={`flex items-center gap-1.5 text-sm transition-colors ${
              reaction === "dislike" ? "text-red-500" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{dislikes}</span>
            <ThumbsDown className="h-4 w-4" />
          </button>
        </div>
      </Card>
    </Link>
  );
}
