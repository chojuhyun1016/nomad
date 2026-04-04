"use client";

import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useReaction } from "@/hooks/useReaction";

interface CityDetailReactionProps {
  likes: number;
  dislikes: number;
}

export function CityDetailReaction({
  likes: initialLikes,
  dislikes: initialDislikes,
}: CityDetailReactionProps) {
  const { reaction, likes, dislikes, handleLike, handleDislike } =
    useReaction(initialLikes, initialDislikes);

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
