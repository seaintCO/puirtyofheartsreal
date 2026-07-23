"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function PurityCheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function subscribe() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/purityos/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; error?: string };

      if (response.status === 401) {
        window.location.href = "/login?next=/purityos";
        return;
      }
      if (!response.ok || !data.url) {
        throw new Error(data.error || "Checkout could not start.");
      }

      window.location.href = data.url;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Please try again.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={subscribe}
        disabled={loading}
        className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#d8b665] px-7 py-4 text-sm font-semibold text-[#16130d] transition hover:-translate-y-0.5 hover:bg-[#efd386] disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <>
            Start PurityOS for $50/month
            <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </>
        )}
      </button>
      {error && <p className="mt-3 text-center text-xs text-red-200">{error}</p>}
    </div>
  );
}

