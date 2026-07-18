"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "../lib/site";
import { useAdConsent } from "./CookieConsent";

/**
 * Loads the AdSense library only after cookie consent = accepted.
 */
export default function AdSenseScript() {
  const adsAllowed = useAdConsent();

  if (!ADSENSE_CLIENT_ID || !adsAllowed) return null;

  return (
    <Script
      id="adsense-init"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
