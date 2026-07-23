import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Community from "@/components/home/Community";
import Testimonials from "@/components/home/Testimonials";
import Shop from "@/components/home/Shop";
import BuildPlatform from "@/components/home/BuildPlatform";
import Newsletter from "@/components/home/Newsletter";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeaturedCourses />
      <section className="relative overflow-hidden bg-[#151411] px-6 py-28 text-white">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a75d]/13 blur-[150px]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
            <div className="rounded-[1.7rem] border border-white/10 bg-[#0d0c0b] p-6 sm:p-8">
              <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8b665]/10 text-[#d8b665]">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">PurityOS</p>
                  <p className="text-[10px] text-white/30">
                    Your private clarity companion
                  </p>
                </div>
              </div>
              <div className="space-y-6 py-9">
                <div className="ml-auto max-w-md rounded-[1.4rem] rounded-br-sm bg-[#d8b665] px-5 py-4 text-sm leading-6 text-[#17130c]">
                  I’m overwhelmed by everything I need to do. Help me choose
                  what matters first.
                </div>
                <p className="max-w-md text-sm leading-7 text-white/58">
                  Let’s make today smaller. Start by naming the one result that
                  would create the most peace or progress this week…
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-4 text-sm text-white/25">
                Ask about business, life, faith, or today…
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b665]">
              New · $50/month
            </p>
            <h2 className="mt-6 max-w-xl font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl">
              A private place to think, reflect, and move forward.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/45">
              PurityOS offers faith-centered business counsel, personal
              reflection, and practical motivation—with saved conversations you
              can return to anytime.
            </p>
            <Link
              href="/purityos"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d8b665] px-7 py-4 text-sm font-semibold text-[#17130c]"
            >
              Discover PurityOS <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Community />
      <Shop />
      <BuildPlatform />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
}
