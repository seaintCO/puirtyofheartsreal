import Link from "next/link";
import { redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Access Activation",
  robots: { index: false, follow: false },
};

export default async function SuccessPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/success");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#1F1F1F]/[0.05] bg-white p-10 text-center shadow-xl">
        <CheckCircle2 className="mx-auto text-[#ff4fa3]" size={52} />

        <h1 className="mt-6 text-3xl font-semibold tracking-tight">
          Payment received.
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#1F1F1F]/[0.60]">
          Your private course access is being activated. This normally takes
          only a few seconds.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-full bg-[#1F1F1F] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#ff4fa3]"
        >
          Enter Member Portal
        </Link>
      </div>
    </main>
  );
}
