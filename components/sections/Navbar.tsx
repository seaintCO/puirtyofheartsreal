import PremiumButton from "../PremiumButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <a href="#" className="text-sm sm:text-lg font-semibold tracking-tight">
          SEAINT <span className="font-normal text-neutral-500">Enterprise</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          <a href="#portfolio" className="text-sm text-neutral-500 hover:text-black">Portfolio</a>
          <a href="#model" className="text-sm text-neutral-500 hover:text-black">Model</a>
          <a href="#philosophy" className="text-sm text-neutral-500 hover:text-black">Philosophy</a>
          <a href="#consultation" className="text-sm text-neutral-500 hover:text-black">Consultation</a>
        </div>

        <div className="hidden md:block">
          <PremiumButton href="#consultation">Book Consultation</PremiumButton>
        </div>

        <a href="#consultation" className="md:hidden text-sm font-medium">
          Contact
        </a>
      </div>
    </nav>
  );
}




