import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { RegisterForm } from "./register-form";

export const metadata = {
  title: "회원가입 — Korea Nomad",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Korea Nomad 가입</h1>
          <p className="text-sm text-muted-foreground">
            한국에서 노마드 생활을 시작하세요
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <RegisterForm />
          </CardContent>
        </Card>

        {/* 로그인 링크 */}
        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            로그인
          </Link>
        </p>

        {/* 약관 안내 */}
        <p className="text-center text-xs text-muted-foreground">
          가입 시{" "}
          <Link href="#" className="underline hover:text-foreground">이용약관</Link>
          {" "}및{" "}
          <Link href="#" className="underline hover:text-foreground">개인정보처리방침</Link>
          에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
