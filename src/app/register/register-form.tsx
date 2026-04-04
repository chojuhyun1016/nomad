"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { register } from "./actions";
import { validatePassword } from "@/lib/validation";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [state, formAction, pending] = useActionState(register, null);
  const router = useRouter();

  useEffect(() => {
    if (state?.success) {
      router.push("/login?message=이메일을 확인해주세요");
    }
  }, [state, router]);

  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && (
        <div className="rounded-md bg-destructive/10 p-3 text-center text-sm text-destructive">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          이름 (닉네임)
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="노마드 닉네임"
          className="h-11"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-email" className="text-sm font-medium">
          이메일
        </label>
        <Input
          id="reg-email"
          name="email"
          type="email"
          placeholder="nomad@example.com"
          className="h-11"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="reg-password" className="text-sm font-medium">
          비밀번호
        </label>
        <div className="relative">
          <Input
            id="reg-password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="h-11 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        {password.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
            {validatePassword(password).map((rule) => (
              <span
                key={rule.label}
                className={`flex items-center gap-1 text-xs ${
                  rule.passed ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {rule.passed ? (
                  <Check className="h-3 w-3" />
                ) : (
                  <X className="h-3 w-3" />
                )}
                {rule.label}
              </span>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full h-11" size="lg" disabled={pending}>
        {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        가입하기
      </Button>
    </form>
  );
}
