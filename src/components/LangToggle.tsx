import { useLang } from "@/lib/i18n";
import { Languages } from "lucide-react";

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <button
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className={`inline-flex items-center gap-2 rounded-md border border-border bg-card/50 px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-primary/50 hover:text-primary ${className}`}
      aria-label="Toggle language"
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === "en" ? "العربية" : "English"}
    </button>
  );
}
