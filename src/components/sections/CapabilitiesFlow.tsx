import { Brain, Building2, ChartNoAxesCombined, Code2, Handshake, Rocket } from "lucide-react";

const nodes = [
  { label: "Capital", icon: ChartNoAxesCombined },
  { label: "Technology", icon: Code2 },
  { label: "Strategy", icon: Brain },
  { label: "Execution", icon: Rocket },
  { label: "Partnerships", icon: Handshake },
  { label: "Portfolio", icon: Building2 },
];

export default function CapabilitiesFlow() {
  return (
    <section className="bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-[0.35em] text-neutral-400">
          Capabilities
        </p>

        <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-medium tracking-tight text-black sm:text-6xl">
          One operating system for building tomorrow.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
          Capital, technology, strategy, and execution built into one operating system.
        </p>

        <div className="relative mx-auto mt-14 max-w-5xl sm:mt-16">
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">
            {nodes.map(({ label, icon: Icon }) => (
              <div key={label} className="group flex flex-col items-center gap-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neutral-200 bg-white shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-md">
                  <Icon className="h-6 w-6 text-neutral-800" />
                </div>
                <p className="text-sm font-medium text-neutral-700">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
