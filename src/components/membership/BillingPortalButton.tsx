"use client";

import { useState } from "react";
import { CreditCard, LoaderCircle } from "lucide-react";

export default function BillingPortalButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function manage() {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/membership/portal", { method: "POST", cache: "no-store" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) throw new Error(data.error || "Billing could not be opened.");
      const destination = new URL(data.url);
      if (destination.protocol !== "https:" || !destination.hostname.endsWith(".stripe.com")) throw new Error("Unexpected billing destination.");
      window.location.assign(destination.href);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Please try again.");
      setLoading(false);
    }
  }
  return (
    <div>
      <button type="button" onClick={manage} disabled={loading} className="inline-flex items-center gap-2 bg-[#CCB074] px-6 py-3.5 text-sm font-semibold text-[#1B3C57] transition hover:bg-[#E0CD9F] disabled:opacity-60">
        {loading ? <LoaderCircle size={16} className="animate-spin"/> : <CreditCard size={16}/>}
        Manage billing in Stripe
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
    </div>
  );
}
