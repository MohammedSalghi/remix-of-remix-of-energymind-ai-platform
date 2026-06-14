import { createContext, useContext, useEffect, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

export const t: Dict = {
  tagline: { en: "AI-Powered Intelligence for Oil & Gas Operations", ar: "الذكاء الاصطناعي لإدارة وصيانة أصول الطاقة" },
  brand: { en: "EnergyMind AI", ar: "إنرجي مايند" },
  requestDemo: { en: "Request Demo", ar: "اطلب عرضاً تجريبياً" },
  getStarted: { en: "Get Started", ar: "ابدأ الآن" },
  signIn: { en: "Sign in", ar: "تسجيل الدخول" },
  navFeatures: { en: "Platform", ar: "المنصة" },
  navHow: { en: "How it works", ar: "كيف تعمل" },
  navPartners: { en: "Partners", ar: "الشركاء" },
  navContact: { en: "Contact", ar: "تواصل" },
  heroSub: {
    en: "A national AI platform for predictive maintenance, asset intelligence, and energy optimization across Libya's oil & gas sector.",
    ar: "منصة وطنية مدعومة بالذكاء الاصطناعي للصيانة التنبؤية وإدارة الأصول وتحسين كفاءة الطاقة في قطاع النفط والغاز الليبي.",
  },
  statDowntime: { en: "Reduction in unplanned downtime", ar: "تقليل في التوقفات غير المخططة" },
  statCost: { en: "Lower maintenance costs", ar: "خفض تكاليف الصيانة" },
  statInsights: { en: "Real-time insights from IoT, SCADA & technical documents", ar: "رؤى لحظية من IoT و SCADA والوثائق الفنية" },
  howTitle: { en: "How it works", ar: "كيف تعمل المنصة" },
  step1: { en: "Connect Data Sources", ar: "ربط مصادر البيانات" },
  step1d: { en: "IoT sensors, SCADA, CMMS, PDFs & technical manuals.", ar: "حساسات إنترنت الأشياء وSCADA وملفات PDF والأدلة الفنية." },
  step2: { en: "AI Analysis", ar: "تحليل بالذكاء الاصطناعي" },
  step2d: { en: "Models detect anomalies, degradation, and energy losses.", ar: "نماذج تكتشف الشذوذ والتآكل وفقد الطاقة." },
  step3: { en: "Predictions & Recommendations", ar: "تنبؤات وتوصيات" },
  step3d: { en: "Failure forecasts with prioritized engineering actions.", ar: "توقعات الأعطال مع توصيات هندسية مرتبة." },
  step4: { en: "Action & Reporting", ar: "تنفيذ وتقارير" },
  step4d: { en: "Work-orders, KPI dashboards, executive reports.", ar: "أوامر العمل ولوحات المؤشرات والتقارير التنفيذية." },
  partnersTitle: { en: "Built for Libya's energy leaders", ar: "مصممة لقادة الطاقة في ليبيا" },
  partnersSub: { en: "Designed in collaboration with national operators.", ar: "بالتعاون مع المشغلين الوطنيين." },
  pilotTitle: { en: "Request a Pilot Program", ar: "اطلب برنامجاً تجريبياً" },
  pilotSub: { en: "Tell us about your assets and we'll prepare a tailored pilot.", ar: "أخبرنا عن أصولك وسنُعدّ برنامجاً تجريبياً مخصصاً." },
  name: { en: "Full name", ar: "الاسم الكامل" },
  company: { en: "Company", ar: "الشركة" },
  email: { en: "Work email", ar: "البريد الإلكتروني" },
  message: { en: "Message", ar: "الرسالة" },
  submit: { en: "Submit request", ar: "إرسال الطلب" },
  features: { en: "Capabilities", ar: "الإمكانيات" },
  feat1: { en: "Predictive Maintenance", ar: "الصيانة التنبؤية" },
  feat1d: { en: "Forecast failures days before they happen.", ar: "توقع الأعطال قبل وقوعها بأيام." },
  feat2: { en: "AI Engineering Assistant", ar: "المساعد الهندسي الذكي" },
  feat2d: { en: "Chat with your manuals, SOPs, and inspection reports.", ar: "محادثة مع الأدلة والإجراءات وتقارير الفحص." },
  feat3: { en: "Energy Optimization", ar: "تحسين الطاقة" },
  feat3d: { en: "Cut flaring, fuel use, and CO₂ emissions.", ar: "تقليل الحرق والوقود وانبعاثات الكربون." },
  feat4: { en: "Smart Reporting", ar: "تقارير ذكية" },
  feat4d: { en: "Auto-generated daily, weekly, executive reports.", ar: "تقارير يومية وأسبوعية وتنفيذية تلقائية." },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; tr: (k: keyof typeof t) => string; dir: "ltr" | "rtl" };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, tr: (k) => t[k]?.en ?? String(k), dir: "ltr" });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang: Lang = "ar";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }, []);

  const tr = (k: keyof typeof t) => t[k]?.ar ?? String(k);
  return <LangContext.Provider value={{ lang, setLang: () => {}, tr, dir: "rtl" }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
