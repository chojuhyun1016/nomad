"use server";

import { createClient } from "@/lib/supabase/server";

type ActionState = { error?: string; success?: boolean } | null;

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
