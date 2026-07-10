"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanText, Menu, X } from "lucide-react";
import { useState } from "react";
import { CONTACT_EMAIL, SITE_DOMAIN, SOCIAL_LINKS } from "../lib/site";
import { openCookieSettings } from "./CookieConsent";

const navLinks = [
  { href: "/", label: "OCR Tool" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const footerLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
];

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute top-1/3 -left-32 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-sky-100/40 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-3 group">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/20 transition group-hover:scale-105">
              <ScanText className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-black tracking-tight sm:text-base">
                OCR Text Extractor
              </span>
              <span className="hidden text-xs font-medium text-slate-500 sm:block">
                Free image to text online
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-cyan-50 text-cyan-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold ${
                      active ? "bg-cyan-50 text-cyan-700" : "text-slate-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-black text-slate-900">OCR Text Extractor</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                A free online tool to convert images into editable text. AI OCR runs first;
                if it fails, browser-side Tesseract OCR is used as a fallback.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Pages
              </p>
              <ul className="mt-3 space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-slate-600 hover:text-cyan-700"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Social
              </p>
              <ul className="mt-3 space-y-2" aria-label="Social links">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium text-slate-600 hover:text-cyan-700"
                      rel="noopener noreferrer me"
                      target="_blank"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contact
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Questions or feedback?{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-semibold text-cyan-700 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Or visit our{" "}
                <Link href="/contact" className="font-semibold text-cyan-700 hover:underline">
                  Contact page
                </Link>
                .
              </p>
              <button
                type="button"
                onClick={openCookieSettings}
                className="mt-3 text-sm font-semibold text-cyan-700 hover:underline"
              >
                Cookie Settings
              </button>
              <p className="mt-4 text-xs text-slate-400">
                © {new Date().getFullYear()} Elango P · {SITE_DOMAIN}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
