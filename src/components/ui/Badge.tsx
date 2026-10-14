export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-neutral-500 shadow-sm backdrop-blur-xl">
      {children}
    </div>
  );
}



