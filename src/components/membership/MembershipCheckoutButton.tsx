"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function MembershipCheckoutButton({ label = "Start membership" }: { label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/membership/checkout", { method: "POST", cache: "no-store" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (response.status === 401) {
        window.location.href = "/login?next=/membership";
        return;
      }
      if (!response.ok || !data.url) throw new Error(data.error || "Checkout could not start.");
      // Only redirect to a server-generated Stripe hosted URL or a same-origin member URL.
      const destination = new URL(data.url, window.location.origin);
      if (destination.protocol !== "https:" && destination.origin !== window.location.origin) throw new Error("Unexpected checkout destination.");
      if (destination.origin !== window.location.origin && !destination.hostname.endsWith(".stripe.com")) throw new Error("Unexpected payment provider.");
      window.location.assign(destination.href);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Checkout is unavailable. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <button type="button" disabled={loading} onClick={start} className="flex w-full items-center justify-center gap-3 bg-[#CCB074] px-6 py-4 text-sm font-semibold text-[#1B3C57] transition hover:bg-[#DDC68F] disabled:cursor-wait disabled:opacity-60">
        {loading ? <LoaderCircle size={17} className="animate-spin"/> : <ArrowRight size={17}/>}
        {loading ? "Opening secure checkout…" : label}
      </button>
      {error && <p role="alert" className="mt-3 text-sm leading-6 text-red-200">{error}</p>}
    </div>
  );
}
