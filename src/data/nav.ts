import { NavLink, FooterColumn } from "@/types";

export const mainNav: NavLink[] = [];

export const footerColumns: FooterColumn[] = [
  {
    title: "정보",
    links: [
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
