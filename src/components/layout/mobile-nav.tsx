"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLogout } from "@/hooks/useLogout";
import type { User } from "@supabase/supabase-js";

export function MobileNav({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">메뉴 열기</span>
          </Button>
        }
      />
      <SheetContent side="right" className="w-[280px]">
        <SheetHeader>
          <SheetTitle>🇰🇷 Korea Nomad</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-6 px-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                로그인
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full">가입하기</Button>
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
