"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

export default function PurityWaitlistForm({ dark = false }: { dark?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/purityos/waitlist", {
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
      <div
        className={`flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold ${
          dark
            ? "border-white/[0.12] bg-white/[0.07] text-white backdrop-blur-2xl"
            : "border-white/[0.80] bg-white/[0.60] text-black backdrop-blur-2xl"
        }`}
      >
        <Check size={16} /> You are on the early-access list.
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="w-full">
      <input
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div
        className={`flex flex-col gap-2 rounded-[1.35rem] border p-2 sm:flex-row sm:rounded-full ${
          dark
            ? "border-white/[0.12] bg-white/[0.055] backdrop-blur-2xl"
            : "border-white/[0.80] bg-white/[0.55] backdrop-blur-2xl"
        }`}
      >
        <input
          required
          type="email"
          name="email"
          placeholder="Email address"
          className={`min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-current/[0.32] ${
            dark ? "text-white" : "text-black"
          }`}
        />
        <button
          disabled={loading}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(243,47,145,.22)] transition hover:saturate-125 disabled:opacity-60"
        >
          {loading ? <LoaderCircle size={16} className="animate-spin" /> : <>Join early access <ArrowRight size={14} /></>}
        </button>
      </div>
      {error && <p className="mt-3 text-center text-xs text-red-500">{error}</p>}
    </form>
  );
}
