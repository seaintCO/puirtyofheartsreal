import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requirePaidUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("id, email, full_name, role, paid, vip_access")
      .eq("id", user.id)
      .single();

  if (profileError || !profile) {
    redirect("/login");
  }

  if (!profile.paid && !profile.vip_access && profile.role !== "admin") {
    redirect("/enroll");
  }

  return {
    user,
    profile,
  };
}
