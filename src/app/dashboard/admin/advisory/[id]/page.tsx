import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdvisoryWorkspace, {
  AdvisoryClient,
  AdvisoryMilestone,
  AdvisoryNote,
} from "@/components/dashboard/AdvisoryWorkspace";

export default async function AdvisoryClientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") redirect("/dashboard");

  const [{ data: client }, { data: notes }, { data: milestones }] = await Promise.all([
    supabase.from("advisory_clients").select("*").eq("id", id).maybeSingle(),
    supabase
      .from("advisory_notes")
      .select("id, note_type, note, created_at")
      .eq("client_id", id)
      .order("created_at", { ascending: false }),
    supabase
      .from("advisory_milestones")
      .select("id, title, description, status, due_date, sort_order, created_at")
      .eq("client_id", id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true }),
  ]);

  if (!client) notFound();

  return (
    <AdvisoryWorkspace
      initialClient={client as AdvisoryClient}
      initialNotes={(notes ?? []) as AdvisoryNote[]}
      initialMilestones={(milestones ?? []) as AdvisoryMilestone[]}
    />
  );
}
