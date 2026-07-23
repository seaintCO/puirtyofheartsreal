import Link from "next/link";
import { ArrowRight, Hash, Heart, MessageCircle } from "lucide-react";

const messages = [
  {
    name: "Susan",
    tag: "Coach",
    text: "Today’s reflection is live. Give yourself five quiet minutes before the day starts asking things from you.",
  },
  {
    name: "Maria S.",
    tag: "Member",
    text: "This was exactly the reset I needed. I’m choosing one faithful next step instead of trying to solve everything today.",
  },
];

export default function Community() {
  return (
    <section className="bg-[#f5f5f7] px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[.78fr_1.22fr] lg:gap-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b31]">
            Private Discord community
          </p>
          <h2 className="mt-6 text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#111]">
            You don’t have to grow alone.
          </h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#1d1d1f]/58 sm:text-lg sm:leading-8">
            A calmer place for coaching notes, devotionals, prayer requests,
            live rooms, and honest conversation with people moving in the same
            direction.
          </p>
          <Link
            href="/community"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#84652e] transition hover:text-black"
          >
            Explore the community <ArrowRight size={15} />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-black/[0.06] bg-white p-3 shadow-[0_28px_90px_rgba(0,0,0,.09)] sm:p-4">
          <div className="overflow-hidden rounded-[1.45rem] bg-[#171717] text-white">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-5 sm:px-7">
              <div>
                <p className="text-sm font-semibold">Purity of Hearts</p>
                <p className="mt-1 text-[11px] text-white/35">Member community</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                12 online
              </div>
            </div>

            <div className="grid md:grid-cols-[180px_1fr]">
              <div className="hidden border-r border-white/10 p-5 md:block">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                  Channels
                </p>
                <div className="mt-4 space-y-2">
                  {["daily-devotional", "prayer-requests", "business-growth"].map(
                    (channel, index) => (
                      <div
                        key={channel}
                        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs ${
                          index === 0
                            ? "bg-white/10 text-white"
                            : "text-white/40"
                        }`}
                      >
                        <Hash size={14} />
                        {channel}
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4 text-sm font-medium">
                  <Hash size={16} className="text-[#d9bb6d]" />
                  daily-devotional
                </div>
                <div className="mt-4 space-y-3">
                  {messages.map((message) => (
                    <article
                      key={message.name}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-semibold">{message.name}</p>
                        <span className="text-[10px] text-[#d9bb6d]">
                          {message.tag}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-6 text-white/58 sm:text-sm">
                        {message.text}
                      </p>
                      <div className="mt-3 flex gap-4 text-[10px] text-white/28">
                        <span className="flex items-center gap-1">
                          <Heart size={12} /> 24
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle size={12} /> 8
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
