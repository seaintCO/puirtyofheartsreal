const capabilities = [
  "Founder Advisory",
  "Technology Strategy",
  "AI Transformation",
  "Growth Consulting",
  "Strategic Partnerships",
  "Custom Software Development",
  "Business Automation",
  "Operational Systems",
  "Executive Consulting"
];

export default function Capabilities() {
  return (
    <section className="bg-[#F7F7F5] py-24 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-16 text-4xl font-medium tracking-tight sm:text-5xl">Capabilities</h2>

        <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div key={item} className="group flex items-center justify-between border-b border-black/10 py-5">
              <span className="text-base font-medium text-neutral-600 transition-colors group-hover:text-black">{item}</span>
              <span className="text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-[#C8B273]">?</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



