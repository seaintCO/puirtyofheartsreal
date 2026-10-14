export default function Card({
  children,
  dark = false,
  className = "",
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[28px] border p-8 transition-all duration-500 hover:-translate-y-1 ${
        dark
          ? "border-white/10 bg-[#111111] text-white hover:bg-[#171717]"
          : "border-black/5 bg-[#F7F7F5] text-[#111111] hover:shadow-[0_30px_80px_rgba(0,0,0,0.06)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}



