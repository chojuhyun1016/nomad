import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { visaCards } from "@/data/visa";

export function VisaGuide() {
  return (
    <section id="visa" className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-center sm:text-3xl">
          🇰🇷 한국에서 합법적으로 일하기
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {visaCards.map((card) => (
            <Card key={card.title} className="text-center transition-all hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-8 pb-6 space-y-3">
                <span className="text-4xl">{card.icon}</span>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="text-xs text-muted-foreground">{card.titleEn}</p>
                <p className="text-sm text-muted-foreground">{card.description}</p>
                <Button variant="link" className="text-sm">
                  {card.linkText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
