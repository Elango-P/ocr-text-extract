import { Mail, MessageSquare, Clock, HelpCircle, Shield } from "lucide-react";
import Link from "next/link";
import { SITE_URL, CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME, SITE_DOMAIN } from "../lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Contact OCR Text Extractor for support, feedback, privacy questions, or bug reports. Email admin@elangodev.com — we respond within 1–3 business days.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">Support</p>
      <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
        Contact us
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        Have a question about {SITE_NAME}, a privacy concern, or a feature idea? Reach out —
        we read every message. This site is operated by {OPERATOR_NAME} at {SITE_DOMAIN}.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Mail className="h-5 w-5 text-cyan-600" />
          <h2 className="mt-3 text-sm font-bold text-slate-900">Email</h2>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-2 block text-sm font-semibold text-cyan-700 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <Clock className="h-5 w-5 text-cyan-600" />
          <h2 className="mt-3 text-sm font-bold text-slate-900">Response time</h2>
          <p className="mt-2 text-sm text-slate-600">
            We typically reply within 1–3 business days.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <MessageSquare className="h-5 w-5 text-cyan-600" />
          <h2 className="mt-3 text-sm font-bold text-slate-900">Operator</h2>
          <p className="mt-2 text-sm text-slate-600">
            {OPERATOR_NAME} — practical web tools.
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Send a clear request</h2>
        <p className="mt-3 text-slate-600 leading-relaxed">
          Email is the fastest way to reach us. There is no phone support line and no chat bot —
          a human reads your message. Use the subjects below so we can prioritize correctly.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          <li>
            <strong className="text-slate-800">Bug report</strong> — browser, device, steps to
            reproduce, and what you expected vs what happened
          </li>
          <li>
            <strong className="text-slate-800">Feature request</strong> — the workflow you want
            OCR to support
          </li>
          <li>
            <strong className="text-slate-800">Privacy / data</strong> — questions about AI OCR,
            cookies, or advertising
          </li>
          <li>
            <strong className="text-slate-800">Partnership or press</strong> — introduce yourself
            and your timeline
          </li>
          <li>
            Do <strong className="text-slate-800">not</strong> email sensitive personal documents —
            for support we usually do not need your images. Note that using Extract Text sends the
            image to a cloud AI OCR provider (see{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy Policy
            </Link>
            ).
          </li>
        </ul>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <HelpCircle className="h-5 w-5 text-cyan-600" />
          <h2 className="mt-3 text-lg font-bold text-slate-900">Check the FAQ first</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Many questions about languages, daily AI limits, Clean Mode, and file formats are
            already answered on our{" "}
            <Link href="/faq" className="font-semibold text-cyan-700 hover:underline">
              FAQ
            </Link>{" "}
            and{" "}
            <Link href="/how-it-works" className="font-semibold text-cyan-700 hover:underline">
              How It Works
            </Link>{" "}
            pages.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <Shield className="h-5 w-5 text-cyan-600" />
          <h2 className="mt-3 text-lg font-bold text-slate-900">Legal &amp; policies</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            For policy questions, see{" "}
            <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
              Privacy
            </Link>
            ,{" "}
            <Link href="/terms" className="font-semibold text-cyan-700 hover:underline">
              Terms
            </Link>
            ,{" "}
            <Link href="/cookie-policy" className="font-semibold text-cyan-700 hover:underline">
              Cookies
            </Link>
            , and{" "}
            <Link href="/disclaimer" className="font-semibold text-cyan-700 hover:underline">
              Disclaimer
            </Link>
            , and{" "}
            <Link href="/data-retention" className="font-semibold text-cyan-700 hover:underline">
              Data Retention
            </Link>
            . We will confirm receipt of privacy-related requests by email.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold">Email us now</h2>
        <p className="mt-3 text-sm text-slate-300">
          Prefer a direct link? Open your mail app with a pre-filled address. Include a clear
          subject line so we can route your message quickly.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`${SITE_NAME} inquiry`)}`}
          className="mt-5 inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-400"
        >
          Email {CONTACT_EMAIL}
        </a>
      </section>
    </article>
  );
}
