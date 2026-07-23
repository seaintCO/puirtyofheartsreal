"use client";

import { FormEvent, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";

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
    <section className="bg-[#e8e0d1] px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b5e2c]">
          Stay close
        </p>
        <h2 className="mt-6 text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#111]">
          A little clarity for your week.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-[#1f1f1f]/55">
          Receive devotionals, member updates, and new Purity resources.
        </p>

        {complete ? (
          <div className="mx-auto mt-9 flex max-w-md items-center justify-center gap-2 rounded-full bg-white/70 px-6 py-4 text-sm font-medium text-[#6f5528]">
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
              className="min-w-0 flex-1 rounded-full border border-black/10 bg-white/75 px-6 py-4 text-sm text-[#1f1f1f] outline-none placeholder:text-[#1f1f1f]/35 focus:border-[#a88643]"
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
