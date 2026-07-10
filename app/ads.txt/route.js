import { adsTxtLine } from "../lib/site";

export const dynamic = "force-dynamic";

export function GET() {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() || "";
  const line = adsTxtLine(clientId);
  const body = line
    ? `${line}\n`
    : "# Set NEXT_PUBLIC_ADSENSE_CLIENT_ID to publish your AdSense ads.txt line\n";

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
