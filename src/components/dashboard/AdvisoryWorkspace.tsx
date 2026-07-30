"use client";

import { FormEvent, useState } from "react";
import {
  CalendarClock,
  Check,
  ChevronLeft,
  CirclePlus,
  Mail,
  Phone,
  Save,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export type AdvisoryClient = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  business_name: string;
  website: string | null;
  industry: string;
  business_stage: string;
  team_size: string | null;
  revenue_range: string | null;
  primary_challenge: string;
  desired_outcome: string;
  why_susan: string | null;
  stage: string;
  vision_statement: string | null;
  mission_statement: string | null;
  three_year_vision: string | null;
  strategic_goals: string | null;
  growth_strategy: string | null;
  quarterly_objectives: string | null;
  exit_plan: string | null;
  next_actions: string | null;
  next_session_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AdvisoryNote = {
  id: string;
  note_type: string;
  note: string;
  created_at: string;
};

export type AdvisoryMilestone = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  sort_order: number;
  created_at: string;
};

const stages = [
  "applied",
  "reviewing",
  "invited",
  "enrolled",
  "active",
  "paused",
  "completed",
  "declined",
];

const milestoneStatuses = ["pending", "in_progress", "completed", "blocked"];

export default function AdvisoryWorkspace({
  initialClient,
  initialNotes,
  initialMilestones,
}: {
  initialClient: AdvisoryClient;
  initialNotes: AdvisoryNote[];
  initialMilestones: AdvisoryMilestone[];
}) {
  const supabase = createClient();
  const [client, setClient] = useState(initialClient);
  const [notes, setNotes] = useState(initialNotes);
  const [milestones, setMilestones] = useState(initialMilestones);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [strategy, setStrategy] = useState({
    vision_statement: initialClient.vision_statement ?? "",
    mission_statement: initialClient.mission_statement ?? "",
    three_year_vision: initialClient.three_year_vision ?? "",
    strategic_goals: initialClient.strategic_goals ?? "",
    growth_strategy: initialClient.growth_strategy ?? "",
    quarterly_objectives: initialClient.quarterly_objectives ?? "",
    exit_plan: initialClient.exit_plan ?? "",
    next_actions: initialClient.next_actions ?? "",
  });

  async function updateClient(patch: Partial<AdvisoryClient>, successMessage: string) {
    setNotice("");
    setSaving(true);
    const { error } = await supabase
      .from("advisory_clients")
      .update(patch)
      .eq("id", client.id);

    if (error) {
      setNotice("The client record could not be updated.");
      setSaving(false);
      return false;
    }

    setClient((current) => ({ ...current, ...patch }));
    setNotice(successMessage);
    setSaving(false);
    return true;
  }

  async function saveStrategy() {
    await updateClient(strategy, "Founder strategy saved.");
  }

  async function addNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const note = String(form.get("note") ?? "").trim();
    const noteType = String(form.get("noteType") ?? "general");
    if (!note) return;

    setNotice("");
    const { data, error } = await supabase
      .from("advisory_notes")
      .insert({
        client_id: client.id,
        note,
        note_type: noteType,
      })
      .select("id, note_type, note, created_at")
      .single();

    if (error || !data) {
      setNotice("The note could not be added.");
      return;
    }

    setNotes((current) => [data as AdvisoryNote, ...current]);
    event.currentTarget.reset();
    setNotice("Private note added.");
  }

  async function addMilestone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") ?? "").trim();
    const description = String(form.get("description") ?? "").trim();
    const dueDate = String(form.get("dueDate") ?? "").trim();
    if (!title) return;

    setNotice("");
    const { data, error } = await supabase
      .from("advisory_milestones")
      .insert({
        client_id: client.id,
        title,
        description: description || null,
        due_date: dueDate || null,
        sort_order: milestones.length,
      })
      .select("id, title, description, status, due_date, sort_order, created_at")
      .single();

    if (error || !data) {
      setNotice("The milestone could not be created.");
      return;
    }

    setMilestones((current) => [...current, data as AdvisoryMilestone]);
    event.currentTarget.reset();
    setNotice("Milestone added.");
  }

  async function updateMilestone(id: string, status: string) {
    setNotice("");
    const { error } = await supabase
      .from("advisory_milestones")
      .update({ status })
      .eq("id", id);

    if (error) {
      setNotice("The milestone status could not be updated.");
      return;
    }

    setMilestones((current) =>
      current.map((milestone) =>
        milestone.id === id ? { ...milestone, status } : milestone,
      ),
    );
  }

  return (
    <section className="mx-auto max-w-7xl">
      <Link
        href="/dashboard/admin/advisory"
        className="inline-flex items-center gap-2 text-xs font-medium text-white/[0.38] transition hover:text-white"
      >
        <ChevronLeft size={14} /> Back to advisory pipeline
      </Link>

      <div className="mt-6 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff75b8]">Private client workspace</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{client.business_name}</h1>
          <p className="mt-3 text-sm text-white/[0.40]">{client.name} · {client.industry} · {client.business_stage}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={client.stage}
            onChange={(event) => updateClient({ stage: event.target.value }, "Pipeline stage updated.")}
            className="rounded-full border border-white/[0.10] bg-[#12111a] px-5 py-3 text-xs capitalize text-white/[0.65] outline-none"
          >
            {stages.map((stage) => (
              <option key={stage} value={stage}>{stage}</option>
            ))}
          </select>
          <a
            href={`mailto:${client.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black transition hover:bg-[#ff75b8]"
          >
            <Mail size={14} /> Email founder
          </a>
        </div>
      </div>

      {notice && (
        <div className="mt-5 flex items-center gap-2 liquid-subcard-dark rounded-2xl px-4 py-3 text-xs text-white/[0.55]">
          <Check size={14} className="text-[#ff75b8]" /> {notice}
        </div>
      )}

      <div className="mt-8 grid gap-5 xl:grid-cols-[.72fr_1.28fr]">
        <aside className="space-y-5">
          <div className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.28]">Founder record</p>
            <div className="mt-6 space-y-4 text-sm">
              <InfoRow label="Founder" value={client.name} />
              <InfoRow label="Email" value={client.email} />
              <InfoRow label="Phone" value={client.phone || "Not provided"} />
              <InfoRow label="Website" value={client.website || "Not provided"} />
              <InfoRow label="Team" value={client.team_size || "Not provided"} />
              <InfoRow label="Revenue" value={client.revenue_range || "Not provided"} />
              <InfoRow label="Applied" value={new Date(client.created_at).toLocaleDateString()} />
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/[0.28]">Original application</p>
            <ApplicationBlock label="Primary challenge" value={client.primary_challenge} />
            <ApplicationBlock label="Desired outcome" value={client.desired_outcome} />
            {client.why_susan && <ApplicationBlock label="Why Susan" value={client.why_susan} />}
          </div>

          <div className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6">
            <div className="flex items-center gap-2">
              <CalendarClock size={16} className="text-[#ff75b8]" />
              <p className="text-sm font-semibold">Next session</p>
            </div>
            <input
              type="datetime-local"
              defaultValue={toDateTimeLocal(client.next_session_at)}
              onChange={(event) => {
                const value = event.target.value;
                updateClient(
                  { next_session_at: value ? new Date(value).toISOString() : null },
                  "Next session updated.",
                );
              }}
              className="mt-5 w-full rounded-2xl border border-white/[0.10] bg-black/[0.15] px-4 py-3 text-xs text-white/[0.62] outline-none"
            />
          </div>
        </aside>

        <div className="space-y-5">
          <div className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff75b8]">Founder strategy</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Vision, growth, objectives, and exit</h2>
              </div>
              <button
                type="button"
                disabled={saving}
                onClick={saveStrategy}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f653a6] to-[#8f75ff] px-5 py-3 text-xs font-semibold text-[#ffffff] transition hover:bg-[#e8cc80] disabled:opacity-60"
              >
                <Save size={14} /> Save strategy
              </button>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              <StrategyField label="Vision statement" value={strategy.vision_statement} onChange={(value) => setStrategy((current) => ({ ...current, vision_statement: value }))} />
              <StrategyField label="Mission statement" value={strategy.mission_statement} onChange={(value) => setStrategy((current) => ({ ...current, mission_statement: value }))} />
              <StrategyField label="Three-year vision" value={strategy.three_year_vision} onChange={(value) => setStrategy((current) => ({ ...current, three_year_vision: value }))} />
              <StrategyField label="Strategic goals" value={strategy.strategic_goals} onChange={(value) => setStrategy((current) => ({ ...current, strategic_goals: value }))} />
              <StrategyField label="Growth strategy" value={strategy.growth_strategy} onChange={(value) => setStrategy((current) => ({ ...current, growth_strategy: value }))} />
              <StrategyField label="Quarterly objectives" value={strategy.quarterly_objectives} onChange={(value) => setStrategy((current) => ({ ...current, quarterly_objectives: value }))} />
              <StrategyField label="Next actions" value={strategy.next_actions} onChange={(value) => setStrategy((current) => ({ ...current, next_actions: value }))} />
              <StrategyField label="Exit and legacy plan" value={strategy.exit_plan} onChange={(value) => setStrategy((current) => ({ ...current, exit_plan: value }))} />
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff75b8]">Milestones</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Roadmap and accountability</h2>
              </div>
            </div>

            <form onSubmit={addMilestone} className="mt-6 grid gap-3 rounded-2xl bg-black/[0.15] p-4 md:grid-cols-[1fr_1fr_160px_auto]">
              <input required name="title" placeholder="Milestone title" className="crm-input" />
              <input name="description" placeholder="Description" className="crm-input" />
              <input type="date" name="dueDate" className="crm-input" />
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-semibold text-black">
                <CirclePlus size={14} /> Add
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {milestones.length === 0 ? (
                <p className="rounded-2xl border border-white/[0.10] p-6 text-center text-xs text-white/[0.30]">No milestones yet.</p>
              ) : (
                milestones.map((milestone) => (
                  <div key={milestone.id} className="flex flex-col gap-4 rounded-2xl border border-white/[0.10] bg-black/[0.15] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold">{milestone.title}</p>
                      {milestone.description && <p className="mt-1 text-xs leading-5 text-white/[0.36]">{milestone.description}</p>}
                      {milestone.due_date && <p className="mt-2 text-[10px] text-white/[0.25]">Due {milestone.due_date}</p>}
                    </div>
                    <select
                      value={milestone.status}
                      onChange={(event) => updateMilestone(milestone.id, event.target.value)}
                      className="rounded-full border border-white/[0.10] bg-[#12111a] px-4 py-2 text-[11px] capitalize text-white/[0.62] outline-none"
                    >
                      {milestoneStatuses.map((status) => (
                        <option key={status} value={status}>{status.replace("_", " ")}</option>
                      ))}
                    </select>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/[0.10] bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#ff75b8]">Private notes</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">Sessions, decisions, and follow-up</h2>

            <form onSubmit={addNote} className="mt-6 rounded-2xl bg-black/[0.15] p-4">
              <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
                <select name="noteType" defaultValue="general" className="crm-input">
                  <option value="general">General note</option>
                  <option value="session">Session note</option>
                  <option value="strategy">Strategy note</option>
                  <option value="decision">Decision record</option>
                  <option value="follow_up">Follow-up</option>
                </select>
                <textarea required name="note" rows={3} placeholder="Add a private note for Susan…" className="crm-input resize-none" />
              </div>
              <button className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-xs font-semibold text-black">
                <CirclePlus size={14} /> Add private note
              </button>
            </form>

            <div className="mt-5 space-y-3">
              {notes.length === 0 ? (
                <p className="rounded-2xl border border-white/[0.10] p-6 text-center text-xs text-white/[0.30]">No private notes yet.</p>
              ) : (
                notes.map((note) => (
                  <article key={note.id} className="rounded-2xl border border-white/[0.10] bg-black/[0.15] p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-white/[0.07] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.38]">
                        {note.note_type.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-white/[0.23]">{new Date(note.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/[0.52]">{note.note}</p>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-white/[0.08] pb-3 last:border-b-0 last:pb-0">
      <span className="text-xs text-white/[0.28]">{label}</span>
      <span className="max-w-[65%] break-words text-right text-xs text-white/[0.58]">{value}</span>
    </div>
  );
}

function ApplicationBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <p className="text-[9px] uppercase tracking-[0.16em] text-white/[0.24]">{label}</p>
      <p className="mt-2 whitespace-pre-wrap text-xs leading-6 text-white/[0.46]">{value}</p>
    </div>
  );
}

function StrategyField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/[0.28]">
      {label}
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={6}
        className="mt-2 w-full resize-y rounded-2xl border border-white/[0.10] bg-black/[0.15] px-4 py-3 text-sm normal-case leading-6 tracking-normal text-white/[0.68] outline-none transition focus:border-[#ff75b8]/[0.70]/60"
      />
    </label>
  );
}

function toDateTimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}
