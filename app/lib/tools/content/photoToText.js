/** Unique long-form content for /photo-to-text */

export const photoToText = {
  slug: "photo-to-text",
  path: "/photo-to-text",
  title: "Photo to Text Converter — Free Online OCR",
  metaTitle: "Photo to Text Converter (Free OCR)",
  description: "Extract text from smartphone photos. Free online OCR designed to handle glare, shadows, and curved pages.",
  h1: "Photo to Text Converter",
  lead: "Turn pictures taken on your smartphone into editable text. Built to handle real-world lighting, shadows, and angles.",
  heroImage: "/images/ocr-phone-photo.webp",
  heroAlt: "Smartphone taking a photo of a document",
  relatedBlogSlugs: ["desk-setup-for-document-photos", "low-light-and-evening-scan-rescue"],
  workedExample: {
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
  faqs: [
    {
        "q": "Can I upload photos directly from my phone?",
        "a": "Yes, our web app is fully mobile-responsive. You can select an image from your camera roll or take a new photo directly."
    },
    {
        "q": "Does glare ruin the text extraction?",
        "a": "Heavy glare that completely washes out the text will cause errors. Try to take photos with diffused lighting."
    }
],
  sections: [
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
            "To get the best results, hold your phone parallel to the document to reduce skewed angles. Ensure you have adequate lighting\u2014preferably natural daylight or dual desk lamps to eliminate the shadow of your own phone.",
            "If a photo is particularly dark or low contrast, try using your phone's built-in photo editor to increase the contrast before uploading the image to the OCR tool."
        ]
    }
]
};
