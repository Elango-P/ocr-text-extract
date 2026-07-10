import { Mail, MessageSquare, Clock } from "lucide-react";
import { SITE_URL, CONTACT_EMAIL, OPERATOR_NAME, SITE_NAME } from "../lib/site";

export const metadata = {
  title: "Contact",
  description:
    "Contact OCR Text Extractor for support, feedback, privacy questions, or bug reports. We respond by email.",
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
        we read every message.
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
        <h2 className="text-xl font-bold text-slate-900">What to include</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          <li>A clear subject line (bug report, feature request, privacy, AdSense/policy, etc.)</li>
          <li>Browser and device details if you are reporting a technical issue</li>
          <li>Steps to reproduce the problem when possible</li>
          <li>
            Do <strong className="text-slate-800">not</strong> email sensitive personal documents —
            for support we usually do not need your images. Note that using Extract Text sends the
            image to a cloud AI OCR provider (see Privacy Policy).
          </li>
        </ul>
      </section>

      <section className="mt-8 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
        <h2 className="text-xl font-bold">Email us now</h2>
        <p className="mt-3 text-sm text-slate-300">
          Prefer a direct link? Open your mail app with a pre-filled address:
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
