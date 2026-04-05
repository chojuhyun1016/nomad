import { FILTER_DEFINITIONS } from "@/config/filter-config";
import type { City } from "@/types";

const mockCity: City = {
  id: "1",
  cityName: "서울",
  cityNameEn: "Seoul",
  imageUrl: "/seoul.jpg",
  kNomadScore: 85,
  monthlyCost: 150,
  internetSpeed: 200,
  cafeScore: 90,
  temperature: 12,
  aqi: 60,
  safetyScore: 80,
  ktxToSeoul: "0분",
  region: "수도권",
  environment: ["도심선호", "카페작업"],
  bestSeason: ["봄", "가을"],
  budgetRange: "100~200만원",
  likes: 10,
  dislikes: 2,
};

function getFilter(key: string) {
  const filter = FILTER_DEFINITIONS.find((f) => f.key === key);
  if (!filter) throw new Error(`필터 "${key}"를 찾을 수 없습니다`);
  return filter;
}

describe("FILTER_DEFINITIONS", () => {
  describe("budget 필터", () => {
    const filter = getFilter("budget");

    it('"전체" → 항상 true', () => {
      expect(filter.match(mockCity, "전체")).toBe(true);
    });

    it("일치하는 예산 → true", () => {
      expect(filter.match(mockCity, "100~200만원")).toBe(true);
    });

    it("불일치하는 예산 → false", () => {
      expect(filter.match(mockCity, "100만원 이하")).toBe(false);
    });
  });

  describe("region 필터", () => {
    const filter = getFilter("region");

    it('"전체" → 항상 true', () => {
      expect(filter.match(mockCity, "전체")).toBe(true);
    });

    it("일치하는 지역 → true", () => {
      expect(filter.match(mockCity, "수도권")).toBe(true);
    });

    it("불일치하는 지역 → false", () => {
      expect(filter.match(mockCity, "제주도")).toBe(false);
    });
  });

  describe("environment 필터", () => {
    const filter = getFilter("environment");

    it('"전체" → 항상 true', () => {
      expect(filter.match(mockCity, "전체")).toBe(true);
    });

    it("포함된 환경 → true", () => {
      expect(filter.match(mockCity, "도심선호")).toBe(true);
      expect(filter.match(mockCity, "카페작업")).toBe(true);
    });

    it("미포함 환경 → false", () => {
      expect(filter.match(mockCity, "자연친화")).toBe(false);
    });
  });

  describe("bestSeason 필터", () => {
    const filter = getFilter("bestSeason");

    it('"전체" → 항상 true', () => {
      expect(filter.match(mockCity, "전체")).toBe(true);
    });

    it("포함된 계절 → true", () => {
      expect(filter.match(mockCity, "봄")).toBe(true);
      expect(filter.match(mockCity, "가을")).toBe(true);
    });

    it("미포함 계절 → false", () => {
      expect(filter.match(mockCity, "여름")).toBe(false);
    });
  });
});
