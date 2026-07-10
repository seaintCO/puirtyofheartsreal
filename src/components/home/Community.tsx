"use client";

import Link from "next/link";
import { ArrowRight, Bell, Hash, Heart, MessageCircle, Mic, Plus, Search, ShieldCheck, Users, Video } from "lucide-react";
import { useState } from "react";

const channels = [
  { name: "welcome", icon: Hash },
  { name: "daily-devotional", icon: Hash },
  { name: "prayer-requests", icon: Hash },
  { name: "live-bible-study", icon: Mic },
  { name: "testimonies", icon: Users },
  { name: "member-support", icon: ShieldCheck },
];

const messages = [
  {
    name: "Susan",
    tag: "Teacher",
    text: "Today's devotional is live. Take five quiet minutes and let God speak peace over your heart.",
  },
  {
    name: "Maria S.",
    tag: "Member",
    text: "This morning's devotional was exactly what I needed. Thank you for creating this space.",
  },
  {
    name: "James T.",
    tag: "Prayer",
    text: "Please pray for wisdom this week. I'm making a big family decision.",
  },
];

export default function Community() {
  const [activeChannel, setActiveChannel] = useState("daily-devotional");
  const [liked, setLiked] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#1F1F1F] px-6 py-28">
      <div className="absolute right-0 top-0 h-[700px] w-[700px] rounded-full bg-[#C9A75D]/10 blur-[150px]" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#F5E4E7]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-14 text-center">
          <span className="mb-3 block text-sm font-semibold uppercase tracking-widest text-[#C9A75D]">
            Private Discord Community
          </span>
          <h2 className="mb-5 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Coaching, prayer, and guidance in one private space.
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/55">
            Join live rooms, post prayer requests, follow devotionals, and grow with others walking the same path.
          </p>
        </div>

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
          <div className="grid min-h-[520px] overflow-hidden rounded-[1.5rem] bg-[#111] lg:grid-cols-[82px_260px_1fr_260px]">
            <div className="hidden border-r border-white/10 bg-[#151515] p-4 lg:block">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C9A75D] text-sm font-bold text-[#1F1F1F]">
                PH
              </div>
              {["B", "P", "L", "C"].map((item) => (
                <div key={item} className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-sm font-semibold text-white/50 transition hover:bg-white/10 hover:text-white">
                  {item}
                </div>
              ))}
              <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-white/20 text-white/40">
                <Plus size={18} />
              </div>
            </div>

            <div className="border-r border-white/10 bg-[#202020] p-5">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Purity of Hearts</p>
                  <p className="mt-1 text-xs text-white/40">Private coaching community</p>
                </div>
                <Bell size={17} className="text-white/40" />
              </div>

              <div className="mb-4 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2">
                <Search size={15} className="text-white/35" />
                <span className="text-xs text-white/35">Search channels</span>
              </div>

              <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-white/35">Channels</p>

              <div className="space-y-2">
                {channels.map(({ name, icon: Icon }) => (
                  <button
                    key={name}
                    onClick={() => setActiveChannel(name)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                      activeChannel === name
                        ? "bg-white/10 text-white"
                        : "text-white/55 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={16} />
                    {name}
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#C9A75D]/20 bg-[#C9A75D]/10 p-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">Live Now</p>
                <p className="mt-2 text-sm font-medium text-white">Prayer Room</p>
                <p className="mt-1 text-xs text-white/45">12 members active</p>
              </div>
            </div>

            <div className="bg-[#262626] p-5">
              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-white">
                    <Hash size={18} className="text-[#C9A75D]" />
                    <span className="font-medium">{activeChannel}</span>
                  </div>
                  <p className="mt-1 text-xs text-white/40">Daily encouragement, coaching notes, and community support.</p>
                </div>
                <Link href="/community" className="hidden rounded-full bg-[#C9A75D] px-5 py-2.5 text-xs font-medium text-white transition hover:bg-[#b59550] md:inline-flex">
                  Join Community
                </Link>
              </div>

              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={message.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.07]">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F5E4E7] to-[#C9A75D] text-xs font-bold text-[#1F1F1F]">
                          {message.name[0]}
                        </div>
                        <p className="text-sm font-medium text-white">{message.name}</p>
                      </div>
                      <span className="rounded-full bg-[#C9A75D]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C9A75D]">
                        {message.tag}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/65">{message.text}</p>
                    <div className="mt-3 flex gap-4 text-xs text-white/35">
                      <button onClick={() => index === 0 && setLiked(!liked)} className="flex items-center gap-1 transition hover:text-[#C9A75D]">
                        <Heart size={13} className={liked && index === 0 ? "fill-[#C9A75D] text-[#C9A75D]" : ""} /> {liked && index === 0 ? 25 : 24}
                      </button>
                      <span className="flex items-center gap-1"><MessageCircle size={13} /> 8</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-[#1F1F1F] p-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-white/35">Message #{activeChannel}</span>
                  <button className="rounded-full bg-[#C9A75D] px-4 py-2 text-xs font-medium text-white">Send</button>
                </div>
              </div>
            </div>

            <div className="hidden bg-[#202020] p-5 lg:block">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/35">Active Members</p>

              {["Susan", "Maria S.", "James T.", "Angela R.", "Denise M."].map((name, index) => (
                <div key={name} className="mb-4 flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                      {name[0]}
                    </div>
                    <span className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-[#202020] ${index < 3 ? "bg-green-400" : "bg-white/30"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{name}</p>
                    <p className="text-xs text-white/35">{index === 0 ? "Coach" : "Member"}</p>
                  </div>
                </div>
              ))}

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <Video size={20} className="text-[#C9A75D]" />
                <p className="mt-3 text-sm font-medium text-white">Live Study</p>
                <p className="mt-1 text-xs text-white/40">Wednesday 7 PM</p>
                <button className="mt-4 w-full rounded-full bg-white px-4 py-2 text-xs font-medium text-[#1F1F1F]">
                  RSVP
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/community" className="inline-flex items-center gap-2 rounded-full bg-[#C9A75D] px-8 py-3.5 text-sm font-medium text-white shadow-lg transition hover:bg-[#b59550]">
            Join Community <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
