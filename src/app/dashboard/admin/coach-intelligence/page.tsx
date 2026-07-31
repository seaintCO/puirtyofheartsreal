import { redirect } from "next/navigation";
import { Brain, CheckCircle2, Download, MessageCircleQuestion, Route } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { coachIntelligence } from "@/lib/vip/coaching-intelligence";

export default async function CoachIntelligencePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");

  return <section className="mx-auto max-w-7xl pb-16">
    <div className="liquid-glass-dark rounded-[2rem] p-7 sm:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff91c4]">Susan-only intelligence</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em]">The coaching operating system.</h1>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-white/45">A private, practical interpretation of the coaching guide for Susan’s sessions. Clients never see the source guide or this internal framework.</p><a href="/api/vip/resource/coach" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-xs text-white/60"><Download size={14}/> Open Susan’s private source guide</a>
    </div>

    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <article className="liquid-glass-dark rounded-[1.7rem] p-6">
        <div className="flex items-center gap-3"><Brain className="text-[#ff91c4]" size={19}/><h2 className="text-xl font-semibold">Core coaching standards</h2></div>
        <div className="mt-5 space-y-3">{coachIntelligence.principles.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-sm font-semibold">{item.title}</p><p className="mt-2 text-xs leading-6 text-white/40">{item.copy}</p></div>)}</div>
      </article>
      <article className="liquid-glass-dark rounded-[1.7rem] p-6">
        <div className="flex items-center gap-3"><Route className="text-[#a78bfa]" size={19}/><h2 className="text-xl font-semibold">Session flow</h2></div>
        <div className="mt-5 space-y-3">{coachIntelligence.sessionFlow.map(([title, copy], index) => <div key={title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f45aa4] to-[#8b5cf6] text-xs font-semibold">{index + 1}</span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-white/40">{copy}</p></div></div>)}</div>
      </article>
    </div>

    <article className="liquid-glass-dark mt-5 rounded-[1.7rem] p-6">
      <div className="flex items-center gap-3"><MessageCircleQuestion className="text-[#ff91c4]" size={19}/><h2 className="text-xl font-semibold">Powerful question bank</h2></div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">{coachIntelligence.questionBank.map((question) => <div key={question} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#ff91c4]"/>{question}</div>)}</div>
    </article>
  </section>;
}
