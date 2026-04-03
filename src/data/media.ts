import { MediaQuote } from "@/types";

export const mediaLogos = [
  { name: "조선일보", slug: "chosun" },
  { name: "중앙일보", slug: "joongang" },
  { name: "한국경제", slug: "hankyung" },
  { name: "매일경제", slug: "maeil" },
  { name: "KBS", slug: "kbs" },
  { name: "MBC", slug: "mbc" },
  { name: "Forbes Korea", slug: "forbes" },
];

export const mediaQuotes: MediaQuote[] = [
  {
    quote: "한국의 카페 인프라와 초고속 인터넷은 디지털 노마드에게 최적의 환경을 제공합니다.",
    source: "한국경제",
    logoUrl: "/images/media/hankyung.svg",
  },
  {
    quote: "Korea Nomad는 흩어진 노마드 정보를 하나로 모은 혁신적인 플랫폼입니다.",
    source: "중앙일보",
    logoUrl: "/images/media/joongang.svg",
  },
  {
    quote: "전 세계 디지털 노마드가 한국을 주목하고 있다. 안전, 인터넷, 가성비 모두 최상위권.",
    source: "Forbes Korea",
    logoUrl: "/images/media/forbes.svg",
  },
];
