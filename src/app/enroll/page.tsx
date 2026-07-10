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
    <main className="min-h-screen bg-[#111] px-6 py-24 text-white">
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium"
      >
        <ArrowLeft size={15} />
        Back Home
      </Link>

      <section className="mx-auto mt-16 grid max-w-6xl gap-12 lg:grid-cols-[1fr_440px] lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Purity of Hearts
          </span>

          <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Begin your coaching and course journey.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/55">
            Get access to Susan&apos;s lessons, coaching resources, quizzes,
            personal notes, progress tracking, and private community.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map(([Icon, label]: any) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <Icon className="text-[#C9A75D]" size={20} />
                <span className="text-sm text-white/75">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
            Complete Enrollment
          </p>

          <h2 className="mt-4 text-3xl font-semibold">
            Purity Leadership Program
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-white/55">
            Your account is ready. Complete your secure Stripe payment to
            unlock the student dashboard.
          </p>

          <div className="my-8 border-y border-white/10 py-6">
            <p className="text-xs uppercase tracking-widest text-white/35">
              Logged in as
            </p>
            <p className="mt-2 text-sm font-medium text-white">
              {user.email}
            </p>
          </div>

          <CheckoutButton />

          <p className="mt-5 text-center text-xs leading-relaxed text-white/35">
            Secure checkout powered by Stripe.
          </p>
        </div>
      </section>
    </main>
  );
}