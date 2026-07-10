import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ResourceUploader from "@/components/resources/ResourceUploader";

export default async function AdminResourcesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <section>
      <div className="mb-8">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Admin
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Resource Vault Manager
        </h1>

        <p className="mt-3 text-sm text-white/45">
          Add bonus videos and protected downloads without changing the
          official course curriculum.
        </p>
      </div>

      <div className="max-w-4xl">
        <ResourceUploader />
      </div>
    </section>
  );
}