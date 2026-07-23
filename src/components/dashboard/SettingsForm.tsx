"use client";

import { FormEvent, useState } from "react";
import { Check, LoaderCircle, Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsForm({
  initialName,
  email,
}: {
  initialName: string;
  email: string;
}) {
  const supabase = createClient();
  const [fullName, setFullName] = useState(initialName);
  const [password, setPassword] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingProfile(true);
    setProfileMessage("");
    const { error } = await supabase.rpc("update_my_profile", {
      new_full_name: fullName,
    });
    setProfileMessage(error ? "Your name could not be saved." : "Profile saved.");
    setLoadingProfile(false);
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoadingPassword(true);
    setPasswordMessage("");
    const { error } = await supabase.auth.updateUser({ password });
    setPasswordMessage(
      error ? error.message : "Password updated. Use it next time you log in.",
    );
    if (!error) setPassword("");
    setLoadingPassword(false);
  }

  return (
    <div className="mt-9 grid gap-5 xl:grid-cols-2">
      <form
        onSubmit={saveProfile}
        className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8b665]">
          Profile
        </p>
        <h2 className="mt-4 text-2xl font-medium">Your member details</h2>
        <label className="mt-7 block text-xs text-white/40">
          Full name
          <input
            required
            maxLength={120}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm text-white outline-none focus:border-[#d8b665]/50"
          />
        </label>
        <label className="mt-4 block text-xs text-white/40">
          Email
          <input
            disabled
            value={email}
            className="mt-2 w-full rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-4 text-sm text-white/35 outline-none"
          />
        </label>
        <button
          disabled={loadingProfile}
          className="mt-6 flex items-center gap-2 rounded-full bg-[#d8b665] px-6 py-3 text-sm font-semibold text-[#17130c] disabled:opacity-60"
        >
          {loadingProfile ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Save profile
        </button>
        {profileMessage && (
          <p className="mt-4 flex items-center gap-2 text-xs text-white/45">
            <Check size={14} className="text-[#d8b665]" />
            {profileMessage}
          </p>
        )}
      </form>

      <form
        onSubmit={updatePassword}
        className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d8b665]">
          Security
        </p>
        <h2 className="mt-4 text-2xl font-medium">Change your password</h2>
        <p className="mt-3 text-sm leading-6 text-white/35">
          Choose a unique password with at least eight characters.
        </p>
        <label className="mt-7 block text-xs text-white/40">
          New password
          <input
            required
            type="password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm text-white outline-none focus:border-[#d8b665]/50"
          />
        </label>
        <button
          disabled={loadingPassword}
          className="mt-6 flex items-center gap-2 rounded-full border border-[#d8b665]/30 bg-[#d8b665]/10 px-6 py-3 text-sm text-[#e7ca82] disabled:opacity-60"
        >
          {loadingPassword && <LoaderCircle size={16} className="animate-spin" />}
          Update password
        </button>
        {passwordMessage && (
          <p className="mt-4 text-xs leading-5 text-white/45">{passwordMessage}</p>
        )}
      </form>
    </div>
  );
}

