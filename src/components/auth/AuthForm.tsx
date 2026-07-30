"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { safeInternalPath } from "@/lib/security/redirects";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function AuthForm({ next = "/dashboard" }: { next?: string }) {
  const router = useRouter();
  const supabase = createClient();
  const safeNext = useMemo(() => safeInternalPath(next, "/dashboard"), [next]);

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const siteUrl =
          process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

        const { error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(safeNext)}`,
            data: {
              full_name: fullName.trim().slice(0, 120),
            },
          },
        });

        if (error) {
          setMessage(
            "We could not create the account. Check your details or try logging in.",
          );
          return;
        }

        setMessage(
          "Account request received. Check your email to verify your account, then log in.",
        );
        setMode("login");
        setPassword("");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (error) {
        setMessage("Unable to sign in. Check your email and password.");
        return;
      }

      router.replace(safeNext);
      router.refresh();
    } catch {
      setMessage("Authentication is temporarily unavailable. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="liquid-glass w-full rounded-[2.2rem] p-7 sm:p-8">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#e83491]">
          Member Access
        </span>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-black/[0.48]">
          {mode === "login"
            ? "Access your courses, coaching resources, notes, and community."
            : "Create the account that will receive course access after payment."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-full bg-white/[0.45] p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setMessage("");
          }}
          className={`rounded-full px-4 py-3 text-sm font-medium transition ${
            mode === "login"
              ? "bg-gradient-to-r from-[#f32f91] to-[#8b67ff] text-white shadow-[0_8px_26px_rgba(243,47,145,.18)]"
              : "text-black/[0.48]"
          }`}
        >
          Log In
        </button>

        <button
          type="button"
          onClick={() => {
            setMode("signup");
            setMessage("");
          }}
          className={`rounded-full px-4 py-3 text-sm font-medium transition ${
            mode === "signup"
              ? "bg-gradient-to-r from-[#f32f91] to-[#8b67ff] text-white shadow-[0_8px_26px_rgba(243,47,145,.18)]"
              : "text-black/[0.48]"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            required
            name="name"
            autoComplete="name"
            maxLength={120}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Full name"
            className="w-full rounded-2xl border border-[#1F1F1F]/[0.10] bg-white/[0.55] px-5 py-4 text-sm outline-none transition focus:border-[#ff4fa3]/[0.60] focus:bg-white/[0.80] focus:ring-4 focus:ring-[#ff4fa3]/[0.08]"
          />
        )}

        <input
          required
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          maxLength={254}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="w-full rounded-2xl border border-[#1F1F1F]/[0.10] bg-white/[0.55] px-5 py-4 text-sm outline-none transition focus:border-[#ff4fa3]/[0.60] focus:bg-white/[0.80] focus:ring-4 focus:ring-[#ff4fa3]/[0.08]"
        />

        <input
          required
          name="password"
          minLength={8}
          maxLength={128}
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-full rounded-2xl border border-[#1F1F1F]/[0.10] bg-white/[0.55] px-5 py-4 text-sm outline-none transition focus:border-[#ff4fa3]/[0.60] focus:bg-white/[0.80] focus:ring-4 focus:ring-[#ff4fa3]/[0.08]"
        />

        <button
          disabled={loading}
          className="liquid-button flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f32f91] to-[#8b67ff] px-6 py-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={17} />
          ) : (
            <>
              {mode === "login" ? "Log In" : "Create Account"}
              <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>

      {message && (
        <div
          aria-live="polite"
          className="mt-5 rounded-2xl bg-white/[0.45] p-4 text-sm leading-relaxed text-black/[0.62]"
        >
          {message}
        </div>
      )}
    </div>
  );
}
