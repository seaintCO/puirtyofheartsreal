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

const items = [
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
  { label: "Resource Admin", href: "/dashboard/admin/resources", icon: FolderOpen },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-[#151515] p-5 lg:block">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white">
          Purity of Hearts
        </p>
        <p className="mt-2 text-xs text-white/35">
          Student Portal
        </p>
      </div>

      <nav className="space-y-2">
        {items.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-[#C9A75D] text-[#111]"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
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
