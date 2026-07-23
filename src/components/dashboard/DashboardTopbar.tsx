"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Search, Sparkles, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  adminDashboardItems,
  dashboardItems,
} from "@/components/dashboard/DashboardSidebar";

export default function DashboardTopbar({
  studentName,
  isAdmin = false,
}: {
  studentName: string;
  isAdmin?: boolean;
}) {
  const supabase = createClient();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useMemo(
    () => (isAdmin ? [...dashboardItems, ...adminDashboardItems] : dashboardItems),
    [isAdmin],
  );
  const suggestions = query.trim()
    ? items.filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : [];

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#11100e]/72 px-4 py-3 backdrop-blur-2xl sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-white/10 p-2.5 text-white/60 lg:hidden"
              aria-label="Open dashboard menu"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-sm font-medium text-white">Welcome back</p>
              <p className="mt-1 max-w-[140px] truncate text-[10px] text-white/35 sm:max-w-none">
                {studentName}
              </p>
            </div>
          </div>

          <div className="relative hidden max-w-md flex-1 md:block">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <Search size={16} className="text-white/25" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a dashboard section…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/10 bg-[#1b1916] p-2 shadow-2xl">
                {suggestions.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/60 hover:bg-white/5"
                  >
                    <Icon size={16} className="text-[#d8b665]" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/purityos"
              className="hidden items-center gap-2 rounded-full border border-[#d8b665]/20 bg-[#d8b665]/10 px-4 py-2.5 text-xs text-[#e6ca82] sm:flex"
            >
              <Sparkles size={14} />
              PurityOS
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-xs text-white/48 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Close dashboard menu"
          />
          <aside className="relative h-full w-[86%] max-w-xs overflow-y-auto border-r border-white/10 bg-[#151411] p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">
                  Purity of Hearts
                </p>
                <p className="mt-1 text-[10px] text-[#d8b665]">Member Portal</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/10 p-2 text-white/50"
                aria-label="Close menu"
              >
                <X size={17} />
              </button>
            </div>
            <nav className="space-y-1">
              {items.map(({ label, href, icon: Icon }) => {
                const active =
                  pathname === href ||
                  (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                      active
                        ? "bg-[#d8b665] font-medium text-[#17130c]"
                        : "text-white/50"
                    }`}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}

