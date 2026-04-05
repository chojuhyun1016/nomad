import { render, screen } from "@testing-library/react";
import { CityGrid } from "@/components/sections/city-grid";
import { City } from "@/types";

vi.mock("@/components/sections/city-card", () => ({
  CityCard: ({ city, userReaction }: any) => (
    <div data-testid={`city-card-${city.id}`} data-reaction={userReaction ?? ""}>
      {city.cityName}
    </div>
  ),
}));

const mockCity = (overrides: Partial<City> = {}): City => ({
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
  ...overrides,
});

describe("CityGrid", () => {
  it("빈 배열이면 '조건에 맞는 도시가 없습니다.' 표시", () => {
    render(<CityGrid cities={[]} />);
    expect(screen.getByText("조건에 맞는 도시가 없습니다.")).toBeInTheDocument();
  });

  it("3개 도시를 전달하면 3개 CityCard 렌더링", () => {
    const cities = [
      mockCity({ id: "1", cityName: "서울" }),
      mockCity({ id: "2", cityName: "부산" }),
      mockCity({ id: "3", cityName: "제주" }),
    ];
    render(<CityGrid cities={cities} />);

    expect(screen.getByTestId("city-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("city-card-2")).toBeInTheDocument();
    expect(screen.getByTestId("city-card-3")).toBeInTheDocument();
  });

  it("'도시 리스트' 제목 표시", () => {
    render(<CityGrid cities={[mockCity()]} />);
    expect(screen.getByText("도시 리스트")).toBeInTheDocument();
  });

  it("userReactions가 CityCard에 전달됨", () => {
    const cities = [mockCity({ id: "1" }), mockCity({ id: "2" })];
    const userReactions = { "1": "like" as const, "2": "dislike" as const };

    render(<CityGrid cities={cities} userReactions={userReactions} />);

    expect(screen.getByTestId("city-card-1")).toHaveAttribute("data-reaction", "like");
    expect(screen.getByTestId("city-card-2")).toHaveAttribute("data-reaction", "dislike");
  });
});
