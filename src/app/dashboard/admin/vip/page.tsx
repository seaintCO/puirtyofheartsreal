import { redirect } from "next/navigation";
import VipClientAdmin from "@/components/dashboard/VipClientAdmin";
import { createClient } from "@/lib/supabase/server";

export default async function VipAdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (me?.role !== "admin") redirect("/dashboard");
  const { data: clients } = await supabase.from("profiles").select("id,full_name,email,vip_access,paid,updated_at").neq("role", "admin").order("updated_at", { ascending: false });
  return <VipClientAdmin initialClients={clients ?? []} />;
}
