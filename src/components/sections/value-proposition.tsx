import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { VALUE_PROPS } from "@/lib/constants";

export function ValueProposition() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            왜 한국에서 노마드?
          </h2>
          <p className="mt-3 text-muted-foreground">
            세계 최고 수준의 인프라가 노마드를 기다리고 있습니다
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((prop) => (
            <Card
              key={prop.title}
              className="text-center transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="pt-8 pb-6">
                <span className="text-4xl">{prop.icon}</span>
                <h3 className="mt-4 text-lg font-semibold">{prop.title}</h3>
                <Badge variant="secondary" className="mt-2 text-base font-bold px-3 py-1">
                  {prop.stat}
                </Badge>
                <p className="mt-3 text-sm text-muted-foreground">
                  {prop.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
