import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Community from "@/components/home/Community";
import Shop from "@/components/home/Shop";
import BuildPlatform from "@/components/home/BuildPlatform";
import Newsletter from "@/components/home/Newsletter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <section className="bg-[#050505] px-5 py-24 text-white sm:px-8 sm:py-32 lg:py-40">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#c8a85d]">
              PurityOS · $50 per month
            </p>
            <h2 className="mt-6 text-[clamp(2.8rem,7vw,5.4rem)] font-semibold leading-[0.96] tracking-[-0.055em]">
              Clarity, when you need it.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/55 sm:text-lg sm:leading-8">
              A private, faith-centered companion for business decisions, hard
              seasons, and the next honest step. Conversations are saved to
              your account so you can return to them.
            </p>
            <Link
              href="/purityos"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-[#e7d49e]"
            >
              Explore PurityOS <ArrowRight size={15} />
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#111] p-5 shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-semibold">PurityOS</p>
                <p className="mt-1 text-xs text-white/35">Private conversation</p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="space-y-6 py-9">
              <div className="ml-auto max-w-md rounded-3xl rounded-br-md bg-[#e3c878] px-5 py-4 text-sm leading-6 text-[#17130c]">
                I have too many priorities. Help me decide what deserves my
                attention this week.
              </div>
              <p className="max-w-md text-sm leading-7 text-white/65">
                Let’s reduce the noise. We’ll separate what is urgent, what
                creates meaningful progress, and what can wait. Start with the
                one outcome that would make Friday feel lighter.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 px-5 py-4 text-sm text-white/30">
              Ask about business, life, faith, or today…
            </div>
          </div>
        </div>
      </section>
      <Community />
      <Shop />
      <BuildPlatform />
      <Newsletter />
      <Footer />
    </main>
  );
}
