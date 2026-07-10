import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("paid, full_name")
    .eq("id", user.id)
    .single();

  if (!profile?.paid) {
    redirect("/enroll");
  }

  return (
    <div className="min-h-screen bg-[#111] text-white">
      <div className="flex min-h-screen">
        <DashboardSidebar />

        <div className="min-w-0 flex-1">
          <DashboardTopbar
            studentName={profile.full_name || user.email || "Student"}
          />

          <main className="p-5 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
