import {
  CalendarDays,
  Clock3,
  Compass,
  HeartHandshake,
  Target,
  Video,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export const metadata = {
  title: "Book a Growth Strategy Call",
  description:
    "Request a private consultation or growth strategy call with Susan Wagner to discuss vision, positioning, growth, leadership, and next steps.",
};

export default function ConsultationPage() {
  return (
    <main className="liquid-page text-[#111116]">
      <Navbar />
      <section className="relative px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="liquid-grid pointer-events-none absolute inset-0 opacity-45" />
        <div className="liquid-orb left-[-10rem] top-[-8rem] h-[32rem] w-[32rem] bg-[#ff9dcc]/[0.30]" />
        <div className="liquid-orb bottom-[-12rem] right-[-9rem] h-[34rem] w-[34rem] bg-[#78a8ff]/[0.25]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <div className="liquid-glass-soft inline-flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/[0.46]">
              <span className="pink-dot h-1.5 w-1.5 rounded-full bg-[#ff4fa3]" />
              Purity Of Hearts
            </div>
            <h1 className="liquid-title public-hero-title-split mt-7 font-semibold">
              A focused call for <span className="liquid-gradient-text">what comes next.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-black/[0.47]">
              Meet privately with Susan to clarify the vision, identify the
              most important business constraint, and determine the strongest
              next step for growth.
            </p>

            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
              {[
                [Video, "Private video conversation"],
                [Clock3, "Focused strategy session"],
                [Compass, "Vision and positioning"],
                [Target, "Practical next steps"],
                [HeartHandshake, "Direct, honest guidance"],
                [CalendarDays, "Request a preferred time"],
              ].map(([Icon, label]) => {
                const ItemIcon = Icon as typeof Video;
                return (
                  <div key={label as string} className="liquid-glass-soft flex items-center gap-3 rounded-2xl p-4 text-sm text-black/[0.58]">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4fa3]/[0.10] text-[#e83491]">
                      <ItemIcon size={17} />
                    </span>
                    {label as string}
                  </div>
                );
              })}
            </div>
          </div>

          <ConsultationForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
