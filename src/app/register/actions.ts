"use server";

import { createClient } from "@/lib/supabase/server";

type ActionState = { error?: string; success?: boolean } | null;

export async function register(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        display_name: formData.get("name") as string,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user && data.user.identities?.length === 0) {
    return { error: "이미 등록된 이메일입니다." };
  }

  // 가입 후 자동 생성된 세션 제거 (로그인 페이지에서 직접 로그인하도록)
  await supabase.auth.signOut();

  return { success: true };
}
