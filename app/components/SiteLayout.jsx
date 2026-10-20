import Link from "next/link";
import SiteHeader from "./SiteHeader";
import CookieSettingsButton from "./CookieSettingsButton";
import { CONTACT_EMAIL, SITE_DOMAIN, SOCIAL_LINKS } from "../lib/site";
import { TOOL_ROUTES } from "../lib/tools/toolRoutes";

const footerLinks = [
  ...TOOL_ROUTES.map((t) => ({ href: t.path, label: t.label })),
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
  return (
    <div className="relative flex min-h-screen flex-col text-slate-900">
      <div className="site-backdrop" aria-hidden="true" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-cyan-800 focus:shadow-lg focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-cyan-600"
      >
        Skip to main content
      </a>

      <SiteHeader />

      <main id="main-content" className="relative flex-1">
        {children}
      </main>

      <footer className="relative border-t border-slate-200/80 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-black text-slate-900">ImgToText</p>
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
              <CookieSettingsButton />
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
