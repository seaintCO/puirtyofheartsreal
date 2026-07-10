import Link from "next/link";

export default function CommunityPage() {
  return (
    <main className="relative min-h-screen bg-[#1A1A1A] pt-32 text-white">
      <Link href="/" className="fixed left-6 top-24 z-50 rounded-full border border-[#1F1F1F]/10 bg-white/80 px-5 py-2 text-sm font-medium text-[#1F1F1F] shadow-sm backdrop-blur transition hover:bg-white">
        ← Back to Home
      </Link>
      <section className="relative overflow-hidden px-6 pb-24">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#C9A75D]/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">Digital Sanctuary</span>
            <h1 className="mt-6 font-serif text-5xl leading-tight lg:text-7xl">
              A private faith community built for connection and growth.
            </h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-white/60">
              Prayer groups, live Q&A, Bible studies, devotionals, discussion spaces, and exclusive content in one calm premium space.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl">
            <div className="rounded-2xl border border-white/10 bg-[#222] p-6">
              <div className="mb-6 h-4 w-32 rounded-full bg-white/10" />
              <div className="space-y-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-medium">Prayer Request</p>
                  <p className="mt-2 text-xs text-white/50">Share privately with the community and receive support.</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-medium">Live Bible Study</p>
                  <p className="mt-2 text-xs text-white/50">Join Susan for guided teaching and reflection.</p>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <p className="text-sm font-medium">Daily Devotionals</p>
                  <p className="mt-2 text-xs text-white/50">Receive encouragement every day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

