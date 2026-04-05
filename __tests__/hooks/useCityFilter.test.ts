import { renderHook, act } from "@testing-library/react";
import { useCityFilter } from "@/hooks/useCityFilter";
import type { City } from "@/types";

function createCity(overrides: Partial<City> = {}): City {
  return {
    id: "1",
    cityName: "서울",
    cityNameEn: "Seoul",
    imageUrl: "/seoul.jpg",
    kNomadScore: 90,
    monthlyCost: 150,
    internetSpeed: 100,
    cafeScore: 9,
    temperature: 15,
    aqi: 50,
    safetyScore: 8,
    ktxToSeoul: "0분",
    region: "수도권",
    environment: ["도심선호", "카페작업"],
    bestSeason: ["봄", "가을"],
    budgetRange: "100~200만원",
    likes: 10,
    dislikes: 2,
    ...overrides,
  };
}

const mockCities: City[] = [
  createCity({ id: "1", cityName: "서울", region: "수도권", budgetRange: "200만원 이상", likes: 30 }),
  createCity({ id: "2", cityName: "부산", region: "경상도", budgetRange: "100~200만원", likes: 50 }),
  createCity({ id: "3", cityName: "수원", region: "수도권", budgetRange: "100만원 이하", likes: 20 }),
  createCity({ id: "4", cityName: "광주", region: "전라도", budgetRange: "100만원 이하", likes: 10 }),
];

describe("useCityFilter", () => {
  it("초기 필터는 모든 키가 '전체'", () => {
    const { result } = renderHook(() => useCityFilter(mockCities));

    const filters = result.current.filters;
    Object.values(filters).forEach((value) => {
      expect(value).toBe("전체");
    });
  });

  it("전체 조회 시 likes 내림차순 정렬", () => {
    const { result } = renderHook(() => useCityFilter(mockCities));

    const cities = result.current.filteredCities;
    expect(cities).toHaveLength(4);
    expect(cities[0].cityName).toBe("부산"); // likes: 50
    expect(cities[1].cityName).toBe("서울"); // likes: 30
    expect(cities[2].cityName).toBe("수원"); // likes: 20
    expect(cities[3].cityName).toBe("광주"); // likes: 10
  });

  it("region '수도권' 필터 시 해당 도시만 반환", () => {
    const { result } = renderHook(() => useCityFilter(mockCities));

    act(() => {
      result.current.setFilters((prev) => ({ ...prev, region: "수도권" }));
    });

    const cities = result.current.filteredCities;
    expect(cities).toHaveLength(2);
    expect(cities.every((c) => c.region === "수도권")).toBe(true);
  });

  it("빈 배열 입력 시 빈 결과 반환", () => {
    const { result } = renderHook(() => useCityFilter([]));

    expect(result.current.filteredCities).toHaveLength(0);
  });

  it("복합 필터 (budget + region) 적용", () => {
    const { result } = renderHook(() => useCityFilter(mockCities));

    act(() => {
      result.current.setFilters((prev) => ({
        ...prev,
        region: "수도권",
        budget: "200만원 이상",
      }));
    });

    const cities = result.current.filteredCities;
    expect(cities).toHaveLength(1);
    expect(cities[0].cityName).toBe("서울");
  });
});
