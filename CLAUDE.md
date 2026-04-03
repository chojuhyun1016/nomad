# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Korea Nomad** — 한국 디지털 노마드 전용 도시 가이드 플랫폼. Nomads.com의 검증된 UI 패턴에 한국 특화 데이터(카페 지수, KTX 접근성, 계절 추천, K-비자)를 결합한 홈페이지.

- PRD: `korea-nomad-prd.md` 참조

## 개발 명령어

```bash
npm run dev      # 개발 서버 (Turbopack)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint
```

## 기술 스택

- **프론트엔드**: Next.js 16 (App Router), Tailwind CSS v4, shadcn/ui v4 (base-ui 기반)
- **언어**: TypeScript
- **폰트**: Noto Sans KR + Inter
- **아이콘**: lucide-react

## 아키텍처

- `src/app/` — App Router 페이지 (layout.tsx, page.tsx)
- `src/components/layout/` — Header, Footer, MobileNav
- `src/components/sections/` — 홈페이지 10개 섹션 컴포넌트
- `src/components/ui/` — shadcn/ui 컴포넌트 (자동 생성)
- `src/data/` — Mock 데이터 (cities, media, seasonal, meetups, visa, nav)
- `src/types/` — TypeScript 타입 정의
- `src/lib/` — 유틸리티 (cn, constants, get-season)

## Server/Client 컴포넌트

- **기본: Server Component** — 대부분의 섹션은 Server Component
- **Client Component** (5개만): mobile-nav, hero-signup-form, hero-video-modal, filter-bar, sticky-bottom-bar
- shadcn/ui v4는 base-ui 기반이므로 `asChild` 대신 `render` prop 사용

## 반응형 브레이크포인트

- Desktop: 1200px+
- Tablet: 768~1199px
- Mobile: ~767px

## 성능 목표

- LCP 2.5초 이내
- 히어로 영상: lazy load, 첫 프레임은 정적 이미지
- 도시 카드: 첫 9개 SSR, 이후 무한 스크롤

## 참고

- 모든 안내와 응답은 한국어로 진행합니다.
