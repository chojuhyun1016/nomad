import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mediaLogos, mediaQuotes } from "@/data/media";

export function SocialProof() {
  return (
    <section className="bg-muted/30 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 언론 로고 */}
        <p className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground mb-8">
          As seen on
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {mediaLogos.map((logo) => (
            <div
              key={logo.slug}
              className="text-sm font-semibold text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              {logo.name}
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        {/* 인용문 카드 */}
        <div className="grid gap-6 md:grid-cols-3">
          {mediaQuotes.map((quote) => (
            <Card key={quote.source} className="bg-background">
              <CardContent className="pt-6">
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{quote.quote}&rdquo;
                </blockquote>
                <p className="mt-4 text-xs font-semibold">— {quote.source}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
