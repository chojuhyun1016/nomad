export const HERO = {
  badge: "#1 Korea Nomad Community / Since 2026",
  headline: "한국에서\n노마드하자",
  subheadline: "대한민국 곳곳에서 원격으로\n일하고 여행하는 노마드\n커뮤니티에 합류하세요",
  valueProps: [
    { icon: "☕", text: "전국 42개 도시의 카페 & 코워킹 정보" },
    { icon: "📊", text: "실시간 생활비, 인터넷 속도 데이터" },
    { icon: "🤝", text: "월 12회 전국 밋업에 참여하세요" },
    { icon: "💬", text: "도시별 채팅에서 현지 팁을 교환하세요" },
    { icon: "🎯", text: "나에게 맞는 최적의 도시를 찾아보세요" },
  ],
  ctaText: "Korea Nomad 가입 →",
  emailPlaceholder: "이메일을 입력하세요...",
  loginHint: "이미 계정이 있다면 자동으로 로그인됩니다",
};

export const VALUE_PROPS = [
  {
    icon: "☕",
    title: "카페 천국",
    stat: "9만+",
    description: "전국 9만개 이상의 카페에서 작업하세요",
  },
  {
    icon: "📶",
    title: "인터넷 최고",
    stat: "180+ Mbps",
    description: "평균 180+ Mbps, 5G 전국 커버리지",
  },
  {
    icon: "🛡️",
    title: "안전 최상위",
    stat: "TOP 5",
    description: "글로벌 안전 지수 TOP 5, 밤에도 안전",
  },
  {
    icon: "💰",
    title: "가성비",
    stat: "월 150만",
    description: "서울 기준 월 150만원으로 생활 가능",
  },
];

export const SCORE_LABELS = [
  { key: "kNomadScore", icon: "⭐", label: "Overall" },
  { key: "monthlyCost", icon: "💵", label: "Cost" },
  { key: "internetSpeed", icon: "📡", label: "Net" },
  { key: "cafeScore", icon: "☕", label: "Cafe" },
  { key: "safetyScore", icon: "👮", label: "Safe" },
] as const;

export function formatCost(cost: number): string {
  if (cost >= 10000) {
    return `${Math.round(cost / 10000)}만`;
  }
  return cost.toLocaleString();
}

export function getAqiEmoji(aqi: number): string {
  if (aqi <= 30) return "😊";
  if (aqi <= 50) return "🙂";
  if (aqi <= 100) return "😷";
  return "🤢";
}
