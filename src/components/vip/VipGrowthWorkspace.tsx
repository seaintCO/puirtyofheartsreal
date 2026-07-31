"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Circle,
  Download,
  LoaderCircle,
  Plus,
  Save,
  Sparkles,
  Target,
} from "lucide-react";

type Workspace = Record<string, string>;
type Goal = { id: string; title: string; category: string; success_metric: string | null; target_date: string | null; status: string };
type Action = { id: string; title: string; goal_id: string | null; due_date: string | null; status: string };
type Checkin = { id: string; wins: string; blockers: string; decisions: string; next_commitment: string; coach_question: string; created_at: string };

const sections = [
  {
    title: "1. Define the ingredients",
    subtitle: "Clarify what the business is, why it matters, and where it can win.",
    fields: [
      ["personal_vision", "Personal vision"], ["company_vision", "Company vision"],
      ["values_culture", "Values & culture"], ["swot", "SWOT"],
      ["strategic_advantage", "Strategic advantage"], ["critical_success_factors", "Critical success factors"],
      ["kpis", "KPIs"], ["business_diagnostic", "Business diagnostic"],
    ],
  },
  {
    title: "2. Create the basic plan",
    subtitle: "Translate the vision into a practical one-year and long-term roadmap.",
    fields: [
      ["one_year_plan", "One-year strategic plan"], ["long_term_plan", "Long-term direction"],
      ["current_org", "Current accountability structure"], ["future_org", "Future accountability structure"],
    ],
  },
  {
    title: "3. Systemize the business",
    subtitle: "Give each operating pillar an owner, objective, process, metric, and rhythm.",
    fields: [
      ["sales_system", "Sales"], ["marketing_system", "Marketing"],
      ["operations_system", "Operations"], ["people_system", "People / HR"],
      ["finance_system", "Finance & administration"], ["leadership_system", "Management & leadership"],
    ],
  },
  {
    title: "4. Coaching focus",
    subtitle: "Capture the deeper question Susan should help you think through next.",
    fields: [["coach_focus", "What do you want Susan to challenge, clarify, or help unlock?"]],
  },
] as const;

export default function VipGrowthWorkspace({ initialWorkspace, initialGoals, initialActions, initialCheckins }: {
  initialWorkspace: Workspace;
  initialGoals: Goal[];
  initialActions: Action[];
  initialCheckins: Checkin[];
}) {
  const [workspace, setWorkspace] = useState(initialWorkspace);
  const [goals, setGoals] = useState(initialGoals);
  const [actions, setActions] = useState(initialActions);
  const [checkins, setCheckins] = useState(initialCheckins);
  const [saving, setSaving] = useState("");
  const [openSection, setOpenSection] = useState(0);
  const completedActions = actions.filter((item) => item.status === "done").length;
  const progress = actions.length ? Math.round((completedActions / actions.length) * 100) : 0;

  async function send(payload: Record<string, unknown>) {
    const response = await fetch("/api/vip/workspace", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json() as { error?: string };
    if (!response.ok) throw new Error(data.error || "Could not save");
  }

  async function saveWorkspace() {
    setSaving("workspace");
    try { await send({ action: "save-workspace", ...workspace }); }
    finally { setSaving(""); }
  }

  async function addGoal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving("goal");
    try {
      await send({ action: "add-goal", ...Object.fromEntries(form.entries()) });
      setGoals((current) => [{ id: crypto.randomUUID(), title: String(form.get("title")), category: String(form.get("category")), success_metric: String(form.get("success_metric")) || null, target_date: String(form.get("target_date")) || null, status: "active" }, ...current]);
      event.currentTarget.reset();
    } finally { setSaving(""); }
  }

  async function addAction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving("action");
    try {
      await send({ action: "add-action", ...Object.fromEntries(form.entries()) });
      setActions((current) => [{ id: crypto.randomUUID(), title: String(form.get("title")), goal_id: String(form.get("goal_id")) || null, due_date: String(form.get("due_date")) || null, status: "open" }, ...current]);
      event.currentTarget.reset();
    } finally { setSaving(""); }
  }

  async function addCheckin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving("checkin");
    try {
      const row = Object.fromEntries(form.entries()) as Record<string, string>;
      await send({ action: "add-checkin", ...row });
      setCheckins((current) => [{ id: crypto.randomUUID(), wins: row.wins || "", blockers: row.blockers || "", decisions: row.decisions || "", next_commitment: row.next_commitment || "", coach_question: row.coach_question || "", created_at: new Date().toISOString() }, ...current]);
      event.currentTarget.reset();
    } finally { setSaving(""); }
  }

  async function toggleAction(item: Action) {
    const status = item.status === "done" ? "open" : "done";
    setActions((current) => current.map((row) => row.id === item.id ? { ...row, status } : row));
    await send({ action: "toggle-action", id: item.id, status });
  }

  const activeGoals = useMemo(() => goals.filter((item) => item.status !== "complete"), [goals]);

  return (
    <div className="mx-auto max-w-7xl pb-16">
      <section className="liquid-glass-dark relative overflow-hidden rounded-[2rem] p-6 sm:p-9">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#f45aa4]/20 blur-[100px]" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_.45fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff9ac8]">
              <Sparkles size={13} /> GTTF VIP Dashboard
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Your private business growth operating system.</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/45">VIP includes the complete Purity Of Hearts course plus Susan’s private playbook, 90-day goals, action accountability, session preparation, and strategic resources.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between text-xs text-white/45"><span>Execution progress</span><span>{progress}%</span></div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-[#f45aa4] to-[#8b5cf6]" style={{ width: `${Math.max(progress, 2)}%` }} /></div>
            <p className="mt-3 text-[11px] text-white/30">{completedActions} of {actions.length} actions complete</p>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <section className="space-y-4">
          {sections.map((section, index) => (
            <article key={section.title} className="liquid-glass-dark overflow-hidden rounded-[1.7rem]">
              <button onClick={() => setOpenSection(openSection === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6">
                <div><h2 className="text-base font-semibold">{section.title}</h2><p className="mt-1 text-xs leading-5 text-white/35">{section.subtitle}</p></div>
                <ChevronDown size={18} className={`shrink-0 text-[#ff91c4] transition ${openSection === index ? "rotate-180" : ""}`} />
              </button>
              {openSection === index && (
                <div className="grid gap-4 border-t border-white/10 p-5 sm:grid-cols-2 sm:p-6">
                  {section.fields.map(([key, label]) => (
                    <label key={key} className={section.fields.length === 1 ? "sm:col-span-2" : ""}>
                      <span className="text-[11px] font-medium text-white/50">{label}</span>
                      <textarea value={workspace[key] || ""} onChange={(event) => setWorkspace((current) => ({ ...current, [key]: event.target.value }))} rows={5} className="mt-2 w-full resize-y rounded-[1.2rem] border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/70 outline-none transition focus:border-[#f45aa4]/50" placeholder="Capture your thinking here…" />
                    </label>
                  ))}
                  <button onClick={saveWorkspace} disabled={saving === "workspace"} className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f45aa4] to-[#8b5cf6] px-6 py-3.5 text-sm font-semibold text-white disabled:opacity-60">
                    {saving === "workspace" ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />} Save playbook
                  </button>
                </div>
              )}
            </article>
          ))}
        </section>

        <aside className="space-y-5">
          <section className="liquid-glass-dark rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff91c4]">Private resources</p>
            <h2 className="mt-3 text-xl font-semibold">Susan’s coaching library</h2>
            <p className="mt-2 text-xs leading-5 text-white/35">Reference materials remain attributed to The Alternative Board and are available only inside VIP access.</p>
            <div className="mt-5 space-y-2">
              <a href="/api/vip/resource/playbook" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-white/65 hover:bg-white/[0.06]"><span className="flex items-center gap-3"><Target size={16} className="text-[#ff91c4]" />The Playbook Overview</span><Download size={15} /></a>
              <a href="/api/vip/resource/coach" className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 text-sm text-white/65 hover:bg-white/[0.06]"><span className="flex items-center gap-3"><BookOpen size={16} className="text-[#a78bfa]" />How to Be a Great Coach</span><Download size={15} /></a>
            </div>
          </section>

          <form onSubmit={addGoal} className="liquid-glass-dark rounded-[1.7rem] p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff91c4]">90-day goals</p>
            <input required name="title" placeholder="Goal" className="mt-4 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" />
            <input name="success_metric" placeholder="How will success be measured?" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" />
            <div className="mt-2 grid grid-cols-2 gap-2"><select name="category" className="rounded-2xl border border-white/10 bg-[#15131a] px-4 py-3 text-xs"><option>90-day goal</option><option>Growth</option><option>Leadership</option><option>Operations</option><option>Exit</option></select><input type="date" name="target_date" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs" /></div>
            <button disabled={saving === "goal"} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black"><Plus size={14} /> Add goal</button>
            <div className="mt-5 space-y-2">{activeGoals.map((goal) => <div key={goal.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-sm font-medium">{goal.title}</p><p className="mt-1 text-[10px] text-white/30">{goal.category}{goal.target_date ? ` · ${goal.target_date}` : ""}</p>{goal.success_metric && <p className="mt-2 text-xs leading-5 text-white/40">{goal.success_metric}</p>}</div>)}</div>
          </form>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="liquid-glass-dark rounded-[1.7rem] p-5 sm:p-6">
          <div className="flex items-center justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff91c4]">Accountability</p><h2 className="mt-2 text-xl font-semibold">Next actions</h2></div><ArrowRight size={18} className="text-white/25" /></div>
          <form onSubmit={addAction} className="mt-5 grid gap-2 sm:grid-cols-[1fr_160px_130px_auto]"><input required name="title" placeholder="Specific next action" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none" /><select name="goal_id" className="rounded-2xl border border-white/10 bg-[#15131a] px-3 py-3 text-xs"><option value="">No linked goal</option>{activeGoals.map((goal) => <option key={goal.id} value={goal.id}>{goal.title}</option>)}</select><input type="date" name="due_date" className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-xs" /><button className="rounded-full bg-gradient-to-r from-[#f45aa4] to-[#8b5cf6] px-4 py-3"><Plus size={16} /></button></form>
          <div className="mt-5 space-y-2">{actions.map((item) => <button key={item.id} onClick={() => toggleAction(item)} className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-left"><span className={`flex h-6 w-6 items-center justify-center rounded-full border ${item.status === "done" ? "border-[#f45aa4] bg-[#f45aa4]" : "border-white/20"}`}>{item.status === "done" ? <Check size={13} /> : <Circle size={11} className="text-transparent" />}</span><div><p className={`text-sm ${item.status === "done" ? "text-white/30 line-through" : "text-white/65"}`}>{item.title}</p>{item.due_date && <p className="mt-1 text-[10px] text-white/25">Due {item.due_date}</p>}</div></button>)}</div>
        </section>

        <section className="liquid-glass-dark rounded-[1.7rem] p-5 sm:p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff91c4]">Session preparation</p>
          <h2 className="mt-2 text-xl font-semibold">Prepare for your next call with Susan</h2>
          <form onSubmit={addCheckin} className="mt-5 grid gap-3 sm:grid-cols-2">{[["wins","Wins since the last session"],["blockers","What is getting in the way?"],["decisions","Decisions you are avoiding"],["next_commitment","Your next commitment"],["coach_question","The question you want Susan to ask"]].map(([name,label], index) => <label key={name} className={index === 4 ? "sm:col-span-2" : ""}><span className="text-[11px] text-white/45">{label}</span><textarea name={name} rows={3} className="mt-2 w-full rounded-2xl border border-white/10 bg-black/20 p-3 text-sm outline-none" /></label>)}<button disabled={saving === "checkin"} className="sm:col-span-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black">Save session preparation</button></form>
          {checkins.length > 0 && <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-[10px] uppercase tracking-wider text-white/30">Latest check-in</p><p className="mt-3 text-sm leading-6 text-white/55">{checkins[0].next_commitment || checkins[0].coach_question || checkins[0].wins}</p></div>}
        </section>
      </div>
    </div>
  );
}
