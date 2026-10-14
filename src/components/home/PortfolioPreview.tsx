import Link from "next/link";

export default function PortfolioPreview() {
  return (
    <section className="bg-white px-6 py-24 text-[#0a0c0e]">
      <div className="mx-auto max-w-7xl">
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-600">
          Portfolio
        </p>

        <h2 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Companies built to compound across software, AI, media, commerce, and events.
        </h2>

        <div className="mt-10">
          <Link href="/portfolio" className="rounded-full bg-cyan-400 px-7 py-4 text-sm font-semibold text-white transition hover:bg-cyan-500">
            Explore Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
