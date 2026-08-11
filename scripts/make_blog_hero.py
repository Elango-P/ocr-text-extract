#!/usr/bin/env python3
"""Render blog/tool hero images in the existing house style.

The original set was 1200x675 flat cards: a tinted background with two large
circles, a rounded frame on the left holding a stack of "text" bars, and a
title block on the right. This reproduces that layout so new posts do not have
to reuse another article's artwork. Titles are measured and shrunk to fit,
which the earlier batch did not do -- ocr-blog-pdf-pages.webp shipped with its
heading running off the canvas.
"""

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 675
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"

CARDS = {
    "ocr-blog-pdf-pages": {
        "bg": (30, 41, 59),
        "circle_light": (51, 65, 85),
        "circle_dark": (15, 23, 42),
        "frame": (100, 116, 139),
        "bar": (255, 255, 255),
        "accent_bar": (148, 163, 184),
        "title": (255, 255, 255),
        "subtitle": (148, 163, 184),
        "heading": "Scanned PDF Pages",
        "subheading": "Export pages · then OCR",
    },
    "ocr-blog-preprocessing": {
        "bg": (12, 74, 110),
        "circle_light": (7, 89, 133),
        "circle_dark": (8, 47, 73),
        "frame": (56, 189, 248),
        "bar": (255, 255, 255),
        "accent_bar": (56, 189, 248),
        "title": (255, 255, 255),
        "subtitle": (125, 211, 252),
        "heading": "Preprocessing",
        "subheading": "Contrast · crop · deskew",
    },
    "ocr-tool-word": {
        "bg": (23, 58, 108),
        "circle_light": (30, 78, 140),
        "circle_dark": (16, 42, 79),
        "frame": (147, 197, 253),
        "bar": (255, 255, 255),
        "accent_bar": (96, 165, 250),
        "title": (255, 255, 255),
        "subtitle": (147, 197, 253),
        "heading": "Image to Word",
        "subheading": "Editable .docx paragraphs",
    },
    "ocr-tool-pdf-export": {
        "bg": (91, 33, 40),
        "circle_light": (127, 46, 55),
        "circle_dark": (60, 20, 25),
        "frame": (252, 165, 165),
        "bar": (255, 255, 255),
        "accent_bar": (248, 113, 113),
        "title": (255, 255, 255),
        "subtitle": (252, 165, 165),
        "heading": "Image to PDF",
        "subheading": "Selectable · searchable text",
    },
    "ocr-blog-ai-vs-tesseract": {
        "bg": (49, 46, 129),
        "circle_light": (67, 56, 202),
        "circle_dark": (30, 27, 75),
        "frame": (165, 180, 252),
        "bar": (255, 255, 255),
        "accent_bar": (129, 140, 248),
        "title": (255, 255, 255),
        "subtitle": (165, 180, 252),
        "heading": "AI vs Tesseract",
        "subheading": "Cloud model · browser engine",
    },
    "ocr-blog-benchmark": {
        "bg": (15, 55, 55),
        "circle_light": (19, 78, 74),
        "circle_dark": (10, 35, 35),
        "frame": (94, 234, 212),
        "bar": (255, 255, 255),
        "accent_bar": (45, 212, 191),
        "title": (255, 255, 255),
        "subtitle": (153, 246, 228),
        "heading": "OCR Benchmark",
        "subheading": "Gemini · Tesseract · CER",
    },
}


def fitted_font(draw, text, size, max_width, minimum=28):
    """Shrink until the rendered heading fits inside the available column."""
    while size > minimum:
        font = ImageFont.truetype(BOLD, size)
        if draw.textlength(text, font=font) <= max_width:
            return font
        size -= 2
    return ImageFont.truetype(BOLD, minimum)


def render(name, spec):
    img = Image.new("RGB", (W, H), spec["bg"])
    d = ImageDraw.Draw(img)

    d.ellipse((-140, -260, 430, 310), fill=spec["circle_light"])
    d.ellipse((780, 300, 1420, 940), fill=spec["circle_dark"])

    d.rounded_rectangle((75, 122, 558, 557), radius=26, outline=spec["frame"], width=3)

    bar_widths = [360, 320, 280, 390, 320, 275, 390, 320]
    y = 172
    for i, width in enumerate(bar_widths):
        colour = spec["accent_bar"] if i in (0, 4) else spec["bar"]
        d.rounded_rectangle((110, y, 110 + width, y + 22), radius=6, fill=colour)
        y += 42

    column = W - 620 - 90
    title_font = fitted_font(d, spec["heading"], 62, column)
    d.text((620, 200), spec["heading"], font=title_font, fill=spec["title"])

    sub_font = fitted_font(d, spec["subheading"], 26, column, minimum=18)
    d.text((620, 282), spec["subheading"], font=sub_font, fill=spec["subtitle"])

    d.text((620, 520), "imgtotext.in", font=ImageFont.truetype(BOLD, 22), fill=(255, 255, 255))

    out = f"public/images/{name}.webp"
    img.save(out, "WEBP", quality=90, method=6)
    print("wrote", out)


if __name__ == "__main__":
    for name, spec in CARDS.items():
        render(name, spec)
