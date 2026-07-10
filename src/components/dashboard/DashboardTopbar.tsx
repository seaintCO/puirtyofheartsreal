"use client";

import { Bell, LogOut, Menu, Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardTopbar({
  studentName,
}: {
  studentName: string;
}) {
  const supabase = createClient();

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="border-b border-white/10 bg-[#111]/90 px-5 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-white">Welcome back</p>
          <p className="mt-1 text-xs text-white/40">{studentName}</p>
        </div>

        <div className="hidden max-w-md flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 md:flex">
          <Search size={17} className="text-white/30" />
          <input
            placeholder="Search lessons, resources, notes..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/10 bg-white/[0.04] p-3 text-white/55 transition hover:text-white">
            <Bell size={18} />
          </button>

          <button
            onClick={signOut}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/55 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
