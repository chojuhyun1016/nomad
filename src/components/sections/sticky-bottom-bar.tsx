"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

export function StickyBottomBar() {
  const [visible, setVisible] = useState(true);
  const [currency, setCurrency] = useState<"KRW" | "USD">("KRW");
  const [tempUnit, setTempUnit] = useState<"C" | "F">("C");

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Toggle
            size="sm"
            pressed={currency === "USD"}
            onPressedChange={(pressed) => setCurrency(pressed ? "USD" : "KRW")}
            className="text-xs h-8 px-3"
          >
            {currency === "KRW" ? "₩ KRW" : "$ USD"}
          </Toggle>
          <Toggle
            size="sm"
            pressed={tempUnit === "F"}
            onPressedChange={(pressed) => setTempUnit(pressed ? "F" : "C")}
            className="text-xs h-8 px-3"
          >
            °{tempUnit}
          </Toggle>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-sm">
            🌏 한국 노마드 커뮤니티
          </span>
          <Button size="sm">가입 →</Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">닫기</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
