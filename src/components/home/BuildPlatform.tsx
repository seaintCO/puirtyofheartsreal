import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BarChart3,
  CalendarDays,
  Check,
  MessageSquareText,
  Users,
} from "lucide-react";

export default function BuildPlatform() {
  return (
    <section className="relative overflow-hidden bg-[#ece3d7] px-6 py-28">
      <div className="absolute bottom-[-40%] right-[-15%] h-[800px] w-[800px] rounded-full bg-[#c9a75d]/20 blur-[150px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1f1f1f]/8 bg-white/45 px-4 py-2 text-xs text-[#84662f] backdrop-blur-xl">
            <BadgePercent size={14} />
            Member partner benefit
          </div>
          <h2 className="mt-7 max-w-xl font-serif text-5xl leading-[1.02] tracking-tight text-[#1f1f1f] sm:text-6xl">
            Need a better way for clients to book you?
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#1f1f1f]/55">
            Purity of Hearts partners with SEAINT Booking to offer members
            preferred pricing on branded booking systems with appointments,
            payments, reminders, leads, and a business dashboard.
          </p>
          <div className="mt-7 space-y-3">
            {[
              "Built around your business and brand",
              "Bilingual booking available",
              "Member discount discussed during consultation",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-[#1f1f1f]/58"
              >
                <Check size={16} className="text-[#94712f]" />
                {item}
              </div>
            ))}
          </div>
          <Link
            href="/booking-sandbox"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#1f1f1f] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#9a7838]"
          >
            Try the booking sandbox <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-[2.2rem] border border-white/75 bg-white/48 p-3 shadow-[0_40px_120px_rgba(70,45,10,.12)] backdrop-blur-2xl">
          <div className="rounded-[1.7rem] bg-[#121311] p-5 text-white sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-medium">SEAINT Booking</p>
                <p className="mt-1 text-[10px] text-white/30">
                  Business command center
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[9px] text-emerald-300">
                Demo
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                [CalendarDays, "12", "Bookings"],
                [Users, "38", "Leads"],
                [BarChart3, "$4.8k", "Booked"],
              ].map(([Icon, value, label]: any) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"
                >
                  <Icon size={16} className="text-[#dfbe70]" />
                  <p className="mt-5 text-xl font-semibold">{value}</p>
                  <p className="mt-1 text-[10px] text-white/30">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Today’s bookings</p>
                <MessageSquareText size={15} className="text-white/25" />
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ["9:00", "Strategy Consultation", "Confirmed"],
                  ["11:30", "Business Clarity", "Confirmed"],
                  ["2:00", "Leadership Session", "Pending"],
                ].map(([time, service, status]) => (
                  <div
                    key={`${time}-${service}`}
                    className="grid grid-cols-[45px_1fr_auto] items-center gap-3 rounded-xl bg-black/15 px-3 py-3"
                  >
                    <span className="text-[10px] text-[#dfbe70]">{time}</span>
                    <span className="truncate text-[10px] text-white/55">
                      {service}
                    </span>
                    <span className="text-[9px] text-white/25">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

