import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] px-6 py-24">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-sm">
        <ArrowLeft size={15} /> Back to Home
      </Link>

      <section className="mx-auto mt-16 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">Legal</span>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-6 text-[#1F1F1F]/60">Last updated: 2026</p>

        <div className="mt-10 space-y-8 text-[#1F1F1F]/70">
          <p>Purity of Hearts collects information needed to provide coaching, courses, community access, shop orders, account support, and platform communication.</p>
          <p>Information may include your name, email, payment details, course progress, community activity, order history, booking information, and messages you choose to submit.</p>
          <p>Payment processing may be handled by third-party providers such as Stripe. Purity of Hearts does not store full card numbers on its servers.</p>
          <p>We may use your information to deliver services, process orders, send updates, improve the platform, prevent abuse, and comply with legal obligations.</p>
          <p>We do not sell personal information. Limited data may be shared with trusted service providers necessary to operate the platform.</p>
          <p>Coaching and faith-based content is not medical, legal, financial, or mental health advice.</p>
          <p>For privacy requests, contact Purity of Hearts through the contact page.</p>
        </div>
      </section>
    </main>
  );
}
