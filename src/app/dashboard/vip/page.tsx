import VipGrowthWorkspace from "@/components/vip/VipGrowthWorkspace";
import { requireVipUser } from "@/lib/auth/require-vip-user";

export const metadata = { title: "GTTF VIP Dashboard", robots: { index: false, follow: false } };

export default async function VipDashboardPage() {
  const { user, supabase } = await requireVipUser();
  const [{ data: workspace }, { data: goals }, { data: actions }, { data: checkins }] = await Promise.all([
    supabase.from("vip_workspaces").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("vip_goals").select("id,title,category,success_metric,target_date,status").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("vip_actions").select("id,title,goal_id,due_date,status").eq("user_id", user.id).order("created_at", { ascending: false }),
    supabase.from("vip_checkins").select("id,wins,blockers,decisions,next_commitment,coach_question,created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
  ]);

  return <VipGrowthWorkspace initialWorkspace={(workspace ?? {}) as Record<string,string>} initialGoals={goals ?? []} initialActions={actions ?? []} initialCheckins={checkins ?? []} />;
}
