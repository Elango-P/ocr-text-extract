# OCR Text Extractor

Free, privacy-first image-to-text tool powered by [Tesseract.js](https://tesseract.projectnaptha.com/). All OCR runs in the browser — images are never uploaded to a server.

**Live:** [ocr.elangodev.com](https://ocr.elangodev.com) (after deploy)

## Features

- Multi-language OCR (English, Spanish, French, German, and more)
- Smart preprocessing (enhanced + binary dual-pass)
- Modal/dialog auto-focus for UI screenshots
- Multi-column layout reconstruction for profile pages
- Clean mode with confidence scoring

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Deploy to Vercel, Netlify, or any static host that supports Next.js:

```bash
npm run build
npm start
```

Point subdomain `ocr.elangodev.com` to the deployment.

## License

MIT
