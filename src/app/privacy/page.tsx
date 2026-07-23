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
        <p className="mt-6 text-[#1F1F1F]/60">Last updated: July 23, 2026</p>

        <div className="mt-10 space-y-9 text-sm leading-7 text-[#1F1F1F]/70">
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Information we collect</h2>
            <p className="mt-2">Purity of Hearts collects information needed to provide accounts, courses, community access, consultations, product waitlists, newsletters, account support, and platform communication. This may include your name, email, phone number, course progress, journal and lesson notes, quiz activity, booking preferences, and messages you choose to submit.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">PurityOS conversations</h2>
            <p className="mt-2">PurityOS saves the conversations you create so you can return to them. Message content is sent to an AI service provider to generate a response and may be checked by automated safety systems. Do not submit information you are not comfortable processing through those services. PurityOS is not an emergency, medical, therapy, legal, or financial service.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Payments and service providers</h2>
            <p className="mt-2">Payments are handled by Stripe. Purity of Hearts does not store full card numbers on its servers. Limited information may be shared with infrastructure, database, payment, communications, and AI providers only as needed to operate the platform, prevent abuse, and comply with legal obligations.</p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-[#1f1f1f]">Your choices</h2>
            <p className="mt-2">You may delete individual PurityOS conversations from your account, manage recurring billing through the billing portal, and unsubscribe from marketing emails through the link included in an email. Additional access, correction, or deletion requests may be submitted to Purity of Hearts.</p>
          </section>
          <p>Purity of Hearts does not sell personal information. This page should be reviewed by qualified counsel and updated with the business’s final contact information, state-specific notices, retention periods, and actual vendor terms before live launch.</p>
        </div>
      </section>
    </main>
  );
}
