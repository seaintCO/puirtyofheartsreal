import Link from "next/link";
import { ArrowRight, Bookmark, Calendar, PlayCircle, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8F2] px-6 pb-20 pt-20 md:pb-28 md:pt-24">
      <div className="absolute left-1/2 top-44 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#C9A75D]/20 blur-[130px]" />
      <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-[#F5E4E7]/70 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1F1F1F]/10 bg-white px-4 py-1.5 text-xs font-medium text-[#1F1F1F]/70 shadow-sm">
          <Sparkles size={14} className="text-[#C9A75D]" />
          Get To The F
        </div>

        <h1 className="hero-title hero-glow mx-auto mb-5 max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] md:text-7xl">
          Lead with Purpose.
        </h1>

        <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-[#1F1F1F]/60 md:text-lg">
          Faith-based coaching for leaders seeking to grow closer to God.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/courses" className="hero-button group inline-flex items-center justify-center gap-2 rounded-full bg-[#1F1F1F] px-7 py-3.5 text-sm font-medium text-white shadow-xl transition hover:-translate-y-1">
            Start Your Journey <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </Link>
          <Link href="/about" className="hero-button inline-flex items-center justify-center gap-2 rounded-full border border-[#1F1F1F]/10 bg-white px-7 py-3.5 text-sm font-medium text-[#1F1F1F] shadow-sm transition hover:bg-[#F8F3EB]">
            <PlayCircle size={17} />
            Watch Susan's Story
          </Link>
        </div>
      </div>

      <div className="relative z-10 mx-auto mt-12 max-w-5xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#1F1F1F] p-4 shadow-2xl ring-1 ring-white/5 md:p-8">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C9A75D]/20 blur-[90px]" />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full bg-[#C9A75D]/20 px-3 py-1 text-xs font-medium text-[#C9A75D]">Today</span>
                <Bookmark className="text-white/40" size={20} />
              </div>
              <h3 className="mb-2 text-2xl font-semibold tracking-tight text-white">Purpose Session</h3>
              <p className="max-w-lg text-sm leading-relaxed text-white/55">
                Continue your coaching path, reflection, and next leadership lesson.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <PlayCircle className="mb-5 text-[#C9A75D]" size={28} />
              <p className="text-sm font-medium text-white">Coaching Progress</p>
              <p className="mt-2 text-xs text-white/45">Faith & Leadership</p>
              <div className="mt-5 h-1.5 rounded-full bg-white/10">
                <div className="h-1.5 w-[65%] rounded-full bg-[#C9A75D]" />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:col-span-3">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-2 flex items-center gap-2 text-[#C9A75D]">
                    <Calendar size={16} />
                    <span className="text-xs font-medium uppercase tracking-widest">Next Live Coaching</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Live Teaching With Susan</h4>
                  <p className="mt-1 text-sm text-white/45">Join weekly inside the community</p>
                </div>
                <Link href="/community" className="rounded-full bg-[#C9A75D] px-6 py-3 text-center text-sm font-medium text-white transition hover:bg-[#b59550]">
                  Reserve Seat
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

