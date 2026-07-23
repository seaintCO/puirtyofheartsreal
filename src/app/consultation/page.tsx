import { CalendarDays, Clock3, HeartHandshake, Video } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ConsultationForm from "@/components/consultation/ConsultationForm";

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-[#f7f0e7]">
      <Navbar />
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-[#e8c9cb]/40 blur-[130px]" />
        <div className="absolute bottom-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[#c9a75d]/20 blur-[140px]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_560px] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a88643]">
              Private 1:1 consultation
            </p>
            <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[1.03] tracking-tight text-[#1f1f1f] sm:text-7xl">
              A focused hour for what matters now.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#1f1f1f]/58">
              Meet privately with Susan to talk through business, leadership,
              personal growth, faith, or a transition where you need clarity
              and a grounded plan.
            </p>
            <div className="mt-9 grid max-w-xl gap-3 sm:grid-cols-2">
              {[
                [Video, "Private video consultation"],
                [Clock3, "Focused 60-minute session"],
                [HeartHandshake, "Personal, faith-conscious support"],
                [CalendarDays, "Choose your preferred date"],
              ].map(([Icon, label]: any) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/45 p-4 text-sm text-[#1f1f1f]/65 backdrop-blur-xl"
                >
                  <Icon size={18} className="text-[#a88643]" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <ConsultationForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
