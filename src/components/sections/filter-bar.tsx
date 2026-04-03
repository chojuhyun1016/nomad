"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { sortOptions, filterTags } from "@/data/nav";

export function FilterBar() {
  const [sort, setSort] = useState("kNomadScore");
  const [search, setSearch] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [budget, setBudget] = useState([50, 300]);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="sticky top-16 z-40 border-y bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        {/* 상단: 정렬 + 검색 + CTA */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={sort} onValueChange={(v) => v && setSort(v)}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="정렬 기준" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="도시 검색 또는 필터..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Button size="sm" className="hidden sm:inline-flex shrink-0">
            Korea Nomad 가입 →
          </Button>
        </div>

        {/* 하단: 태그 + 예산 슬라이더 */}
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {filterTags.map((tag) => (
              <Toggle
                key={tag.label}
                size="sm"
                pressed={activeTags.includes(tag.label)}
                onPressedChange={() => toggleTag(tag.label)}
                className="text-xs h-7 px-2.5"
              >
                {tag.emoji} {tag.label}
              </Toggle>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:ml-auto min-w-0 sm:min-w-[240px]">
            <span className="text-xs text-muted-foreground shrink-0">
              💰 {budget[0]}만~{budget[1]}만
            </span>
            <Slider
              value={budget}
              onValueChange={(v) => setBudget(Array.isArray(v) ? [...v] : [v])}
              min={50}
              max={300}
              step={10}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
