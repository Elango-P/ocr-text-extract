"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";

export const COOKIE_CONSENT_STORAGE_KEY = "imgtotext-cookie-consent";
export const COOKIE_CONSENT_EVENT = "imgtotext-consent";
export const COOKIE_CONSENT_OPEN_EVENT = "imgtotext-consent-open";

function subscribe(onStoreChange) {
  window.addEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
  window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(COOKIE_CONSENT_EVENT, onStoreChange);
    window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** SSR/crawlers: show banner in HTML so scanners can detect cookie consent. */
function getServerSnapshot() {
  return true;
}

export function openCookieSettings() {
  try {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}

function readConsentValue() {
  try {
    return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

/**
 * Ads allowed unless the user opted out with Essential only.
 * AdSense script still requires NEXT_PUBLIC_ADSENSE_CLIENT_ID — empty ID means no ads load.
 * SSR: allow so units can exist in first paint when configured.
 */
export function useAdConsent() {
  const getSnapshot = useCallback(() => readConsentValue() !== "essential", []);
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}

export default function CookieConsent() {
  const getSnapshot = useCallback(() => {
    if (typeof window === "undefined") return true;
    return !readConsentValue();
  }, []);

  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function save(value) {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
    } catch {
      /* ignore quota / private mode */
    }
    window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      id="cookie-consent"
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      data-cookie-consent="true"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 sm:flex-row sm:items-center sm:p-5">
        <p className="flex-1 text-sm leading-relaxed text-slate-600">
          We use cookies for essential site functions. When advertising is enabled, Google AdSense
          may set advertising cookies unless you choose Essential only. Extracting text uses cloud
          AI OCR (see our{" "}
          <Link href="/privacy-policy" className="font-semibold text-cyan-700 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="font-semibold text-cyan-700 hover:underline">
            Cookie Policy
          </Link>
          ). You can change ad personalization at{" "}
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
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            id="cookie-consent-essential"
            onClick={() => save("essential")}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Essential only
          </button>
          <button
            type="button"
            id="cookie-consent-accept"
            onClick={() => save("accepted")}
            className="rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-cyan-700"
          >
            Accept
          </button>
          <button
            type="button"
            id="cookie-consent-dismiss"
            aria-label="Close cookie notice"
            onClick={() => save("accepted")}
            className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
