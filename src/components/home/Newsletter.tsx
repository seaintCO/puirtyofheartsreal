"use client";

import { FormEvent, useState } from "react";
import { Check, LoaderCircle, Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await response.json()) as { error?: string };
    if (response.ok) setComplete(true);
    else setError(data.error || "Please try again.");
    setLoading(false);
  }

  return (
    <section className="relative overflow-hidden bg-[#e8d7d7] px-6 py-24">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/45 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/45 text-[#8d6d33] backdrop-blur-xl">
          <Mail size={21} />
        </div>
        <h2 className="mt-6 font-serif text-4xl tracking-tight text-[#1f1f1f] sm:text-5xl">
          A little encouragement for your week.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#1f1f1f]/55">
          Receive devotionals, member updates, and new Purity resources.
        </p>

        {complete ? (
          <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-2 rounded-full border border-white/70 bg-white/55 px-6 py-4 text-sm font-medium text-[#6f5528] backdrop-blur-xl">
            <Check size={17} />
            You’re subscribed.
          </div>
        ) : (
          <form
            onSubmit={subscribe}
            className="mx-auto mt-9 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-full border border-white/75 bg-white/60 px-6 py-4 text-sm text-[#1f1f1f] outline-none backdrop-blur-xl placeholder:text-[#1f1f1f]/35 focus:border-[#a88643]"
            />
            <button
              disabled={loading}
              className="flex items-center justify-center rounded-full bg-[#1f1f1f] px-8 py-4 text-sm font-medium text-white disabled:opacity-60"
            >
              {loading ? <LoaderCircle size={17} className="animate-spin" /> : "Join"}
            </button>
          </form>
        )}
        {error && <p className="mt-3 text-xs text-red-700">{error}</p>}
        <p className="mt-4 text-[11px] text-[#1f1f1f]/38">
          No spam. Unsubscribe from any email.
        </p>
      </div>
    </section>
  );
}
