import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckSquare,
  FolderOpen,
  NotebookPen,
  Trophy,
} from "lucide-react";

const tools = [
  {
    title: "Journal",
    text: "Write reflections, coaching notes, and prayer entries.",
    href: "/dashboard/journal",
    icon: NotebookPen,
  },
  {
    title: "Resource Vault",
    text: "Access PDFs, worksheets, templates, and downloads.",
    href: "/dashboard/resources",
    icon: FolderOpen,
  },
  {
    title: "Courses",
    text: "Continue your video courses and modules.",
    href: "/dashboard/courses",
    icon: BookOpen,
  },
  {
    title: "Quizzes",
    text: "Test your understanding after every module.",
    href: "/dashboard/quizzes",
    icon: CheckSquare,
  },
  {
    title: "Flashcards",
    text: "Review key ideas, scriptures, and coaching principles.",
    href: "/dashboard/flashcards",
    icon: Brain,
  },
  {
    title: "Certificates",
    text: "Track completion and unlock certificates.",
    href: "/dashboard/certificates",
    icon: Trophy,
  },
];

export default function DashboardPage() {
  return (
    <section>
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Student Portal
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          Continue your journey.
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base">
          Access your course modules, personal journal, resources, quizzes,
          flashcards, cheat sheets, and certificates.
        </p>
      </div>

      <div className="mb-8 rounded-[2rem] border border-[#C9A75D]/20 bg-[#C9A75D]/10 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Continue Learning
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Module 1: Faith Foundation</h2>
            <p className="mt-2 text-sm text-white/45">
              Continue your latest lesson and saved notes.
            </p>
          </div>

          <Link
            href="/dashboard/courses"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A75D] px-6 py-3 text-sm font-medium text-white"
          >
            Continue Course
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map(({ title, text, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-[#C9A75D]/30 hover:bg-white/[0.07]"
          >
            <Icon className="text-[#C9A75D]" size={26} />

            <h2 className="mt-5 text-xl font-semibold">{title}</h2>

            <p className="mt-3 text-sm leading-relaxed text-white/45">
              {text}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#C9A75D]">
              Open
              <ArrowRight size={15} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
