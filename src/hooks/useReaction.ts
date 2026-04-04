"use client";

import { useState } from "react";

type ReactionType = "like" | "dislike" | null;

export function useReaction(initialLikes: number, initialDislikes: number) {
  const [reaction, setReaction] = useState<ReactionType>(null);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  function handleLike() {
    if (reaction === "like") {
      setReaction(null);
      setLikes((v) => v - 1);
    } else {
      if (reaction === "dislike") setDislikes((v) => v - 1);
      setReaction("like");
      setLikes((v) => v + 1);
    }
  }

  function handleDislike() {
    if (reaction === "dislike") {
      setReaction(null);
      setDislikes((v) => v - 1);
    } else {
      if (reaction === "like") setLikes((v) => v - 1);
      setReaction("dislike");
      setDislikes((v) => v + 1);
    }
  }

  return { reaction, likes, dislikes, handleLike, handleDislike };
}
