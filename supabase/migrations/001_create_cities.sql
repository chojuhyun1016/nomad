-- ============================================
-- Migration 001: cities 테이블 생성
-- ============================================

create table if not exists cities (
  id uuid default gen_random_uuid() primary key,
  city_name text not null,
  city_name_en text not null unique,
  slug text not null unique,
  image_url text,
  k_nomad_score integer not null default 0,
  monthly_cost integer not null default 0,
  internet_speed integer not null default 0,
  cafe_score integer not null default 0,
  temperature integer not null default 0,
  aqi integer not null default 0,
  safety_score integer not null default 0,
  ktx_to_seoul text not null default '',
  region text not null,
  environment text[] not null default '{}',
  best_season text[] not null default '{}',
  budget_range text not null,
  likes integer not null default 0,
  dislikes integer not null default 0,
  created_at timestamptz default now()
);

-- RLS: 누구나 읽기 가능, 수정 불가
alter table cities enable row level security;

create policy "cities_select_all"
  on cities for select
  to anon, authenticated
  using (true);
