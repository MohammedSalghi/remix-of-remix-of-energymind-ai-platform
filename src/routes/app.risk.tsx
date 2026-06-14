import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { Card, PageHeader, Badge } from "@/components/ui-bits";
import { risks } from "@/lib/mock-data";

export const Route = createFileRoute("/app/risk")({
  component: Risk,
});

const sevLabels = ["", "ضئيلة", "بسيطة", "متوسطة", "كبيرة", "كارثية"];
const probLabels = ["", "نادرة", "غير محتملة", "ممكنة", "محتملة", "شبه مؤكدة"];

function cellTone(p: number, s: number) {
  const score = p * s;
  if (score >= 16) return "bg-[oklch(0.65_0.22_25)/35%] border-[oklch(0.65_0.22_25)/40%]";
  if (score >= 9) return "bg-[oklch(0.82_0.16_85)/30%] border-[oklch(0.82_0.16_85)/35%]";
  if (score >= 4) return "bg-[oklch(0.78_0.14_195)/22%] border-[oklch(0.78_0.14_195)/30%]";
  return "bg-[oklch(0.72_0.17_155)/22%] border-[oklch(0.72_0.17_155)/30%]";
}

function Risk() {
  // build matrix
  const matrix: { p: number; s: number; items: typeof risks }[] = [];
  for (let p = 5; p >= 1; p--) {
    for (let s = 1; s <= 5; s++) {
      matrix.push({ p, s, items: risks.filter(r => r.probability === p && r.severity === s) });
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="إدارة المخاطر" subtitle="المخاطر التشغيلية والبيئية وسلامة الأصول عبر المنشآت" />

      <Card className="p-5">
        <h2 className="font-display text-base font-semibold mb-1">مصفوفة المخاطر · الاحتمال × الشدة</h2>
        <p className="text-xs text-muted-foreground mb-4">انقر على خلية لعرض المخاطر المسجلة</p>
        <div className="overflow-x-auto scrollbar-thin">
          <div className="min-w-[600px]">
            <div className="grid grid-cols-[120px_repeat(5,1fr)] gap-1.5 text-xs">
              <div/>
              {[1,2,3,4,5].map(s => <div key={s} className="text-center text-[10px] uppercase text-muted-foreground">{sevLabels[s]}</div>)}
              {[5,4,3,2,1].map(p => (
                <Fragment key={p}>
                  <div className="flex items-center justify-end pe-2 text-[10px] uppercase text-muted-foreground">{probLabels[p]}</div>
                  {[1,2,3,4,5].map(s => {
                    const cell = matrix.find(c => c.p===p && c.s===s)!;
                    return (
                      <div key={`${p}-${s}`} className={`min-h-[64px] rounded-md border p-2 ${cellTone(p,s)}`}>
                        {cell.items.map(r => <div key={r.id} className="text-[10px] font-semibold text-foreground truncate">{r.area}</div>)}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="border-b border-border p-5">
          <h2 className="font-display text-base font-semibold">المخاطر المحددة · {risks.length}</h2>
        </div>
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start">المنطقة</th>
                <th className="px-4 py-3 text-start">الفئة</th>
                <th className="px-4 py-3 text-start">الاحتمال</th>
                <th className="px-4 py-3 text-start">الشدة</th>
                <th className="px-4 py-3 text-start">المستوى</th>
                <th className="px-4 py-3 text-start">إجراء التخفيف</th>
              </tr>
            </thead>
            <tbody>
              {risks.map(r => (
                <tr key={r.id} className="border-b border-border/60 hover:bg-card">
                  <td className="px-4 py-3 font-semibold">{r.area}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.category}</td>
                  <td className="px-4 py-3">{probLabels[r.probability]}</td>
                  <td className="px-4 py-3">{sevLabels[r.severity]}</td>
                  <td className="px-4 py-3"><Badge tone={r.level==="critical"?"danger":r.level==="high"?"warning":"info"}>{r.level}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{r.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
