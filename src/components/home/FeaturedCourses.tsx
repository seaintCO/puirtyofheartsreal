import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Users } from "lucide-react";

const cards = [
  { icon: BookOpen, title: "Courses", text: "Biblical teaching made simple.", href: "/courses" },
  { icon: Heart, title: "Devotionals", text: "Daily encouragement and reflection.", href: "/community" },
  { icon: Users, title: "Community", text: "Prayer, support, and live studies.", href: "/community" },
];

export default function FeaturedCourses() {
  return (
    <section className="bg-[#F8F3EB] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-semibold tracking-tight text-[#1F1F1F] md:text-4xl">
            Learn. Reflect. Grow.
          </h2>
          <p className="mx-auto max-w-xl text-base text-[#1F1F1F]/60">
            A clean digital space for faith-centered growth.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, text, href }) => (
            <Link key={title} href={href} className="group rounded-3xl border border-[#1F1F1F]/5 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF8F2] text-[#C9A75D] transition group-hover:scale-110">
                <Icon size={26} />
              </div>
              <h3 className="mb-2 text-xl font-semibold tracking-tight text-[#1F1F1F]">{title}</h3>
              <p className="mb-5 text-sm leading-relaxed text-[#1F1F1F]/60">{text}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-[#C9A75D]">
                Explore <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
