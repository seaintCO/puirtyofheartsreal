import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PurityChat from "@/components/purityos/PurityChat";

export const dynamic = "force-dynamic";

export default async function PurityChatPage({
  searchParams,
}: {
  searchParams: Promise<{ conversation?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/purityos/chat");

  const { data: hasAccess } = await supabase.rpc("has_purityos_access");
  if (!hasAccess) redirect("/purityos?access=required");

  const [{ data: conversations }, { data: profile }] = await Promise.all([
    supabase
      .from("purityos_conversations")
      .select("id, title, updated_at")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })
      .limit(40),
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle(),
  ]);

  const requestedId = (await searchParams).conversation;
  const activeConversationId =
    requestedId && conversations?.some((item) => item.id === requestedId)
      ? requestedId
      : conversations?.[0]?.id ?? null;

  const { data: messages } = activeConversationId
    ? await supabase
        .from("purityos_messages")
        .select("id, role, content, created_at")
        .eq("conversation_id", activeConversationId)
        .eq("user_id", user.id)
        .order("created_at", { ascending: true })
    : { data: [] };

  return (
    <PurityChat
      conversations={conversations ?? []}
      messages={(messages ?? []) as Array<{
        id: string;
        role: "user" | "assistant";
        content: string;
        created_at: string;
      }>}
      activeConversationId={activeConversationId}
      memberName={profile?.full_name?.split(" ")[0] || "you"}
    />
  );
}

