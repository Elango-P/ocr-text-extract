#!/usr/bin/env python3
"""Second-pass checks: redirects, JSON-LD validity, robots, noindex."""

import json
import re
import sys
import urllib.request
from html.parser import HTMLParser

BASE = f"http://localhost:{sys.argv[1] if len(sys.argv) > 1 else '3457'}"

OLD_PATHS = [
    "/jpg-to-text", "/png-to-text",
    "/invoice-to-text", "/blog/what-is-ocr", "/blog/ocr-accuracy-tips",
    "/blog/handwriting-ocr", "/blog/pdf-ocr-guide", "/blog/ocr-using-python",
    "/blog/ocr-in-javascript", "/blog/ocr-for-students", "/blog/ocr-for-businesses",
    "/blog/best-ocr-tools-2026", "/blog/ocr-security-privacy",
]


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args):
        return None


opener = urllib.request.build_opener(NoRedirect)


def head(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "audit"})
    try:
        with opener.open(req) as r:
            return r.status, r.headers.get("Location", "")
    except urllib.error.HTTPError as err:
        return err.code, err.headers.get("Location", "")


class LdExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocks, self._grab = [], False

    def handle_starttag(self, tag, attrs):
        self._grab = tag == "script" and dict(attrs).get("type") == "application/ld+json"

    def handle_endtag(self, tag):
        self._grab = False

    def handle_data(self, data):
        if self._grab:
            self.blocks.append(data)


def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "audit"})
    with urllib.request.urlopen(req) as r:
        return r.read().decode("utf-8", "replace")


problems = []

print("== redirects ==")
for path in OLD_PATHS:
    status, location = head(path)
    print(f"  {path:42s} {status} -> {location}")
    if status not in (301, 308):
        problems.append(f"{path} returns {status}, expected a permanent redirect")

print("\n== structured data ==")
sitemap = get("/sitemap.xml")
paths = [u.replace("https://imgtotext.in", "") or "/" for u in re.findall(r"<loc>([^<]+)</loc>", sitemap)]
for path in paths:
    html = get(path)
    ex = LdExtractor()
    ex.feed(html)
    types = []
    for block in ex.blocks:
        try:
            data = json.loads(block)
        except json.JSONDecodeError as err:
            problems.append(f"{path}: invalid JSON-LD ({err})")
            continue
        for node in data if isinstance(data, list) else [data]:
            graph = node.get("@graph", [node])
            for item in graph:
                types.append(item.get("@type"))
                if "@context" not in node:
                    problems.append(f"{path}: JSON-LD missing @context")
    print(f"  {path:42s} {types}")
    if "noindex" in html:
        problems.append(f"{path}: contains noindex")

print("\n== robots.txt ==")
print(get("/robots.txt"))

print()
if problems:
    print(f"{len(problems)} problems:")
    for p in problems:
        print(" -", p)
else:
    print("no problems found")
