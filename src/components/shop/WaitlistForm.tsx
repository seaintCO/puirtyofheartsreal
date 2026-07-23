"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";

export default function WaitlistForm({
  productSlug,
  compact = false,
}: {
  productSlug: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  async function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/shop/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, productSlug }),
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
      <div className="flex items-center gap-2 text-sm font-medium text-[#8b6d33]">
        <Check size={16} />
        You’re on the early-access list.
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={join}
        className={`flex ${
          compact ? "flex-col gap-2 sm:flex-row" : "flex-col gap-3 sm:flex-row"
        }`}
      >
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="min-w-0 flex-1 rounded-full border border-[#1f1f1f]/10 bg-white/85 px-5 py-3 text-sm text-[#1f1f1f] outline-none transition placeholder:text-[#1f1f1f]/35 focus:border-[#c9a75d]"
        />
        <button
          disabled={loading}
          className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1f1f1f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#a88643] disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <>
              Notify me <ArrowRight size={15} />
            </>
          )}
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

