import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businessCourse, businessLessons } from "@/data/business-course";

export default function FeaturedCourses() {
  return (
    <section className="bg-white px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b31]">
            Business academy
          </p>
          <h2 className="mt-6 text-[clamp(2.8rem,7vw,5.8rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-[#111]">
            A real curriculum.
            <span className="block text-[#86868b]">Built to be applied.</span>
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-[#1d1d1f]/58 sm:text-lg sm:leading-8">
            Finance, customer discovery, modern marketing, operations,
            leadership, and growth—organized into a clear path with saved
            progress and practical work after every lesson.
          </p>
        </div>

        <div className="mt-14 grid border-y border-black/10 sm:grid-cols-3">
          {[
            [businessLessons.length.toString(), "guided video lessons"],
            [businessCourse.modules.length.toString(), "focused modules"],
            ["5", "study tools per lesson"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border-b border-black/10 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0"
            >
              <p className="text-4xl font-semibold tracking-[-0.04em] text-[#111]">
                {value}
              </p>
              <p className="mt-2 text-sm text-[#1d1d1f]/50">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">
              Everything stays connected.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7 text-[#1d1d1f]/55">
              Watch a lesson, test your understanding, save a note, review key
              ideas, and return exactly where you stopped.
            </p>
            <Link
              href="/courses"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#84652e] transition hover:text-black"
            >
              See the full curriculum <ArrowRight size={15} />
            </Link>
          </div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {[
              ["01", "Video lessons", "Curated instruction in one learning path."],
              ["02", "Quizzes & flashcards", "Active review after every lesson."],
              ["03", "Notes & assignments", "Turn learning into your next action."],
              ["04", "Completion certificate", "Unlocks when every lesson is complete."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="grid gap-2 py-5 sm:grid-cols-[56px_180px_1fr] sm:items-center sm:gap-5"
              >
                <span className="text-xs font-semibold text-[#a28142]">{number}</span>
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-sm leading-6 text-[#1d1d1f]/48">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
