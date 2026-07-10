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
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to begin checkout.");
      }

      window.location.href = result.url;
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Checkout failed.",
      );
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={beginCheckout}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-8 py-4 text-sm font-medium text-white shadow-xl transition hover:-translate-y-1 hover:bg-[#b59550] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle className="animate-spin" size={18} />
        ) : (
          <>
            Enroll and Get Access
            <ArrowRight size={17} />
          </>
        )}
      </button>

      {error && (
        <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}