import { ChartNoAxesCombined, Cpu, Handshake } from "lucide-react";

const items = [
  {
    icon: ChartNoAxesCombined,
    title: "Long-Term Thinking",
    text: "We build with a generational mindset, prioritizing durable value over short-term noise."
  },
  {
    icon: Cpu,
    title: "Technology First",
    text: "Every company is strengthened through software, automation, AI, and operational systems."
  },
  {
    icon: Handshake,
    title: "Founder Partnership",
    text: "We align with operators who want to build meaningful companies with structure and discipline."
  }
];

export default function InvestmentPhilosophy() {
  return (
    <section id="philosophy" className="bg-white py-24 lg:py-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 lg:px-8">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="group">
            <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F7F5] transition-colors group-hover:bg-black">
              <Icon className="h-5 w-5 text-[#C8B273]" />
            </div>
            <h3 className="mb-4 text-xl font-medium tracking-tight">{title}</h3>
            <p className="text-sm font-light leading-6 text-neutral-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}



