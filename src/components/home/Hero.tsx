import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MessageCircle,
  NotebookPen,
  Play,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f8f1e9] px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
      <div className="absolute left-[-15%] top-[-30%] h-[760px] w-[760px] rounded-full bg-[#ecced0]/45 blur-[150px]" />
      <div className="absolute bottom-[-35%] right-[-10%] h-[760px] w-[760px] rounded-full bg-[#d6b660]/24 blur-[160px]" />
      <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-4 py-2 text-xs font-medium text-[#80632e] shadow-sm backdrop-blur-2xl">
            <Sparkles size={14} />
            Faith, business, and personal growth
          </div>
          <h1 className="mt-8 max-w-3xl font-serif text-6xl leading-[0.95] tracking-[-0.045em] text-[#1f1f1f] sm:text-7xl lg:text-[6.6rem]">
            Become who you were
            <span className="block italic text-[#a88643]">created to be.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-[#1f1f1f]/58 sm:text-lg">
            A private learning and coaching platform where faith becomes
            practical—through structured courses, personal reflection, real
            community, and guidance for life and business.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/enroll"
              className="group flex items-center justify-center gap-2 rounded-full bg-[#1f1f1f] px-7 py-4 text-sm font-medium text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-[#9a7838]"
            >
              Explore the program
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/purityos"
              className="flex items-center justify-center gap-2 rounded-full border border-[#1f1f1f]/10 bg-white/60 px-7 py-4 text-sm font-medium text-[#1f1f1f] backdrop-blur-xl transition hover:bg-white"
            >
              <Sparkles size={16} className="text-[#a88643]" />
              Meet PurityOS
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#1f1f1f]/43">
            {["Saved progress", "Private community", "Guided study tools"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#a88643]" />
                  {item}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-8 rounded-[3rem] bg-[#b8964f]/20 blur-[70px]" />
          <div className="relative rounded-[2.2rem] border border-white/80 bg-white/48 p-3 shadow-[0_45px_140px_rgba(80,55,20,.18)] backdrop-blur-2xl">
            <div className="overflow-hidden rounded-[1.7rem] border border-white/70 bg-[#171614] text-white">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs font-medium">Purity Member Portal</p>
                  <p className="mt-1 text-[10px] text-white/30">
                    Your growth, beautifully organized
                  </p>
                </div>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                  <span className="h-2 w-2 rounded-full bg-[#d8b665]" />
                </div>
              </div>
              <div className="p-5 sm:p-7">
                <div className="rounded-3xl border border-[#d8b665]/20 bg-gradient-to-br from-[#d8b665]/15 to-white/[0.025] p-6">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#d8b665]/12 px-3 py-1 text-[10px] text-[#e7ca80]">
                      Continue learning
                    </span>
                    <Play size={15} className="text-[#d8b665]" />
                  </div>
                  <h2 className="mt-7 font-serif text-3xl">
                    Business Management
                    <br />& Leadership
                  </h2>
                  <div className="mt-6 h-1.5 rounded-full bg-white/10">
                    <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#997637] to-[#efd48a]" />
                  </div>
                  <div className="mt-3 flex justify-between text-[10px] text-white/30">
                    <span>15 of 24 lessons</span>
                    <span>62%</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    [BookOpen, "Courses"],
                    [NotebookPen, "Journal"],
                    [MessageCircle, "Community"],
                  ].map(([Icon, label]: any) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                    >
                      <Icon size={17} className="text-[#d8b665]" />
                      <p className="mt-5 text-[11px] text-white/50">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-white/80 bg-white/75 p-4 shadow-xl backdrop-blur-2xl sm:block">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#a88643]">
              This week
            </p>
            <p className="mt-2 text-sm font-medium">3 lessons completed</p>
          </div>
        </div>
      </div>
    </section>
  );
}

