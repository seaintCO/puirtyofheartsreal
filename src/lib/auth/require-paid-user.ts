import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hasCourseAccess } from "@/lib/membership/access";

export async function requirePaidUser() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) redirect("/login?next=/dashboard");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, paid, vip_access")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || !(await hasCourseAccess(supabase))) redirect("/membership");
  return { user, profile };
}
