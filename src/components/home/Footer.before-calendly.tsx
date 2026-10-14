import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white px-4 pb-10 pt-12 sm:px-6 md:px-10 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-black/5 bg-white/80 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="relative z-10 p-8 sm:p-12 md:p-16">
          <div className="grid grid-cols-1 gap-8 border-b border-black/5 pb-12">
            <div>
              <h3 className="mb-4 text-2xl font-semibold tracking-tight text-[#0a0c0e]">
                SEAINT Enterprise
              </h3>

              <p className="max-w-3xl text-gray-500">
                Private equity, venture capital, and strategic advisory for companies building tomorrow.
              </p>

              <div id="contact" className="mt-6 rounded-2xl border border-cyan-400/30 bg-[#f6f8fb] p-5 sm:p-6 md:p-8">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-600 ring-1 ring-cyan-400/30">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
                      Available 24/7
                    </div>

                    <h4 className="font-medium tracking-tight text-[#0a0c0e]">
                      Need funding? Contact us.
                    </h4>

                    <ul className="space-y-2 text-sm text-gray-500">
                      {[
                        "Private equity and venture capital opportunities",
                        "Strategic advisory and operating support",
                        "Platform growth and capital strategy",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 text-cyan-500">âœ“</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="mailto:support@seaintenterprise.com" className="inline-flex text-sm text-cyan-600 transition hover:text-[#00c8ff]">
                      support@seaintenterprise.com
                    </a>
                  </div>

                  <form action="https://formsubmit.co/support@seaintenterprise.com" method="POST" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
                    <input type="hidden" name="_subject" value="New SEAINT Funding Inquiry" /><input type="hidden" name="_captcha" value="false" /><input name="name" placeholder="Your name" className="rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
                    <input name="email" type="email" placeholder="Email" className="rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
                    <input name="company" placeholder="Company" className="rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
                    <select name="interest" className="rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30">
                      <option>Need funding</option>
                      <option>Private equity</option>
                      <option>Venture capital</option>
                      <option>Strategic advisory</option>
                    </select>
                    <textarea name="message" rows={4} placeholder="Tell us what you are building..." className="rounded-xl border border-black/5 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 sm:col-span-2" />
                    <div className="flex justify-end sm:col-span-2">
                      <button type="submit" className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-cyan-500">
                        Send message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-12 sm:grid-cols-3 lg:grid-cols-4">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li><Link href="/portfolio" className="hover:text-cyan-600">Portfolio</Link></li>
                <li><Link href="/contact" className="hover:text-cyan-600">Contact</Link></li>
                <li><a href="mailto:support@seaintenterprise.com" className="hover:text-cyan-600">Need Funding?</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">Focus</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li>Private Equity</li>
                <li>Venture Capital</li>
                <li>Strategic Advisory</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-gray-500">
                <li><Link href="/privacy" className="hover:text-cyan-600">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-cyan-600">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500">Stay Updated</h4>
              <form action="https://formsubmit.co/support@seaintenterprise.com" method="POST" className="mt-3 flex items-center gap-2">
                <input type="hidden" name="_subject" value="New SEAINT Newsletter Signup" /><input type="hidden" name="_captcha" value="false" /><input type="email" name="email" required placeholder="you@example.com" className="w-full rounded-xl border border-black/5 bg-white px-3 py-2.5 text-xs outline-none placeholder:text-gray-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30" />
                <button type="submit" className="rounded-xl bg-cyan-400 px-4 py-2.5 text-xs font-medium text-white hover:bg-cyan-500">
                  Join
                </button>
              </form>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-black/5 pt-6 text-sm text-gray-500 sm:flex-row sm:items-center">
            <p>Â© 2026 SEAINT Enterprise. All rights reserved.</p>

            <div className="flex items-center gap-4">
              <a href="#top" className="hover:text-cyan-600">Back to top â†‘</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
