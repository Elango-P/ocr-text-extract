"use client";

import { openCookieSettings } from "./CookieConsent";

/** Tiny client island so the footer can open cookie settings without making SiteLayout a client tree. */
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="mt-3 rounded text-sm font-semibold text-cyan-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
    >
      Cookie Settings
    </button>
  );
}
