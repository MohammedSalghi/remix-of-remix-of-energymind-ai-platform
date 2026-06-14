import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, StatCard, Badge } from "@/components/ui-bits";
import { energyMonthly, optimizations } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, ReferenceLine } from "recharts";
import { Flame, Leaf, Zap, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  component: Analytics,
});

function Analytics() {
  return (
    <div className="space-y-6">
      <PageHeader title="تحليلات الطاقة" subtitle="ذكاء الاستهلاك والحرق والكفاءة عبر جميع المنشآت" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="الطاقة المستهلكة" value="358 GWh" delta="-13% مقارنةً بيناير" icon={Zap} accent="cyan"/>
        <StatCard label="حجم غاز الحرق" value="49 MMscf" delta="-44% منذ بداية العام" icon={Flame} accent="amber"/>
        <StatCard label="انبعاثات CO₂" value="412 kt" delta="-22% منذ بداية العام" icon={Leaf} accent="success"/>
        <StatCard label="وفورات التكلفة" value="3.4M$" delta="بفضل الذكاء الاصطناعي" icon={TrendingDown} accent="cyan"/>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <h2 className="font-display text-base font-semibold mb-1">استهلاك الطاقة مقابل الهدف</h2>
          <p className="text-xs text-muted-foreground mb-4">شهري · جيجاواط/ساعة</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={energyMonthly}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)"/>
                <XAxis dataKey="m" stroke="oklch(0.68 0.02 250)" fontSize={11}/>
                <YAxis stroke="oklch(0.68 0.02 250)" fontSize={11}/>
                <Tooltip contentStyle={{ background:"oklch(0.21 0.028 252)", border:"1px solid oklch(1 0 0 / 0.1)", borderRadius:8, fontSize:12 }}/>
                <Legend wrapperStyle={{ fontSize: 11 }}/>
                <Bar dataKey="consumption" fill="oklch(0.78 0.14 195)" radius={[4,4,0,0]}/>
                <Line type="monotone" dataKey="target" stroke="oklch(0.78 0.16 70)" strokeWidth={2} strokeDasharray="4 4" dot={false}/>
                <ReferenceLine y={380} stroke="transparent"/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-display text-base font-semibold mb-1">اتجاه غاز الحرق</h2>
          <p className="text-xs text-muted-foreground mb-4">MMscf شهرياً</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={energyMonthly}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)"/>
                <XAxis dataKey="m" stroke="oklch(0.68 0.02 250)" fontSize={11}/>
                <YAxis stroke="oklch(0.68 0.02 250)" fontSize={11}/>
                <Tooltip contentStyle={{ background:"oklch(0.21 0.028 252)", border:"1px solid oklch(1 0 0 / 0.1)", borderRadius:8, fontSize:12 }}/>
                <Bar dataKey="flare" fill="oklch(0.78 0.16 70)" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-base font-semibold">توصيات التحسين بالذكاء الاصطناعي</h2>
            <p className="text-xs text-muted-foreground">إجراءات مرتبة مع وفورات تقديرية</p>
          </div>
          <Badge tone="info">{optimizations.length} نشطة</Badge>
        </div>
        <div className="space-y-3">
          {optimizations.map(o => (
            <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background/40 p-4 hover:border-primary/40">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Badge tone={o.impact==="high"?"danger":o.impact==="medium"?"warning":"info"}>{o.impact}</Badge>
                  <h3 className="text-sm font-semibold">{o.title}</h3>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-[oklch(0.72_0.17_155)]"/> {o.saving}</span>
                  <span className="flex items-center gap-1"><Leaf className="h-3 w-3 text-[oklch(0.72_0.17_155)]"/> {o.co2}</span>
                </div>
              </div>
              <button className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20">جدولة الإجراء</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
