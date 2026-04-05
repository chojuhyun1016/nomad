"use client";

import { useState, useMemo } from "react";
import { City } from "@/types";
import { FILTER_DEFINITIONS } from "@/config/filter-config";

export type Filters = Record<string, string>;

function createDefaultFilters(): Filters {
  const defaults: Filters = {};
  for (const def of FILTER_DEFINITIONS) {
    defaults[def.key] = "전체";
  }
  return defaults;
}

export function useCityFilter(cities: City[]) {
  const [filters, setFilters] = useState<Filters>(createDefaultFilters);

  const filteredCities = useMemo(() => {
    return cities
      .filter((city) =>
        FILTER_DEFINITIONS.every((def) => def.match(city, filters[def.key] ?? "전체"))
      )
      .sort((a, b) => b.likes - a.likes);
  }, [cities, filters]);

  return { filters, setFilters, filteredCities };
}
