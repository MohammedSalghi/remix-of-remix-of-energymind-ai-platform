import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader, Badge } from "@/components/ui-bits";
import { reports } from "@/lib/mock-data";
import { Download, FileText, Plus, Calendar } from "lucide-react";

export const Route = createFileRoute("/app/reports")({
  component: Reports,
});

function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="التقارير"
        subtitle="تقارير تشغيلية وصيانية وتنفيذية تُنشأ تلقائياً"
        right={
          <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
            <Plus className="h-4 w-4"/> إنشاء تقرير جديد
          </button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
        <Card>
          <div className="border-b border-border px-5 py-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">التقارير الحديثة</h2>
            <select className="rounded-md border border-border bg-background/60 px-2 py-1 text-xs">
              <option>كل الأنواع</option><option>يومي</option><option>أسبوعي</option><option>شهري</option>
            </select>
          </div>
          <div className="divide-y divide-border">
            {reports.map(r => (
              <div key={r.id} className="flex items-center justify-between gap-3 px-5 py-4 hover:bg-card">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary"><FileText className="h-5 w-5"/></div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{r.name}</div>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3"/>{r.date}</span>
                      <span>{r.pages} صفحة</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge tone="info">{r.type}</Badge>
                  <button className="rounded-md border border-border bg-background/40 p-2 hover:border-primary/40 hover:text-primary"><Download className="h-4 w-4"/></button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-base font-semibold">معاينة التقرير</h2>
            <Badge tone="success">إنشاء تلقائي</Badge>
          </div>
          <div className="rounded-lg border border-border bg-background/60 p-5 text-sm space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-primary">التقرير التنفيذي الشهري · مايو 2025</div>
              <h3 className="font-display text-xl font-bold mt-1">ملخص العمليات الوطنية</h3>
              <p className="text-xs text-muted-foreground mt-1">أعدّ بواسطة إنرجي مايند · 1 يونيو 2025</p>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">الملخص التنفيذي</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">استقرت صحة المعدات على مستوى الأسطول عند 87% (+2 نقطة). منعت النماذج التنبؤية 4 توقفات غير مخططة وفّرت ما يقارب 4.1 مليون دولار من الإنتاج المفقود. انخفض حجم غاز الحرق 18% مقارنةً بأبريل عبر توصيات تشغيل الضواغط.</p>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">المؤشرات الرئيسية</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { k:"وقت تشغيل الإنتاج", v:"98.4%"},
                  { k:"تكلفة الصيانة / برميل", v:"0.42$"},
                  { k:"CO₂ متجنّب", v:"22 kt"},
                  { k:"تنبيهات تمت معالجتها", v:"143"},
                ].map(x=>(
                  <div key={x.k} className="rounded border border-border bg-card/40 p-2">
                    <div className="text-[10px] text-muted-foreground">{x.k}</div>
                    <div className="font-display text-base font-bold">{x.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-2">التوصيات</h4>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc ps-5">
                <li>تقديم موعد استبدال محامل B-12 إلى نافذة 20 يونيو.</li>
                <li>تنفيذ استرداد غاز الحرق في مليتة - القطار 2 (2.4 مليون دولار سنوياً).</li>
                <li>توسيع المساعد الذكي إلى فريق هندسة أجوكو - السرير.</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
