import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] px-6 py-24">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-sm">
        <ArrowLeft size={15} /> Back to Home
      </Link>

      <section className="mx-auto mt-16 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">Legal</span>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Terms of Service</h1>
        <p className="mt-6 text-[#1F1F1F]/60">Last updated: 2026</p>

        <div className="mt-10 space-y-8 text-[#1F1F1F]/70">
          <p>By using Purity of Hearts, you agree to these terms and any policies referenced on the platform.</p>
          <p>Purity of Hearts provides faith-based coaching, courses, devotionals, community access, digital resources, physical products, and related services.</p>
          <p>All content is for educational, spiritual, and personal growth purposes. It is not medical, legal, financial, therapy, or emergency advice.</p>
          <p>Users are responsible for respectful conduct inside the community. Harassment, abuse, spam, illegal activity, or misuse may result in removal without refund.</p>
          <p>Courses, videos, downloads, coaching materials, and platform content may not be copied, resold, redistributed, or used to create competing products without written permission.</p>
          <p>Purchases, memberships, coaching sessions, and digital access may have separate pricing, renewal, cancellation, and refund terms.</p>
          <p>Purity of Hearts may update platform features, pricing, content, and policies over time.</p>
        </div>
      </section>
    </main>
  );
}
