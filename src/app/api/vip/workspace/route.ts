import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { hasTrustedRequestOrigin } from "@/lib/security/request";

const clean = (value: unknown, max = 5000) => String(value ?? "").trim().slice(0, max);

async function context(request: Request) {
  if (!hasTrustedRequestOrigin(request)) throw new Error("FORBIDDEN");
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("UNAUTHORIZED");
  const { data: profile } = await supabase.from("profiles").select("role, vip_access").eq("id", user.id).single();
  if (!profile || (!profile.vip_access && profile.role !== "admin")) throw new Error("FORBIDDEN");
  return { supabase, user };
}

export async function POST(request: Request) {
  try {
    const { supabase, user } = await context(request);
    const body = await request.json() as Record<string, unknown>;
    const action = clean(body.action, 30);

    if (action === "save-workspace") {
      const allowed = ["personal_vision","company_vision","values_culture","swot","strategic_advantage","critical_success_factors","kpis","business_diagnostic","one_year_plan","long_term_plan","current_org","future_org","sales_system","marketing_system","operations_system","people_system","finance_system","leadership_system","coach_focus"];
      const payload: Record<string, string> = {};
      for (const key of allowed) payload[key] = clean(body[key]);
      const { error } = await supabase.from("vip_workspaces").upsert({ user_id: user.id, ...payload, updated_at: new Date().toISOString() });
      if (error) throw error;
    } else if (action === "add-goal") {
      const title = clean(body.title, 240);
      if (!title) return NextResponse.json({ error: "Goal title is required." }, { status: 400 });
      const { error } = await supabase.from("vip_goals").insert({ user_id: user.id, title, category: clean(body.category, 80) || "90-day goal", success_metric: clean(body.success_metric, 500) || null, target_date: clean(body.target_date, 20) || null });
      if (error) throw error;
    } else if (action === "toggle-goal") {
      const id = clean(body.id, 80);
      const status = clean(body.status, 20) === "complete" ? "complete" : "active";
      const { error } = await supabase.from("vip_goals").update({ status, updated_at: new Date().toISOString() }).eq("id", id).eq("user_id", user.id);
      if (error) throw error;
    } else if (action === "add-action") {
      const title = clean(body.title, 240);
      if (!title) return NextResponse.json({ error: "Action is required." }, { status: 400 });
      const { error } = await supabase.from("vip_actions").insert({ user_id: user.id, title, goal_id: clean(body.goal_id, 80) || null, due_date: clean(body.due_date, 20) || null });
      if (error) throw error;
    } else if (action === "toggle-action") {
      const id = clean(body.id, 80);
      const status = clean(body.status, 20) === "done" ? "done" : "open";
      const { error } = await supabase.from("vip_actions").update({ status, updated_at: new Date().toISOString() }).eq("id", id).eq("user_id", user.id);
      if (error) throw error;
    } else if (action === "add-checkin") {
      const { error } = await supabase.from("vip_checkins").insert({ user_id: user.id, wins: clean(body.wins), blockers: clean(body.blockers), decisions: clean(body.decisions), next_commitment: clean(body.next_commitment), coach_question: clean(body.coach_question) });
      if (error) throw error;
    } else {
      return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "VIP access required" }, { status: 403 });
    console.error("VIP workspace error", error);
    return NextResponse.json({ error: "Could not save. Please try again." }, { status: 500 });
  }
}
