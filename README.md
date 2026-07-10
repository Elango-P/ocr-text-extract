# OCR Text Extractor

Free, image-to-text tool with cloud AI OCR and a [Tesseract.js](https://tesseract.projectnaptha.com/) browser fallback.

**Live:** [https://imgtotext.in](https://imgtotext.in)

## Features

- Multi-language OCR (English, Spanish, French, German, and more)
- Smart preprocessing (enhanced + binary dual-pass)
- Modal/dialog auto-focus for UI screenshots
- Multi-column layout reconstruction for profile pages
- Clean mode with confidence scoring
- AdSense-ready setup (`ads.txt`, site-wide script, cookie notice)

## Development

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | For ads | Google AdSense publisher ID (`ca-pub-...`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Search Console / AdSense HTML verification token |
| `GOOGLE_GENERATIVE_AI_API_KEY` | For AI OCR | Google AI API key (server-only) |
| `GEMINI_MODEL` | Optional | Defaults to `gemini-2.5-flash` |

With the AdSense client ID set, `/ads.txt` serves:

`google.com, ca-pub-XXXXXXXX, DIRECT, f08c47fec0942fa0`

## Deploy

Deploy to Vercel, Netlify, or any host that supports Next.js:

```bash
npm run build
npm start
```

Point `imgtotext.in` to the deployment and set the env vars in your host dashboard.

## License

MIT
