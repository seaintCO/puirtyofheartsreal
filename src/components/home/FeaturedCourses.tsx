import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  CheckSquare,
  FolderOpen,
  NotebookPen,
} from "lucide-react";

const features = [
  [BookOpen, "24 focused lessons", "A complete business and leadership learning path."],
  [NotebookPen, "Private journal", "Save reflections, prayer notes, and next actions."],
  [CheckSquare, "Quizzes & progress", "Know what you completed and where to continue."],
  [Brain, "Flashcards", "Review essential ideas in short study sessions."],
  [FolderOpen, "Resource vault", "Download worksheets, guides, and member resources."],
];

export default function FeaturedCourses() {
  return (
    <section className="bg-[#11100e] px-6 py-28 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
              One complete member experience
            </p>
            <h2 className="mt-6 max-w-xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              More than videos in a folder.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/45">
              Learn, apply, reflect, and return. Every tool is connected to a
              private account so your progress stays with you.
            </p>
            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d8b665] px-6 py-3.5 text-sm font-semibold text-[#17130c]"
            >
              View the curriculum <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(([Icon, title, text]: any, index) => (
              <article
                key={title}
                className={`rounded-[1.8rem] border border-white/10 bg-white/[0.035] p-6 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <Icon size={21} className="text-[#d8b665]" />
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/38">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
