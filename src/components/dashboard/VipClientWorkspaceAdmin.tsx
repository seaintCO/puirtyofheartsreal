"use client";

import { useState } from "react";
import { CalendarDays, CheckCircle2, LoaderCircle, Save, Sparkles, Target, TriangleAlert } from "lucide-react";

type Props = {
  client: Record<string, any>;
  workspace: Record<string, any>;
  goals: Record<string, any>[];
  actions: Record<string, any>[];
  checkins: Record<string, any>[];
  coaching: Record<string, any>;
  brief: Record<string, any>;
};

const workspaceLabels: Record<string, string> = {
  personal_vision: "Personal vision", company_vision: "Company vision", values_culture: "Values & culture",
  swot: "SWOT", strategic_advantage: "Strategic advantage", critical_success_factors: "Critical success factors",
  kpis: "KPIs", business_diagnostic: "Business diagnostic", one_year_plan: "One-year plan",
  long_term_plan: "Long-term direction", coach_focus: "Client-requested coaching focus",
};

export default function VipClientWorkspaceAdmin({ client, workspace, goals, actions, checkins, coaching, brief }: Props) {
  const [form, setForm] = useState({
    client_stage: coaching.client_stage || "onboarding",
    assigned_focus: coaching.assigned_focus || "",
    internal_notes: coaching.internal_notes || "",
    next_session_at: coaching.next_session_at ? String(coaching.next_session_at).slice(0,16) : "",
  });
  const [saving, setSaving] = useState(false);
  async function save() {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/vip/coaching", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: client.id, ...form }) });
      if (!response.ok) throw new Error("Could not save");
    } finally { setSaving(false); }
  }

  return <section className="mx-auto max-w-7xl pb-16">
    <div className="liquid-glass-dark rounded-[2rem] p-7 sm:p-9">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff91c4]">Susan’s private client room</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em]">{client.full_name || client.email}</h1><p className="mt-3 text-sm text-white/40">Live Playbook intelligence, session preparation, accountability, and Susan-only notes.</p></div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4"><p className="text-[10px] uppercase tracking-wider text-white/30">Playbook readiness</p><p className="mt-2 text-3xl font-semibold text-[#ff91c4]">{brief.completion}%</p></div>
      </div>
    </div>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
      <div className="space-y-5">
        <article className="liquid-glass-dark rounded-[1.7rem] p-6">
          <div className="flex items-center gap-3"><Sparkles size={18} className="text-[#ff91c4]"/><h2 className="text-xl font-semibold">Autonomous coaching brief</h2></div>
          <p className="mt-4 text-sm leading-7 text-white/55">{brief.executiveSummary}</p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {brief.sessionAgenda.map((item: string, index: number) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f45aa4]/15 text-xs text-[#ff91c4]">{index + 1}</span><p className="text-xs leading-5 text-white/55">{item}</p></div>)}
          </div>
        </article>

        <article className="liquid-glass-dark rounded-[1.7rem] p-6">
          <h2 className="text-xl font-semibold">Suggested coaching questions</h2>
          <div className="mt-4 space-y-2">{brief.suggestedQuestions.map((item: string) => <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#a78bfa]"/>{item}</div>)}</div>
        </article>

        <article className="liquid-glass-dark rounded-[1.7rem] p-6">
          <h2 className="text-xl font-semibold">Client Playbook</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">{Object.entries(workspaceLabels).map(([key,label]) => <div key={key} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-[10px] uppercase tracking-wider text-[#ff91c4]">{label}</p><p className="mt-3 whitespace-pre-wrap text-xs leading-6 text-white/50">{workspace[key] || "Not completed yet."}</p></div>)}</div>
        </article>
      </div>

      <aside className="space-y-5">
        <article className="liquid-glass-dark rounded-[1.7rem] p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff91c4]">Susan-only controls</p>
          <select value={form.client_stage} onChange={e=>setForm({...form,client_stage:e.target.value})} className="mt-4 w-full rounded-2xl border border-white/10 bg-[#15131a] px-4 py-3 text-sm"><option>onboarding</option><option>active</option><option>strategy</option><option>execution</option><option>paused</option><option>graduated</option></select>
          <textarea value={form.assigned_focus} onChange={e=>setForm({...form,assigned_focus:e.target.value})} placeholder="Assign the client’s current coaching focus…" rows={4} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm outline-none"/>
          <textarea value={form.internal_notes} onChange={e=>setForm({...form,internal_notes:e.target.value})} placeholder="Private notes only Susan can see…" rows={7} className="mt-3 w-full rounded-2xl border border-white/10 bg-black/20 p-4 text-sm outline-none"/>
          <label className="mt-3 block text-[11px] text-white/40">Next session<input type="datetime-local" value={form.next_session_at} onChange={e=>setForm({...form,next_session_at:e.target.value})} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm"/></label>
          <button onClick={save} disabled={saving} className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">{saving?<LoaderCircle size={16} className="animate-spin"/>:<Save size={16}/>} Save client plan</button>
        </article>

        {brief.missing.length > 0 && <article className="liquid-glass-dark rounded-[1.7rem] p-6"><div className="flex items-center gap-3"><TriangleAlert size={18} className="text-amber-300"/><h2 className="font-semibold">Missing intelligence</h2></div><div className="mt-4 space-y-2">{brief.missing.map((item:string)=><p key={item} className="rounded-xl bg-white/[0.035] px-3 py-2 text-xs text-white/45">{item}</p>)}</div></article>}

        <article className="liquid-glass-dark rounded-[1.7rem] p-6"><div className="flex items-center gap-3"><Target size={18} className="text-[#ff91c4]"/><h2 className="font-semibold">Open goals & commitments</h2></div><div className="mt-4 space-y-2">{goals.filter(g=>g.status!=="complete").slice(0,5).map(g=><div key={g.id} className="rounded-xl bg-white/[0.035] p-3"><p className="text-sm">{g.title}</p><p className="mt-1 text-[10px] text-white/30">{g.success_metric || g.category}</p></div>)}{actions.filter(a=>a.status!=="done").slice(0,7).map(a=><div key={a.id} className="flex gap-2 rounded-xl border border-white/10 p-3 text-xs text-white/50"><CalendarDays size={14} className="shrink-0 text-[#a78bfa]"/>{a.title}</div>)}</div></article>
      </aside>
    </div>
  </section>;
}
