import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { rejectUntrustedOrigin } from "@/lib/security/request";

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const originError = rejectUntrustedOrigin(_request);
  if (originError) return originError;

  const { id } = await context.params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const { error } = await supabase
    .from("purityos_conversations")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json(
      { error: "Conversation could not be deleted." },
      { status: 500 },
    );
  }

  return NextResponse.json({ deleted: true });
}

