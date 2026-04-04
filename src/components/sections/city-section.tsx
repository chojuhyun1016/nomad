"use client";

import { City } from "@/types";
import { useCityFilter } from "@/hooks/useCityFilter";
import { FilterBar } from "./filter-bar";
import { CityGrid } from "./city-grid";

interface CitySectionProps {
  cities: City[];
}

export function CitySection({ cities }: CitySectionProps) {
  const { filters, setFilters, filteredCities } = useCityFilter(cities);

  return (
    <>
      <FilterBar filters={filters} onFilterChange={setFilters} />
      <CityGrid cities={filteredCities} />
    </>
  );
}
