import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  MessageCircle,
  NotebookPen,
  Trophy,
  Video,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import CheckoutButton from "./CheckoutButton";

export default async function EnrollPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("paid")
    .eq("id", user.id)
    .single();

  if (profile?.paid) {
    redirect("/dashboard");
  }

  const features = [
    [Video, "Premium video lessons"],
    [NotebookPen, "Saved student notes"],
    [BookOpen, "Workbooks and resources"],
    [CheckCircle2, "Quizzes and progress"],
    [MessageCircle, "Private community"],
    [Trophy, "Completion certificate"],
  ];

  return (
    <main className="liquid-page-dark relative min-h-screen overflow-hidden px-5 py-20 text-white sm:px-8 sm:py-24">
      <div className="liquid-grid pointer-events-none absolute inset-0 opacity-20" />
      <div className="liquid-orb left-[-12rem] top-[-12rem] h-[38rem] w-[38rem] bg-[#ff4fa3]/[0.22]" />
      <div className="liquid-orb bottom-[-13rem] right-[-10rem] h-[40rem] w-[40rem] bg-[#8b67ff]/[0.20]" />

      <Link
        href="/education"
        className="liquid-glass-dark relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/[0.65]"
      >
        <ArrowLeft size={15} />
        Back to platform
      </Link>

      <section className="relative mx-auto mt-14 grid max-w-6xl gap-12 lg:grid-cols-[1fr_440px] lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff91c7]">
            Purity Of Hearts
          </span>
          <h1 className="liquid-title mt-5 max-w-3xl pb-[0.1em] text-[clamp(2.35rem,5vw,4.35rem)] font-semibold leading-[0.98]">
            Your learning platform is ready.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/[0.43]">
            Unlock Susan&apos;s lessons, learning resources, quizzes, personal
            notes, progress tracking, study tools, and private community.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map(([Icon, label]) => {
              const ItemIcon = Icon as typeof Video;
              return (
                <div key={label as string} className="liquid-glass-dark flex items-center gap-3 rounded-2xl p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4fa3]/[0.12] text-[#ff91c7]">
                    <ItemIcon size={18} />
                  </span>
                  <span className="text-sm text-white/[0.68]">{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="liquid-glass-dark rounded-[2.2rem] p-7 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff91c7]">
            Complete enrollment
          </p>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
            Purity Leadership Program
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/[0.43]">
            Your account is ready. Complete the secure Stripe checkout to unlock the member dashboard.
          </p>

          <div className="my-8 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/[0.28]">Logged in as</p>
            <p className="mt-2 text-sm font-medium text-white/[0.78]">{user.email}</p>
          </div>

          <CheckoutButton />

          <p className="mt-5 text-center text-xs leading-relaxed text-white/[0.30]">
            Secure checkout powered by Stripe.
          </p>
        </div>
      </section>
    </main>
  );
}
