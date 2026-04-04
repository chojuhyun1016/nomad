import { cities } from "@/data/cities";
import { City } from "@/types";

export function toSlug(cityNameEn: string): string {
  return cityNameEn.toLowerCase();
}

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => toSlug(city.cityNameEn) === slug);
}

export function getAllCitySlugs(): string[] {
  return cities.map((city) => toSlug(city.cityNameEn));
}
