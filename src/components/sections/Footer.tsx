export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white py-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-lg font-semibold tracking-tight">
            SEAINT <span className="font-normal text-neutral-500">Enterprise</span>
          </p>
          <p className="mt-2 text-sm text-neutral-500">Build Tomorrow, Today.</p>
        </div>

        <div className="flex gap-6 text-sm text-neutral-500">
          <a href="#portfolio" className="hover:text-black">Portfolio</a>
          <a href="#model" className="hover:text-black">Model</a>
          <a href="#consultation" className="hover:text-black">Contact</a>
        </div>

        <p className="text-xs text-neutral-400">© 2026 . All rights reserved.</p>
      </div>
    </footer>
  );
}



