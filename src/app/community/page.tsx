import Link from "next/link";
import {
  ArrowRight,
  BookHeart,
  MessageCircle,
  Mic2,
  ShieldCheck,
  Users,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { DISCORD_URL } from "@/lib/purityos";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#11100e] text-white">
      <Navbar dark />
      <section className="relative overflow-hidden px-6 pb-20 pt-16 sm:pb-24 sm:pt-20">
        <div className="absolute right-[-10%] top-[-20%] h-[760px] w-[760px] rounded-full bg-[#ff4fa3]/[0.13] blur-[160px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff75b8]">
              Purity Of Hearts
            </p>
            <h1 className="mt-6 max-w-3xl pb-[0.1em] text-[clamp(2.55rem,5vw,4.45rem)] font-semibold leading-[0.96] tracking-[-0.058em]">
              Growth feels different <span className="text-[#ff75b8]">when you’re not alone.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-white/[0.45]">
              Join member conversations, receive announcements, ask questions,
              and stay close to the Purity of Hearts community.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#ff75b8] px-7 py-4 text-sm font-semibold text-[#17130c]"
              >
                Open Discord <ArrowRight size={16} />
              </Link>
              <Link
                href="/enroll"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.10] px-7 py-4 text-sm text-white/[0.55]"
              >
                Become a member
              </Link>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-white/[0.10] bg-white/[0.035] p-3 backdrop-blur-2xl">
            <div className="rounded-[1.7rem] border border-white/[0.10] bg-[#191816] p-6">
              <div className="flex items-center justify-between border-b border-white/[0.10] pb-5">
                <div>
                  <p className="text-sm font-medium">Purity of Hearts</p>
                  <p className="mt-1 text-[10px] text-white/[0.30]">Member community</p>
                </div>
                <Users size={18} className="text-[#ff75b8]" />
              </div>
              <div className="mt-5 space-y-3">
                {[
                  [MessageCircle, "member-conversations", "Ask, share, and connect"],
                  [BookHeart, "faith-and-reflection", "Weekly encouragement"],
                  [Mic2, "live-room", "Calls and community events"],
                  [ShieldCheck, "member-support", "Private program support"],
                ].map(([Icon, channel, text]: any) => (
                  <div
                    key={channel}
                    className="flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                  >
                    <Icon size={18} className="text-[#ff75b8]" />
                    <div>
                      <p className="text-sm text-white/[0.70]"># {channel}</p>
                      <p className="mt-1 text-[10px] text-white/[0.28]">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer dark />
    </main>
  );
}
