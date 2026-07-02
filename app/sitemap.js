export default function sitemap() {
  const base = "https://ocr.elangodev.com";
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/how-it-works`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/faq`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terms`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
