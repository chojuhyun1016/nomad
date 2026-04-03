import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { HERO } from "@/lib/constants";
import { HeroSignupForm } from "./hero-signup-form";
import { HeroVideoModal } from "./hero-video-modal";

const memberAvatars = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  fallback: String.fromCharCode(65 + i),
}));

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* 배경 오버레이 (영상 placeholder) */}
      <div className="absolute inset-0 bg-[url('/images/hero-poster.jpg')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* 좌측 콘텐츠 */}
          <div className="flex-1 space-y-8">
            <Badge variant="secondary" className="text-xs font-medium">
              ⭐ {HERO.badge}
            </Badge>

            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                🌏 {HERO.headline.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-4 text-lg text-slate-300 max-w-md">
                {HERO.subheadline.replace(/\n/g, " ")}
              </p>
            </div>

            {/* 멤버 아바타 */}
            <div className="flex items-center gap-1">
              {memberAvatars.map((avatar) => (
                <Avatar key={avatar.id} className="h-8 w-8 border-2 border-slate-800 -ml-1 first:ml-0">
                  <AvatarFallback className="bg-slate-600 text-xs text-white">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              ))}
              <span className="ml-3 text-sm text-slate-400">+2,847 노마드</span>
            </div>

            {/* 가치 제안 5가지 */}
            <ul className="space-y-3">
              {HERO.valueProps.map((prop) => (
                <li key={prop.text} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="text-lg">{prop.icon}</span>
                  <span>{prop.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 우측 콘텐츠 */}
          <div className="flex-1 max-w-md lg:max-w-lg space-y-6">
            <HeroVideoModal />
            <HeroSignupForm />
          </div>
        </div>
      </div>
    </section>
  );
}
