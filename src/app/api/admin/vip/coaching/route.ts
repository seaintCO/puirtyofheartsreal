import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { rejectUntrustedOrigin } from "@/lib/security/request";

const clean = (value: unknown, max = 5000) => String(value ?? "").trim().slice(0, max);

export async function POST(request: Request) {
  try {
    const blocked = rejectUntrustedOrigin(request);
    if (blocked) return blocked;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: me } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (me?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    const body = await request.json() as Record<string, unknown>;
    const userId = clean(body.userId, 80);
    if (!userId) return NextResponse.json({ error: "Client required" }, { status: 400 });
    const admin = createAdminClient();
    const { error } = await admin.from("vip_client_coaching").upsert({
      user_id: userId,
      client_stage: clean(body.client_stage, 40) || "onboarding",
      assigned_focus: clean(body.assigned_focus),
      internal_notes: clean(body.internal_notes, 10000),
      next_session_at: clean(body.next_session_at, 40) || null,
      last_reviewed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("VIP coaching admin error", error);
    return NextResponse.json({ error: "Could not save client coaching plan." }, { status: 500 });
  }
}
