"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "../lib/site";
import { useAdConsent } from "./CookieConsent";

/**
 * Manual AdSense display unit. Renders only with client ID, slot, and Accept consent.
 */
export default function AdUnit({ slot, className = "" }) {
  const adsAllowed = useAdConsent();
  const insRef = useRef(null);
  const pushedRef = useRef(false);

  const ready = Boolean(ADSENSE_CLIENT_ID && slot && adsAllowed);

  useEffect(() => {
    if (!ready || pushedRef.current) return;
    const el = insRef.current;
    if (!el || el.getAttribute("data-adsbygoogle-status")) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushedRef.current = true;
    } catch {
      /* AdSense may throw if script not ready yet; ignore */
    }
  }, [ready, slot]);

  if (!ready) return null;

  return (
    <div className={`w-full ${className}`.trim()} aria-hidden="true">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: 100 }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
