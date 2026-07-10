import { BookMarked, Heart, Leaf } from "lucide-react";

const values = [
  { icon: BookMarked, title: "Biblical Truth", text: "Rooted deeply in scripture, ensuring every teaching aligns with foundational Christian theology." },
  { icon: Heart, title: "Supportive Community", text: "A safe, moderated environment to share struggles, victories, and pray for one another." },
  { icon: Leaf, title: "Daily Growth", text: "Micro-learnings and daily reflections designed to fit seamlessly into a busy modern life." },
];

export default function WhyPurity() {
  return (
    <section className="py-24 bg-[#FFF8F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title}>
              <Icon className="text-[#C9A75D] mb-4" size={32} />
              <h3 className="font-serif text-xl tracking-tight text-[#1F1F1F] mb-2">{title}</h3>
              <p className="text-sm text-[#1F1F1F]/70 font-light leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
