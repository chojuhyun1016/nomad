# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**Korea Nomad** — 한국 디지털 노마드 전용 도시 가이드 플랫폼. Nomads.com의 검증된 UI 패턴에 한국 특화 데이터(카페 지수, KTX 접근성, 계절 추천, K-비자)를 결합한 홈페이지.

- PRD: `korea-nomad-prd.md` 참조
- 현재 상태: 초기 단계 (코드 미구현)

## 기술 스택

- **프론트엔드**: Next.js (App Router), Tailwind CSS
- **백엔드**: REST API 또는 tRPC
- **DB**: PostgreSQL
- **인증**: NextAuth.js (Google, 카카오, Apple OAuth)
- **외부 API**: 기상청 API (날씨), 에어코리아 API (AQI)
- **다국어**: 한국어 + 영어 (MVP), 일본어/중국어 (v2)

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
