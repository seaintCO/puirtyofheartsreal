import PremiumButton from "../PremiumButton";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/90 to-white" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:px-8">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.25em] text-neutral-500 shadow-sm">
          <span>Private Equity</span>
          <span className="h-1 w-1 rounded-full bg-[#C8B273]" />
          <span>Venture Capital</span>
          <span className="h-1 w-1 rounded-full bg-[#C8B273]" />
          <span>Company Building</span>
        </div>

        <h1 className="mx-auto max-w-5xl text-5xl font-medium tracking-tight text-[#111111] sm:text-6xl lg:text-8xl">
          Build Tomorrow, Today.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base font-light leading-8 text-neutral-500 sm:text-xl">
           builds, operates, and scales companies across artificial intelligence,
          software, media, sports, faith-based ventures, and digital infrastructure.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PremiumButton href="#portfolio">View Portfolio</PremiumButton>
          <a href="#model" className="rounded-full px-6 py-3 text-sm font-medium text-neutral-500 hover:text-black">
            How We Build
          </a>
        </div>
      </div>
    </section>
  );
}



