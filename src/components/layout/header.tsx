import Link from "next/link";
import { mainNav } from "@/data/nav";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">🇰🇷 Korea Nomad</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm">가입하기</Button>
        </nav>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
