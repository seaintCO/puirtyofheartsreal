"use client";

import { FormEvent, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

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
      <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[2rem] border border-[#c9a75d]/20 bg-white/65 p-10 text-center shadow-2xl backdrop-blur-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a75d] text-white">
          <Check size={24} />
        </div>
        <h2 className="mt-6 font-serif text-3xl">Your request is in.</h2>
        <p className="mt-4 max-w-sm text-sm leading-6 text-[#1f1f1f]/55">
          Susan’s team will review your preferred time and contact you by email
          to confirm the consultation.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[2rem] border border-white/70 bg-white/65 p-6 shadow-2xl backdrop-blur-2xl sm:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a88643]">
        Consultation request
      </p>
      <h2 className="mt-4 font-serif text-3xl">Find a time that works.</h2>
      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#1f1f1f]/60">
          Full name
          <input
            required
            name="name"
            maxLength={120}
            className="mt-2 w-full rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
          />
        </label>
        <label className="text-xs font-medium text-[#1f1f1f]/60">
          Email
          <input
            required
            type="email"
            name="email"
            className="mt-2 w-full rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
          />
        </label>
        <label className="text-xs font-medium text-[#1f1f1f]/60">
          Phone (optional)
          <input
            name="phone"
            maxLength={40}
            className="mt-2 w-full rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
          />
        </label>
        <label className="text-xs font-medium text-[#1f1f1f]/60">
          What do you want help with?
          <select
            required
            name="topic"
            defaultValue=""
            className="mt-2 w-full rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
          >
            <option value="" disabled>
              Choose a topic
            </option>
            <option>Business strategy</option>
            <option>Leadership and confidence</option>
            <option>Faith and personal growth</option>
            <option>Life transition</option>
            <option>Program or course guidance</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-xs font-medium text-[#1f1f1f]/60">
          Preferred date
          <input
            type="date"
            name="preferredDate"
            min={new Date().toISOString().slice(0, 10)}
            className="mt-2 w-full rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
          />
        </label>
        <label className="text-xs font-medium text-[#1f1f1f]/60">
          Preferred time
          <select
            name="preferredTime"
            className="mt-2 w-full rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
          >
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>
        </label>
      </div>
      <label className="mt-4 block text-xs font-medium text-[#1f1f1f]/60">
        Anything Susan should know?
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          className="mt-2 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-white/75 px-4 py-3.5 text-sm text-[#1f1f1f] outline-none transition focus:border-[#c9a75d]"
        />
      </label>
      <button
        disabled={loading}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#1f1f1f] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#b8954e] disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle size={18} className="animate-spin" />
        ) : (
          "Request my consultation"
        )}
      </button>
      {error && <p className="mt-4 text-center text-xs text-red-700">{error}</p>}
      <p className="mt-4 text-center text-[11px] leading-5 text-[#1f1f1f]/38">
        This request is not confirmed until Susan’s team contacts you.
      </p>
    </form>
  );
}

