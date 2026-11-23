import Link from "next/link";
import { WifiOff, ArrowRight } from "lucide-react";

export const metadata = { title: "Offline | Purity of Hearts", robots: { index: false, follow: false } };

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-[#112F42] px-6 py-16 text-white grid place-items-center">
      <section className="max-w-xl border border-white/15 bg-[#1B3C57] p-8 sm:p-12">
        <WifiOff className="text-[#CCB074]" size={34}/>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#CCB074]">Purity mobile app</p>
        <h1 className="mt-4 text-4xl font-medium tracking-tight">You're offline.</h1>
        <p className="mt-5 text-sm leading-8 text-white/65">Previously opened public pages and images can still be available. Member chat, billing, sign-in, and private dashboards require an internet connection.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 bg-[#CCB074] px-6 py-3.5 text-sm font-semibold text-[#1B3C57]">Try the home page <ArrowRight size={16}/></Link>
      </section>
    </main>
  );
}
