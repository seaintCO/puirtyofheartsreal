import { requirePaidUser } from "@/lib/auth/require-paid-user";
import SettingsForm from "@/components/dashboard/SettingsForm";

export default async function SettingsPage() {
  const { user, profile } = await requirePaidUser();

  return (
    <section className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
        Account settings
      </p>
      <h1 className="mt-4 font-serif text-4xl tracking-tight sm:text-6xl">
        Your account.
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/40">
        Keep your member name and login secure.
      </p>
      <SettingsForm
        initialName={profile.full_name || ""}
        email={user.email || profile.email || ""}
      />
    </section>
  );
}

