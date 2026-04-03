# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Korea Nomad** — 한국 디지털 노마드 전용 도시 가이드 플랫폼 홈페이지.
현재 MVP UI만 구현된 상태이며, 기능/백엔드는 미구현. Mock 데이터로 정적 렌더링.

- PRD: `korea-nomad-prd.md` 참조

## 개발 명령어

```bash
npm run dev      # 개발 서버 (Turbopack, http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## 기술 스택

| 구분 | 스택 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, Turbopack) |
| UI | shadcn/ui v4 (base-ui 기반), Tailwind CSS v4 |
| 언어 | TypeScript |
| 폰트 | Noto Sans KR + Inter (`next/font/google`) |
| 아이콘 | lucide-react |

## 디렉토리 구조

```
src/
├── app/                    # App Router (layout.tsx, page.tsx, globals.css)
├── components/
│   ├── layout/             # Header, Footer, MobileNav
│   ├── sections/           # 홈페이지 섹션별 컴포넌트 (13개)
│   └── ui/                 # shadcn/ui 컴포넌트 (자동 생성, 직접 수정 금지)
├── data/                   # Mock 데이터 (cities, media, seasonal, meetups, visa, nav)
├── types/                  # TypeScript 타입 정의 (index.ts)
└── lib/                    # 유틸리티 (cn, constants, get-season)
```

## 홈페이지 섹션 구성 (page.tsx 순서)

| 섹션 | 컴포넌트 | Server/Client |
|---|---|---|
| S1 히어로 | `hero.tsx` + `hero-signup-form.tsx` + `hero-video-modal.tsx` | Server + Client |
| S2 소셜 프루프 | `social-proof.tsx` | Server |
| S3 가치 제안 | `value-proposition.tsx` | Server |
| S4 계절 배너 | `seasonal-banner.tsx` | Server |
| S5 필터 바 | `filter-bar.tsx` (sticky) | Client |
| S6 도시 그리드 | `city-grid.tsx` + `city-card.tsx` + `score-bar.tsx` + `meetup-widget.tsx` | Server |
| S7 K-비자 가이드 | `visa-guide.tsx` | Server |
| S8 푸터 | `footer.tsx` (layout) | Server |
| S9 하단 고정 바 | `sticky-bottom-bar.tsx` | Client |

## 핵심 컨벤션

- **Server Component 우선** — `"use client"`는 상태/인터랙션이 필요한 경우에만
- **shadcn/ui v4**: `asChild` 대신 `render` prop 사용 (base-ui 기반)
- **Mock 데이터**: `src/data/`에서 import — 백엔드 연동 시 이 레이어만 교체
- **반응형**: Tailwind 기본 브레이크포인트 (`md:768px`, `lg:1024px`, `xl:1280px`)
- **도시 카드 hover**: CSS-only (`hover:scale-[1.02]`) → Server Component 유지

## 참고

- 모든 안내와 응답은 한국어로 진행합니다.
