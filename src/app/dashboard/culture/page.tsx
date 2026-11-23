import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CultureStudio from "@/components/culture/CultureStudio";

export const metadata = {
  title: "Culture Studio | Member Workspace",
  robots: { index: false, follow: false },
};

export default async function MemberCultureStudioPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard/culture");

  return <CultureStudio userId={user.id} />;
}
