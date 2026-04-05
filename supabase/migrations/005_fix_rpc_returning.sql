-- ============================================
-- Migration 005: RPC 함수 수정 — UPDATE ... RETURNING 사용
-- ============================================

create or replace function update_city_reaction_counts(
  p_city_id uuid,
  p_like_delta integer,
  p_dislike_delta integer
)
returns table(new_likes integer, new_dislikes integer)
language plpgsql
security definer
as $$
begin
  return query
    update cities
    set
      likes = greatest(0, likes + p_like_delta),
      dislikes = greatest(0, dislikes + p_dislike_delta)
    where id = p_city_id
    returning likes, dislikes;
end;
$$;
