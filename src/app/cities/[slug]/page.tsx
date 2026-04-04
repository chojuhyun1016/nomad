import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCityBySlug, getAllCitySlugs } from "@/lib/cities";
import { CityDetailReaction } from "@/components/sections/city-detail-reaction";

interface CityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) return { title: "도시를 찾을 수 없습니다" };

  return {
    title: `${city.cityName} — Korea Nomad`,
    description: `${city.cityName}(${city.cityNameEn})의 디지털 노마드 가이드. 노마드 점수 ${city.kNomadScore}, 월 비용 ${city.monthlyCost.toLocaleString()}원.`,
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) notFound();

  const metrics = [
    { label: "노마드 점수", value: `${city.kNomadScore}점` },
    { label: "월 비용", value: `${city.monthlyCost.toLocaleString()}원` },
    { label: "인터넷 속도", value: `${city.internetSpeed} Mbps` },
    { label: "카페 점수", value: `${city.cafeScore}점` },
    { label: "기온", value: `${city.temperature}°C` },
    { label: "공기질 (AQI)", value: `${city.aqi}` },
    { label: "안전도", value: `${city.safetyScore}점` },
    { label: "KTX → 서울", value: city.ktxToSeoul },
  ];

  return (
    <div className="min-h-screen">
      {/* 히어로 영역 */}
      <div className="relative h-56 md:h-72 bg-gradient-to-br from-slate-600 to-slate-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/80 to-slate-700/80" />
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {city.cityName}
          </h1>
          <p className="text-sm md:text-base text-white/70 mt-1">
            {city.cityNameEn}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          도시 리스트
        </Link>

        {/* 기본 정보 Key-Value */}
        <section>
          <h2 className="text-lg font-semibold mb-4">기본 정보</h2>
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            <span className="text-sm text-muted-foreground">예산</span>
            <span className="text-sm font-medium">{city.budgetRange}</span>
            <span className="text-sm text-muted-foreground">지역</span>
            <span className="text-sm font-medium">{city.region}</span>
            <span className="text-sm text-muted-foreground">환경</span>
            <span className="text-sm font-medium">
              {city.environment.join(", ")}
            </span>
            <span className="text-sm text-muted-foreground">최고 계절</span>
            <span className="text-sm font-medium">
              {city.bestSeason.join(", ")}
            </span>
          </div>
        </section>

        {/* 상세 메트릭 그리드 */}
        <section>
          <h2 className="text-lg font-semibold mb-4">상세 지표</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-lg border p-4 text-center"
              >
                <p className="text-xs text-muted-foreground mb-1">
                  {metric.label}
                </p>
                <p className="text-lg font-semibold">{metric.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 좋아요/싫어요 */}
        <CityDetailReaction likes={city.likes} dislikes={city.dislikes} />
      </div>
    </div>
  );
}
