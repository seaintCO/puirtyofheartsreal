import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CourseActivation from "@/components/course/CourseActivation";

export const dynamic = "force-dynamic";
export const metadata = { title: "Course Access Activation", robots: { index: false, follow: false } };

export default async function CourseSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { session_id: sessionId } = await searchParams;
  if (!user) redirect("/login?next=/course");
  if (!sessionId?.startsWith("cs_")) redirect("/course");
  return <main className="course-success-page"><CourseActivation sessionId={sessionId}/></main>;
}
