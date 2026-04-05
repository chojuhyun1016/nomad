import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCityBySlug, getAllCitySlugs } from "@/lib/cities";
import {
  ArrowLeft,
  Wifi,
  Coffee,
  Thermometer,
  Wind,
  Shield,
  Train,
  MapPin,
  DollarSign,
  Star,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { CityDetailReaction } from "@/components/sections/city-detail-reaction";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = await getCityBySlug(slug);
  if (!city) return {};

  return {
    title: `${city.cityName} (${city.cityNameEn}) — Korea Nomad`,
    description: `${city.cityName} 디지털 노마드 가이드: K-Nomad 점수 ${city.kNomadScore}, 월 생활비 ${city.monthlyCost.toLocaleString()}원`,
  };
}

const stats = [
  { key: "kNomadScore", label: "노마드 점수", icon: Star, unit: "점" },
  { key: "monthlyCost", label: "월 생활비", icon: DollarSign, unit: "", format: (v: number) => `${Math.round(v / 10000)}만원` },
  { key: "internetSpeed", label: "인터넷", icon: Wifi, unit: "Mbps" },
  { key: "cafeScore", label: "카페 점수", icon: Coffee, unit: "점" },
  { key: "temperature", label: "평균 기온", icon: Thermometer, unit: "°C" },
  { key: "aqi", label: "공기질 (AQI)", icon: Wind, unit: "" },
  { key: "safetyScore", label: "안전 점수", icon: Shield, unit: "점" },
  { key: "ktxToSeoul", label: "서울까지", icon: Train, unit: "" },
] as const;

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = await getCityBySlug(slug);

  if (!city) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      {/* 뒤로가기 */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        도시 리스트
      </Link>

      {/* 헤더 */}
      <div className="relative h-56 rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/80 to-slate-700/80" />
        <div className="absolute bottom-6 left-6">
          <h1 className="text-3xl font-bold text-white">{city.cityName}</h1>
          <p className="text-sm text-white/70">{city.cityNameEn}</p>
        </div>
        <div className="absolute top-6 right-6 rounded-full bg-white/20 px-4 py-2 backdrop-blur">
          <span className="text-lg font-bold text-white">
            K-Nomad {city.kNomadScore}
          </span>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="mb-8 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
          <MapPin className="h-3.5 w-3.5" />
          {city.region}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-sm">
          <DollarSign className="h-3.5 w-3.5" />
          월 {city.monthlyCost.toLocaleString()}원 ({city.budgetRange})
        </span>
      </div>

      {/* 태그 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {city.environment.map((env) => (
          <span
            key={env}
            className="rounded-full border px-3 py-1 text-xs font-medium"
          >
            {env}
          </span>
        ))}
        {city.bestSeason.map((season) => (
          <span
            key={season}
            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
          >
            {season}
          </span>
        ))}
      </div>

      {/* 상세 스탯 (8개) */}
      <Card className="p-6 mb-8">
        <h2 className="mb-4 text-lg font-semibold">상세 정보</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map(({ key, label, icon: Icon, unit, ...rest }) => {
            const value = city[key];
            const formatted = "format" in rest ? (rest as { format: (v: number) => string }).format(value as number) : unit ? `${value} ${unit}` : `${value}`;
            return (
              <div key={key} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-semibold">{formatted}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 좋아요/싫어요 */}
      <CityDetailReaction likes={city.likes} dislikes={city.dislikes} />
    </main>
  );
}
