import { NavLink, FooterColumn } from "@/types";
import { SortOption } from "@/types";

export const mainNav: NavLink[] = [
  { label: "도시", href: "#cities" },
  { label: "밋업", href: "#meetups" },
  { label: "K-비자", href: "#visa" },
  { label: "커뮤니티", href: "#community" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "인기 도시",
    links: [
      { label: "제주", href: "#" },
      { label: "서울", href: "#" },
      { label: "부산", href: "#" },
      { label: "강릉", href: "#" },
      { label: "전주", href: "#" },
    ],
  },
  {
    title: "기능",
    links: [
      { label: "도시 비교", href: "#" },
      { label: "필터 검색", href: "#" },
      { label: "계절 가이드", href: "#" },
      { label: "밋업 찾기", href: "#" },
    ],
  },
  {
    title: "정보",
    links: [
      { label: "K-비자 가이드", href: "#" },
      { label: "이용약관", href: "#" },
      { label: "개인정보처리방침", href: "#" },
      { label: "문의하기", href: "#" },
    ],
  },
  {
    title: "소셜",
    links: [
      { label: "Instagram", href: "#" },
      { label: "Twitter", href: "#" },
      { label: "Discord", href: "#" },
      { label: "카카오톡", href: "#" },
    ],
  },
];

export const sortOptions: SortOption[] = [
  { value: "kNomadScore", label: "K-Nomad Score" },
  { value: "costAsc", label: "생활비 (낮은순)" },
  { value: "internetSpeed", label: "인터넷 속도" },
  { value: "cafeScore", label: "카페 노마드 지수" },
  { value: "safetyScore", label: "안전 지수" },
  { value: "foreignFriendly", label: "외국인 친화도" },
  { value: "aqiAsc", label: "대기질 (AQI)" },
  { value: "likedPercent", label: "좋아요 비율" },
  { value: "reviewCount", label: "리뷰 수" },
  { value: "ktxAccess", label: "KTX 서울 접근성" },
];

export const filterTags = [
  { label: "해변", emoji: "🏖️" },
  { label: "산", emoji: "⛰️" },
  { label: "도심", emoji: "🏙️" },
  { label: "카페밀집", emoji: "☕" },
  { label: "AQI좋음", emoji: "🌿" },
  { label: "코워킹", emoji: "💻" },
];
