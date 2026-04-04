import { cities } from "@/data/cities";
import type { City } from "@/types";

export function toSlug(cityNameEn: string): string {
  return cityNameEn.toLowerCase().replace(/\s+/g, "-");
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => toSlug(city.cityNameEn) === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => toSlug(city.cityNameEn));
}
