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
        <p className="mt-6 text-[#1F1F1F]/60">Last updated: July 23, 2026</p>

        <div className="mt-10 space-y-9 text-sm leading-7 text-[#1F1F1F]/70">
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Platform use</h2>
            <p className="mt-2">By using Purity of Hearts, you agree to these terms and referenced policies. Purity of Hearts provides faith-based education, coaching, community access, digital resources, consultation requests, PurityOS, and related services. You must use the platform lawfully and respectfully.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">PurityOS limitations</h2>
            <p className="mt-2">PurityOS is an AI-generated reflection and business-support tool. It may be incomplete, inaccurate, or inappropriate for your situation. It is not a therapist, doctor, pastor, lawyer, financial adviser, emergency service, or substitute for qualified professional care. Do not rely on it for diagnosis, crisis intervention, legal rights, financial decisions, or guaranteed business outcomes. If you may be in immediate danger, contact local emergency support and a trusted person who can assist you in person.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Membership and billing</h2>
            <p className="mt-2">PurityOS renews monthly until canceled. Members may manage cancellation through the Stripe billing portal. Cancellation generally applies at the end of the paid billing period unless law requires otherwise. Course access is sold separately and is not included with a PurityOS-only membership.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Community and content</h2>
            <p className="mt-2">Harassment, abuse, spam, illegal activity, account sharing, or misuse may result in suspension or removal. Courses, videos, downloads, coaching materials, and platform content may not be copied, resold, redistributed, scraped, or used to create competing products without written permission.</p>
          </section>
          <p>Purity of Hearts may update features, pricing, content, and policies over time. Qualified counsel should review these terms and add the final business entity, governing law, dispute terms, contact information, and any jurisdiction-specific consumer disclosures before live launch.</p>
        </div>
      </section>
    </main>
  );
}
