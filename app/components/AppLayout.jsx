"use client";

import Link from "next/link";
import { ScanText } from "lucide-react";

const maxWidthClasses = {
  sm: "max-w-5xl",
  md: "max-w-6xl",
  lg: "max-w-7xl",
};

export default function AppLayout({
  title,
  subtitle,
  icon: Icon = ScanText,
  accent = "cyan",
  children,
  maxWidth = "md",
  hero = false,
}) {
  const accentMap = {
    blue: "text-blue-600 dark:text-blue-400",
    cyan: "text-cyan-600 dark:text-cyan-400",
    green: "text-green-600 dark:text-green-400",
  };

  const accentClass = accentMap[accent] || accentMap.cyan;
  const containerClass = maxWidthClasses[maxWidth] || maxWidthClasses.md;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div
          className={`${containerClass} mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4`}
        >
          <div
            className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-800 ${accentClass} shrink-0`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-xl font-black truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
          <Link
            href="https://elangodev.com"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 shrink-0"
          >
            elangodev.com
          </Link>
        </div>
      </header>

      <main className={`${containerClass} mx-auto px-4 sm:px-6 py-8 sm:py-12`}>
        {hero && (
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>
          Built by{" "}
          <Link
            href="https://elangodev.com"
            className="font-semibold text-cyan-600 hover:underline"
          >
            Elango P
          </Link>
          {" · "}
          100% browser-side OCR — your images never leave your device
        </p>
      </footer>
    </div>
  );
}
