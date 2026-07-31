import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import VipClientWorkspaceAdmin from "@/components/dashboard/VipClientWorkspaceAdmin";
import { buildClientCoachingBrief } from "@/lib/vip/coaching-intelligence";

export default async function VipClientPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (me?.role !== "admin") redirect("/dashboard");

  const [{ data: client }, { data: workspace }, { data: goals }, { data: actions }, { data: checkins }, { data: coaching }] = await Promise.all([
    supabase.from("profiles").select("id,full_name,email,vip_access,paid").eq("id", id).single(),
    supabase.from("vip_workspaces").select("*").eq("user_id", id).maybeSingle(),
    supabase.from("vip_goals").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("vip_actions").select("*").eq("user_id", id).order("created_at", { ascending: false }),
    supabase.from("vip_checkins").select("*").eq("user_id", id).order("created_at", { ascending: false }).limit(10),
    supabase.from("vip_client_coaching").select("*").eq("user_id", id).maybeSingle(),
  ]);
  if (!client) notFound();
  const brief = buildClientCoachingBrief({ workspace: workspace ?? {}, goals: goals ?? [], actions: actions ?? [], checkins: checkins ?? [] });
  return <VipClientWorkspaceAdmin client={client} workspace={workspace ?? {}} goals={goals ?? []} actions={actions ?? []} checkins={checkins ?? []} coaching={coaching ?? {}} brief={brief} />;
}
