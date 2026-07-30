"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-white/[0.80] bg-white/[0.55] px-4 py-3.5 text-sm text-[#15151b] shadow-[inset_0_1px_0_rgba(255,255,255,.85)] outline-none backdrop-blur-xl transition placeholder:text-black/[0.28] focus:border-[#ff4fa3]/[0.60] focus:bg-white/[0.80] focus:ring-4 focus:ring-[#ff4fa3]/[0.08]";

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/consultations", {
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
      <div className="liquid-glass flex min-h-[38rem] flex-col items-center justify-center rounded-[2.3rem] p-8 text-center sm:p-12">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#f32f91] to-[#8b67ff] text-white shadow-[0_18px_45px_rgba(243,47,145,.28)]">
          <Check size={24} />
        </div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#e83491]">
          Request received
        </p>
        <h2 className="mt-4 max-w-md text-3xl font-semibold leading-[0.98] tracking-[-0.055em]">
          Susan’s team will review your goals and preferred time.
        </h2>
        <p className="mt-5 max-w-md text-sm leading-7 text-black/[0.44]">
          You will be contacted by email with the next step and scheduling details.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="liquid-glass rounded-[2.3rem] p-6 sm:p-9">
      <input name="companyWebsiteField" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e83491]">
        Growth strategy call
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-[-0.045em] sm:text-3xl">
        Tell Susan where the business is now.
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-6 text-black/[0.42]">
        Share enough context for Susan’s team to understand the business and prepare for a useful conversation.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-black/[0.54]">
          Full name
          <input required name="name" maxLength={120} className={fieldClass} />
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Email
          <input required type="email" name="email" className={fieldClass} />
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Phone (optional)
          <input name="phone" maxLength={40} className={fieldClass} />
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Business or brand name
          <input required name="businessName" maxLength={160} className={fieldClass} />
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Business stage
          <select required name="businessStage" defaultValue="" className={fieldClass}>
            <option value="" disabled>Choose a stage</option>
            <option>Idea or pre-launch</option>
            <option>Recently launched</option>
            <option>Growing with early revenue</option>
            <option>Established and ready to scale</option>
            <option>Repositioning or planning the next chapter</option>
          </select>
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Main focus
          <select required name="topic" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Choose a focus
            </option>
            <option>Business vision and positioning</option>
            <option>Growth strategy</option>
            <option>Offer and business model</option>
            <option>Leadership and decision-making</option>
            <option>Systems, team, and execution</option>
            <option>Exit, succession, or legacy planning</option>
            <option>General private consultation</option>
          </select>
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Preferred date
          <input type="date" name="preferredDate" min={minDate} className={fieldClass} />
        </label>
        <label className="text-xs font-medium text-black/[0.54]">
          Preferred time
          <select name="preferredTime" className={fieldClass}>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
      </div>

      <label className="mt-4 block text-xs font-medium text-black/[0.54]">
        What is the business, and what do you want help solving?
        <textarea
          required
          name="message"
          rows={5}
          minLength={20}
          maxLength={2000}
          placeholder="Business stage, current challenge, desired outcome, and anything Susan should know."
          className={`${fieldClass} resize-none`}
        />
      </label>

      <button
        disabled={loading}
        className="liquid-button mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-6 py-4 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          <>
            Request my strategy call <ArrowUpRight size={16} />
          </>
        )}
      </button>
      {error && <p className="mt-4 text-center text-xs text-red-600">{error}</p>}
      <p className="mt-4 text-center text-[11px] leading-5 text-black/[0.34]">
        Your request is confirmed only after Susan’s team contacts you.
      </p>
    </form>
  );
}
