import { City } from "@/types";

export interface FilterDefinition {
  key: string;
  label: string;
  options: readonly string[];
  match: (city: City, selected: string) => boolean;
}

export const FILTER_DEFINITIONS: FilterDefinition[] = [
  {
    key: "budget",
    label: "예산",
    options: ["전체", "100만원 이하", "100~200만원", "200만원 이상"],
    match: (city, selected) =>
      selected === "전체" || selected === city.budgetRange,
  },
  {
    key: "region",
    label: "지역",
    options: ["전체", "수도권", "경상도", "전라도", "강원도", "제주도", "충청도"],
    match: (city, selected) =>
      selected === "전체" || selected === city.region,
  },
  {
    key: "environment",
    label: "환경",
    options: ["전체", "자연친화", "도심선호", "카페작업", "코워킹 필수"],
    match: (city, selected) =>
      selected === "전체" ||
      city.environment.includes(selected as typeof city.environment[number]),
  },
  {
    key: "bestSeason",
    label: "최고 계절",
    options: ["전체", "봄", "여름", "가을", "겨울"],
    match: (city, selected) =>
      selected === "전체" ||
      city.bestSeason.includes(selected as typeof city.bestSeason[number]),
  },
];
