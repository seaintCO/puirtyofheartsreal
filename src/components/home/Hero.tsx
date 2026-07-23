import Link from "next/link";
import { ArrowRight, Check, Play } from "lucide-react";
import { businessLessons } from "@/data/business-course";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#f5f5f7] px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24 lg:pb-36 lg:pt-28">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b31]">
          Faith. Business. A life with direction.
        </p>
        <h1 className="mx-auto mt-6 max-w-5xl text-[clamp(3.25rem,9vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-[#111]">
          Grow with clarity.
          <span className="mt-2 block text-[#a28142]">Lead with purpose.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-[#1d1d1f]/58 sm:text-xl sm:leading-8">
          A private learning and coaching experience for people building a
          business, strengthening their faith, and becoming more intentional
          about what comes next.
        </p>
        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/enroll"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#8c6b30]"
          >
            Explore the program <ArrowRight size={15} />
          </Link>
          <Link
            href="/purityos"
            className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-7 py-4 text-sm font-semibold text-[#111] transition hover:border-black/20"
          >
            Meet PurityOS
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl sm:mt-20">
        <div className="rounded-[2rem] border border-black/[0.06] bg-white p-3 shadow-[0_35px_100px_rgba(0,0,0,.12)] sm:rounded-[2.6rem] sm:p-4">
          <div className="overflow-hidden rounded-[1.45rem] bg-[#0a0a0a] text-white sm:rounded-[2rem]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8 sm:py-5">
              <div>
                <p className="text-xs font-semibold">Purity Member Portal</p>
                <p className="mt-1 hidden text-[11px] text-white/35 sm:block">
                  Learning, progress, and support in one place
                </p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] text-white/55">
                Member view
              </span>
            </div>

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.3fr_.7fr] lg:p-8">
              <div className="rounded-[1.5rem] bg-[#191919] p-5 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d9bb6d]">
                    Continue learning
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
                    <Play size={14} fill="currentColor" />
                  </span>
                </div>
                <h2 className="mt-12 max-w-xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:mt-16 sm:text-5xl">
                  Business Management
                  <br />
                  &amp; Leadership
                </h2>
                <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[47%] rounded-full bg-[#d9bb6d]" />
                </div>
                <div className="mt-3 flex justify-between text-[11px] text-white/35">
                  <span>15 of {businessLessons.length} lessons</span>
                  <span>47%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
                {[
                  ["Curriculum", `${businessLessons.length} lessons`],
                  ["Study tools", "Quizzes + notes"],
                  ["Progress", "Saved securely"],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`rounded-[1.35rem] border border-white/10 bg-white/[0.045] p-4 sm:p-5 ${
                      index === 2 ? "col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                      {label}
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-sm font-medium text-white/75">
                      <Check size={14} className="text-[#d9bb6d]" />
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
