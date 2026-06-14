import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Card, PageHeader, Badge } from "@/components/ui-bits";
import { Bot, FileText, Send, Upload, User, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/assistant")({
  component: Assistant,
});

type Msg = { role: "user" | "ai"; text: string; cites?: string[] };

const docs = [
  { name: "دليل الضاغط B-12.pdf", size: "4.2 ميجابايت" },
  { name: "إجراء تشغيل مليتة - القطار 2.pdf", size: "8.1 ميجابايت" },
  { name: "سجل صيانة المضخة P-101.pdf", size: "1.7 ميجابايت" },
  { name: "تفتيش HSE - الربع الثاني 2025.pdf", size: "3.4 ميجابايت" },
  { name: "معيار API 618 للضواغط الترددية.pdf", size: "12.6 ميجابايت" },
  { name: "تقرير فحص الأنبوب A-7.pdf", size: "6.9 ميجابايت" },
];

const initial: Msg[] = [
  { role: "user", text: "ما هو إجراء الصيانة لوحدة الضاغط B-12؟" },
  {
    role: "ai",
    text: "استناداً إلى **دليل الضاغط B-12** و**إجراء تشغيل مليتة - القطار 2**، فإن الإجراء القياسي للصيانة هو:\n\n1. **عزل** الوحدة B-12 عن غاز العملية عبر XV-1204 و XV-1208؛ والتنفيس إلى الشعلة.\n2. **إقفال وتوسيم** قاطع المحرك 6.6 kV (لوحة MCC-2B، فتحة 14).\n3. **فحص المحامل** (DE و NDE) — حدود الخلوص حسب API 618 §6.7.4.\n4. **استبدال فلتر زيت السدادة** F-12 وأخذ عينة زيت لتحليل الجزيئات المعدنية.\n5. **إعادة محاذاة الاقتران** ضمن 0.05 مم متوازي / 0.10 مم زاوي.\n6. **اختبار وظيفي** للحماية (اهتزاز عالٍ 7.1 مم/ث، حرارة عالية 95°م).\n\n⚠️ التقييم الحالي للذكاء الاصطناعي يُظهر احتمال عطل المحامل بنسبة 78% — يُنصح بجدولة استبدال كامل خلال نافذة الإيقاف القادمة (20–22 يونيو).",
    cites: ["دليل الضاغط B-12.pdf · §4.3", "إجراء تشغيل مليتة - القطار 2.pdf · ص. 42"],
  },
];

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages(m => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: "ai",
        text: `استناداً إلى الوثائق المفهرسة: ${q.length > 40 ? "هذا إجراء متعدد الخطوات" : "إليك التوجيه ذو الصلة"}. وفقاً لآخر تقارير التفتيش والمعايير المعتمدة، تجمع المقاربة الموصى بها بين إجراءات المورد ورؤى إنرجي مايند التنبؤية. تأكد دائماً من المهندس في الموقع قبل تنفيذ أي عمل حرج للسلامة.`,
        cites: ["إجراء تشغيل مليتة - القطار 2.pdf", "معيار API 618 للضواغط الترددية.pdf"],
      }]);
      setThinking(false);
    }, 1100);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="المساعد الهندسي الذكي" subtitle="حاور أدلتك وإجراءات التشغيل وتقارير الفحص والمعايير الهندسية" />

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="p-4 h-[600px] flex flex-col">
          <button className="mb-3 inline-flex items-center justify-center gap-2 rounded-md border border-dashed border-primary/40 bg-primary/5 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/10">
            <Upload className="h-3.5 w-3.5"/> رفع وثيقة
          </button>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">قاعدة المعرفة · {docs.length} ملفات</div>
          <div className="space-y-1.5 overflow-y-auto scrollbar-thin pe-1 flex-1">
            {docs.map(d => (
              <div key={d.name} className="flex items-start gap-2 rounded-md border border-border bg-background/40 p-2.5 hover:border-primary/40 cursor-pointer">
                <FileText className="h-4 w-4 text-primary shrink-0 mt-0.5"/>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium truncate">{d.name}</div>
                  <div className="text-[10px] text-muted-foreground">{d.size}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex h-[600px] flex-col">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-gradient-to-br from-[oklch(0.78_0.14_195)] to-[oklch(0.55_0.18_220)] grid place-items-center"><Sparkles className="h-3.5 w-3.5 text-background"/></div>
              <div>
                <div className="text-sm font-semibold">مساعد إنرجي مايند</div>
                <div className="text-[10px] text-muted-foreground">مستند إلى وثائقك</div>
              </div>
            </div>
            <Badge tone="success">متصل</Badge>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto scrollbar-thin p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && <div className="h-8 w-8 shrink-0 rounded-md bg-primary/15 grid place-items-center"><Bot className="h-4 w-4 text-primary"/></div>}
                <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-background/60 border border-border"}`}>
                  {m.text.split("\n").map((line, j) => <p key={j} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{__html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}} />)}
                  {m.cites && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border/60 pt-2">
                      {m.cites.map(c => <span key={c} className="inline-flex items-center gap-1 rounded-md bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground"><FileText className="h-2.5 w-2.5"/>{c}</span>)}
                    </div>
                  )}
                </div>
                {m.role === "user" && <div className="h-8 w-8 shrink-0 rounded-md bg-muted grid place-items-center"><User className="h-4 w-4"/></div>}
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-md bg-primary/15 grid place-items-center"><Bot className="h-4 w-4 text-primary"/></div>
                <div className="rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm text-muted-foreground">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.2s]"/>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.1s]"/>
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"/>
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {["اعرض سجل صيانة المضخة P-415","لخّص تنبيهات اليوم","ما تصنيف SIL للقطار 2؟"].map(s => (
                <button key={s} onClick={()=>send(s)} className="rounded-full border border-border bg-background/40 px-3 py-1 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-primary">{s}</button>
              ))}
            </div>
            <form onSubmit={(e)=>{e.preventDefault(); send();}} className="flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} placeholder="اسأل عن المعدات والإجراءات والمعايير…" className="flex-1 rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm focus:border-primary focus:outline-none"/>
              <button type="submit" className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"><Send className="h-4 w-4 rtl:rotate-180"/></button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
