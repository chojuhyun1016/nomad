import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "로그인 — Korea Nomad",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">다시 오신 것을 환영합니다</h1>
          <p className="text-sm text-muted-foreground">
            Korea Nomad 계정에 로그인하세요
          </p>
        </div>

        {message && (
          <div className="rounded-md bg-emerald-50 p-3 text-center text-sm text-emerald-700">
            {message}
          </div>
        )}

        <Card>
          <CardContent className="pt-6">
            <LoginForm />
          </CardContent>
        </Card>

        {/* 회원가입 링크 */}
        <p className="text-center text-sm text-muted-foreground">
          아직 계정이 없으신가요?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            회원가입
          </Link>
        </p>
      </div>
    </div>
  );
}
