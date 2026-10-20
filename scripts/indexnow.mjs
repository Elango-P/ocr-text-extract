#!/usr/bin/env node
/**
 * Submits all indexable URLs to IndexNow (Bing, Yahoo, Seznam, Naver, ChatGPT Search).
 * Usage: node scripts/indexnow.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { TOOL_ROUTES } from "../app/lib/tools/toolRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const HOST = "imgtotext.in";
const KEY = "c03dfd80766d40f89d3810ff6122dca8";
const SITE_URL = `https://${HOST}`;

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

console.log(`Submitting ${urls.length} URLs to IndexNow for ${HOST}...`);

const payload = {
  host: HOST,
  key: KEY,
  keyLocation: `${SITE_URL}/${KEY}.txt`,
  urlList: urls,
};

try {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok || response.status === 200 || response.status === 202) {
    console.log(`✓ IndexNow successfully submitted! Status: ${response.status}`);
  } else {
    const text = await response.text();
    console.warn(`IndexNow submission response: ${response.status} - ${text}`);
  }
} catch (error) {
  console.error("IndexNow submission network error:", error.message);
}
