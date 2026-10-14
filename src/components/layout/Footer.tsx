import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white pt-20 pb-10">
      <Container>
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#" className="mb-6 block text-lg font-semibold tracking-tight text-[#111111]">
              SEAINT <span className="ml-1 font-normal text-neutral-500">Enterprise</span>
            </a>

            <p className="max-w-xs text-sm font-light leading-6 text-neutral-500">
              Build Tomorrow, Today.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#111111]">
              Firm
            </h4>
            <ul className="space-y-4 text-sm font-light text-neutral-500">
              <li>Private Equity</li>
              <li>Venture Capital</li>
              <li>Company Building</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-medium uppercase tracking-[0.25em] text-[#111111]">
              Navigate
            </h4>
            <ul className="space-y-4 text-sm font-light text-neutral-500">
              <li><a href="#about" className="hover:text-black">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-black">Portfolio</a></li>
              <li><a href="#consultation" className="hover:text-black">Consultation</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-8 md:flex-row">
          <p className="text-xs font-light text-neutral-400">
            © 2026 . All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-xs font-light text-neutral-400">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}



