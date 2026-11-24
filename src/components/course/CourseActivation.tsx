"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle } from "lucide-react";

export default function CourseActivation({ sessionId }: { sessionId: string }) {
  const [state, setState] = useState<"loading"|"ready"|"error">("loading");
  const [message, setMessage] = useState("Verifying your payment and opening your 12-month access…");

  useEffect(() => {
    let cancelled = false;
    async function activate() {
      try {
        const response = await fetch("/api/course/activate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });
        const data = (await response.json()) as { activated?: boolean; error?: string };
        if (!response.ok || !data.activated) throw new Error(data.error || "Activation failed.");
        if (!cancelled) {
          setState("ready");
          setMessage("Your payment is verified. Your educational platform access is active for 12 months.");
        }
      } catch (error) {
        if (!cancelled) {
          setState("error");
          setMessage(error instanceof Error ? error.message : "We could not activate access automatically.");
        }
      }
    }
    activate();
    return () => { cancelled = true; };
  }, [sessionId]);

  return (
    <div className="course-success-card">
      {state === "loading" ? <LoaderCircle className="animate-spin" size={44}/> : <CheckCircle2 size={44}/>}
      <h1>{state === "ready" ? "You're in." : state === "error" ? "We received your return from Stripe." : "Activating your course…"}</h1>
      <p>{message}</p>
      {state === "ready" && <Link href="/dashboard/courses" className="course-success-action">Enter the Educational Platform</Link>}
      {state === "error" && <Link href="/consultation" className="course-success-action secondary">Contact Susan</Link>}
    </div>
  );
}
