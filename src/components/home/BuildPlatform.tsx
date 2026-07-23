import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Users,
} from "lucide-react";

export default function BuildPlatform() {
  return (
    <section className="bg-[#f5f5f7] px-5 py-24 sm:px-8 sm:py-32 lg:py-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8a6b31]">
            Purity member benefit
          </p>
          <h2 className="mt-6 text-[clamp(2.8rem,6vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-[#111]">
            A better way to get booked.
          </h2>
          <p className="mt-7 max-w-lg text-base leading-7 text-[#1d1d1f]/58 sm:text-lg sm:leading-8">
            Purity of Hearts partners with SEAINT Booking to offer preferred
            pricing on branded booking systems with appointments, payments,
            reminders, leads, and a clear business dashboard.
          </p>
          <div className="mt-7 space-y-3">
            {[
              "Designed around your business and brand",
              "Bilingual booking available",
              "Member pricing discussed during consultation",
            ].map((item) => (
              <p
                key={item}
                className="flex items-center gap-3 text-sm text-[#1d1d1f]/58"
              >
                <Check size={15} className="text-[#8a6b31]" />
                {item}
              </p>
            ))}
          </div>
          <Link
            href="/booking-sandbox"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#111] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#8c6b30]"
          >
            Try the booking sandbox <ArrowRight size={15} />
          </Link>
        </div>

        <div className="rounded-[2rem] border border-black/[0.06] bg-white p-3 shadow-[0_28px_90px_rgba(0,0,0,.09)] sm:p-4">
          <div className="rounded-[1.45rem] bg-[#101010] p-5 text-white sm:p-7">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm font-semibold">SEAINT Booking</p>
                <p className="mt-1 text-[11px] text-white/35">
                  Business overview
                </p>
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1.5 text-[10px] text-emerald-300">
                Interactive demo
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                [CalendarDays, "12", "Bookings"],
                [Users, "38", "Leads"],
                [BarChart3, "$4.8k", "Booked"],
              ].map(([Icon, value, label]: any) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:p-4"
                >
                  <Icon size={15} className="text-[#d9bb6d]" />
                  <p className="mt-5 text-lg font-semibold sm:text-xl">{value}</p>
                  <p className="mt-1 text-[9px] text-white/30 sm:text-[10px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <p className="text-xs font-semibold">Today</p>
              <div className="mt-4 divide-y divide-white/10">
                {[
                  ["9:00", "Strategy consultation", "Confirmed"],
                  ["11:30", "Business clarity", "Confirmed"],
                  ["2:00", "Leadership session", "Pending"],
                ].map(([time, service, status]) => (
                  <div
                    key={`${time}-${service}`}
                    className="grid grid-cols-[42px_1fr] gap-3 py-3 text-[10px] sm:grid-cols-[52px_1fr_auto]"
                  >
                    <span className="text-[#d9bb6d]">{time}</span>
                    <span className="truncate text-white/58">{service}</span>
                    <span className="hidden text-white/28 sm:block">{status}</span>
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
