export type Health = "good" | "warning" | "critical";

export type Asset = {
  id: string;
  name: string;
  type: string;
  location: string;
  health: Health;
  healthScore: number;
  failureRisk: number;
  lastInspection: string;
  recommendedAction: string;
};

export const assets: Asset[] = [
  { id: "P-101", name: "مضخة P-101", type: "مضخة طرد مركزي", location: "حقل مليتة", health: "good", healthScore: 92, failureRisk: 8, lastInspection: "2025-05-12", recommendedAction: "مراقبة دورية" },
  { id: "C-204", name: "ضاغط C-204", type: "ضاغط غاز", location: "محطة الزويتينة", health: "warning", healthScore: 71, failureRisk: 34, lastInspection: "2025-04-28", recommendedAction: "فحص حساسات الاهتزاز" },
  { id: "B-12", name: "وحدة الضاغط B-12", type: "ضاغط ترددي", location: "حقل الواحة", health: "critical", healthScore: 42, failureRisk: 78, lastInspection: "2025-03-18", recommendedAction: "جدولة استبدال المحامل" },
  { id: "PL-A7", name: "خط الأنابيب A-7", type: "أنبوب نفط خام", location: "حوض سرت", health: "good", healthScore: 88, failureRisk: 12, lastInspection: "2025-05-20", recommendedAction: "متابعة برنامج المثبطات" },
  { id: "T-302", name: "خزان التخزين T-302", type: "تخزين نفط خام", location: "محطة مليتة", health: "warning", healthScore: 68, failureRisk: 29, lastInspection: "2025-05-02", recommendedAction: "فحص سماكة الجدار بالموجات فوق الصوتية" },
  { id: "V-88", name: "فاصل V-88", type: "فاصل ثلاثي الأطوار", location: "حقل الواحة", health: "good", healthScore: 95, failureRisk: 5, lastInspection: "2025-06-01", recommendedAction: "لا يتطلب إجراء" },
  { id: "P-415", name: "مضخة P-415", type: "مضخة متعددة المراحل", location: "محطة الزويتينة", health: "warning", healthScore: 64, failureRisk: 41, lastInspection: "2025-04-10", recommendedAction: "استبدال السدادة الميكانيكية" },
  { id: "HE-22", name: "مبادل حراري HE-22", type: "هيكل وأنابيب", location: "حقل السرير (أجوكو)", health: "critical", healthScore: 38, failureRisk: 82, lastInspection: "2025-03-05", recommendedAction: "تنظيف الأنابيب المتسخة بشكل عاجل" },
];

export const sensorTrend = Array.from({ length: 30 }, (_, i) => {
  const base = 60 + Math.sin(i / 3) * 6 + i * 0.4;
  return {
    day: `D${i + 1}`,
    temperature: Math.round(base + Math.random() * 3),
    pressure: Math.round(110 + Math.cos(i / 4) * 8 + Math.random() * 4),
    vibration: +(2.4 + Math.sin(i / 2) * 0.8 + (i > 20 ? (i - 20) * 0.18 : 0) + Math.random() * 0.3).toFixed(2),
  };
});

export const alerts = [
  { id: 1, asset: "وحدة الضاغط B-12", severity: "critical", message: "الاهتزاز يتجاوز 7.2 مم/ث — نمط تآكل في المحامل", time: "قبل 12 دقيقة" },
  { id: 2, asset: "مبادل حراري HE-22", severity: "critical", message: "ارتفاع حرارة المخرج 14°م خلال 48 ساعة — اشتباه باتساخ", time: "قبل ساعة" },
  { id: 3, asset: "مضخة P-415", severity: "warning", message: "انخفاض ضغط شطف السدادة — احتمال تسرب", time: "قبل 3 ساعات" },
  { id: 4, asset: "ضاغط C-204", severity: "warning", message: "ارتفاع تدريجي في حرارة التصريف", time: "قبل 5 ساعات" },
  { id: 5, asset: "خزان التخزين T-302", severity: "info", message: "تجاوز حد المخزون (82%)", time: "أمس" },
];

export const energyMonthly = [
  { m: "يناير", consumption: 412, flare: 88, target: 380 },
  { m: "فبراير", consumption: 398, flare: 82, target: 380 },
  { m: "مارس", consumption: 421, flare: 91, target: 380 },
  { m: "أبريل", consumption: 405, flare: 76, target: 380 },
  { m: "مايو", consumption: 388, flare: 68, target: 380 },
  { m: "يونيو", consumption: 372, flare: 61, target: 380 },
  { m: "يوليو", consumption: 365, flare: 55, target: 380 },
  { m: "أغسطس", consumption: 358, flare: 49, target: 380 },
];

export const optimizations = [
  { id: 1, title: "استرداد غاز الحرق في مليتة - القطار 2", saving: "2.4 مليون دولار/سنة", co2: "-18,400 طن CO₂", impact: "high" },
  { id: 2, title: "تحسين تشغيل الضاغط C-204", saving: "640 ألف دولار/سنة", co2: "-3,200 طن CO₂", impact: "medium" },
  { id: 3, title: "جدولة تنظيف المبادل HE-22", saving: "310 ألف دولار/سنة", co2: "-1,100 طن CO₂", impact: "medium" },
  { id: 4, title: "ضبط محرك VFD لمضخة P-415", saving: "95 ألف دولار/سنة", co2: "-420 طن CO₂", impact: "low" },
];

export const risks = [
  { id: 1, area: "حقل مليتة", category: "سلامة العمليات", probability: 4, severity: 5, level: "critical", action: "ترقية حماية SIL-2 لفاصل القطار 2" },
  { id: 2, area: "محطة الزويتينة", category: "موثوقية المعدات", probability: 3, severity: 4, level: "high", action: "استبدال محامل C-204 خلال 30 يوماً" },
  { id: 3, area: "حقل الواحة", category: "البيئة", probability: 3, severity: 3, level: "medium", action: "تركيب وحدة استرداد غاز الحرق" },
  { id: 4, area: "حقل السرير", category: "سلامة الأصول", probability: 4, severity: 4, level: "high", action: "مسح تآكل الأنبوب A-7" },
  { id: 5, area: "حوض سرت", category: "الأمن السيبراني", probability: 2, severity: 5, level: "high", action: "فصل شبكة SCADA وتحديث HMIs" },
  { id: 6, area: "محطة مليتة", category: "سلامة العمليات", probability: 2, severity: 3, level: "medium", action: "تحديث دراسة الحماية من الضغط الزائد" },
];

export const reports = [
  { id: 1, name: "موجز العمليات اليومي", date: "2025-06-14", type: "يومي", pages: 6 },
  { id: 2, name: "ملخص الصيانة الأسبوعي", date: "2025-06-09", type: "أسبوعي", pages: 14 },
  { id: 3, name: "التقرير التنفيذي الشهري — مايو", date: "2025-06-01", type: "شهري", pages: 32 },
  { id: 4, name: "تدقيق صحة الأصول — الربع الثاني", date: "2025-05-28", type: "ربع سنوي", pages: 48 },
  { id: 5, name: "تقرير الطاقة والانبعاثات", date: "2025-05-25", type: "شهري", pages: 22 },
];

export const partners = ["المؤسسة الوطنية للنفط", "شركة سرت للنفط", "شركة الواحة للنفط", "شركة مليتة للنفط والغاز", "شركة الزويتينة للنفط", "شركة الخليج العربي للنفط (أجوكو)"];
