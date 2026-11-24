"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function CourseCheckoutButton({ compact = false }: { compact?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/course/checkout", { method: "POST", cache: "no-store" });
      const data = (await response.json()) as { url?: string; error?: string };
      if (response.status === 401) {
        window.location.assign("/login?next=/course");
        return;
      }
      if (!response.ok || !data.url) throw new Error(data.error || "Unable to start checkout.");
      const destination = new URL(data.url, window.location.origin);
      if (destination.origin !== window.location.origin && !destination.hostname.endsWith(".stripe.com")) {
        throw new Error("Unexpected payment destination.");
      }
      window.location.assign(destination.href);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Checkout is unavailable.");
      setLoading(false);
    }
  }

  return (
    <div className={compact ? "course-buy-wrap compact" : "course-buy-wrap"}>
      <button type="button" onClick={buy} disabled={loading} className="course-buy-button">
        <span>{loading ? <LoaderCircle size={15} className="animate-spin"/> : <ArrowRight size={15}/>}</span>
        <span className="course-buy-window">
          <span>{loading ? "Opening checkout…" : "Buy the Course — $200"}</span>
          <span aria-hidden="true">{loading ? "Opening checkout…" : "Buy the Course — $200"}</span>
        </span>
      </button>
      {error && <p className="course-buy-error" role="alert">{error}</p>}
    </div>
  );
}
