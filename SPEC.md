# Korea Nomad 웹사이트 개선 스펙

## Context

Korea Nomad는 한국 디지털 노마드 전용 도시 가이드 플랫폼이다. MVP UI에서 출발하여, 불필요한 섹션을 제거하고, 필터를 재설계하며, 카드를 Key-Value + 좋아요/싫어요 구조로 단순화했다. Supabase Auth(이메일 로그인, SSR)를 연동하고, SOLID 원칙에 따라 리팩토링을 완료했다.

### 현재 상태

- **인증**: Supabase Auth 이메일 로그인 (SSR, 미들웨어 세션 리프레시)
- **홈페이지**: Hero + FilterBar + CityGrid (12개 도시, 좋아요 순 정렬)
- **필터**: 예산 / 지역 / 환경 / 최고 계절 (4개 카테고리, 데이터 기반 동적 렌더링)
- **카드**: Key-Value 구조 + 좋아요/싫어요 토글 (클라이언트 상태)
- **데이터**: Mock 데이터 (`src/data/cities.ts`), DB 미사용

---

## Phase 1: 불필요한 요소 제거 + 네비게이션 정리

- [x] Phase 1 완료

### 오버뷰

홈페이지에서 사용하지 않는 섹션을 제거하고, 네비게이션을 인증 관련 버튼만 남긴다.

### 수정/개선

- [x] `src/app/page.tsx` — 6개 섹션 제거, Hero + CitySection만 유지
- [x] `src/data/nav.ts` — `mainNav` 비우기, `footerColumns` "정보"/"소셜"만 유지
- [x] `src/components/layout/header.tsx` — 네비 링크 제거, 인증 버튼만 유지
- [x] `src/components/layout/mobile-nav.tsx` — 네비 링크 제거, 인증 항목만 유지
- [x] `src/components/sections/city-grid.tsx` — MeetupWidget/더보기 버튼 제거, "도시 리스트" 제목 추가
- [x] 미사용 파일 10개 삭제 (social-proof, value-proposition, seasonal-banner, visa-guide, sticky-bottom-bar, meetup-widget, media.ts, seasonal.ts, meetups.ts, visa.ts)

### 검증/확인

- [x] `npm run build` 성공
- [x] 홈페이지에 Hero + FilterBar + CityGrid + Footer만 렌더링
- [x] 헤더/푸터에서 미구현 페이지 링크 제거 확인

---

## Phase 2: 데이터 모델 & 필터 재구성

- [x] Phase 2 완료

### 오버뷰

City 타입에 `region`, `environment`, `bestSeason`, `budgetRange`, `likes`, `dislikes` 필드를 추가하고, 필터 바를 4개 카테고리 토글로 재구성한다.

### 수정/개선

- [x] `src/types/index.ts` — City에 새 필드 추가, 미사용 타입 제거
- [x] `src/data/cities.ts` — 12개 도시 Mock 데이터 업데이트
- [x] `src/components/sections/filter-bar.tsx` — 4개 카테고리별 버튼 그룹
- [x] `src/components/sections/city-section.tsx` (신규) — Client 래퍼
- [x] `src/components/sections/city-grid.tsx` — props로 cities 배열 수신
- [x] `src/app/page.tsx` — CitySection으로 교체

### 검증/확인

- [x] `npm run build` 성공
- [x] 필터 4개 카테고리 표시
- [x] 좋아요 순 정렬

---

## Phase 3: 카드 UI 재구성 + 좋아요/싫어요 기능

- [x] Phase 3 완료

### 오버뷰

CityCard를 Key-Value 구조 + 좋아요/싫어요 토글로 재구성한다.

### 수정/개선

- [x] `src/components/sections/city-card.tsx` — Key-Value + 좋아요/싫어요 토글
- [x] `src/components/sections/score-bar.tsx` 삭제
- [x] `src/lib/constants.ts` — 미사용 함수 제거

### 카드 구조

```
Card (hover:scale-[1.02] hover:shadow-xl)
├── 이미지 영역 (h-44, 그라데이션 배경)
│   ├── 도시명 (좌하단, 흰색 bold)
│   └── 영문명 (좌하단, 흰색/70)
├── Key-Value 영역 (p-4)
│   ├── 예산: {budgetRange}
│   ├── 지역: {region}
│   ├── 환경: {environment.join(", ")}
│   └── 최고 계절: {bestSeason.join(", ")}
└── 좋아요/싫어요 영역 (border-t, px-4, py-3)
    ├── [ThumbsUp] {likes}  — 클릭 시 파란색 토글
    └── [ThumbsDown] {dislikes}  — 클릭 시 빨간색 토글
```

### 검증/확인

- [x] `npm run build` 성공

---

## Phase 4: SOLID 원칙 리팩토링

- [x] Phase 4 완료

### 오버뷰

custom hook 분리, 데이터 기반 렌더링, 의존성 주입을 적용하여 SOLID 원칙을 개선한다.

### 수정/개선

- [x] `src/hooks/useLogout.ts` (신규) — 로그아웃 로직 통합 (SRP, DRY)
- [x] `src/hooks/useReaction.ts` (신규) — 좋아요/싫어요 상태관리 (SRP)
- [x] `src/hooks/useCityFilter.ts` (신규) — 필터 상태 + 필터링 로직 (SRP, DIP)
- [x] `src/config/filter-config.ts` (신규) — `FilterDefinition` + `FILTER_DEFINITIONS` (OCP)
- [x] `src/lib/validation.ts` (신규) — 비밀번호 검증 유틸 (SRP)
- [x] `src/components/layout/logout-button.tsx` — `useLogout` hook 사용
- [x] `src/components/layout/mobile-nav.tsx` — `useLogout` hook 사용
- [x] `src/components/sections/city-card.tsx` — `useReaction` hook 사용
- [x] `src/components/sections/filter-bar.tsx` — `FILTER_DEFINITIONS` 동적 렌더링
- [x] `src/components/sections/city-section.tsx` — cities props 주입 + `useCityFilter`
- [x] `src/app/page.tsx` — cities 데이터를 CitySection에 전달
- [x] `src/app/register/register-form.tsx` — `validation.ts`에서 import
- [x] `src/data/nav.ts` — 미사용 `filterOptions` 제거

### 검증/확인

- [x] `npm run lint` 통과
- [x] `npm run build` 성공

---

## Phase 5: 도시 상세 페이지 라우트 + 데이터 조회

- [x] Phase 5 완료

### 오버뷰

도시 카드를 클릭하면 `/cities/[slug]` 상세 페이지로 이동하도록 동적 라우트를 생성한다. `cityNameEn`을 소문자로 변환하여 slug로 사용하고, Mock 데이터에서 slug로 도시를 조회하는 유틸을 만든다.

### 수정/개선

- [x] **`src/lib/cities.ts`** (신규) — 도시 조회 유틸
  - [x] `toSlug(cityNameEn: string): string` — 영문명을 소문자 slug로 변환
  - [x] `getCityBySlug(slug: string): City | undefined` — slug로 도시 조회
  - [x] `getAllCitySlugs(): string[]` — 정적 생성용 slug 목록
- [x] **`src/app/cities/[slug]/page.tsx`** (신규) — 동적 라우트 Server Component
  - [x] `generateStaticParams()`로 정적 생성
  - [x] slug로 도시 조회, 없으면 `notFound()` 호출
  - [x] metadata 동적 생성 (도시명 기반 title/description)
  - [x] 상세 UI는 Phase 6에서 구현, 이 단계에서는 도시명만 표시하는 최소 페이지
- [x] **`src/components/sections/city-card.tsx`** — 카드에 Link 추가
  - [x] `next/link`의 `Link` 컴포넌트로 카드 전체를 감싸기
  - [x] href: `/cities/${toSlug(city.cityNameEn)}`
  - [x] 좋아요/싫어요 버튼 클릭 시 Link 이벤트 전파 방지 (`e.stopPropagation()` 또는 버튼 영역 분리)

### 검증/확인

- [x] `npm run build` 성공
- [x] `npm run lint` 통과
- [ ] 홈페이지에서 도시 카드 클릭 시 `/cities/seoul` 등으로 이동
- [ ] 존재하지 않는 slug 접근 시 404 페이지 표시
- [ ] 좋아요/싫어요 버튼 클릭 시 상세 페이지로 이동하지 않고 토글만 동작

---

## Phase 6: 상세 페이지 UI 구현

- [x] Phase 6 완료

### 오버뷰

도시 상세 페이지에 City 타입의 모든 필드를 표시한다. 히어로 영역, 기본 정보 Key-Value, 상세 메트릭 그리드, 좋아요/싫어요 버튼으로 구성한다.

### 전제조건

- [x] Phase 5 완료

### 수정/개선

- [x] **`src/app/cities/[slug]/page.tsx`** — 상세 페이지 UI 구현
  - [x] 히어로 영역: 도시명(한글/영문) + 그라데이션 배경 (카드와 동일한 스타일)
  - [x] 기본 정보 섹션 (Key-Value): 예산, 지역, 환경, 최고 계절
  - [x] 상세 메트릭 그리드: kNomadScore, 월비용(포맷팅), 인터넷속도(Mbps), 카페스코어, 기온(°C), AQI, 안전도, KTX 소요시간
  - [x] 뒤로가기 링크 (← 도시 리스트)
- [x] **`src/components/sections/city-detail-reaction.tsx`** (신규) — Client Component
  - [x] `useReaction` hook 재사용
  - [x] 좋아요/싫어요 버튼 (카드와 동일한 토글 로직)
  - [x] 상세 페이지에서는 버튼 크기를 좀 더 크게 표시

### 검증/확인

- [x] `npm run build` 성공
- [x] `npm run lint` 통과
- [ ] 상세 페이지에 City의 모든 필드가 표시
- [ ] 좋아요/싫어요 토글 정상 동작
- [ ] 뒤로가기 링크로 홈페이지 이동
- [ ] 반응형 레이아웃 (모바일/데스크톱) 정상 표시

---

## Phase 7: 좋아요/싫어요 버튼 레이아웃 변경

- [x] Phase 7 완료

### 오버뷰

도시 카드의 좋아요/싫어요 버튼을 양쪽 정렬로 변경하고, 아이콘과 숫자 배치를 `[👍][숫자]...[숫자][👎]` 형태로 수정한다.

### 수정/개선

- [x] **`src/components/sections/city-card.tsx`** — 좋아요/싫어요 영역 레이아웃 변경
  - [x] `flex items-center gap-4` → `flex items-center justify-between`
  - [x] 좋아요 버튼: `[ThumbsUp][숫자]` (왼쪽 정렬, 기존과 동일)
  - [x] 싫어요 버튼: `[숫자][ThumbsDown]` (오른쪽 정렬, 아이콘과 숫자 순서 반전)

### 검증/확인

- [x] `npm run build` 성공
- [x] `npm run lint` 통과
- [x] 좋아요 버튼이 왼쪽, 싫어요 버튼이 오른쪽에 정렬
- [x] 배치: `[👍][숫자]...[숫자][👎]`
- [x] 좋아요/싫어요 토글 동작 정상

---

## Phase 8: 필터 버튼 최대 너비 균등 배치

- [x] Phase 8 완료

### 오버뷰

필터 바의 각 카테고리(예산, 지역, 환경, 최고 계절) 버튼들이 라벨 옆 남은 공간을 균등하게 차지하도록 변경한다.

### 수정/개선

- [x] **`src/components/sections/filter-bar.tsx`** — FilterGroup 레이아웃 변경
  - [x] 버튼 컨테이너: `flex flex-wrap gap-1.5` → `flex gap-1.5 flex-1`
  - [x] 각 버튼: `flex-1 text-center` 추가하여 균등 너비 배분

### 검증/확인

- [x] `npm run build` 성공
- [x] `npm run lint` 통과
- [x] 각 필터 행의 버튼들이 남은 공간을 균등하게 차지
- [x] 모바일/데스크톱 반응형 정상 표시
- [x] 필터 클릭 동작 정상

---

## Phase 9: Supabase 테이블 생성 + 시드 데이터

- [x] Phase 9 완료

### 오버뷰

cities 테이블과 city_reactions 테이블을 Supabase에 생성하고, Mock 데이터를 시드로 삽입한다. RLS 정책을 설정한다.

### 수정/개선

- [x] Supabase SQL Editor에서 `cities`, `city_reactions` 테이블 생성
- [x] RLS 정책 설정 (cities: 누구나 읽기 / city_reactions: 인증 사용자만 자기 반응 CRUD)
- [x] 12개 도시 시드 데이터 INSERT
- [x] **`src/types/index.ts`** — City 타입에 `id: string` 추가

### 검증/확인

- [x] Supabase Dashboard에서 cities 12행, city_reactions 테이블 확인
- [x] RLS 정책 동작 확인
- [x] `npm run build` 성공

---

## Phase 10: 도시 데이터 Supabase 조회로 전환

- [ ] Phase 10 완료

### 전제조건

- [ ] Phase 9 완료

### 오버뷰

Mock import를 Supabase 서버 쿼리로 교체한다. DIP 패턴(props 주입)을 유지한다.

### 수정/개선

- [ ] **`src/lib/cities.ts`** — Supabase 서버 쿼리로 변경 (`getCities`, `getCityBySlug`, `getAllCitySlugs`)
- [ ] **`src/app/page.tsx`** — `getCities()` 호출 후 CitySection에 전달
- [ ] **`src/app/cities/[slug]/page.tsx`** — `getCityBySlug(slug)` Supabase 쿼리로 변경
- [ ] **`src/data/cities.ts`** — 프로덕션 코드에서 import 제거 (시드 용도로 유지)

### 검증/확인

- [ ] `npm run build` 성공
- [ ] `npm run lint` 통과
- [ ] 홈페이지에서 12개 도시가 Supabase에서 조회되어 표시
- [ ] 필터링 + 상세 페이지 정상 동작

---

## Phase 11: 좋아요/싫어요 Supabase 저장

- [ ] Phase 11 완료

### 전제조건

- [ ] Phase 10 완료

### 오버뷰

좋아요/싫어요 클릭 시 city_reactions 테이블에 저장하고 카운트를 업데이트한다. 비인증 사용자는 로그인 유도.

### 수정/개선

- [ ] **`src/app/cities/actions.ts`** (신규) — `toggleReaction` Server Action
- [ ] **`src/hooks/useReaction.ts`** — 낙관적 업데이트 + Server Action 호출
- [ ] **`src/components/sections/city-card.tsx`** — cityId, 사용자 반응 상태 전달
- [ ] **`src/components/sections/city-detail-reaction.tsx`** — 동일
- [ ] **`src/app/page.tsx`** — 사용자 반응 상태 함께 조회
- [ ] **`src/app/cities/[slug]/page.tsx`** — 동일

### 검증/확인

- [ ] `npm run build` 성공
- [ ] `npm run lint` 통과
- [ ] 로그인 상태에서 좋아요 → DB 저장, 새로고침 후 유지
- [ ] 비인증 클릭 → 로그인 페이지 이동
- [ ] 홈 ↔ 상세 페이지 간 좋아요 상태 동기화

---

## Bugfix: 좋아요 카운트 초기화 버그 수정

- [x] 수정 완료

### 원인

`toggleReaction` Server Action에서 `city_reactions` 테이블의 행 수를 COUNT하여 `cities.likes/dislikes`에 덮어쓰는 방식이었음. 시드 데이터(likes=920)는 `city_reactions`에 실제 행이 없으므로 COUNT=0 → 920이 0으로 초기화됨.

### 수정 내용

- [x] **`src/app/cities/actions.ts`** — COUNT 방식 → 증감(delta) 방식으로 변경
  - [x] 현재 `cities.likes/dislikes` 값을 먼저 조회
  - [x] 반응 유형에 따라 `likeDelta`, `dislikeDelta` 계산 (+1/-1)
  - [x] `Math.max(0, 현재값 + delta)`로 업데이트 (음수 방지)

### 검증/확인

- [x] `npm run build` 성공
- [x] `npm run lint` 통과
