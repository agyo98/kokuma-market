"use client";

import { useCallback, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  children: ReactNode;
};

const navigationItems = [
  {
    href: "/dashboard",
    label: "대시보드",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/tasks",
    label: "태스크",
    icon: CheckSquare,
  },
  {
    href: "/dashboard/reports",
    label: "리포트",
    icon: BarChart3,
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, refresh } = useCurrentUser();

  const handleSignOut = useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    await supabase.auth.signOut();
    await refresh();
    router.replace("/");
  }, [refresh, router]);

  return (
    <div className="flex min-h-screen bg-grayscale-100">
      <aside className="hidden w-64 border-r border-grayscale-200 bg-white md:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-grayscale-200 p-6">
            <h1 className="text-xl font-bold text-grayscale-900">
              프로젝트 관리
            </h1>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-main text-white"
                      : "text-grayscale-700 hover:bg-grayscale-100"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-grayscale-200 p-4">
            <div className="mb-3 px-3 text-xs text-grayscale-500">
              {user?.email ?? "알 수 없는 사용자"}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="w-full justify-start gap-2 text-grayscale-700"
            >
              <LogOut className="h-4 w-4" />
              로그아웃
            </Button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-grayscale-200 bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-semibold text-grayscale-900">
                대시보드
              </h2>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-grayscale-600">
                {user?.email ?? "알 수 없는 사용자"}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

