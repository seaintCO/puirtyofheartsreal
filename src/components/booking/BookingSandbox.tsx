"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  Clock3,
  LayoutDashboard,
  MessageSquareText,
  Sparkles,
  Users,
} from "lucide-react";

const services = [
  { id: "strategy", name: "Strategy Consultation", duration: "60 min", price: 150 },
  { id: "clarity", name: "Clarity Session", duration: "45 min", price: 95 },
  { id: "leadership", name: "Leadership Intensive", duration: "90 min", price: 225 },
];

const times = ["9:00 AM", "10:30 AM", "1:00 PM", "2:30 PM", "4:00 PM"];

const demoBookings = [
  ["9:00 AM", "Maya Thompson", "Strategy Consultation", "Confirmed"],
  ["10:30 AM", "Jordan Ellis", "Clarity Session", "Confirmed"],
  ["1:00 PM", "Alex Morgan", "Leadership Intensive", "Pending"],
  ["2:30 PM", "Nia Brooks", "Strategy Consultation", "Confirmed"],
];

export default function BookingSandbox() {
  const [mode, setMode] = useState<"booking" | "dashboard">("booking");
  const [dashboardTab, setDashboardTab] = useState("Overview");
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState(services[0].id);
  const [date, setDate] = useState("2026-08-05");
  const [time, setTime] = useState(times[1]);
  const [confirmed, setConfirmed] = useState(false);
  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId)!,
    [serviceId],
  );

  function finish(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setConfirmed(true);
  }

  return (
    <div className="overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0f1110] text-white shadow-[0_50px_140px_rgba(0,0,0,.35)]">
      <div className="flex flex-col border-b border-white/10 bg-white/[0.035] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c9a75d]/12 text-[#dfbe70]">
            <Sparkles size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">SEAINT Booking</p>
            <p className="text-[11px] text-white/35">Interactive client sandbox</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 rounded-full border border-white/10 bg-black/20 p-1 sm:mt-0">
          {[
            ["booking", "Client view"],
            ["dashboard", "Owner view"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setMode(value as "booking" | "dashboard")}
              className={`rounded-full px-4 py-2 text-xs transition ${
                mode === value
                  ? "bg-[#dfbe70] font-semibold text-[#17130d]"
                  : "text-white/45"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {mode === "booking" ? (
        <div className="grid min-h-[650px] lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-white/10 bg-white/[0.02] p-6 lg:border-b-0 lg:border-r">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#dfbe70]">
              Purity of Hearts
            </p>
            <h3 className="mt-4 font-serif text-3xl">Book with Susan</h3>
            <p className="mt-3 text-xs leading-5 text-white/35">
              Choose a session and complete a polished, mobile-friendly booking
              flow.
            </p>
            <div className="mt-8 space-y-4">
              {["Choose service", "Date & time", "Your details"].map(
                (label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                        step > index
                          ? "bg-[#dfbe70] text-[#17130d]"
                          : "border border-white/10 text-white/30"
                      }`}
                    >
                      {step > index + 1 ? <Check size={13} /> : index + 1}
                    </div>
                    <span
                      className={`text-xs ${
                        step === index + 1 ? "text-white/75" : "text-white/30"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ),
              )}
            </div>
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-medium">{selectedService.name}</p>
              <p className="mt-2 text-[11px] text-white/35">
                {selectedService.duration} · ${selectedService.price}
              </p>
              {step > 1 && (
                <p className="mt-3 text-[11px] text-[#dfbe70]">
                  {date} at {time}
                </p>
              )}
            </div>
          </aside>

          <div className="flex items-center justify-center p-5 sm:p-10">
            <div className="w-full max-w-2xl">
              {confirmed ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dfbe70] text-[#17130d]">
                    <Check size={27} />
                  </div>
                  <h3 className="mt-7 font-serif text-4xl">You’re booked.</h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45">
                    A real system can collect payment, send confirmations and
                    reminders, update the owner dashboard, and sync the client
                    record automatically.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmed(false);
                      setStep(1);
                    }}
                    className="mt-8 rounded-full border border-white/10 px-6 py-3 text-sm text-white/60"
                  >
                    Try again
                  </button>
                </div>
              ) : step === 1 ? (
                <div>
                  <p className="text-xs font-medium text-[#dfbe70]">Step 1 of 3</p>
                  <h3 className="mt-3 font-serif text-4xl">Choose your session.</h3>
                  <div className="mt-7 space-y-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setServiceId(service.id)}
                        className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                          serviceId === service.id
                            ? "border-[#dfbe70]/50 bg-[#dfbe70]/10"
                            : "border-white/10 bg-white/[0.025] hover:bg-white/[0.05]"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-medium">{service.name}</p>
                          <p className="mt-2 text-xs text-white/35">
                            {service.duration}
                          </p>
                        </div>
                        <p className="text-sm text-[#dfbe70]">${service.price}</p>
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-[#dfbe70] px-6 py-4 text-sm font-semibold text-[#17130d]"
                  >
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              ) : step === 2 ? (
                <div>
                  <p className="text-xs font-medium text-[#dfbe70]">Step 2 of 3</p>
                  <h3 className="mt-3 font-serif text-4xl">Pick a date and time.</h3>
                  <label className="mt-7 block text-xs text-white/45">
                    Date
                    <input
                      type="date"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm text-white outline-none [color-scheme:dark]"
                    />
                  </label>
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {times.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTime(item)}
                        className={`rounded-xl border px-4 py-3 text-xs transition ${
                          time === item
                            ? "border-[#dfbe70]/50 bg-[#dfbe70]/10 text-[#efd48a]"
                            : "border-white/10 text-white/45"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="mt-7 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm text-white/55"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#dfbe70] px-6 py-3.5 text-sm font-semibold text-[#17130d]"
                    >
                      Continue <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={finish}>
                  <p className="text-xs font-medium text-[#dfbe70]">Step 3 of 3</p>
                  <h3 className="mt-3 font-serif text-4xl">Complete your booking.</h3>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <input
                      required
                      placeholder="Full name"
                      className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm outline-none placeholder:text-white/25"
                    />
                    <input
                      required
                      type="email"
                      placeholder="Email address"
                      className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm outline-none placeholder:text-white/25"
                    />
                    <input
                      placeholder="Phone number"
                      className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm outline-none placeholder:text-white/25 sm:col-span-2"
                    />
                    <textarea
                      rows={4}
                      placeholder="What would you like to work on?"
                      className="resize-none rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-4 text-sm outline-none placeholder:text-white/25 sm:col-span-2"
                    />
                  </div>
                  <p className="mt-4 text-[11px] text-white/25">
                    Sandbox only—no payment or real appointment will be created.
                  </p>
                  <div className="mt-7 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3.5 text-sm text-white/55"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                    <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#dfbe70] px-6 py-3.5 text-sm font-semibold text-[#17130d]">
                      Confirm demo booking <Check size={16} />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid min-h-[650px] lg:grid-cols-[220px_1fr]">
          <aside className="border-b border-white/10 bg-white/[0.02] p-4 lg:border-b-0 lg:border-r">
            <p className="px-3 py-4 text-[10px] uppercase tracking-[0.2em] text-white/30">
              Command center
            </p>
            {[
              ["Overview", LayoutDashboard],
              ["Bookings", CalendarDays],
              ["Clients", Users],
              ["Messages", MessageSquareText],
              ["Analytics", BarChart3],
            ].map(([label, Icon]: any) => (
              <button
                key={label}
                type="button"
                onClick={() => setDashboardTab(label)}
                className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  dashboardTab === label
                    ? "bg-[#dfbe70] font-medium text-[#17130d]"
                    : "text-white/40 hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </aside>
          <div className="p-5 sm:p-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-[#dfbe70]">Owner dashboard</p>
                <h3 className="mt-2 text-3xl font-semibold">{dashboardTab}</h3>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] text-emerald-300">
                Demo data
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                ["Today’s bookings", "4", CalendarDays],
                ["New leads", "18", Users],
                ["Response rate", "94%", MessageSquareText],
                ["Booked revenue", "$3,870", BarChart3],
              ].map(([label, value, Icon]: any) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
                >
                  <Icon size={17} className="text-[#dfbe70]" />
                  <p className="mt-5 text-2xl font-semibold">{value}</p>
                  <p className="mt-2 text-xs text-white/35">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Today’s schedule</p>
                  <Clock3 size={16} className="text-white/25" />
                </div>
                <div className="mt-5 space-y-2">
                  {demoBookings.map(([bookingTime, name, service, status]) => (
                    <div
                      key={`${bookingTime}-${name}`}
                      className="grid grid-cols-[70px_1fr_auto] items-center gap-3 rounded-xl border border-white/8 bg-black/15 px-4 py-3"
                    >
                      <p className="text-xs text-[#dfbe70]">{bookingTime}</p>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium">{name}</p>
                        <p className="mt-1 truncate text-[10px] text-white/30">
                          {service}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] ${
                          status === "Confirmed"
                            ? "bg-emerald-400/10 text-emerald-300"
                            : "bg-amber-400/10 text-amber-300"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                <p className="text-sm font-medium">Weekly bookings</p>
                <div className="mt-8 flex h-44 items-end justify-between gap-2">
                  {[40, 65, 52, 88, 72, 96, 62].map((height, index) => (
                    <div key={index} className="flex flex-1 flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#8f6e30] to-[#e6cb84]"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] text-white/25">
                        {["M", "T", "W", "T", "F", "S", "S"][index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

