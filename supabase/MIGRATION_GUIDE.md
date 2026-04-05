# Supabase 데이터베이스 마이그레이션 가이드

## 사전 준비

1. Supabase 프로젝트가 생성되어 있어야 합니다
2. `.env.local`에 아래 환경 변수가 설정되어 있어야 합니다:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

## 마이그레이션 실행 순서

Supabase Dashboard > SQL Editor에서 아래 파일들을 **순서대로** 실행하세요.

### 1단계: cities 테이블 생성

**파일**: `supabase/migrations/001_create_cities.sql`

- `cities` 테이블 생성 (22개 컬럼)
- RLS 활성화 + 누구나 읽기 가능 정책

### 2단계: city_reactions 테이블 생성

**파일**: `supabase/migrations/002_create_city_reactions.sql`

- `city_reactions` 테이블 생성 (사용자별 좋아요/싫어요 추적)
- `auth.users` FK 참조
- `(user_id, city_id)` 유니크 제약
- RLS 활성화 + 인증 사용자만 자기 반응 CRUD 정책

### 3단계: 시드 데이터 삽입

**파일**: `supabase/migrations/003_seed_cities.sql`

- 12개 도시 Mock 데이터를 cities 테이블에 INSERT
- `on conflict (slug) do nothing`으로 중복 실행 안전

## 실행 후 확인

### Supabase Dashboard에서 확인

1. **Table Editor** > `cities` 테이블 > 12행 존재 확인
2. **Table Editor** > `city_reactions` 테이블 > 빈 테이블 확인
3. **Authentication** > **Policies** > 아래 정책 확인:
   - `cities_select_all` (cities, SELECT)
   - `reactions_select` (city_reactions, SELECT)
   - `reactions_insert` (city_reactions, INSERT)
   - `reactions_update` (city_reactions, UPDATE)
   - `reactions_delete` (city_reactions, DELETE)

### RLS 검증 (SQL Editor에서)

```sql
-- anon 키로 cities 조회 가능 확인
select count(*) from cities;  -- 결과: 12

-- city_reactions는 인증 없이 INSERT 불가 확인
-- (Dashboard에서 anon 역할로 테스트)
```

## 테이블 스키마

### cities

| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | 자동 생성 |
| city_name | text | 도시명 (한글) |
| city_name_en | text (unique) | 도시명 (영문) |
| slug | text (unique) | URL slug |
| image_url | text | 도시 이미지 경로 |
| k_nomad_score | integer | K-Nomad 스코어 (0~100) |
| monthly_cost | integer | 월 생활비 (원) |
| internet_speed | integer | 인터넷 속도 (Mbps) |
| cafe_score | integer | 카페 스코어 (0~100) |
| temperature | integer | 평균 기온 |
| aqi | integer | 대기질 지수 |
| safety_score | integer | 안전도 (0~100) |
| ktx_to_seoul | text | 서울까지 소요시간 |
| region | text | 지역 |
| environment | text[] | 환경 특성 배열 |
| best_season | text[] | 최고 계절 배열 |
| budget_range | text | 예산 범위 |
| likes | integer | 좋아요 수 |
| dislikes | integer | 싫어요 수 |
| created_at | timestamptz | 생성일 |

### city_reactions

| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | 자동 생성 |
| user_id | uuid (FK → auth.users) | 사용자 ID |
| city_id | uuid (FK → cities) | 도시 ID |
| reaction_type | text | 'like' 또는 'dislike' |
| created_at | timestamptz | 생성일 |

**제약**: `(user_id, city_id)` 유니크 — 사용자당 도시별 반응 1개

## 롤백

마이그레이션을 되돌려야 하는 경우:

```sql
-- 주의: 모든 데이터가 삭제됩니다
drop table if exists city_reactions;
drop table if exists cities;
```
