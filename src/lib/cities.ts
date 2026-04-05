import { createClient } from "@/lib/supabase/server";
import type { City, Region, Environment, Season, BudgetRange } from "@/types";

interface CityRow {
  id: string;
  city_name: string;
  city_name_en: string;
  slug: string;
  image_url: string | null;
  k_nomad_score: number;
  monthly_cost: number;
  internet_speed: number;
  cafe_score: number;
  temperature: number;
  aqi: number;
  safety_score: number;
  ktx_to_seoul: string;
  region: string;
  environment: string[];
  best_season: string[];
  budget_range: string;
  likes: number;
  dislikes: number;
}

function mapCityRow(row: CityRow): City {
  return {
    id: row.id,
    cityName: row.city_name,
    cityNameEn: row.city_name_en,
    imageUrl: row.image_url ?? "",
    kNomadScore: row.k_nomad_score,
    monthlyCost: row.monthly_cost,
    internetSpeed: row.internet_speed,
    cafeScore: row.cafe_score,
    temperature: row.temperature,
    aqi: row.aqi,
    safetyScore: row.safety_score,
    ktxToSeoul: row.ktx_to_seoul,
    region: row.region as Region,
    environment: row.environment as Environment[],
    bestSeason: row.best_season as Season[],
    budgetRange: row.budget_range as BudgetRange,
    likes: row.likes,
    dislikes: row.dislikes,
  };
}

export async function getCities(): Promise<City[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("cities").select("*");

  if (error) {
    console.error("getCities error:", error.message);
    return [];
  }

  return (data as CityRow[]).map(mapCityRow);
}

export async function getCityBySlug(slug: string): Promise<City | undefined> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;

  return mapCityRow(data as CityRow);
}

export async function getAllCitySlugs(): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("cities").select("slug");

  if (error) {
    console.error("getAllCitySlugs error:", error.message);
    return [];
  }

  return (data as { slug: string }[]).map((row) => row.slug);
}
