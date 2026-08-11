#!/usr/bin/env python3
"""Generate a fixed OCR corpus and measure Gemini vs system Tesseract CER.

Writes:
  public/benchmark/corpus/*.png
  public/benchmark/ground_truth.json
  public/benchmark/results.json
  public/benchmark/README.md

Requires GOOGLE_GENERATIVE_AI_API_KEY (same as the site API) and `tesseract`.
Numbers are measured — never invent accuracy percentages for the article.
"""

from __future__ import annotations

import base64
import json
import math
import os
import random
import subprocess
import sys
import urllib.error
import urllib.request
from datetime import date, datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "benchmark"
CORPUS = OUT / "corpus"
ENV_FILE = ROOT / ".env"

MODEL = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash").strip() or "gemini-2.5-flash"
LANG = "eng"
SEED = 20260811

FONT_SANS = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
FONT_MONO = "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf"
FONT_SERIF = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf"


def load_api_key() -> str:
    key = os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY", "").strip()
    if key:
        return key
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text().splitlines():
            if line.startswith("GOOGLE_GENERATIVE_AI_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    return ""


def normalize_text(s: str) -> str:
    """Whitespace-normalized form used for CER (documented in the article)."""
    return " ".join((s or "").replace("\r", "\n").split()).strip()


def levenshtein(a: str, b: str) -> int:
    if a == b:
        return 0
    if not a:
        return len(b)
    if not b:
        return len(a)
    prev = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        cur = [i]
        for j, cb in enumerate(b, 1):
            ins = cur[j - 1] + 1
            delete = prev[j] + 1
            sub = prev[j - 1] + (ca != cb)
            cur.append(min(ins, delete, sub))
        prev = cur
    return prev[-1]


def cer(hyp: str, ref: str) -> float:
    ref_n = normalize_text(ref)
    hyp_n = normalize_text(hyp)
    if not ref_n:
        return 0.0 if not hyp_n else 1.0
    return levenshtein(hyp_n, ref_n) / len(ref_n)


def font(path: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(path, size)


def draw_wrapped(
    draw: ImageDraw.ImageDraw,
    text: str,
    xy: tuple[int, int],
    fnt: ImageFont.ImageFont,
    fill,
    max_width: int,
    line_gap: int = 8,
) -> None:
    x, y = xy
    words = text.split()
    line = ""
    for word in words:
        trial = f"{line} {word}".strip()
        if draw.textlength(trial, font=fnt) <= max_width:
            line = trial
        else:
            draw.text((x, y), line, font=fnt, fill=fill)
            y += fnt.size + line_gap
            line = word
    if line:
        draw.text((x, y), line, font=fnt, fill=fill)


def make_clean_print(path: Path, text: str) -> None:
    img = Image.new("RGB", (1000, 700), (245, 245, 242))
    draw = ImageDraw.Draw(img)
    draw.rectangle((40, 40, 960, 660), outline=(210, 210, 205), width=2)
    fnt = font(FONT_SANS, 28)
    draw_wrapped(draw, text, (70, 80), fnt, (20, 20, 20), 860, line_gap=12)
    img.save(path, "PNG")


def make_thermal_receipt(path: Path, text: str) -> None:
    # Tall narrow “thermal” slip: gray paper, mono type, mild vertical curl/darken.
    img = Image.new("RGB", (520, 900), (220, 220, 215))
    draw = ImageDraw.Draw(img)
    fnt = font(FONT_MONO, 18)
    y = 40
    for line in text.split("\n"):
        draw.text((36, y), line, font=fnt, fill=(35, 35, 35))
        y += 26
    # Soft vignette + JPEG-like softness to mimic worn thermal paper
    img = ImageEnhance.Contrast(img).enhance(0.92)
    img = img.filter(ImageFilter.GaussianBlur(radius=0.6))
    px = img.load()
    w, h = img.size
    for yy in range(h):
        shade = 1.0 - 0.18 * (yy / h)
        for xx in range(w):
            r, g, b = px[xx, yy]
            px[xx, yy] = (int(r * shade), int(g * shade), int(b * shade))
    img.save(path, "PNG")


def make_dark_screenshot(path: Path, text: str) -> None:
    img = Image.new("RGB", (1100, 640), (24, 24, 27))
    draw = ImageDraw.Draw(img)
    draw.rectangle((0, 0, 1100, 48), fill=(39, 39, 42))
    draw.text((16, 14), "Terminal — session", font=font(FONT_SANS, 16), fill=(180, 180, 190))
    draw.rectangle((24, 72, 1076, 600), fill=(12, 12, 14), outline=(63, 63, 70))
    fnt = font(FONT_MONO, 20)
    y = 96
    for line in text.split("\n"):
        draw.text((48, y), line, font=fnt, fill=(228, 228, 231))
        y += 28
    img.save(path, "PNG")


def make_skewed_scan(path: Path, text: str) -> None:
    base = Image.new("RGB", (1000, 700), (255, 255, 255))
    draw = ImageDraw.Draw(base)
    fnt = font(FONT_SANS, 26)
    draw_wrapped(draw, text, (60, 70), fnt, (10, 10, 10), 880, line_gap=10)
    # Fake paper edge + mild deskew challenge
    rotated = base.rotate(-7.5, expand=True, fillcolor=(190, 186, 178))
    canvas = Image.new("RGB", (1100, 800), (190, 186, 178))
    ox = (canvas.width - rotated.width) // 2
    oy = (canvas.height - rotated.height) // 2
    canvas.paste(rotated, (ox, oy))
    canvas = ImageEnhance.Contrast(canvas).enhance(1.05)
    canvas.save(path, "PNG")


def make_low_light(path: Path, text: str) -> None:
    img = Image.new("RGB", (1000, 700), (48, 42, 36))
    draw = ImageDraw.Draw(img)
    fnt = font(FONT_SANS, 27)
    draw_wrapped(draw, text, (70, 90), fnt, (210, 200, 180), 860, line_gap=11)
    # Uneven lighting + noise + JPEG compression
    overlay = Image.new("RGB", img.size, (0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.ellipse((-120, -80, 620, 520), fill=(70, 55, 40))
    img = Image.blend(img, overlay, 0.35)
    rng = random.Random(SEED + path.name.__hash__())
    px = img.load()
    w, h = img.size
    for _ in range(18000):
        x, y = rng.randrange(w), rng.randrange(h)
        n = rng.randint(-28, 28)
        r, g, b = px[x, y]
        px[x, y] = (
            max(0, min(255, r + n)),
            max(0, min(255, g + n)),
            max(0, min(255, b + n)),
        )
    tmp = path.with_suffix(".jpg")
    img.save(tmp, "JPEG", quality=38)
    Image.open(tmp).save(path, "PNG")
    tmp.unlink(missing_ok=True)


def make_handwriting_sim(path: Path, text: str) -> None:
    """Simulated handwriting: italic serif with per-glyph jitter (disclosed in article)."""
    img = Image.new("RGB", (1100, 720), (252, 250, 245))
    draw = ImageDraw.Draw(img)
    # Ruled paper
    for y in range(90, 680, 42):
        draw.line((50, y, 1050, y), fill=(210, 220, 230), width=1)
    fnt = font(FONT_SERIF, 30)
    rng = random.Random(SEED + abs(hash(path.name)) % 10_000)
    x, y = 70, 100
    for ch in text:
        if ch == "\n":
            x, y = 70, y + 44
            continue
        if ch == " " and x > 980:
            x, y = 70, y + 44
            continue
        dx, dy = rng.randint(-2, 2), rng.randint(-3, 3)
        draw.text((x + dx, y + dy), ch, font=fnt, fill=(25, 40, 90))
        x += int(draw.textlength(ch, font=fnt)) + rng.randint(0, 2)
        if x > 1000:
            x, y = 70, y + 44
    img = img.filter(ImageFilter.SMOOTH)
    img.save(path, "PNG")


SAMPLES = [
    {
        "id": "clean_print_01",
        "category": "clean_print",
        "builder": make_clean_print,
        "text": (
            "Meeting notes — 11 August 2026\n"
            "Attendees: Priya, Marcus, Elena\n"
            "Agenda item 1: ship the receipt OCR guide before Friday.\n"
            "Action: Marcus will upload the revised PDF by 17:00 IST."
        ),
    },
    {
        "id": "clean_print_02",
        "category": "clean_print",
        "builder": make_clean_print,
        "text": (
            "Shipping label\n"
            "Order ID: ORD-88421\n"
            "Recipient: Jordan Lee\n"
            "Address: 14 Lakeview Road, Pune 411001\n"
            "Contents: 2x USB-C hub, 1x spare cable"
        ),
    },
    {
        "id": "thermal_receipt_01",
        "category": "thermal_receipt",
        "builder": make_thermal_receipt,
        "text": (
            "CORNER CAFE\n"
            "GSTIN 27AABCU9603R1ZM\n"
            "------------------------\n"
            "Espresso            120.00\n"
            "Masala dosa         90.00\n"
            "Bottled water       30.00\n"
            "------------------------\n"
            "Subtotal           240.00\n"
            "CGST 2.5%            6.00\n"
            "SGST 2.5%            6.00\n"
            "TOTAL              252.00\n"
            "Paid UPI 12:41 IST\n"
            "Txn REF9K2M7Q"
        ),
    },
    {
        "id": "thermal_receipt_02",
        "category": "thermal_receipt",
        "builder": make_thermal_receipt,
        "text": (
            "CITY MART\n"
            "Bill No 441902\n"
            "------------------------\n"
            "Milk 1L              58.00\n"
            "Bread loaf           45.00\n"
            "Eggs dozen           72.00\n"
            "------------------------\n"
            "Items 3\n"
            "TOTAL               175.00\n"
            "Cash tendered       200.00\n"
            "Change               25.00"
        ),
    },
    {
        "id": "dark_screenshot_01",
        "category": "dark_mode_screenshot",
        "builder": make_dark_screenshot,
        "text": (
            "$ npm run build\n"
            "> next build\n"
            "Error: ENOENT: no such file or directory\n"
            "    at Object.openSync (node:fs:596:3)\n"
            "    at readFileSync (node:fs:464:35)\n"
            "hint: check app/sitemap.js path"
        ),
    },
    {
        "id": "dark_screenshot_02",
        "category": "dark_mode_screenshot",
        "builder": make_dark_screenshot,
        "text": (
            "POST /api/ocr 429\n"
            "code: RATE_LIMITED\n"
            "remaining: 0\n"
            "resetAt: 2026-08-12T00:00:00Z\n"
            "message: Daily AI OCR limit reached"
        ),
    },
    {
        "id": "skewed_scan_01",
        "category": "skewed_scan",
        "builder": make_skewed_scan,
        "text": (
            "Library checkout slip\n"
            "Member: A. Raman\n"
            "Title: Practical Document Imaging\n"
            "Due date: 25 August 2026\n"
            "Barcode: 39015012345678"
        ),
    },
    {
        "id": "skewed_scan_02",
        "category": "skewed_scan",
        "builder": make_skewed_scan,
        "text": (
            "Permission slip\n"
            "Student: Kavya Nair\n"
            "Event: Science fair visit\n"
            "Date: 19 August 2026\n"
            "Parent signature required before boarding."
        ),
    },
    {
        "id": "low_light_01",
        "category": "low_light_photo",
        "builder": make_low_light,
        "text": (
            "Whiteboard reminder\n"
            "Deploy window: Saturday 02:00–04:00 IST\n"
            "Owner: platform team\n"
            "Rollback plan reviewed — ticket PLAT-992"
        ),
    },
    {
        "id": "low_light_02",
        "category": "low_light_photo",
        "builder": make_low_light,
        "text": (
            "Parking notice\n"
            "Bay B-14 reserved for visitors\n"
            "Valid 11 Aug 2026 only\n"
            "Call desk on extension 4400"
        ),
    },
    {
        "id": "handwriting_sim_01",
        "category": "handwriting_sim",
        "builder": make_handwriting_sim,
        "text": (
            "Buy milk and eggs\n"
            "Call dentist Tuesday\n"
            "Finish OCR notes"
        ),
    },
    {
        "id": "handwriting_sim_02",
        "category": "handwriting_sim",
        "builder": make_handwriting_sim,
        "text": (
            "Password reset code\n"
            "is four eight two one\n"
            "expires in ten minutes"
        ),
    },
]


def run_tesseract(image: Path) -> str:
    proc = subprocess.run(
        [
            "tesseract",
            str(image),
            "stdout",
            "-l",
            LANG,
            "--oem",
            "1",
            "--psm",
            "3",
            "-c",
            "user_defined_dpi=300",
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    if proc.returncode != 0:
        raise RuntimeError(proc.stderr.strip() or "tesseract failed")
    return proc.stdout.strip()


def run_gemini(api_key: str, image: Path) -> str:
    b64 = base64.b64encode(image.read_bytes()).decode("ascii")
    prompt = (
        "You are an OCR engine. Extract all readable text from the image. "
        "The document language is primarily English. "
        "Preserve natural reading order and line breaks. "
        "Do not translate. Do not summarize. Do not add commentary. "
        "If no text is visible, reply with exactly: NO_TEXT_FOUND "
        "Return only the extracted text."
    )
    body = {
        "contents": [
            {
                "parts": [
                    {"inline_data": {"mime_type": "image/png", "data": b64}},
                    {"text": prompt},
                ]
            }
        ],
        "generationConfig": {"temperature": 0.1, "maxOutputTokens": 8192},
    }
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{MODEL}:generateContent"
    )
    req = urllib.request.Request(
        url,
        data=json.dumps(body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as resp:
            payload = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as err:
        detail = err.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Gemini HTTP {err.code}: {detail[:500]}") from err

    text = "".join(
        part.get("text", "")
        for cand in payload.get("candidates") or []
        for part in ((cand.get("content") or {}).get("parts") or [])
    ).strip()
    if not text or text == "NO_TEXT_FOUND":
        return ""
    return text


def mean(values: list[float]) -> float:
    return sum(values) / len(values) if values else 0.0


def main() -> int:
    api_key = load_api_key()
    if not api_key:
        print("Missing GOOGLE_GENERATIVE_AI_API_KEY", file=sys.stderr)
        return 1

    CORPUS.mkdir(parents=True, exist_ok=True)
    random.seed(SEED)

    ground_truth = []
    per_sample = []

    print(f"Generating {len(SAMPLES)} corpus images…")
    for sample in SAMPLES:
        path = CORPUS / f"{sample['id']}.png"
        sample["builder"](path, sample["text"])
        ground_truth.append(
            {
                "id": sample["id"],
                "category": sample["category"],
                "file": f"corpus/{sample['id']}.png",
                "text": sample["text"],
            }
        )

    print("Running Tesseract + Gemini…")
    for item in ground_truth:
        image = OUT / item["file"]
        print(f"  {item['id']}")
        tess = run_tesseract(image)
        gem = run_gemini(api_key, image)
        row = {
            "id": item["id"],
            "category": item["category"],
            "file": item["file"],
            "ground_truth_chars": len(normalize_text(item["text"])),
            "tesseract": {
                "text": tess,
                "cer": round(cer(tess, item["text"]), 4),
            },
            "gemini": {
                "text": gem,
                "cer": round(cer(gem, item["text"]), 4),
                "model": MODEL,
            },
        }
        per_sample.append(row)
        print(
            f"    CER tesseract={row['tesseract']['cer']:.3f} "
            f"gemini={row['gemini']['cer']:.3f}"
        )

    categories = sorted({s["category"] for s in per_sample})
    by_category = {}
    for cat in categories:
        rows = [r for r in per_sample if r["category"] == cat]
        by_category[cat] = {
            "n": len(rows),
            "mean_cer_tesseract": round(mean([r["tesseract"]["cer"] for r in rows]), 4),
            "mean_cer_gemini": round(mean([r["gemini"]["cer"] for r in rows]), 4),
        }

    results = {
        "benchmark_id": "imgtotext-ocr-bench-v1",
        "run_date": date.today().isoformat(),
        "run_at_utc": datetime.now(timezone.utc).isoformat(),
        "seed": SEED,
        "metric": "character_error_rate",
        "normalization": "collapse whitespace (split on any whitespace, rejoin with single spaces, strip)",
        "engines": {
            "gemini": {
                "model": MODEL,
                "prompt": "same extraction prompt as app/api/ocr/route.js",
                "notes": "Image sent as PNG base64; temperature 0.1",
            },
            "tesseract": {
                "binary": subprocess.check_output(["tesseract", "--version"], text=True).splitlines()[0],
                "oem": 1,
                "psm": 3,
                "lang": LANG,
                "notes": (
                    "System Tesseract LSTM (OEM 1), matching the site's OEM.LSTM_ONLY "
                    "intent. Site fallback uses tesseract.js in-browser with extra "
                    "preprocessing; this bench uses the raw PNG with no site preprocessor."
                ),
            },
        },
        "corpus_notes": {
            "handwriting_sim": (
                "Not real penmanship — italic DejaVu Serif with per-glyph jitter on ruled paper. "
                "Included to stress irregular spacing, not to claim handwriting CER for humans."
            ),
            "privacy": "All samples are synthetic; no real customer documents.",
        },
        "summary": {
            "n_images": len(per_sample),
            "mean_cer_tesseract": round(mean([r["tesseract"]["cer"] for r in per_sample]), 4),
            "mean_cer_gemini": round(mean([r["gemini"]["cer"] for r in per_sample]), 4),
            "by_category": by_category,
        },
        "samples": per_sample,
    }

    (OUT / "ground_truth.json").write_text(json.dumps(ground_truth, indent=2) + "\n")
    (OUT / "results.json").write_text(json.dumps(results, indent=2) + "\n")
    (OUT / "README.md").write_text(
        "\n".join(
            [
                "# OCR benchmark corpus (v1)",
                "",
                f"Generated {results['run_date']}. Re-run with:",
                "",
                "```bash",
                "python3 scripts/run_ocr_benchmark.py",
                "```",
                "",
                "See `/blog/ocr-engine-benchmark-gemini-vs-tesseract` for the write-up.",
                "",
            ]
        )
    )

    print("\nSummary mean CER:")
    print(f"  Tesseract: {results['summary']['mean_cer_tesseract']}")
    print(f"  Gemini:    {results['summary']['mean_cer_gemini']}")
    print(f"Wrote {OUT / 'results.json'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
