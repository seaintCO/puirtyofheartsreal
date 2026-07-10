import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8F2] px-6">
      <div className="w-full max-w-lg rounded-[2rem] border border-[#1F1F1F]/5 bg-white p-10 text-center shadow-xl">
        <CheckCircle2 className="mx-auto text-[#C9A75D]" size={52} />

        <h1 className="mt-6 text-4xl font-semibold tracking-tight">
          Payment successful.
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#1F1F1F]/60">
          Your course access is being activated. This normally takes only a
          few seconds.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-full bg-[#1F1F1F] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#C9A75D]"
        >
          Enter Student Dashboard
        </Link>
      </div>
    </main>
  );
}