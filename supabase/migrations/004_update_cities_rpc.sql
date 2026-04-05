-- ============================================
-- Migration 004: cities 카운트 업데이트 RPC 함수
-- RLS를 우회하여 likes/dislikes를 안전하게 증감
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
  update cities
  set
    likes = greatest(0, likes + p_like_delta),
    dislikes = greatest(0, dislikes + p_dislike_delta)
  where id = p_city_id;

  return query
    select likes, dislikes
    from cities
    where id = p_city_id;
end;
$$;
