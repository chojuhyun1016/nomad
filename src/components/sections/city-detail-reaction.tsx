"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useReaction } from "@/hooks/useReaction";
import type { ReactionType } from "@/app/cities/actions";

interface CityDetailReactionProps {
  cityId: string;
  likes: number;
  dislikes: number;
  userReaction?: ReactionType;
}

export function CityDetailReaction({
  cityId,
  likes: initialLikes,
  dislikes: initialDislikes,
  userReaction,
}: CityDetailReactionProps) {
  const { reaction, likes, dislikes, handleLike, handleDislike } =
    useReaction({
      cityId,
      initialLikes,
      initialDislikes,
      initialReaction: userReaction,
    });

  return (
    <section className="flex items-center gap-6">
      <button
        onClick={handleLike}
        className={`flex items-center gap-2 text-base transition-colors ${
          reaction === "like"
            ? "text-blue-500"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ThumbsUp className="h-5 w-5" />
        <span>{likes}</span>
      </button>
      <button
        onClick={handleDislike}
        className={`flex items-center gap-2 text-base transition-colors ${
          reaction === "dislike"
            ? "text-red-500"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ThumbsDown className="h-5 w-5" />
        <span>{dislikes}</span>
      </button>
    </section>
  );
}
