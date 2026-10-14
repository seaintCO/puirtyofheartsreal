export default function BeamButton() {
  return (
    <button className="group inline-flex overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] focus:outline-none sm:w-auto text-sm font-medium font-medium font-medium text-white w-full h-[54px] rounded-full pt-4 pr-8 pb-4 pl-8 relative items-center justify-center">
      <style>{`
        @keyframes beam-spin { to { transform: rotate(360deg); } }
        @keyframes lines-slide {
          0% { background-position: 0 0; }
          100% { background-position: 24px 0; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 rounded-full overflow-hidden p-[1px]">
        <div
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#3b82f6_360deg)]"
          style={{ animation: "beam-spin 3s linear infinite" }}
        />
        <div className="absolute inset-[1px] rounded-full bg-[#050505]" />
      </div>

      <div className="overflow-hidden bg-[#0A0A0A] rounded-full absolute top-[2px] right-[2px] bottom-[2px] left-[2px] z-0">
        <div className="bg-gradient-to-b from-blue-900/20 to-transparent absolute top-0 right-0 bottom-0 left-0" />

        <div
          className="opacity-[0.07] mix-blend-plus-lighter absolute top-0 right-0 bottom-0 left-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 8px)",
            backgroundSize: "24px 100%",
            animation: "lines-slide 1.5s linear infinite",
          }}
        />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/2 bg-blue-500/20 blur-2xl rounded-full pointer-events-none transition-colors duration-500 group-hover:bg-blue-500/40" />
      </div>

      <span className="transition-colors group-hover:text-white font-medium text-white tracking-normal z-10 relative">
        View Portfolio
      </span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 ml-2 transition-transform duration-300 group-hover:translate-x-1"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    </button>
  );
}






