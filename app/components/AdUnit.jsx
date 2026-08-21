"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "../lib/site";
import { useAdConsent } from "./CookieConsent";
import { ADSENSE_LOADED_EVENT } from "./AdSenseScript";

function isAdSenseScriptReady() {
  return Boolean(
    typeof window !== "undefined" &&
      document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')
  );
}

/**
 * Manual AdSense display unit. Renders with client ID + slot unless Essential-only opt-out.
 */
export default function AdUnit({ slot, className = "" }) {
  const adsAllowed = useAdConsent();
  const insRef = useRef(null);
  const pushedRef = useRef(false);

  const ready = Boolean(ADSENSE_CLIENT_ID && slot && adsAllowed);

  useEffect(() => {
    if (!ready) return;

    const pushAd = () => {
      if (pushedRef.current) return;
      const el = insRef.current;
      if (!el) return;
      if (el.getAttribute("data-adsbygoogle-status") || el.getAttribute("data-ad-status")) {
        pushedRef.current = true;
        return;
      }

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch {
        /* ignore — script may still be initializing */
      }
    };

    if (isAdSenseScriptReady()) {
      // Defer so the <ins> is committed before push
      const id = window.requestAnimationFrame(pushAd);
      return () => window.cancelAnimationFrame(id);
    }

    window.addEventListener(ADSENSE_LOADED_EVENT, pushAd);
    return () => window.removeEventListener(ADSENSE_LOADED_EVENT, pushAd);
  }, [ready, slot]);

  if (!ready) return null;

  return (
    // Not aria-hidden: the injected ad frame is focusable, and hiding a
    // focusable region from the accessibility tree leaves screen-reader users
    // tabbing into something unannounced.
    <aside
      className={`ad-slot w-full ${className}`.trim()}
      aria-label="Advertisement"
    >
      <p className="mb-1 text-center text-[10px] font-medium uppercase tracking-widest text-slate-400">
        Advertisement
      </p>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
