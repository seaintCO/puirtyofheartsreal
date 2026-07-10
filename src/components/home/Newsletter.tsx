import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#F5E4E7] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Mail className="mx-auto mb-6 text-[#1F1F1F]/30" size={40} />
        <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[#1F1F1F] md:text-4xl">
          Stay encouraged every week.
        </h2>
        <p className="mb-10 text-lg text-[#1F1F1F]/70">
          Receive weekly devotionals, platform updates, and exclusive resources directly to your inbox.
        </p>

        <form className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Enter your email address" className="flex-1 rounded-full border border-white bg-white/80 px-6 py-3.5 text-sm text-[#1F1F1F] outline-none backdrop-blur-sm transition placeholder:text-[#1F1F1F]/40 focus:border-[#C9A75D] focus:ring-2 focus:ring-[#C9A75D]/20" required />
          <button type="submit" className="rounded-full bg-[#1F1F1F] px-8 py-3.5 text-sm font-medium text-white shadow-md transition hover:bg-[#333]">
            Join
          </button>
        </form>

        <p className="mt-4 text-xs text-[#1F1F1F]/50">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}
