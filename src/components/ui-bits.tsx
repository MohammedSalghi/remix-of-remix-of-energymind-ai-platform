import type { ReactNode } from "react";

export function PageHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </div>
  );
}

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-xl border border-border bg-card/60 ${className}`}>{children}</div>;
}

export function StatCard({ label, value, delta, accent = "cyan", icon: Icon }: { label: string; value: string; delta?: string; accent?: "cyan" | "amber" | "success" | "danger"; icon?: React.ComponentType<{ className?: string }> }) {
  const accentBg = {
    cyan: "bg-[oklch(0.78_0.14_195)/12%] text-[oklch(0.78_0.14_195)]",
    amber: "bg-[oklch(0.78_0.16_70)/12%] text-[oklch(0.78_0.16_70)]",
    success: "bg-[oklch(0.72_0.17_155)/12%] text-[oklch(0.72_0.17_155)]",
    danger: "bg-[oklch(0.65_0.22_25)/12%] text-[oklch(0.65_0.22_25)]",
  }[accent];
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-2 font-display text-3xl font-bold">{value}</div>
          {delta && <div className="mt-1 text-xs text-muted-foreground">{delta}</div>}
        </div>
        {Icon && (
          <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${accentBg}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </Card>
  );
}

export function HealthDot({ h }: { h: "good" | "warning" | "critical" }) {
  const c = h === "good" ? "bg-[oklch(0.72_0.17_155)]" : h === "warning" ? "bg-[oklch(0.82_0.16_85)]" : "bg-[oklch(0.65_0.22_25)]";
  return <span className={`inline-block h-2.5 w-2.5 rounded-full ${c}`} />;
}

export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "danger" | "info" }) {
  const styles = {
    neutral: "bg-muted text-muted-foreground border-border",
    success: "bg-[oklch(0.72_0.17_155)/12%] text-[oklch(0.78_0.17_155)] border-[oklch(0.72_0.17_155)/30%]",
    warning: "bg-[oklch(0.82_0.16_85)/12%] text-[oklch(0.82_0.16_85)] border-[oklch(0.82_0.16_85)/30%]",
    danger: "bg-[oklch(0.65_0.22_25)/12%] text-[oklch(0.75_0.18_25)] border-[oklch(0.65_0.22_25)/30%]",
    info: "bg-[oklch(0.78_0.14_195)/12%] text-[oklch(0.78_0.14_195)] border-[oklch(0.78_0.14_195)/30%]",
  }[tone];
  return <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${styles}`}>{children}</span>;
}
