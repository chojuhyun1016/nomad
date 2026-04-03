export interface City {
  rank: number;
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
  likedPercent: number;
  ktxToSeoul: string;
  tags: string[];
}

export interface MediaQuote {
  quote: string;
  source: string;
  logoUrl: string;
}

export interface Meetup {
  date: string;
  city: string;
  location: string;
  attendees: number;
  avatarUrls: string[];
}

export interface VisaCard {
  icon: string;
  title: string;
  titleEn: string;
  description: string;
  linkText: string;
}

export interface SeasonalCity {
  cityName: string;
  cityNameEn: string;
  aqi: number;
  emoji: string;
}

export interface SeasonRecommendation {
  season: string;
  emoji: string;
  headline: string;
  description: string;
  cities: SeasonalCity[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export type SortOption = {
  value: string;
  label: string;
};

export type Currency = "KRW" | "USD";
export type TempUnit = "C" | "F";
