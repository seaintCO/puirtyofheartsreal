import { Quote } from "lucide-react";

export default function DevotionalPreview() {
  return (
    <section className="py-24 bg-[#FFF8F2] flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-white rounded-[2.5rem] p-10 md:p-16 luxury-shadow border border-[#C9A75D]/10 text-center relative overflow-hidden">
        <Quote className="absolute top-10 left-10 text-[#F8F3EB] opacity-50" size={64} />

        <div className="relative z-10">
          <span className="text-[#C9A75D] text-xs font-semibold uppercase tracking-widest block mb-6">
            Today's Devotional
          </span>

          <h3 className="font-serif text-2xl md:text-3xl text-[#1F1F1F] leading-snug mb-8">
            Peace I leave with you; my peace I give you. I do not give to you as the world gives.
          </h3>

          <p className="text-sm font-medium text-[#1F1F1F]/50 tracking-widest uppercase mb-10">
            John 14:27
          </p>

          <p className="max-w-lg mx-auto text-sm text-[#1F1F1F]/70 font-light leading-relaxed mb-10">
            In a world that demands our constant attention, the peace offered by Christ is not dependent on circumstances, but on His presence.
          </p>

          <a href="#" className="inline-flex items-center justify-center bg-[#F8F3EB] text-[#1F1F1F] text-sm font-medium px-8 py-3 rounded-full hover:bg-[#EBE4D8] transition-colors">
            Read the full reflection
          </a>
        </div>
      </div>
    </section>
  );
}
