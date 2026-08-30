#!/usr/bin/env node
/**
 * Prints every URL that should appear in sitemap.xml for Search Console checks.
 * Usage: node scripts/list-indexable-urls.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { TOOL_ROUTES } from "../app/lib/tools/toolRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SITE_URL = "https://imgtotext.in";

const staticRoutes = [
  "",
  "/about",
  "/author/elango-p",
  "/contact",
  "/faq",
  "/how-it-works",
  "/blog",
  "/privacy-policy",
  "/terms",
  "/cookie-policy",
  "/disclaimer",
  "/data-retention",
  ...TOOL_ROUTES.map((t) => t.path),
];

const blogDir = path.join(root, "content", "blog");
const blogSlugs = fs
  .readdirSync(blogDir)
  .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
  .map((f) => f.replace(/\.md$/, ""));

const urls = [
  ...staticRoutes.map((r) => `${SITE_URL}${r}`),
  ...blogSlugs.map((slug) => `${SITE_URL}/blog/${slug}`),
];

console.log(`Indexable URLs (${urls.length}):\n`);
for (const url of urls) console.log(url);
console.log(`\nNext steps for Search Console:`);
console.log(`1. Verify ownership of ${SITE_URL} (DNS or HTML tag / env NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION).`);
console.log(`2. Submit ${SITE_URL}/sitemap.xml`);
console.log(`3. Request indexing for / and /blog after deploy.`);
console.log(`4. Confirm no crawl errors, then apply to AdSense.`);
