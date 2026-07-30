import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Member Portal",
  robots: { index: false, follow: false },
};

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

  const { data: profile, error: profileError } = await supabase
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
    <div className="member-shell relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none fixed left-[-12rem] top-[-14rem] h-[40rem] w-[40rem] rounded-full bg-[#f45aa4]/[0.18] blur-[150px]" />
      <div className="pointer-events-none fixed right-[-14rem] top-[8%] h-[42rem] w-[42rem] rounded-full bg-[#8b5cf6]/[0.14] blur-[160px]" />
      <div className="pointer-events-none fixed bottom-[-22rem] left-[36%] h-[42rem] w-[42rem] rounded-full bg-[#5bb3ff]/[0.08] blur-[170px]" />

      <div className="relative flex min-h-screen">
        <DashboardSidebar isAdmin={profile.role === "admin"} />

        <div className="min-w-0 flex-1">
          <DashboardTopbar
            studentName={profile.full_name || user.email || "Student"}
            isAdmin={profile.role === "admin"}
          />

          <main className="p-4 pt-5 sm:p-6 sm:pt-6 md:p-8 md:pt-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
