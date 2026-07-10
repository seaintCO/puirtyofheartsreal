import Link from "next/link";

const courses = [
  "Foundations of Faith",
  "Identity in Christ",
  "Prayer & Peace",
  "Healing the Heart",
  "Biblical Womanhood",
  "Walking With God Daily"
];

export default function CoursesPage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8F2] pt-32">
      <Link href="/" className="fixed left-6 top-24 z-50 rounded-full border border-[#1F1F1F]/10 bg-white/80 px-5 py-2 text-sm font-medium text-[#1F1F1F] shadow-sm backdrop-blur transition hover:bg-white">
        ← Back to Home
      </Link>
      <section className="px-6 pb-20 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">Learning Platform</span>
        <h1 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-tight lg:text-7xl">
          Premium biblical courses for your spiritual growth.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-[#1F1F1F]/70">
          Structured teachings, devotionals, workbooks, certificates, notes, and guided learning paths.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {courses.map((course, i) => (
            <div key={course} className="rounded-3xl bg-white p-5 luxury-shadow transition hover:-translate-y-2">
              <div className="mb-6 flex h-56 items-end rounded-2xl bg-gradient-to-br from-[#F5E4E7] to-[#F8F3EB] p-6">
                <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#1F1F1F]/70">
                  {8 + i * 2} Lessons
                </span>
              </div>
              <h3 className="font-serif text-2xl">{course}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1F1F1F]/65">
                A guided course experience with video lessons, reflection prompts, downloadable PDFs, and practical application.
              </p>
              <Link href="#" className="mt-6 inline-flex w-full justify-center rounded-xl border border-[#1F1F1F]/10 py-3 text-sm font-medium hover:bg-[#F8F3EB]">
                View Course
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

