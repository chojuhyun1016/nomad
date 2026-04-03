import { SeasonRecommendation } from "@/types";

export const seasonalRecommendations: Record<string, SeasonRecommendation> = {
  spring: {
    season: "봄",
    emoji: "🌸",
    headline: "벚꽃 시즌!",
    description: "벚꽃이 만발한 도시에서 노마드하세요",
    cities: [
      { cityName: "경주", cityNameEn: "Gyeongju", aqi: 38, emoji: "🏛️" },
      { cityName: "진해", cityNameEn: "Jinhae", aqi: 35, emoji: "🌸" },
      { cityName: "여수", cityNameEn: "Yeosu", aqi: 32, emoji: "🌊" },
    ],
  },
  summer: {
    season: "여름",
    emoji: "🏖️",
    headline: "피서 시즌!",
    description: "해변과 계곡에서 시원하게 작업하세요",
    cities: [
      { cityName: "강릉", cityNameEn: "Gangneung", aqi: 30, emoji: "🏖️" },
      { cityName: "속초", cityNameEn: "Sokcho", aqi: 28, emoji: "⛰️" },
      { cityName: "춘천", cityNameEn: "Chuncheon", aqi: 36, emoji: "🏞️" },
    ],
  },
  fall: {
    season: "가을",
    emoji: "🍂",
    headline: "단풍 시즌!",
    description: "최적의 기온과 단풍 속에서 작업하세요",
    cities: [
      { cityName: "전주", cityNameEn: "Jeonju", aqi: 42, emoji: "🏘️" },
      { cityName: "경주", cityNameEn: "Gyeongju", aqi: 38, emoji: "🏛️" },
      { cityName: "제주", cityNameEn: "Jeju", aqi: 35, emoji: "🏝️" },
    ],
  },
  winter: {
    season: "겨울",
    emoji: "❄️",
    headline: "코워킹 시즌!",
    description: "따뜻한 코워킹 스페이스에서 집중하세요",
    cities: [
      { cityName: "서울", cityNameEn: "Seoul", aqi: 55, emoji: "🏙️" },
      { cityName: "대전", cityNameEn: "Daejeon", aqi: 48, emoji: "🔬" },
      { cityName: "대구", cityNameEn: "Daegu", aqi: 52, emoji: "🌆" },
    ],
  },
};
