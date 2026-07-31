"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Brain,
  BriefcaseBusiness,
  BrainCircuit,
  CheckSquare,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  NotebookPen,
  ScrollText,
  Settings,
  Trophy,
  Crown,
  UsersRound,
} from "lucide-react";

export const dashboardItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Journal", href: "/dashboard/journal", icon: NotebookPen },
  { label: "Resource Vault", href: "/dashboard/resources", icon: FolderOpen },
  { label: "Courses", href: "/dashboard/courses", icon: GraduationCap },
  { label: "Lessons", href: "/dashboard/lessons", icon: BookOpen },
  { label: "Quizzes", href: "/dashboard/quizzes", icon: CheckSquare },
  { label: "Cheat Sheets", href: "/dashboard/cheat-sheets", icon: ScrollText },
  { label: "Flashcards", href: "/dashboard/flashcards", icon: Brain },
  { label: "Certificates", href: "/dashboard/certificates", icon: Trophy },
  { label: "Community", href: "/dashboard/community", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const vipDashboardItem = { label: "GTTF VIP", href: "/dashboard/vip", icon: Crown };

export const adminDashboardItems = [
  { label: "Resource Admin", href: "/dashboard/admin/resources", icon: FolderOpen },
  { label: "Consultations", href: "/dashboard/admin/consultations", icon: MessageCircle },
  { label: "Growth CRM", href: "/dashboard/admin/advisory", icon: BriefcaseBusiness },
  { label: "VIP Clients", href: "/dashboard/admin/vip", icon: UsersRound },
  { label: "Coach Intelligence", href: "/dashboard/admin/coach-intelligence", icon: BrainCircuit },
];

export default function DashboardSidebar({
  isAdmin = false,
  isVip = false,
}: {
  isAdmin?: boolean;
  isVip?: boolean;
}) {
  const pathname = usePathname();
  const memberItems = isVip ? [dashboardItems[0], vipDashboardItem, ...dashboardItems.slice(1)] : dashboardItems;
  const items = isAdmin ? [...memberItems, ...adminDashboardItems] : memberItems;

  return (
    <aside className="liquid-glass-dark sticky top-4 m-4 hidden h-[calc(100vh_-_2rem)] w-64 shrink-0 rounded-[2rem] p-4 lg:block">
      <Link href="/" className="mb-6 flex items-center gap-3 rounded-[1.25rem] border border-white/[0.08] bg-white/[0.035] p-3.5">
        <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white text-[9px] font-semibold text-black">
          <span className="absolute inset-0 bg-gradient-to-br from-[#f45aa4]/[0.32] to-[#8b5cf6]/[0.18]" />
          <span className="relative">PH</span>
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">Purity Of Hearts</p>
          <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#ff91c4]">Learning OS</p>
        </div>
      </Link>

      <nav className="max-h-[calc(100vh_-_8rem)] space-y-1 overflow-y-auto pb-6 pr-1">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-gradient-to-r from-[#f45aa4] to-[#8b5cf6] text-white shadow-[0_12px_30px_rgba(244,90,164,.22)]"
                  : "text-white/[0.40] hover:bg-white/[0.055] hover:text-white/[0.78]"
              }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
