import { createFileRoute } from "@tanstack/react-router";
import { Card, StatCard, PageHeader, HealthDot, Badge } from "@/components/ui-bits";
import { assets, sensorTrend, alerts } from "@/lib/mock-data";
import { Boxes, Activity, AlertTriangle, Gauge } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

export const Route = createFileRoute("/app/")({
  component: Overview,
});

function Overview() {
  return (
    <div className="space-y-6">
      <PageHeader title="نظرة عامة على العمليات" subtitle="ذكاء لحظي لأصول النفط والغاز عبر منشآت الإنتاج والنقل في ليبيا" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الأصول النشطة" value="1,284" delta="+12 هذا الأسبوع" icon={Boxes} accent="cyan" />
        <StatCard label="صحة المعدات" value="87%" delta="متوسط الأسطول · مستقر" icon={Activity} accent="success" />
        <StatCard label="التنبيهات النشطة" value="7" delta="2 حرجة · 3 تحذيرية" icon={AlertTriangle} accent="amber" />
        <StatCard label="كفاءة الطاقة" value="92.4%" delta="+1.8% مقابل الهدف" icon={Gauge} accent="cyan" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
            <div>
              <h2 className="font-display text-base font-semibold">اتجاهات الحساسات · الضاغط C-204</h2>
              <p className="text-xs text-muted-foreground">آخر 30 يوماً · الحرارة والضغط والاهتزاز</p>
            </div>
            <div className="flex gap-2 text-xs">
              {["24h","7d","30d","90d"].map(x => <button key={x} className={`rounded-md border px-2 py-1 ${x==="30d"?"border-primary/40 bg-primary/10 text-primary":"border-border text-muted-foreground"}`}>{x}</button>)}
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sensorTrend}>
                <defs>
                  <linearGradient id="ct" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.14 195)" stopOpacity={0.5}/><stop offset="100%" stopColor="oklch(0.78 0.14 195)" stopOpacity={0}/></linearGradient>
                  <linearGradient id="cp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="oklch(0.78 0.16 70)" stopOpacity={0.4}/><stop offset="100%" stopColor="oklch(0.78 0.16 70)" stopOpacity={0}/></linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="day" stroke="oklch(0.68 0.02 250)" fontSize={11} />
                <YAxis stroke="oklch(0.68 0.02 250)" fontSize={11} />
                <Tooltip contentStyle={{ background: "oklch(0.21 0.028 252)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }}/>
                <Area type="monotone" dataKey="temperature" stroke="oklch(0.78 0.14 195)" strokeWidth={2} fill="url(#ct)" />
                <Area type="monotone" dataKey="pressure" stroke="oklch(0.78 0.16 70)" strokeWidth={2} fill="url(#cp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-semibold">التنبيهات اللحظية</h2>
            <Badge tone="info">{alerts.length}</Badge>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin pe-1">
            {alerts.map(a => (
              <div key={a.id} className="rounded-lg border border-border bg-background/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold truncate">{a.asset}</span>
                  <Badge tone={a.severity==="critical"?"danger":a.severity==="warning"?"warning":"info"}>{a.severity}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.message}</p>
                <div className="mt-1 text-[10px] text-muted-foreground">{a.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-base font-semibold">حالة المعدات</h2>
          <span className="text-xs text-muted-foreground">{assets.length} أصل قيد المراقبة</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {assets.map(a => (
            <div key={a.id} className="group rounded-lg border border-border bg-background/40 p-4 transition hover:border-primary/40">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <HealthDot h={a.health} />
                    <span className="text-sm font-semibold truncate">{a.name}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground truncate">{a.location}</div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground shrink-0">{a.id}</span>
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">الصحة</div>
                  <div className="font-display text-2xl font-bold">{a.healthScore}</div>
                </div>
                <div className="text-end">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">المخاطر</div>
                  <div className={`font-display text-lg font-bold ${a.failureRisk>60?"text-[oklch(0.65_0.22_25)]":a.failureRisk>25?"text-[oklch(0.82_0.16_85)]":"text-[oklch(0.72_0.17_155)]"}`}>{a.failureRisk}%</div>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className={`h-full ${a.healthScore>80?"bg-[oklch(0.72_0.17_155)]":a.healthScore>55?"bg-[oklch(0.82_0.16_85)]":"bg-[oklch(0.65_0.22_25)]"}`} style={{width:`${a.healthScore}%`}}/>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
