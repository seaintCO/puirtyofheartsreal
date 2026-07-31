import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { rejectUntrustedOrigin } from "@/lib/security/request";

export async function POST(request: Request) {
  try {
    const blocked = rejectUntrustedOrigin(request);
  if (blocked) return blocked;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
    if (profile?.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    const body = await request.json() as { userId?: string; enabled?: boolean };
    const userId = String(body.userId ?? "").trim();
    if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });
    const admin = createAdminClient();
    const { error } = await admin.from("profiles").update({ vip_access: Boolean(body.enabled), paid: Boolean(body.enabled) }).eq("id", userId);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("VIP admin error", error);
    return NextResponse.json({ error: "Could not update VIP access." }, { status: 500 });
  }
}
