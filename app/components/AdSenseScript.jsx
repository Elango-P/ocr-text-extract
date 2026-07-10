import Script from "next/script";
import { ADSENSE_CLIENT_ID } from "../lib/site";

/**
 * Loads the AdSense library site-wide when NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
 * Keep placements minimal until the account is approved.
 */
export default function AdSenseScript() {
  if (!ADSENSE_CLIENT_ID) return null;

  return (
    <Script
      id="adsense-init"
      async
      strategy="beforeInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
    />
  );
}
