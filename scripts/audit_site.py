#!/usr/bin/env python3
"""Crawl the locally-built site and report SEO/link problems.

Checks every internal link resolves, that titles/descriptions/canonicals are
unique per page, and that each page has exactly one H1 with no skipped heading
levels. Run against `next start` on the port given as argv[1].
"""

import re
import sys
import urllib.request
from collections import defaultdict
from html.parser import HTMLParser

BASE = f"http://localhost:{sys.argv[1] if len(sys.argv) > 1 else '3457'}"
SITE = "https://imgtotext.in"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.headings, self.imgs = [], [], []
        self.title, self.description, self.canonical = "", "", ""
        self._in_title = False
        self._heading = None
        self._buf = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        elif tag == "title":
            self._in_title = True
        elif tag == "meta" and a.get("name") == "description":
            self.description = a.get("content", "")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href", "")
        elif tag == "img":
            self.imgs.append(a.get("alt"))
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6"):
            self._heading = int(tag[1])
            self._buf = []

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False
        elif tag in ("h1", "h2", "h3", "h4", "h5", "h6") and self._heading:
            self.headings.append((self._heading, "".join(self._buf).strip()))
            self._heading = None

    def handle_data(self, data):
        if self._in_title:
            self.title += data
        if self._heading:
            self._buf.append(data)


def fetch(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "audit"})
    try:
        with urllib.request.urlopen(req) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as err:
        return err.code, err.read().decode("utf-8", "replace")


sitemap = fetch("/sitemap.xml")[1]
paths = [u.replace(SITE, "") or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sitemap)]

pages, titles, descs, canons = {}, defaultdict(list), defaultdict(list), defaultdict(list)
problems = []

for path in paths:
    status, html = fetch(path)
    if status != 200:
        problems.append(f"{path}: HTTP {status}")
        continue
    p = Page()
    p.feed(html)
    pages[path] = p
    titles[p.title.strip()].append(path)
    descs[p.description.strip()].append(path)
    canons[p.canonical].append(path)

    h1s = [t for lvl, t in p.headings if lvl == 1]
    if len(h1s) != 1:
        problems.append(f"{path}: {len(h1s)} H1s -> {h1s[:3]}")
    levels = [lvl for lvl, _ in p.headings]
    for prev, cur in zip(levels, levels[1:]):
        if cur > prev + 1:
            problems.append(f"{path}: heading jump H{prev} -> H{cur}")
            break
    for alt in p.imgs:
        if alt is None:
            problems.append(f"{path}: <img> with no alt attribute")
    if not p.canonical:
        problems.append(f"{path}: missing canonical")
    # Google renders roughly 60 characters of title and 160 of description;
    # short titles are fine on legal pages, so only flag overflow.
    if len(p.title) > 60:
        problems.append(f"{path}: title {len(p.title)} chars ({p.title!r})")
    if not (70 <= len(p.description) <= 160):
        problems.append(f"{path}: description {len(p.description)} chars")

for label, group in (("title", titles), ("description", descs), ("canonical", canons)):
    for value, where in group.items():
        if len(where) > 1:
            problems.append(f"duplicate {label} across {where}: {value[:60]!r}")

targets = set()
for path, p in pages.items():
    for href in p.links:
        if href.startswith(SITE):
            href = href.replace(SITE, "") or "/"
        if not href.startswith("/") or href.startswith("//"):
            continue
        targets.add((href.split("#")[0] or "/", path))

checked = {}
for target, source in sorted(targets):
    if target not in checked:
        try:
            checked[target] = fetch(target)[0]
        except Exception as exc:  # noqa: BLE001 - report and continue
            checked[target] = str(exc)
    if checked[target] != 200:
        problems.append(f"broken link {target} (from {source}): {checked[target]}")

print(f"crawled {len(pages)} pages, {len(checked)} unique internal link targets\n")
if problems:
    print(f"{len(problems)} problems:")
    for problem in problems:
        print(" -", problem)
else:
    print("no problems found")
