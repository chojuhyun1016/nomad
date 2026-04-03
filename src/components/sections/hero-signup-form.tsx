"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HERO } from "@/lib/constants";

export function HeroSignupForm() {
  return (
    <div className="space-y-4 rounded-xl bg-slate-800/60 backdrop-blur border border-slate-700 p-6">
      <Input
        type="email"
        placeholder={HERO.emailPlaceholder}
        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 h-12"
      />
      <Button className="w-full h-12 text-base font-semibold" size="lg">
        {HERO.ctaText}
      </Button>

      <p className="text-center text-xs text-slate-500">{HERO.loginHint}</p>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-slate-800/60 px-2 text-slate-500">또는</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button variant="outline" className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 h-11">
          Google
        </Button>
        <Button variant="outline" className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 h-11">
          카카오
        </Button>
        <Button variant="outline" className="border-slate-600 bg-slate-700/50 text-white hover:bg-slate-700 h-11">
          Apple
        </Button>
      </div>
    </div>
  );
}
