import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, PageHeader, HealthDot, Badge } from "@/components/ui-bits";
import { assets, sensorTrend } from "@/lib/mock-data";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Calendar, Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/app/maintenance")({
  component: Maintenance,
});

function Maintenance() {
  const [selectedId, setSelectedId] = useState(assets[2].id);
  const selected = assets.find(a => a.id === selectedId)!;

  return (
    <div className="space-y-6">
      <PageHeader title="الصيانة التنبؤية" subtitle="توقعات الأعطال بالذكاء الاصطناعي مع توصيات هندسية مرتبة" />

      <Card>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start">الأصل</th>
                <th className="px-4 py-3 text-start">الموقع</th>
                <th className="px-4 py-3 text-start">الصحة</th>
                <th className="px-4 py-3 text-start">المخاطر المتوقعة</th>
                <th className="px-4 py-3 text-start">الإجراء الموصى به</th>
                <th className="px-4 py-3 text-start">آخر فحص</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(a => (
                <tr key={a.id} onClick={()=>setSelectedId(a.id)} className={`cursor-pointer border-b border-border/60 transition hover:bg-card ${selectedId===a.id?"bg-primary/5":""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2"><HealthDot h={a.health}/><div><div className="font-semibold">{a.name}</div><div className="text-[11px] text-muted-foreground">{a.type}</div></div></div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.location}</td>
                  <td className="px-4 py-3"><span className="font-display text-base font-bold">{a.healthScore}</span><span className="text-xs text-muted-foreground">/100</span></td>
                  <td className="px-4 py-3"><Badge tone={a.failureRisk>60?"danger":a.failureRisk>25?"warning":"success"}>{a.failureRisk}%</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{a.recommendedAction}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.lastInspection}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display text-base font-semibold">{selected.name} · اتجاه الاهتزاز</h2>
              <p className="text-xs text-muted-foreground">{selected.type} · {selected.location}</p>
            </div>
            <Badge tone={selected.failureRisk>60?"danger":selected.failureRisk>25?"warning":"success"}>المخاطر {selected.failureRisk}%</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorTrend}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.06)"/>
                <XAxis dataKey="day" stroke="oklch(0.68 0.02 250)" fontSize={11}/>
                <YAxis stroke="oklch(0.68 0.02 250)" fontSize={11}/>
                <Tooltip contentStyle={{ background:"oklch(0.21 0.028 252)", border:"1px solid oklch(1 0 0 / 0.1)", borderRadius:8, fontSize:12 }}/>
                <Line type="monotone" dataKey="vibration" stroke="oklch(0.78 0.16 70)" strokeWidth={2.5} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary"/>
            <h2 className="font-display text-base font-semibold">توقع الذكاء الاصطناعي</h2>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
            <div className="font-semibold">{selected.name}</div>
            <p className="mt-2 text-muted-foreground">
              احتمال <span className="text-foreground font-semibold">{selected.failureRisk}%</span> لحدوث {selected.health === "critical" ? "عطل في المحامل خلال 14 يوماً" : "تدهور في الأداء خلال 30 يوماً"} بناءً على تحليل نمط الاهتزاز وسجلات الصيانة السابقة.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md bg-background/60 p-2"><div className="text-[10px] uppercase text-muted-foreground">الثقة</div><div className="font-display text-base font-bold">94%</div></div>
              <div className="rounded-md bg-background/60 p-2"><div className="text-[10px] uppercase text-muted-foreground">المدى</div><div className="font-display text-base font-bold">14 يوم</div></div>
              <div className="rounded-md bg-background/60 p-2"><div className="text-[10px] uppercase text-muted-foreground">الأثر</div><div className="font-display text-base font-bold">عالي</div></div>
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90">
              <Wrench className="h-3.5 w-3.5"/>إنشاء أمر عمل
            </button>
          </div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center gap-2 mb-4"><Calendar className="h-4 w-4 text-primary"/><h2 className="font-display text-base font-semibold">جدول الصيانة · الأسابيع الأربعة القادمة</h2></div>
        <div className="grid grid-cols-7 gap-1 text-xs">
          {["الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت","الأحد"].map(d => <div key={d} className="px-2 py-1 text-center text-[10px] text-muted-foreground">{d}</div>)}
          {Array.from({length:28}).map((_,i)=>{
            const events = [
              { d: 3, t:"فحص P-101", tone:"info" as const},
              { d: 7, t:"مسح اهتزاز C-204", tone:"warning" as const},
              { d: 12, t:"استبدال محامل B-12", tone:"danger" as const},
              { d: 16, t:"تنظيف أنابيب HE-22", tone:"danger" as const},
              { d: 21, t:"تغيير سدادة P-415", tone:"warning" as const},
              { d: 24, t:"فحص خط A-7", tone:"info" as const},
            ].filter(e=>e.d===i+1);
            return (
              <div key={i} className="min-h-[70px] rounded-md border border-border bg-background/30 p-1.5">
                <div className="text-[10px] text-muted-foreground">{i+1}</div>
                {events.map((e,j)=>(<div key={j} className="mt-1"><Badge tone={e.tone}>{e.t}</Badge></div>))}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
