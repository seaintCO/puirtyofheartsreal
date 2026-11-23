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
      <button type="button" disabled={loading} onClick={start} className="aura-shift-button aura-shift-primary aura-shift-checkout">
        <span className="aura-shift-icon">{loading ? <LoaderCircle size={17} className="animate-spin"/> : <ArrowRight size={17}/>}</span>
        <span className="aura-shift-window" aria-label={loading ? "Opening secure checkout" : label}>
          <span className="aura-shift-label">{loading ? "Opening secure checkout…" : label}</span>
          <span className="aura-shift-label aura-shift-label-clone" aria-hidden="true">{loading ? "Opening secure checkout…" : label}</span>
        </span>
      </button>
      {error && <p role="alert" className="mt-3 text-sm leading-6 text-red-200">{error}</p>}
    </div>
  );
}
