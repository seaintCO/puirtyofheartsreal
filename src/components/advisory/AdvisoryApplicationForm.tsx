"use client";

import { FormEvent, type ReactNode, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

export default function AdvisoryApplicationForm() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/advisory/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Please try again.");
      setComplete(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (complete) {
    return (
      <div className="flex min-h-[38rem] flex-col items-center justify-center rounded-[2rem] p-8 text-center sm:p-12 liquid-panel">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#12141a] text-white">
          <Check size={22} />
        </span>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-black/[0.35]">Request received</p>
        <h2 className="mt-4 max-w-md text-3xl font-semibold leading-[0.98] tracking-[-0.05em]">
          Susan’s team will review your business and goals.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-black/[0.45]">
          Qualified founders will be contacted with the next step to schedule the growth strategy conversation.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[2rem] p-6 sm:p-9 liquid-panel">
      <input
        name="companyWebsiteField"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/[0.35]">Growth strategy request</p>
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
        Tell Susan what you are building.
      </h2>
      <p className="mt-3 text-sm leading-6 text-black/[0.42]">
        This is a private request form for founders who want strategic support, direction, and a more defined path forward.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input required name="name" maxLength={120} className="advisory-input" />
        </Field>
        <Field label="Email">
          <input required type="email" name="email" maxLength={254} className="advisory-input" />
        </Field>
        <Field label="Phone">
          <input name="phone" maxLength={40} className="advisory-input" />
        </Field>
        <Field label="Business name">
          <input required name="businessName" maxLength={160} className="advisory-input" />
        </Field>
        <Field label="Website or social link">
          <input name="website" maxLength={300} placeholder="Optional" className="advisory-input" />
        </Field>
        <Field label="Industry">
          <input required name="industry" maxLength={120} className="advisory-input" />
        </Field>
        <Field label="Business stage">
          <select required name="businessStage" defaultValue="" className="advisory-input">
            <option value="" disabled>Choose one</option>
            <option>Idea or pre-launch</option>
            <option>Recently launched</option>
            <option>Growing with early revenue</option>
            <option>Established and ready to scale</option>
            <option>Repositioning or planning a transition</option>
          </select>
        </Field>
        <Field label="Current team size">
          <select name="teamSize" defaultValue="Solo founder" className="advisory-input">
            <option>Solo founder</option>
            <option>2–5 people</option>
            <option>6–15 people</option>
            <option>16–50 people</option>
            <option>50+ people</option>
          </select>
        </Field>
        <Field label="Annual revenue range">
          <select name="revenueRange" defaultValue="Pre-revenue" className="advisory-input">
            <option>Pre-revenue</option>
            <option>Under $50,000</option>
            <option>$50,000–$250,000</option>
            <option>$250,000–$1 million</option>
            <option>$1 million–$5 million</option>
            <option>$5 million+</option>
            <option>Prefer not to say</option>
          </select>
        </Field>
      </div>

      <div className="mt-4 space-y-4">
        <Field label="What is the biggest challenge in the business right now?">
          <textarea required name="primaryChallenge" rows={4} maxLength={2500} className="advisory-input resize-none" />
        </Field>
        <Field label="What outcome do you want from working with Susan?">
          <textarea required name="desiredOutcome" rows={4} maxLength={2500} className="advisory-input resize-none" />
        </Field>
        <Field label="Why do you believe Susan is the right person to help?">
          <textarea name="whySusan" rows={3} maxLength={1800} className="advisory-input resize-none" />
        </Field>
      </div>

      <button
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#12141a] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#1b1f2a] disabled:opacity-60"
      >
        {loading ? <LoaderCircle size={17} className="animate-spin" /> : <>Request my strategy call <ArrowRight size={15} /></>}
      </button>
      {error && <p className="mt-4 text-center text-xs text-red-600">{error}</p>}
      <p className="mt-4 text-center text-[10px] leading-5 text-black/[0.32]">
        Your information is used only to review this request and manage the private advisory relationship.
      </p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-xs font-medium text-black/[0.52]">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  );
}
