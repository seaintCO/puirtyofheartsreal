export default function Stats() {
  return (
    <section className="bg-[#111111] py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-3 md:divide-x md:divide-white/10 lg:px-8">
        <div>
          <div className="mb-4 text-6xl font-medium tracking-tight">8+</div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">Portfolio Companies</p>
          <p className="mt-2 text-sm text-[#C8B273]">Growing</p>
        </div>

        <div className="md:px-12">
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">Industries</p>
          <div className="space-y-3 text-sm text-neutral-300">
            <p>Technology</p>
            <p>Artificial Intelligence</p>
            <p>Media</p>
            <p>Consumer</p>
            <p>Sports</p>
            <p>Faith</p>
          </div>
        </div>

        <div className="md:pl-12">
          <h3 className="text-3xl font-medium tracking-tight">Built For<br />The Future.</h3>
        </div>
      </div>
    </section>
  );
}



