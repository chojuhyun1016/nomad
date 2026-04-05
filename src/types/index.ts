export type Region = "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도";
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수";
export type Season = "봄" | "여름" | "가을" | "겨울";
export type BudgetRange = "100만원 이하" | "100~200만원" | "200만원 이상";

export interface City {
  id?: string;
  cityName: string;
  cityNameEn: string;
  imageUrl: string;
  kNomadScore: number;
  monthlyCost: number;
  internetSpeed: number;
  cafeScore: number;
  temperature: number;
  aqi: number;
  safetyScore: number;
  ktxToSeoul: string;
  region: Region;
  environment: Environment[];
  bestSeason: Season[];
  budgetRange: BudgetRange;
  likes: number;
  dislikes: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
