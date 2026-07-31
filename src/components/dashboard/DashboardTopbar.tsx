"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { LogOut, Menu, Search, Sparkles, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  adminDashboardItems,
  dashboardItems,
  vipDashboardItem,
} from "@/components/dashboard/DashboardSidebar";

export default function DashboardTopbar({
  studentName,
  isAdmin = false,
  isVip = false,
}: {
  studentName: string;
  isAdmin?: boolean;
  isVip?: boolean;
}) {
  const supabase = createClient();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const items = useMemo(
    () => {
      const memberItems = isVip ? [dashboardItems[0], vipDashboardItem, ...dashboardItems.slice(1)] : dashboardItems;
      return isAdmin ? [...memberItems, ...adminDashboardItems] : memberItems;
    },
    [isAdmin, isVip],
  );
  const suggestions = query.trim()
    ? items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <>
      <header className="liquid-glass-dark sticky top-4 z-30 mx-4 mt-4 rounded-[1.6rem] px-4 py-3 sm:mx-6 sm:px-5 lg:ml-0 lg:mr-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-full border border-white/[0.10] bg-white/[0.045] backdrop-blur-2xl p-2.5 text-white/[0.60] lg:hidden"
              aria-label="Open dashboard menu"
            >
              <Menu size={18} />
            </button>
            <div>
              <p className="text-sm font-medium text-white">Welcome back</p>
              <p className="mt-1 max-w-[140px] truncate text-[10px] text-white/[0.32] sm:max-w-none">{studentName}</p>
            </div>
          </div>

          <div className="relative hidden max-w-md flex-1 md:block">
            <div className="flex items-center gap-3 rounded-full border border-white/[0.10] bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
              <Search size={15} className="text-white/[0.24]" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Find a dashboard section…"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/[0.23]"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="liquid-glass-dark absolute left-0 right-0 top-[calc(100%_+_8px)] overflow-hidden rounded-2xl p-2">
                {suggestions.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setQuery("")}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/[0.58] hover:bg-white/[0.05]"
                  >
                    <Icon size={16} className="text-[#f472b6]" />
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/purityos"
              className="hidden items-center gap-2 rounded-full border border-[#f472b6]/[0.20] bg-[#f472b6]/[0.10] px-4 py-2.5 text-xs text-[#ff9ac8] sm:flex"
            >
              <Sparkles size={14} />
              PurityOS
            </Link>
            <button
              type="button"
              onClick={signOut}
              className="flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.035] px-4 py-2.5 text-xs text-white/[0.45] transition hover:bg-white/[0.07] hover:text-white"
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
            className="absolute inset-0 bg-black/[0.65] backdrop-blur-md"
            aria-label="Close dashboard menu"
          />
          <aside className="liquid-glass-dark relative m-3 h-[calc(100%_-_1.5rem)] w-[86%] max-w-xs overflow-y-auto rounded-[2rem] p-5">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em]">Purity Of Hearts</p>
                <p className="mt-1 text-[10px] text-[#ff91c4]">Learning OS</p>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-white/[0.10] p-2 text-white/[0.50]"
                aria-label="Close menu"
              >
                <X size={17} />
              </button>
            </div>
            <nav className="space-y-1">
              {items.map(({ label, href, icon: Icon }) => {
                const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                      active
                        ? "bg-gradient-to-r from-[#f45aa4] to-[#8b5cf6] font-medium text-white"
                        : "text-white/[0.48]"
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
