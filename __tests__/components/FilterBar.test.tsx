import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "@/components/sections/filter-bar";
import type { Filters } from "@/hooks/useCityFilter";

vi.mock("@/components/ui/select", () => ({
  Select: ({ value, onValueChange, children }: any) => (
    <div data-testid="select">
      <select value={value} onChange={(e: any) => onValueChange(e.target.value)}>
        {children}
      </select>
    </div>
  ),
  SelectTrigger: ({ children }: any) => <>{children}</>,
  SelectValue: () => null,
  SelectContent: ({ children }: any) => <>{children}</>,
  SelectItem: ({ value, children }: any) => (
    <option value={value}>{children}</option>
  ),
}));

const defaultFilters: Filters = {
  budget: "전체",
  region: "전체",
  environment: "전체",
  bestSeason: "전체",
};

describe("FilterBar", () => {
  it("4개 Select 렌더링", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={vi.fn()} />);
    const selects = screen.getAllByTestId("select");
    expect(selects).toHaveLength(4);
  });

  it("각 필터 라벨의 옵션이 표시됨 (예산, 지역, 환경, 최고 계절)", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={vi.fn()} />);

    // FILTER_DEFINITIONS의 옵션들이 렌더링되는지 확인
    expect(screen.getAllByText("전체")).toHaveLength(4); // 각 Select의 기본값
    expect(screen.getByText("100만원 이하")).toBeInTheDocument();
    expect(screen.getByText("수도권")).toBeInTheDocument();
    expect(screen.getByText("자연친화")).toBeInTheDocument();
    expect(screen.getByText("봄")).toBeInTheDocument();
  });

  it("Select 값 변경 시 onFilterChange 호출", () => {
    const onFilterChange = vi.fn();

    render(<FilterBar filters={defaultFilters} onFilterChange={onFilterChange} />);

    const selects = screen.getAllByRole("combobox");
    // 첫 번째 Select(예산)의 값을 변경
    fireEvent.change(selects[0], { target: { value: "100~200만원" } });

    expect(onFilterChange).toHaveBeenCalledWith({
      ...defaultFilters,
      budget: "100~200만원",
    });
  });

  it("기본값이 '전체'로 설정됨", () => {
    render(<FilterBar filters={defaultFilters} onFilterChange={vi.fn()} />);

    const selects = screen.getAllByRole("combobox");
    selects.forEach((select) => {
      expect(select).toHaveValue("전체");
    });
  });
});
