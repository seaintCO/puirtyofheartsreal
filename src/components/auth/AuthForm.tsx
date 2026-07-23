"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ArrowRight, LoaderCircle } from "lucide-react";

export default function AuthForm({ next = "/dashboard" }: { next?: string }) {
  const router = useRouter();
  const supabase = createClient();

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
          email,
          password,
          options: {
            emailRedirectTo: `${siteUrl}/auth/callback?next=${encodeURIComponent(next)}`,
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          throw error;
        }

        setMessage(
          "Account created. Check your email to verify your account, then log in.",
        );
        setMode("login");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push(next);
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Authentication failed.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-[#1F1F1F]/5 bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Member Access
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          {mode === "login" ? "Welcome back." : "Create your account."}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#1F1F1F]/55">
          {mode === "login"
            ? "Access your courses, coaching resources, notes, and community."
            : "Create the account that will receive course access after payment."}
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-full bg-[#F8F3EB] p-1">
        <button
          type="button"
          onClick={() => {
            setMode("login");
            setMessage("");
          }}
          className={`rounded-full px-4 py-3 text-sm font-medium transition ${
            mode === "login"
              ? "bg-[#1F1F1F] text-white"
              : "text-[#1F1F1F]/55"
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
              ? "bg-[#1F1F1F] text-white"
              : "text-[#1F1F1F]/55"
          }`}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Full name"
            className="w-full rounded-2xl border border-[#1F1F1F]/10 bg-[#FFF8F2] px-5 py-4 text-sm outline-none transition focus:border-[#C9A75D]"
          />
        )}

        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="w-full rounded-2xl border border-[#1F1F1F]/10 bg-[#FFF8F2] px-5 py-4 text-sm outline-none transition focus:border-[#C9A75D]"
        />

        <input
          required
          minLength={8}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="w-full rounded-2xl border border-[#1F1F1F]/10 bg-[#FFF8F2] px-5 py-4 text-sm outline-none transition focus:border-[#C9A75D]"
        />

        <button
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#C9A75D] disabled:cursor-not-allowed disabled:opacity-60"
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
        <div className="mt-5 rounded-2xl bg-[#F8F3EB] p-4 text-sm leading-relaxed text-[#1F1F1F]/70">
          {message}
        </div>
      )}
    </div>
  );
}
