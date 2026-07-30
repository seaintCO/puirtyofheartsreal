import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";
import { ArrowLeft } from "lucide-react";
import { safeInternalPath } from "@/lib/security/redirects";

export const metadata = {
  title: "Member Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const next = safeInternalPath((await searchParams).next, "/dashboard");

  return (
    <main className="liquid-page relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 sm:px-8">
      <div className="liquid-grid pointer-events-none absolute inset-0 opacity-45" />
      <div className="liquid-orb left-[-10rem] top-[-10rem] h-[34rem] w-[34rem] bg-[#ff9dcc]/[0.30]" />
      <div className="liquid-orb bottom-[-12rem] right-[-9rem] h-[36rem] w-[36rem] bg-[#78a8ff]/[0.26]" />

      <Link
        href="/"
        className="liquid-glass-soft fixed left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-black/[0.65] sm:left-7 sm:top-7"
      >
        <ArrowLeft size={15} />
        Back home
      </Link>

      <div className="relative z-10 w-full max-w-md">
        <AuthForm next={next} />
      </div>
    </main>
  );
}
