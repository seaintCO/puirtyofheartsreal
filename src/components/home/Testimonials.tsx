import { Star } from "lucide-react";

const reviews = [
  "Susan helped me find clarity when I felt spiritually stuck.",
  "This coaching gave me peace, direction, and confidence.",
  "I finally feel grounded in my faith and purpose.",
  "The community feels safe, powerful, and deeply encouraging.",
  "Every session gave me practical wisdom I could apply.",
  "Purity of Hearts helped me reconnect with God daily.",
  "Susan teaches with grace, truth, and real-life wisdom.",
  "This changed the way I lead my family and business.",
  "The devotionals are simple, beautiful, and deeply timely.",
  "I felt seen, supported, and spiritually challenged.",
  "The coaching helped me lead with more peace.",
  "This platform feels premium, personal, and God-centered.",
  "The lessons are clear, elegant, and transformational.",
  "I joined for guidance and stayed for the community.",
  "Susan brings biblical wisdom into real-life decisions.",
  "This gave me structure for my spiritual growth.",
  "I feel more confident walking in my purpose.",
  "The live sessions feel intimate and powerful.",
  "It feels like faith-based coaching for modern leaders.",
  "Purity of Hearts is exactly what I needed."
];

function ReviewCard({ text }: { text: string }) {
  return (
    <div className="mx-3 w-[320px] shrink-0 rounded-3xl border border-[#1F1F1F]/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex gap-1 text-[#C9A75D]">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={15} fill="currentColor" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-[#1F1F1F]/70">"{text}"</p>
    </div>
  );
}

export default function Testimonials() {
  const rowOne = [...reviews.slice(0, 10), ...reviews.slice(0, 10)];
  const rowTwo = [...reviews.slice(10), ...reviews.slice(10)];

  return (
    <section className="overflow-hidden bg-[#FFF8F2] py-24">
      <div className="mb-12 px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">
          Stories of Growth
        </span>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-[#1F1F1F] md:text-5xl">
          Real growth. Real guidance. Real purpose.
        </h2>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-[#FFF8F2] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-[#FFF8F2] to-transparent" />

        <div className="mb-6 flex w-max marquee-left">
          {rowOne.map((review, index) => (
            <ReviewCard key={`one-${index}`} text={review} />
          ))}
        </div>

        <div className="flex w-max marquee-right">
          {rowTwo.map((review, index) => (
            <ReviewCard key={`two-${index}`} text={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
