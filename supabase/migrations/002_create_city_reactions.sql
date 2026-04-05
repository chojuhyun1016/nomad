-- ============================================
-- Migration 002: city_reactions 테이블 생성
-- ============================================

create table if not exists city_reactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  city_id uuid not null references cities(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('like', 'dislike')),
  created_at timestamptz default now(),
  unique(user_id, city_id)
);

-- 인덱스
create index idx_city_reactions_city_id on city_reactions(city_id);
create index idx_city_reactions_user_id on city_reactions(user_id);

-- RLS: 인증 사용자만 자기 반응 관리
alter table city_reactions enable row level security;

create policy "reactions_select"
  on city_reactions for select
  to authenticated
  using (true);

create policy "reactions_insert"
  on city_reactions for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "reactions_update"
  on city_reactions for update
  to authenticated
  using (auth.uid() = user_id);

create policy "reactions_delete"
  on city_reactions for delete
  to authenticated
  using (auth.uid() = user_id);
