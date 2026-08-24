"use client";

import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "../lib/site";
import { useAdConsent } from "./CookieConsent";

export const ADSENSE_LOADED_EVENT = "imgtotext-adsense-loaded";

/**
 * Loads AdSense unless the user opted out with Essential only.
 */
export default function AdSenseScript() {
  const adsAllowed = useAdConsent();

  if (!ADSENSE_CLIENT_ID || !adsAllowed) return null;

  return (
    <Script
      id="adsense-init"
      async
      strategy="lazyOnload"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      onLoad={() => {
        window.dispatchEvent(new Event(ADSENSE_LOADED_EVENT));
      }}
    />
  );
}
