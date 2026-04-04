"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";

export function LogoutButton() {
  const { logout } = useLogout();

  return (
    <Button variant="ghost" size="sm" onClick={logout}>
      로그아웃
    </Button>
  );
}
