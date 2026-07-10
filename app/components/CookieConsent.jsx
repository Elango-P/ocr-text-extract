"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";

const STORAGE_KEY = "imgtotext-cookie-consent";
const CONSENT_EVENT = "imgtotext-consent";

function subscribe(onStoreChange) {
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getServerSnapshot() {
  return false;
}

export default function CookieConsent() {
  const getSnapshot = useCallback(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  }, []);

  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function save(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore quota / private mode */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 sm:flex-row sm:items-center sm:p-5">
        <p className="flex-1 text-sm leading-relaxed text-slate-600">
          We use cookies and similar technologies for essential site functions and, when
          enabled, Google AdSense advertising. See our{" "}
          <Link href="/privacy" className="font-semibold text-cyan-700 hover:underline">
            Privacy Policy
          </Link>{" "}
          for details. You can change ad personalization at{" "}
          <a
            href="https://adssettings.google.com"
            className="font-semibold text-cyan-700 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Google Ad Settings
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => save("essential")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Essential only
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
