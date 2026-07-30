import { redirect } from "next/navigation";
import { BriefcaseBusiness, CalendarClock, UserCheck, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AdvisoryPipeline, { AdvisoryClientSummary } from "@/components/dashboard/AdvisoryPipeline";

export default async function AdvisoryAdminPage() {
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

  const { data } = await supabase
    .from("advisory_clients")
    .select("id, name, email, phone, business_name, industry, business_stage, primary_challenge, desired_outcome, stage, next_session_at, created_at")
    .order("created_at", { ascending: false });

  const clients = (data ?? []) as AdvisoryClientSummary[];
  const activeCount = clients.filter((client) => client.stage === "active").length;
  const openPipeline = clients.filter((client) => ["applied", "reviewing", "invited"].includes(client.stage)).length;
  const scheduledCount = clients.filter((client) => Boolean(client.next_session_at)).length;

  return (
    <section className="mx-auto max-w-7xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f472b6]">Susan Wagner · Admin</p>
      <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">Growth Strategy CRM</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/[0.40]">
            Review call requests, manage accepted businesses, and keep each founder’s vision, strategy, objectives, milestones, notes, and long-term direction in one private workspace.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [Users, clients.length.toString(), "Total records"],
          [BriefcaseBusiness, openPipeline.toString(), "Open inquiries"],
          [CalendarClock, scheduledCount.toString(), "Calls scheduled"],
          [UserCheck, activeCount.toString(), "Active clients"],
        ].map(([Icon, value, label]) => {
          const ItemIcon = Icon as typeof Users;
          return (
            <div key={label as string} className="liquid-glass-dark rounded-[1.5rem] p-5">
              <ItemIcon size={17} className="text-[#f472b6]" />
              <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">{value as string}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/[0.28]">{label as string}</p>
            </div>
          );
        })}
      </div>

      <AdvisoryPipeline initialClients={clients} />
    </section>
  );
}
