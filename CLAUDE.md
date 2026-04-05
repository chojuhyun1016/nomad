# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Korea Nomad** — 한국 디지털 노마드 전용 도시 가이드 플랫폼.
Supabase Auth(이메일 로그인) 연동 완료. Mock 데이터 기반 정적 렌더링, 필터링/좋아요 기능은 클라이언트 상태로 동작.

- PRD: `korea-nomad-prd.md` 참조
- 개선 스펙: `SPEC.md` 참조

## 개발 명령어

```bash
npm run dev      # 개발 서버 (Turbopack, http://localhost:3000)
npm run build    # 프로덕션 빌드 (TypeScript 타입 체크 포함)
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

> **dev 서버 재시작이 필요한 경우**: `.env.local` 변경, `middleware.ts` 변경, 패키지 설치 후
> → `Ctrl+C`로 중지 후 `npm run dev` 재실행. 그 외 코드 변경은 HMR로 자동 반영.

## 기술 스택

| 구분 | 스택 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| UI | shadcn/ui v4 (base-ui 기반), Tailwind CSS v4 |
| 언어 | TypeScript |
| 인증 | Supabase Auth (이메일 로그인, SSR) |
| 폰트 | Noto Sans KR + Inter (`next/font/google`) |
| 아이콘 | lucide-react |

## 디렉토리 구조

```
src/
├── app/                    # App Router
│   ├── layout.tsx          # 루트 레이아웃 (Header + Footer)
│   ├── page.tsx            # 홈페이지 (Hero + CitySection)
│   ├── login/              # 로그인 (page, form, actions)
│   ├── register/           # 회원가입 (page, form, actions)
│   └── auth/confirm/       # 이메일 인증 콜백 (route.ts)
├── components/
│   ├── layout/             # Header, Footer, MobileNav, LogoutButton
│   ├── sections/           # 홈페이지 섹션 (hero, filter-bar, city-section, city-grid, city-card)
│   └── ui/                 # shadcn/ui 컴포넌트 (자동 생성, 직접 수정 금지)
├── config/                 # 필터 설정 (filter-config.ts)
├── hooks/                  # Custom hooks (useLogout, useReaction, useCityFilter)
├── data/                   # Mock 데이터 (cities, nav)
├── types/                  # TypeScript 타입 정의 (index.ts)
└── lib/                    # 유틸리티
    ├── supabase/           # Supabase 클라이언트 (client, server, middleware)
    ├── constants.ts        # 히어로 섹션 상수
    ├── validation.ts       # 비밀번호 검증 유틸
    ├── utils.ts            # cn (클래스 병합)
    └── get-season.ts       # 계절 판별
```

## 홈페이지 구성 (page.tsx 순서)

| 섹션 | 컴포넌트 | Server/Client |
|---|---|---|
| 히어로 | `hero.tsx` + `hero-signup-form.tsx` + `hero-video-modal.tsx` | Server + Client |
| 필터 + 도시 | `city-section.tsx` → `filter-bar.tsx` + `city-grid.tsx` + `city-card.tsx` | Client |

## 인증 시스템 (Supabase SSR)

| 파일 | 역할 |
|---|---|
| `src/lib/supabase/client.ts` | 브라우저용 클라이언트 (`createBrowserClient`) |
| `src/lib/supabase/server.ts` | 서버용 클라이언트 (`createServerClient` + `cookies()`) |
| `src/lib/supabase/middleware.ts` | 미들웨어용 세션 리프레시 |
| `src/middleware.ts` | Next.js Middleware (보호 경로: `/dashboard`, `/profile`, `/settings`) |
| `src/app/login/actions.ts` | 로그인 Server Action (`useActionState` 패턴) |
| `src/app/register/actions.ts` | 회원가입 Server Action + 자동 세션 정리 |
| `src/app/auth/confirm/route.ts` | 이메일 인증 토큰 검증 |

## 핵심 컨벤션

- **Server Component 우선** — `"use client"`는 상태/인터랙션이 필요한 경우에만
- **shadcn/ui v4**: `asChild` 대신 `render` prop 사용 (base-ui 기반)
- **shadcn/ui Button**: 기본 `type="button"` → 폼 제출 시 반드시 `type="submit"` 명시
- **Server Action + `useActionState`**: 폼 제출 시 `redirect()` 대신 `{ success: true }` 반환 후 클라이언트에서 `router.push()` (Next.js 16 호환)
- **Mock 데이터**: `src/data/`에서 import → 컴포넌트에 props로 주입 (DIP)
- **Custom Hooks**: 비즈니스 로직은 hook으로 분리 (`useReaction`, `useCityFilter`, `useLogout`)
- **필터 설정**: `src/config/filter-config.ts`의 `FILTER_DEFINITIONS`로 관리 (OCP — 새 필터 추가 시 설정만 추가)
- **반응형**: Tailwind 기본 브레이크포인트 (`md:768px`, `lg:1024px`, `xl:1280px`)

## 테스트

### 유닛 테스트 (Vitest)

```bash
npm test              # 전체 실행
npm run test:watch    # 감시 모드
npm run test:coverage # 커버리지 리포트
```

| 디렉토리 | 대상 | 파일 수 |
|---|---|---|
| `__tests__/unit/lib/` | 순수 함수 (slug, validation, get-season, utils) | 4 |
| `__tests__/unit/config/` | 필터 match 함수 | 1 |
| `__tests__/hooks/` | Custom hooks (useCityFilter, useReaction, useLogout) | 3 |
| `__tests__/components/` | 컴포넌트 (CityGrid, FilterBar, CitySection) | 3 |
| `__tests__/integration/` | Server Actions (toggleReaction, login, register) | 3 |

### E2E 테스트 (Playwright)

```bash
npm run test:e2e      # 헤드리스 실행
npm run test:e2e:ui   # UI 모드 (브라우저에서 디버깅)
```

```
e2e/
├── fixtures/              # 테스트 데이터 (계정 정보, 도시 slug)
│   └── test-user.ts
├── pages/                 # Page Object Model (POM)
│   ├── home.page.ts       # 홈페이지 (Hero, FilterBar, CityGrid)
│   ├── city-detail.page.ts # 도시 상세 페이지
│   ├── login.page.ts      # 로그인 페이지
│   ├── register.page.ts   # 회원가입 페이지
│   └── header.page.ts     # 헤더 네비게이션
└── tests/                 # 테스트 시나리오
    ├── navigation/        # 페이지 이동, 라우팅
    ├── filter/            # 필터 드롭다운 인터랙션
    ├── auth/              # 회원가입 → 로그인 → 로그아웃
    └── reaction/          # 좋아요/싫어요 (인증/비인증)
```

- **POM 패턴**: 각 페이지의 locator와 action을 `pages/` 디렉토리에 캡슐화
- **fixtures**: 테스트 간 공유하는 데이터 (계정 정보, 도시 slug 등)
- **webServer**: `playwright.config.ts`에서 `npm run dev` 자동 실행 (baseURL: `http://localhost:3000`)

## 참고

- 모든 안내와 응답은 한국어로 진행합니다.
