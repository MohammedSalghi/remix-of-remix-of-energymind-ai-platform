import { Link, Outlet, useRouterState, createFileRoute } from "@tanstack/react-router";
import { Brand } from "@/components/Brand";
import { LayoutDashboard, Activity, Bot, Gauge, ShieldAlert, FileText, Settings, Bell, Search } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app", label: "نظرة عامة", icon: LayoutDashboard, exact: true },
  { to: "/app/maintenance", label: "الصيانة التنبؤية", icon: Activity },
  { to: "/app/assistant", label: "المساعد الذكي", icon: Bot },
  { to: "/app/analytics", label: "تحليلات الطاقة", icon: Gauge },
  { to: "/app/risk", label: "إدارة المخاطر", icon: ShieldAlert },
  { to: "/app/reports", label: "التقارير", icon: FileText },
  { to: "/app/settings", label: "الإعدادات", icon: Settings },
];

function AppLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = nav.find((n) => (n.exact ? path === n.to : path.startsWith(n.to))) ?? nav[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 start-0 z-40 hidden w-64 flex-col border-e border-border bg-sidebar lg:flex">
        <div className="flex h-16 items-center border-b border-sidebar-border px-5">
          <Brand size="sm" />
        </div>
        <nav className="flex-1 space-y-1 px-3 py-5 scrollbar-thin overflow-y-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact ? path === item.to : path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-4">
          <div className="rounded-lg bg-card/60 p-3 text-xs text-muted-foreground">
            <div className="font-semibold text-foreground">حالة النظام</div>
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[oklch(0.72_0.17_155)] pulse-ring" />
              جميع الخدمات تعمل بكفاءة
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ps-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="lg:hidden"><Brand size="sm" /></div>
            <h1 className="hidden truncate font-display text-lg font-semibold lg:block">{active.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs text-muted-foreground">
              <Search className="h-3.5 w-3.5" />
              <span>بحث في الأصول والتقارير…</span>
            </div>
            <button className="relative rounded-md border border-border bg-card/50 p-2 hover:border-primary/50">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 end-1.5 h-1.5 w-1.5 rounded-full bg-[oklch(0.78_0.16_70)]" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[oklch(0.78_0.14_195)] to-[oklch(0.55_0.18_220)] grid place-items-center text-xs font-bold text-background">EM</div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="lg:hidden border-b border-border bg-card/30 overflow-x-auto scrollbar-thin">
          <div className="flex gap-1 px-3 py-2 w-max">
            {nav.map((item) => {
              const isActive = item.exact ? path === item.to : path.startsWith(item.to);
              return (
                <Link key={item.to} to={item.to} className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs ${isActive ? "bg-primary/15 text-primary" : "text-muted-foreground"}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
