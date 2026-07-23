import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F2] px-6 py-24">
      <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-sm">
        <ArrowLeft size={15} /> Back to Home
      </Link>

      <section className="mx-auto mt-16 max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">Legal</span>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Return Policy</h1>
        <p className="mt-6 text-[#1F1F1F]/60">Last updated: July 23, 2026</p>

        <div className="mt-10 space-y-8 text-[#1F1F1F]/70">
          <p>Physical products may be eligible for return if they are unused, undamaged, and returned within the stated return window.</p>
          <p>Digital products, downloadable resources, courses, community memberships, and completed coaching sessions are generally non-refundable once access has been granted, unless required by law or approved case by case.</p>
          <p>PurityOS is a recurring monthly membership. It can be canceled through the billing portal to stop future renewals. Partial billing periods are generally not prorated unless required by law.</p>
          <p>Damaged or incorrect items should be reported as soon as possible with order details and photos so the issue can be reviewed.</p>
          <p>Shipping costs, processing fees, and third-party payment fees may be non-refundable unless otherwise required.</p>
          <p>For return requests, contact Purity of Hearts through the contact page with your order number and reason for the request.</p>
        </div>
      </section>
    </main>
  );
}
