import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireVipUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, paid, vip_access")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/login");
  if (!profile.vip_access && profile.role !== "admin") redirect("/dashboard");
  return { user, profile, supabase };
}
