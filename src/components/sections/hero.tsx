import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const memberAvatars = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  fallback: String.fromCharCode(65 + i),
}));

const valueProps = [
  { icon: "☕", text: "전국 42개 도시의 카페 & 코워킹 정보" },
  { icon: "📊", text: "실시간 생활비, 인터넷 속도 데이터" },
  { icon: "🤝", text: "월 12회 전국 밋업에 참여하세요" },
  { icon: "💬", text: "도시별 채팅에서 현지 팁을 교환하세요" },
  { icon: "🎯", text: "나에게 맞는 최적의 도시를 찾아보세요" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-slate-800" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <Badge variant="secondary" className="text-xs font-medium">
            ⭐ #1 Korea Nomad Community / Since 2026
          </Badge>

          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              🌏 한국에서
              <br />
              노마드하자
            </h1>
            <p className="mt-4 text-lg text-slate-300 max-w-md mx-auto">
              대한민국 곳곳에서 원격으로 일하고 여행하는 노마드 커뮤니티에 합류하세요
            </p>
          </div>

          {/* 멤버 아바타 */}
          <div className="flex items-center justify-center gap-1">
            {memberAvatars.map((avatar) => (
              <Avatar key={avatar.id} className="h-8 w-8 border-2 border-slate-800 -ml-1 first:ml-0">
                <AvatarFallback className="bg-slate-600 text-xs text-white">
                  {avatar.fallback}
                </AvatarFallback>
              </Avatar>
            ))}
            <span className="ml-3 text-sm text-slate-400">+2,847 노마드</span>
          </div>

          {/* 가치 제안 */}
          <ul className="inline-flex flex-col items-start space-y-3">
            {valueProps.map((prop) => (
              <li key={prop.text} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="text-lg">{prop.icon}</span>
                <span>{prop.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
