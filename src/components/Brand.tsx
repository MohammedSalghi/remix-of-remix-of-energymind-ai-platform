import { Link } from "@tanstack/react-router";

export function Brand({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-base";
  const icon = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-8 w-8";
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className={`${icon} relative rounded-lg bg-gradient-to-br from-[oklch(0.78_0.14_195)] to-[oklch(0.55_0.18_220)] flex items-center justify-center glow`}>
        <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2 text-background">
          <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="flex flex-col leading-tight">
        <span className={`${s} font-display font-bold tracking-tight`}>إنرجي <span className="text-gradient-cyan">مايند</span></span>
      </div>
    </Link>
  );
}
