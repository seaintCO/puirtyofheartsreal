import Link from "next/link";
import { ArrowRight, BadgePercent, Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BookingSandbox from "@/components/booking/BookingSandbox";

export default function BookingSandboxPage() {
  return (
    <main className="min-h-screen bg-[#f5eee4]">
      <Navbar />
      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="absolute right-[-10%] top-[-20%] h-[700px] w-[700px] rounded-full bg-[#ff4fa3]/[0.20] blur-[150px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_480px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1f1f1f]/[0.08] bg-white/[0.50] px-4 py-2 text-xs text-[#8b6d33] backdrop-blur-xl">
                <BadgePercent size={14} />
                Purity Of Hearts
              </div>
              <h1 className="mt-7 max-w-4xl pb-[0.1em] text-[clamp(2.45rem,4.6vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-[#1f1f1f]">
                See how your own booking system could work.
              </h1>
            </div>
            <div>
              <p className="text-base leading-7 text-[#1f1f1f]/[0.55]">
                Purity of Hearts members can receive partner pricing on a
                branded booking experience from SEAINT Booking—complete with
                appointments, leads, reminders, payments, and an owner
                dashboard.
              </p>
              <Link
                href="/consultation"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#e83491]"
              >
                Ask about member pricing <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <BookingSandbox />
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Your logo, colors, and domain",
              "Stripe deposits or full payments",
              "Email and text confirmations",
              "Bilingual booking available",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.70] bg-white/[0.45] p-4 text-sm text-[#1f1f1f]/[0.58] backdrop-blur-xl"
              >
                <Check size={16} className="text-[#e83491]" />
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
