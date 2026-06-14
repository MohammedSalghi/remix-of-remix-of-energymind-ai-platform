import { createFileRoute } from "@tanstack/react-router";
import { Card, PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <PageHeader title="الإعدادات" subtitle="الملف الشخصي واللغة وتفضيلات الإشعارات"/>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-display text-base font-semibold mb-4">الملف الشخصي</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[oklch(0.78_0.14_195)] to-[oklch(0.55_0.18_220)] grid place-items-center text-lg font-bold text-background">م.م</div>
            <div>
              <div className="font-semibold">م. محمد المنصوري</div>
              <div className="text-xs text-muted-foreground">رئيس سلامة الأصول · شركة مليتة للنفط والغاز</div>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <Row label="الاسم الكامل" value="محمد المنصوري"/>
            <Row label="البريد الإلكتروني" value="m.almansouri@mellitah.ly"/>
            <Row label="المسمى الوظيفي" value="رئيس سلامة الأصول"/>
            <Row label="المنشأة" value="مجمع مليتة"/>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="font-display text-base font-semibold mb-4">اللغة والمنطقة</h2>
          <div className="space-y-3">
            <div className="text-xs text-muted-foreground">لغة الواجهة</div>
            <div className="rounded-lg border border-primary bg-primary/10 px-4 py-3 text-sm text-primary">العربية (RTL)</div>
            <div className="pt-4">
              <div className="text-xs text-muted-foreground mb-2">المنطقة الزمنية</div>
              <select className="w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm">
                <option>أفريقيا/طرابلس (GMT+2)</option>
                <option>UTC</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="font-display text-base font-semibold mb-4">تفضيلات الإشعارات</h2>
          <div className="divide-y divide-border">
            {[
              { k:"تنبيهات المعدات الحرجة", d:"رسائل + بريد + داخل التطبيق · فوري", on:true},
              { k:"توصيات الصيانة التنبؤية", d:"ملخص يومي عند 07:00", on:true},
              { k:"الملخص التنفيذي الأسبوعي", d:"كل صباح أحد", on:true},
              { k:"تحديثات وثائق المساعد الذكي", d:"داخل التطبيق فقط", on:false},
              { k:"فرص تحسين الطاقة", d:"ملخص أسبوعي", on:true},
            ].map(n=>(
              <div key={n.k} className="flex items-center justify-between py-3">
                <div>
                  <div className="text-sm font-medium">{n.k}</div>
                  <div className="text-xs text-muted-foreground">{n.d}</div>
                </div>
                <div className={`relative h-6 w-11 rounded-full transition ${n.on?"bg-primary":"bg-muted"}`}>
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-background transition ${n.on?"start-5":"start-0.5"}`}/>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 py-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
