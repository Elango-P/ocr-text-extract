"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScanText, Menu, X } from "lucide-react";
import { useState } from "react";
import { CONTACT_EMAIL, SITE_DOMAIN, SOCIAL_LINKS } from "../lib/site";
import { openCookieSettings } from "./CookieConsent";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/image-to-text", label: "Tools", matchPrefix: "tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const TOOL_PATHS = [
  "/image-to-text",
  "/pdf-to-text",
  "/handwriting-to-text",
];

function isNavActive(pathname, link) {
  if (link.matchPrefix === "tools") {
    return TOOL_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  }
  if (link.href === "/") return pathname === "/";
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

const footerLinks = [
  { href: "/image-to-text", label: "Image to Text" },
  { href: "/pdf-to-text", label: "PDF to Text" },
  { href: "/handwriting-to-text", label: "Handwriting OCR" },
  { href: "/blog", label: "Blog" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/author/elango-p", label: "Author" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Use" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/data-retention", label: "Data Retention" },
];

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col text-slate-900">
      <div className="site-backdrop" aria-hidden="true" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-cyan-800 focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl supports-[backdrop-filter]:bg-white/65">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 text-white shadow-md shadow-cyan-600/15 transition group-hover:scale-105">
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
              const active = isNavActive(pathname, link);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
                    active
                      ? "bg-cyan-50/90 text-cyan-800"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-900"
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/80 bg-white/90 text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="border-t border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isNavActive(pathname, link);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 ${
                      active ? "bg-cyan-50 text-cyan-800" : "text-slate-600"
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

      <main id="main-content" className="relative flex-1">
        {children}
      </main>

      <footer className="relative border-t border-slate-200/80 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
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
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Pages
              </p>
              <ul className="mt-3 space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded text-sm font-medium text-slate-600 hover:text-cyan-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
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
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
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
                className="mt-3 rounded text-sm font-semibold text-cyan-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
              >
                Cookie Settings
              </button>
              <p className="mt-4 text-xs text-slate-500">
                © {new Date().getFullYear()} Elango P · {SITE_DOMAIN}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
