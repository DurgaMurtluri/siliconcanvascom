import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-silicon-950 text-slate-200 selection:bg-electric-blue/30">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="relative border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 circuit-grid opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-electric-blue/10 blur-[120px] rounded-full" />
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
        {eyebrow && (
          <span className="inline-block font-mono text-xs text-electric-blue uppercase tracking-widest mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="font-display text-4xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 text-lg text-silver max-w-2xl leading-relaxed">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
