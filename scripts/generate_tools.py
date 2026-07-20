import os
import textwrap

tools_data = [
    {
        "slug": "jpeg-to-text",
        "var_name": "jpegToText",
        "title": "JPEG to Text Converter",
        "metaTitle": "JPEG to Text Converter (Free OCR)",
        "description": "Convert .jpeg and .jpg files to editable text. Free online OCR for digital photos and scanned JPEGs.",
        "h1": "JPEG to Text Converter",
        "lead": "Extract text from high-resolution JPEG files instantly. Our tool handles compression artifacts and varied lighting common in JPEG photography.",
        "heroImage": "/images/ocr-blog-devtools.webp",
        "heroAlt": "JPEG image being processed by OCR tool",
        "relatedBlogSlugs": ["image-preprocessing-for-ocr", "best-ocr-tools-2026"],
        "workedExample": {
            "title": "Digitizing a JPEG scan",
            "situation": "A user has a batch of JPEG files from an older flatbed scanner.",
            "steps": [
                "Upload the .jpeg file.",
                "Ensure the correct language is selected.",
                "Use Clean Mode to remove scanner bed shadows.",
                "Extract and copy the text."
            ],
            "result": "Clean text extracted despite JPEG compression artifacts.",
            "lesson": "Clean Mode is highly effective on older flatbed JPEG scans."
        },
        "faqs": [
            {
                "q": "What is the difference between JPG and JPEG for OCR?",
                "a": "There is no difference in the image data, only the file extension. This tool handles both .jpg and .jpeg seamlessly."
            },
            {
                "q": "Does JPEG compression hurt OCR accuracy?",
                "a": "Heavy compression can blur text edges. For best results, use high-quality JPEGs with minimal compression."
            }
        ],
        "sections": [
            {
                "id": "jpeg-intro",
                "heading": "Handling JPEG Compression",
                "paragraphs": [
                    "JPEG is a lossy compression format, meaning it discards some image data to keep file sizes small. This often results in 'artifacts'—small blurry blocks around high-contrast areas like text.",
                    "Our OCR engine utilizes advanced AI models trained to read through these artifacts, providing accurate text extraction even on highly compressed JPEG files."
                ]
            },
            {
                "id": "jpeg-tips",
                "heading": "Optimizing JPEGs for Text Extraction",
                "paragraphs": [
                    "If you are taking photos or scanning specifically for text extraction, set your device to save JPEGs at the highest possible quality setting. Avoid resizing or re-saving the JPEG multiple times, as this degrades the text edges further.",
                    "For older, heavily degraded JPEGs, try enabling Clean Mode before extracting the text. This will help binarize the image and ignore the compression noise."
                ]
            }
        ]
    },
    {
        "slug": "photo-to-text",
        "var_name": "photoToText",
        "title": "Photo to Text Converter",
        "metaTitle": "Photo to Text Converter (Free OCR)",
        "description": "Extract text from smartphone photos. Free online OCR designed to handle glare, shadows, and curved pages.",
        "h1": "Photo to Text Converter",
        "lead": "Turn pictures taken on your smartphone into editable text. Built to handle real-world lighting, shadows, and angles.",
        "heroImage": "/images/ocr-phone-photo.webp",
        "heroAlt": "Smartphone taking a photo of a document",
        "relatedBlogSlugs": ["desk-setup-for-document-photos", "low-light-and-evening-scan-rescue"],
        "workedExample": {
            "title": "Extracting text from a dimly lit photo",
            "situation": "You took a photo of a menu in a dark restaurant.",
            "steps": [
                "Upload the photo from your camera roll.",
                "Crop the image to just the section of the menu you want to read.",
                "Select the language of the menu.",
                "Extract text."
            ],
            "result": "The AI OCR model successfully read the text despite the low lighting and shadows.",
            "lesson": "Cropping is essential when dealing with busy or poorly lit photographs."
        },
        "faqs": [
            {
                "q": "Can I upload photos directly from my phone?",
                "a": "Yes, our web app is fully mobile-responsive. You can select an image from your camera roll or take a new photo directly."
            },
            {
                "q": "Does glare ruin the text extraction?",
                "a": "Heavy glare that completely washes out the text will cause errors. Try to take photos with diffused lighting."
            }
        ],
        "sections": [
            {
                "id": "photo-intro",
                "heading": "The Challenge of Smartphone Photos",
                "paragraphs": [
                    "Unlike a flatbed scanner, a smartphone photo introduces dozens of variables: lens distortion, uneven lighting, shadows, and hand shake. Traditional OCR algorithms often fail completely when faced with these real-world imperfections.",
                    "This Photo to Text converter leverages AI deep learning models that understand context. They can look past shadows and compensate for slightly curved pages, extracting accurate text from everyday photography."
                ]
            },
            {
                "id": "photo-tips",
                "heading": "How to Take Better Photos for OCR",
                "paragraphs": [
                    "To get the best results, hold your phone parallel to the document to reduce skewed angles. Ensure you have adequate lighting—preferably natural daylight or dual desk lamps to eliminate the shadow of your own phone.",
                    "If a photo is particularly dark or low contrast, try using your phone's built-in photo editor to increase the contrast before uploading the image to the OCR tool."
                ]
            }
        ]
    },
    {
        "slug": "scanned-pdf-to-text",
        "var_name": "scannedPdfToText",
        "title": "Scanned PDF to Text Converter",
        "metaTitle": "Scanned PDF to Text Converter (Free OCR)",
        "description": "Convert scanned, image-only PDFs into editable text. Free online OCR for archival documents and unselectable PDFs.",
        "h1": "Scanned PDF to Text Converter",
        "lead": "Unlock the text trapped inside scanned, image-only PDFs. We digitize archival pages into clean, searchable, and editable text formats.",
        "heroImage": "/images/ocr-document-scan.webp",
        "heroAlt": "Scanned PDF document",
        "relatedBlogSlugs": ["pdf-ocr-guide", "digitize-old-books-ocr"],
        "workedExample": {
            "title": "Extracting from a legacy PDF archive",
            "situation": "A researcher has an old, scanned PDF where the text cannot be highlighted or searched.",
            "steps": [
                "Take a screenshot or export the specific PDF page as an image.",
                "Upload the image file to the converter.",
                "Extract the text.",
                "Copy the results into a word processor."
            ],
            "result": "The previously unsearchable PDF content is now fully editable text.",
            "lesson": "Image-only PDFs are essentially photographs of paper; treating them as images is the best way to extract their data."
        },
        "faqs": [
            {
                "q": "Why can't I search my PDF?",
                "a": "Many PDFs are 'image-only', meaning they were created by a scanner and do not contain a hidden text layer. OCR is required to make them searchable."
            },
            {
                "q": "Can I upload a 100-page PDF?",
                "a": "Our web tool accepts image files. For a multi-page PDF, you must first export the pages as JPGs or PNGs, or take screenshots of the specific pages you need."
            }
        ],
        "sections": [
            {
                "id": "pdf-intro",
                "heading": "Understanding Scanned PDFs",
                "paragraphs": [
                    "A true digital PDF contains text data that you can highlight, copy, and search. A scanned PDF, however, is merely a digital wrapper around a photograph of a piece of paper. To your computer, it's an image.",
                    "To get editable text out of these files, you must use Optical Character Recognition (OCR). By converting the PDF pages to image formats (like JPG or PNG), you can process them through our advanced OCR engines."
                ]
            },
            {
                "id": "pdf-workflow",
                "heading": "The PDF Extraction Workflow",
                "paragraphs": [
                    "Because our tool is optimized for high-accuracy image processing, it requires raster image inputs. If you have a PDF, you can use built-in OS tools (like Mac's Preview) or free online converters to change your PDF into a series of JPG images.",
                    "Once you have the image files, you can upload them here, optionally use Clean Mode to remove scanner artifacts or yellowed page backgrounds, and extract clean, pristine text."
                ]
            }
        ]
    }
]

import json
import os

content_dir = "/home/elango/Music/ocr/app/lib/tools/content"
os.makedirs(content_dir, exist_ok=True)

for tool in tools_data:
    js_content = f"""/** Unique long-form content for /{tool['slug']} */

export const {tool['var_name']} = {{
  slug: "{tool['slug']}",
  path: "/{tool['slug']}",
  title: "{tool['title']} — Free Online OCR",
  metaTitle: "{tool['metaTitle']}",
  description: "{tool['description']}",
  h1: "{tool['h1']}",
  lead: "{tool['lead']}",
  heroImage: "{tool['heroImage']}",
  heroAlt: "{tool['heroAlt']}",
  relatedBlogSlugs: {json.dumps(tool['relatedBlogSlugs'])},
  workedExample: {json.dumps(tool['workedExample'], indent=4)},
  faqs: {json.dumps(tool['faqs'], indent=4)},
  sections: {json.dumps(tool['sections'], indent=4)}
}};
"""
    with open(f"{content_dir}/{tool['var_name']}.js", "w") as f:
        f.write(js_content)

print("Created 3 tool content files.")
