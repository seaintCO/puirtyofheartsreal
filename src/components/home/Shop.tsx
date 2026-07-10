import Link from "next/link";
import { ArrowRight, HeartPulse, Briefcase, Home, Sparkles } from "lucide-react";

const catalogs = [
  { icon: HeartPulse, title: "Health Tech", text: "Wellness tools and digital resources." },
  { icon: Briefcase, title: "Tools", text: "Journals, planners, and guides." },
  { icon: Home, title: "Family Accessories", text: "Faith-centered products for the home." },
];

export default function Shop() {
  return (
    <section className="bg-[#FFF8F2] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
              Purity Store
            </span>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-[#1F1F1F] md:text-5xl">
              Shop Purity
            </h2>
            <p className="mt-4 max-w-xl text-base text-[#1F1F1F]/60">
              Health Tech, Tools, Family Accessories and more.
            </p>
          </div>

          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full bg-[#1F1F1F] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#C9A75D]">
            Shop Now <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {catalogs.map(({ icon: Icon, title, text }) => (
            <Link href="/shop" key={title} className="group rounded-[2rem] border border-[#1F1F1F]/5 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F3EB] text-[#C9A75D] transition group-hover:scale-110">
                <Icon size={28} />
              </div>
              <h3 className="text-xl font-semibold text-[#1F1F1F]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#1F1F1F]/60">{text}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#C9A75D]">
                Browse Catalog <ArrowRight size={15} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
