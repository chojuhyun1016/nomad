"use server";

import { createClient } from "@/lib/supabase/server";

export type ReactionType = "like" | "dislike" | null;

interface ToggleReactionResult {
  likes: number;
  dislikes: number;
  userReaction: ReactionType;
  error?: string;
}

export async function toggleReaction(
  cityId: string,
  reactionType: "like" | "dislike"
): Promise<ToggleReactionResult> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { likes: 0, dislikes: 0, userReaction: null, error: "unauthenticated" };
  }

  // 현재 반응 조회
  const { data: existing } = await supabase
    .from("city_reactions")
    .select("id, reaction_type")
    .eq("user_id", user.id)
    .eq("city_id", cityId)
    .single();

  let likeDelta = 0;
  let dislikeDelta = 0;

  if (existing?.reaction_type === reactionType) {
    // 같은 반응 다시 클릭 → 삭제 (토글 off)
    await supabase.from("city_reactions").delete().eq("id", existing.id);
    if (reactionType === "like") likeDelta = -1;
    else dislikeDelta = -1;
  } else if (existing) {
    // 다른 반응으로 변경
    await supabase
      .from("city_reactions")
      .update({ reaction_type: reactionType })
      .eq("id", existing.id);
    if (existing.reaction_type === "like") {
      likeDelta = -1;
      dislikeDelta = 1;
    } else {
      likeDelta = 1;
      dislikeDelta = -1;
    }
  } else {
    // 새 반응 생성
    await supabase.from("city_reactions").insert({
      user_id: user.id,
      city_id: cityId,
      reaction_type: reactionType,
    });
    if (reactionType === "like") likeDelta = 1;
    else dislikeDelta = 1;
  }

  // RPC로 카운트 업데이트 (SECURITY DEFINER — RLS 우회)
  const { data: counts } = await supabase.rpc("update_city_reaction_counts", {
    p_city_id: cityId,
    p_like_delta: likeDelta,
    p_dislike_delta: dislikeDelta,
  });

  const newLikes = counts?.[0]?.new_likes ?? 0;
  const newDislikes = counts?.[0]?.new_dislikes ?? 0;

  // 현재 사용자 반응 다시 확인
  const { data: updated } = await supabase
    .from("city_reactions")
    .select("reaction_type")
    .eq("user_id", user.id)
    .eq("city_id", cityId)
    .single();

  return {
    likes: newLikes,
    dislikes: newDislikes,
    userReaction: (updated?.reaction_type as ReactionType) ?? null,
  };
}
