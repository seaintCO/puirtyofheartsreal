"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Brain,
  CheckSquare,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MessageCircle,
  NotebookPen,
  ScrollText,
  Settings,
  Trophy,
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

export const adminDashboardItems = [
  { label: "Resource Admin", href: "/dashboard/admin/resources", icon: FolderOpen },
  { label: "Consultations", href: "/dashboard/admin/consultations", icon: MessageCircle },
];

export default function DashboardSidebar({
  isAdmin = false,
}: {
  isAdmin?: boolean;
}) {
  const pathname = usePathname();
  const items = isAdmin
    ? [...dashboardItems, ...adminDashboardItems]
    : dashboardItems;

  return (
    <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-black/20 p-5 backdrop-blur-2xl lg:block">
      <div className="mb-7 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
          Purity of Hearts
        </p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-[#d8b665]">
          Member Portal
        </p>
      </div>

      <nav className="space-y-1 overflow-y-auto pb-6">
        {items.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-[#d8b665] text-[#15120c] shadow-lg"
                  : "text-white/42 hover:bg-white/[0.06] hover:text-white/80"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
