"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function beginCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", { method: "POST" });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to begin checkout.");
      }

      window.location.href = result.url;
    } catch (error) {
      setError(error instanceof Error ? error.message : "Checkout failed.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={beginCheckout}
        disabled={loading}
        className="liquid-button flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-8 py-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <>
            Enroll and get access
            <ArrowRight size={17} />
          </>
        )}
      </button>

      {error && (
        <p className="mt-4 rounded-2xl border border-red-400/[0.20] bg-red-400/[0.10] p-4 text-sm text-red-200">
          {error}
        </p>
      )}
    </div>
  );
}
