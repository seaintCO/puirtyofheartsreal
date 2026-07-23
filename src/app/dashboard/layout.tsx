import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("paid, full_name, role")
      .eq("id", user.id)
      .single();

  if (profileError || !profile) {
    redirect("/login");
  }

  if (!profile.paid && profile.role !== "admin") {
    redirect("/enroll");
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#11100e] text-white">
      <div className="pointer-events-none fixed left-[12%] top-[-20%] h-[700px] w-[700px] rounded-full bg-[#c9a75d]/8 blur-[160px]" />
      <div className="pointer-events-none fixed bottom-[-30%] right-[-10%] h-[700px] w-[700px] rounded-full bg-[#6b4f85]/8 blur-[160px]" />
      <div className="relative flex min-h-screen">
        <DashboardSidebar isAdmin={profile.role === "admin"} />

        <div className="min-w-0 flex-1">
          <DashboardTopbar
            studentName={
              profile.full_name ||
              user.email ||
              "Student"
            }
            isAdmin={profile.role === "admin"}
          />

          <main className="p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
