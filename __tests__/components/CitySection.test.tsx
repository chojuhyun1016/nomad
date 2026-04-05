import { render, screen } from "@testing-library/react";
import { CitySection } from "@/components/sections/city-section";
import { City } from "@/types";

vi.mock("@/components/sections/filter-bar", () => ({
  FilterBar: ({ filters }: any) => (
    <div data-testid="filter-bar">{JSON.stringify(filters)}</div>
  ),
}));

vi.mock("@/components/sections/city-grid", () => ({
  CityGrid: ({ cities }: any) => (
    <div data-testid="city-grid">{cities.length} cities</div>
  ),
}));

const mockCity: City = {
  id: "1",
  cityName: "서울",
  cityNameEn: "Seoul",
  imageUrl: "/img.jpg",
  kNomadScore: 80,
  monthlyCost: 1800000,
  internetSpeed: 120,
  cafeScore: 98,
  temperature: 20,
  aqi: 55,
  safetyScore: 85,
  ktxToSeoul: "—",
  region: "수도권",
  environment: ["도심선호", "카페작업"],
  bestSeason: ["봄", "가을"],
  budgetRange: "100~200만원",
  likes: 920,
  dislikes: 80,
};

describe("CitySection", () => {
  it("FilterBar와 CityGrid 모두 렌더링", () => {
    render(<CitySection cities={[mockCity]} />);

    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("city-grid")).toBeInTheDocument();
  });

  it("cities prop이 CityGrid에 전달됨", () => {
    const cities = [
      mockCity,
      { ...mockCity, id: "2", cityName: "부산", likes: 800 },
    ];
    render(<CitySection cities={cities} />);

    // useCityFilter를 거쳐 filteredCities가 전달되므로 개수 확인
    expect(screen.getByTestId("city-grid")).toHaveTextContent("2 cities");
  });
});
