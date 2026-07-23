import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ConsultationAdmin from "@/components/dashboard/ConsultationAdmin";

export default async function ConsultationAdminPage() {
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
    .from("consultation_requests")
    .select(
      "id, name, email, phone, topic, preferred_date, preferred_time, message, status, created_at",
    )
    .order("created_at", { ascending: false });

  return (
    <section className="mx-auto max-w-6xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
        Admin
      </p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
        Consultation requests.
      </h1>
      <p className="mt-3 text-sm text-white/40">
        Contact clients and keep each request’s status current.
      </p>
      <ConsultationAdmin initialRequests={data ?? []} />
    </section>
  );
}
