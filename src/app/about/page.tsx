import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#FFF8F2] pt-32">
      <Link href="/" className="fixed left-6 top-24 z-50 rounded-full border border-[#1F1F1F]/10 bg-white/80 px-5 py-2 text-sm font-medium text-[#1F1F1F] shadow-sm backdrop-blur transition hover:bg-white">
        ← Back to Home
      </Link>
      <section className="relative overflow-hidden px-6 pb-24">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-[#F5E4E7] blur-[100px] opacity-70" />
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A75D]">About the Founder</span>
            <h1 className="mt-6 font-serif text-5xl leading-tight text-[#1F1F1F] lg:text-7xl">
              Meet Susan and the heart behind Purity of Hearts.
            </h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-[#1F1F1F]/70">
              Purity of Hearts exists to create a premium digital sanctuary for biblical teaching, spiritual growth, coaching, devotionals, and community.
            </p>
            <Link href="/courses" className="mt-10 inline-flex rounded-full bg-[#1F1F1F] px-8 py-4 text-sm font-medium text-white">
              Explore Courses
            </Link>
          </div>

          <div className="rounded-[2.5rem] bg-white p-6 luxury-shadow">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80" className="h-full w-full object-cover" alt="Susan" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F3EB] px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          {[
            ["Mission", "To help people grow closer to God through biblical truth, guidance, and practical spiritual resources."],
            ["Vision", "A global faith-based platform for learning, prayer, coaching, community, and transformation."],
            ["Values", "Grace, excellence, wisdom, peace, purity, biblical truth, and modern discipleship."]
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-white p-8 luxury-shadow">
              <h3 className="font-serif text-3xl">{title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-[#1F1F1F]/70">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

