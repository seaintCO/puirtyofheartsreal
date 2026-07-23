import Link from "next/link";
import AuthForm from "@/components/auth/AuthForm";
import { ArrowLeft } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const requestedNext = (await searchParams).next;
  const next =
    requestedNext?.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/dashboard";
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFF8F2] px-6 py-24">
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A75D]/15 blur-[140px]" />

      <Link
        href="/"
        className="fixed left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-[#1F1F1F]/10 bg-white/80 px-5 py-2.5 text-sm font-medium shadow-sm backdrop-blur"
      >
        <ArrowLeft size={15} />
        Back Home
      </Link>

      <div className="relative z-10">
        <AuthForm next={next} />
      </div>
    </main>
  );
}
