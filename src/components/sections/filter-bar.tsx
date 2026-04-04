"use client";

import { FILTER_DEFINITIONS, type FilterDefinition } from "@/config/filter-config";
import type { Filters } from "@/hooks/useCityFilter";

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  function handleSelect(def: FilterDefinition, value: string) {
    if (def.type === "single") {
      onFilterChange({ ...filters, [def.key]: [value] });
      return;
    }

    // multi select
    if (value === "전체") {
      onFilterChange({ ...filters, [def.key]: ["전체"] });
      return;
    }
    const current = (filters[def.key] ?? []).filter((v) => v !== "전체");
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({
      ...filters,
      [def.key]: next.length === 0 ? ["전체"] : next,
    });
  }

  return (
    <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-3">
        {FILTER_DEFINITIONS.map((def) => (
          <FilterGroup
            key={def.key}
            label={def.label}
            options={def.options}
            selected={filters[def.key] ?? ["전체"]}
            onSelect={(v) => handleSelect(def, v)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm font-medium text-muted-foreground w-16 shrink-0">
        {label}
      </span>
      <div className="flex gap-1.5 flex-1">
        {options.map((option) => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`flex-1 text-center px-3 py-1 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
