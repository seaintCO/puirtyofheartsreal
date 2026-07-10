import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ModuleQuizCenter from "@/components/course/ModuleQuizCenter";

export default async function QuizzesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ModuleQuizCenter userId={user.id} />;
}