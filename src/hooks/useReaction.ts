"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleReaction, type ReactionType } from "@/app/cities/actions";

interface UseReactionOptions {
  cityId: string;
  initialLikes: number;
  initialDislikes: number;
  initialReaction?: ReactionType;
}

export function useReaction({
  cityId,
  initialLikes,
  initialDislikes,
  initialReaction = null,
}: UseReactionOptions) {
  const router = useRouter();
  const [reaction, setReaction] = useState<ReactionType>(initialReaction);
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [isPending, startTransition] = useTransition();

  function handleReaction(type: "like" | "dislike") {
    // 낙관적 업데이트를 위한 이전 상태 저장
    const prevReaction = reaction;
    const prevLikes = likes;
    const prevDislikes = dislikes;

    // 낙관적 UI 업데이트
    if (reaction === type) {
      // 토글 off
      setReaction(null);
      if (type === "like") setLikes((v) => v - 1);
      else setDislikes((v) => v - 1);
    } else {
      // 새 반응 또는 변경
      if (reaction === "like") setLikes((v) => v - 1);
      if (reaction === "dislike") setDislikes((v) => v - 1);
      setReaction(type);
      if (type === "like") setLikes((v) => v + 1);
      else setDislikes((v) => v + 1);
    }

    startTransition(async () => {
      const result = await toggleReaction(cityId, type);

      if (result.error === "unauthenticated") {
        // 롤백 후 로그인 페이지로
        setReaction(prevReaction);
        setLikes(prevLikes);
        setDislikes(prevDislikes);
        router.push("/login");
        return;
      }

      // 서버 결과로 동기화
      setLikes(result.likes);
      setDislikes(result.dislikes);
      setReaction(result.userReaction);
    });
  }

  function handleLike() {
    handleReaction("like");
  }

  function handleDislike() {
    handleReaction("dislike");
  }

  return { reaction, likes, dislikes, handleLike, handleDislike, isPending };
}
