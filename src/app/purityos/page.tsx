import Link from "next/link";
import {
  ArrowRight,
  BookHeart,
  BriefcaseBusiness,
  Check,
  HeartHandshake,
  LockKeyhole,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PurityWaitlistForm from "@/components/purityos/PurityWaitlistForm";

export const metadata = {
  title: "PurityOS",
  description:
    "PurityOS is Susan Wagner's private, faith-centered companion for business decisions, leadership, personal growth, and difficult seasons. Mobile app coming soon.",
};

export default function PurityOSPage() {
  return (
    <main className="night-shell">
      <Navbar dark />

      <section className="relative px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="glow-orb left-[-12rem] top-[-10rem] h-[38rem] w-[38rem] bg-[#ff5cad]/[0.25]" />
        <div className="glow-orb right-[-10rem] top-[-8rem] h-[38rem] w-[38rem] bg-[#8f73ff]/[0.28]" />

        <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#ff9ace]">Purity Of Hearts</p>
              <span className="rounded-full border border-white/[0.10] bg-white/[0.055] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.42] backdrop-blur-xl">
                Mobile app coming soon
              </span>
            </div>
            <h1 className="night-gradient-text mt-7 max-w-3xl pb-[0.1em] text-[clamp(2.6rem,5.1vw,4.55rem)] font-semibold leading-[0.96] tracking-[-0.065em]">
              Clarity in your pocket.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-white/[0.45] sm:text-xl sm:leading-8">
              A private, faith-centered companion shaped around Susan Wagner&apos;s
              approach to business, leadership, purpose, and the next honest step.
            </p>

            <div className="mt-10 max-w-xl">
              <PurityWaitlistForm dark />
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/[0.25]">
                <span>Private conversations</span>
                <span>Mobile-first</span>
                <span>Early access</span>
              </div>
            </div>

            <Link href="/purityos/chat" className="mt-8 inline-flex items-center gap-2 text-xs font-semibold text-white/[0.45] transition hover:text-white">
              Existing member? Open PurityOS <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative mx-auto h-[43rem] w-full max-w-[31rem]">
            <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />
            <div className="absolute left-1/2 top-1/2 h-[27rem] w-[27rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" />

            <div className="float-soft absolute left-1/2 top-1/2 h-[39rem] w-[19.2rem] -translate-x-1/2 -translate-y-1/2 -rotate-[4deg] rounded-[4rem] border-[7px] border-[#2a2632] bg-black p-2 shadow-[0_60px_150px_rgba(0,0,0,.8)]">
              <div className="relative h-full overflow-hidden rounded-[3.15rem] bg-gradient-to-b from-[#251a32] via-[#120d1b] to-[#07070b] p-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_4%,rgba(255,93,174,.22),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(143,115,255,.22),transparent_34%)]" />
                <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
                <div className="relative mt-8 flex items-center justify-between text-[10px] text-white/[0.38]">
                  <span>8:42</span><span>PurityOS</span><span>•••</span>
                </div>
                <div className="relative mt-10">
                  <p className="text-xs text-white/[0.30]">Thursday reflection</p>
                  <h2 className="mt-2 text-2xl font-semibold leading-[0.98] tracking-[-0.045em]">Good morning, Susan.</h2>
                  <p className="mt-3 text-xs leading-5 text-white/[0.36]">What deserves your attention today?</p>
                </div>
                <div className="relative mt-8 space-y-3">
                  <div className="ml-10 rounded-[1.4rem] rounded-tr-md bg-white px-4 py-3 text-[11px] leading-5 text-black shadow-lg">
                    I feel pulled in too many directions. Help me choose what matters.
                  </div>
                  <div className="mr-6 rounded-[1.4rem] border border-white/[0.10] bg-white/[0.07] px-4 py-3 text-[11px] leading-5 text-white/[0.58] backdrop-blur-xl">
                    Let&apos;s name the one outcome that would create the most peace and progress by Friday.
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.4rem] border border-white/[0.10] bg-white/[0.06] px-4 py-4 text-[10px] text-white/[0.24] backdrop-blur-xl">
                  Ask about business, faith, leadership, or today…
                </div>
              </div>
            </div>

            <div className="liquid-card-dark absolute bottom-12 left-0 rounded-2xl p-4">
              <LockKeyhole size={15} className="text-[#ff9ace]" />
              <p className="mt-3 text-xs font-semibold">Private by design</p>
              <p className="mt-1 text-[10px] text-white/[0.30]">Your conversations. Your account.</p>
            </div>
            <div className="liquid-card-dark absolute right-0 top-20 rounded-2xl p-4">
              <Sparkles size={15} className="text-[#b7a5ff]" />
              <p className="mt-3 text-xs font-semibold">Built for clarity</p>
              <p className="mt-1 text-[10px] text-white/[0.30]">Less noise. Better next steps.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.02] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff9ace]">One private place</p>
            <h2 className="mt-6 text-[clamp(2.15rem,4.7vw,4rem)] font-semibold leading-[0.91] tracking-[-0.065em]">
              For the decisions people do not always see.
            </h2>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [BriefcaseBusiness, "Business decisions", "Think through priorities, offers, direction, and the next move without adding more noise."],
              [HeartHandshake, "Leadership & confidence", "Process responsibility, difficult conversations, uncertainty, and the weight of leading."],
              [BookHeart, "Faith-centered reflection", "Return to biblical principles, honest reflection, and grounded encouragement."],
              [MessageCircle, "Difficult seasons", "Create practical next steps when you feel overwhelmed, stuck, or unsure."],
              [Sparkles, "Daily clarity", "Use short conversations to organize your thinking and protect your focus."],
              [LockKeyhole, "Saved privately", "Reopen, continue, or permanently delete conversations from your account."],
            ].map(([Icon, title, copy]) => {
              const ItemIcon = Icon as typeof BriefcaseBusiness;
              return (
                <article key={title as string} className="liquid-card-dark rounded-[1.8rem] p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#ff6ab6]/[0.15] to-[#9479ff]/[0.15] text-[#ff9ace]">
                    <ItemIcon size={18} />
                  </span>
                  <h3 className="mt-9 text-xl font-semibold tracking-[-0.035em]">{title as string}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/[0.36]">{copy as string}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ff9ace]">The promise</p>
            <h2 className="mt-6 text-[clamp(2.1rem,4.5vw,3.8rem)] font-semibold leading-[0.93] tracking-[-0.065em]">Not louder. Clearer.</h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/[0.40]">
              PurityOS does not replace therapy, medical care, legal advice,
              financial advice, pastoral care, or emergency support. It helps
              you reflect, organize your thinking, and choose a grounded next step.
            </p>
          </div>

          <div className="liquid-card-dark rounded-[2.1rem] p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff9ace]">Early access</p>
            <h3 className="mt-5 text-3xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-4xl">Be first when the app opens.</h3>
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/[0.38]">
              Join the list for launch updates and the first mobile preview.
            </p>
            <div className="mt-8 max-w-xl"><PurityWaitlistForm dark /></div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {["Private account", "Saved conversations", "Mobile-first"].map((item) => (
                <div key={item} className="liquid-subcard-dark flex items-center gap-2 rounded-2xl px-4 py-3 text-xs text-white/[0.40]">
                  <Check size={13} className="text-[#ff9ace]" /> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer dark />
    </main>
  );
}
