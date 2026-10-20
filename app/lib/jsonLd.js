import {
  SITE_URL,
  SITE_NAME,
  OPERATOR_NAME,
  OPERATOR_URL,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from "./site";

const AUTHOR_URL = `${SITE_URL}/author/elango-p`;

/** Site-wide JSON-LD for SEO / trust scanners */
export function buildSiteJsonLd() {
  const sameAs = [OPERATOR_URL, ...SOCIAL_LINKS.map((link) => link.href)];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: [
          "ImgToText Converter",
          "Free Online OCR",
          "Image to Text Converter",
          "OCR Text Extractor",
          "imgtotext.in",
        ],
        description:
          "Free online OCR tool to convert images, screenshots, JPG, PNG, and scanned documents into editable text with in-browser Tesseract and Gemini AI fallback.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "ta", "hi", "es", "fr", "de", "ar", "zh", "ja"],
        potentialAction: {
          "@type": "UseAction",
          target: `${SITE_URL}/image-to-text`,
          name: "Extract Text from Image",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT_EMAIL,
        founder: { "@id": `${AUTHOR_URL}#person` },
        sameAs,
      },
      {
        "@type": "Person",
        "@id": `${AUTHOR_URL}#person`,
        name: OPERATOR_NAME,
        url: AUTHOR_URL,
        email: CONTACT_EMAIL,
        jobTitle: "Independent software developer",
        sameAs,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#app`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "BusinessApplication, UtilitiesApplication",
        applicationSubCategory: "OCR Converter",
        operatingSystem: "Windows, macOS, Linux, iOS, Android, ChromeOS",
        browserRequirements: "Requires JavaScript and modern browser with WebAssembly",
        inLanguage: ["en", "ta", "hi", "es", "fr", "de", "ar", "zh", "ja"],
        featureList: [
          "Image to text conversion",
          "Screenshot to text extraction",
          "Handwriting OCR notes extraction",
          "Receipt and invoice OCR",
          "Scanned document OCR",
          "PDF to text extraction",
          "Image to Word DOCX converter",
          "Image to searchable PDF converter",
          "Multi-language text recognition including Tamil, Hindi, and English",
          "100% private in-browser WebAssembly OCR",
          "Gemini AI OCR fallback",
        ],
        description:
          "Free online OCR tool to extract text from screenshots, photos, scanned documents, JPG, PNG, WEBP, and GIF files with browser and AI fallback.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: { "@id": `${AUTHOR_URL}#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
    ],
  };
}

export function buildHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${SITE_URL}/#how-to-extract-text`,
        name: "How to extract text from an image online",
        description:
          "Upload an image, choose the language, and convert it into editable text with the free OCR tool.",
        totalTime: "PT1M",
        supply: [
          {
            "@type": "HowToSupply",
            name: "Screenshot, photo, JPG, PNG, WEBP, GIF, or scanned document image",
          },
        ],
        tool: [
          {
            "@type": "HowToTool",
            name: SITE_NAME,
          },
        ],
        step: [
          {
            "@type": "HowToStep",
            name: "Upload your image",
            text: "Choose or drag a screenshot, photo, scan, JPG, PNG, WEBP, or GIF into the OCR tool.",
          },
          {
            "@type": "HowToStep",
            name: "Choose the document language",
            text: "Select the language (English, Tamil, Hindi, or 10+ others) that matches the text in the image for better OCR accuracy.",
          },
          {
            "@type": "HowToStep",
            name: "Extract and copy text",
            text: "Run OCR, review the editable text, then copy it or download it as a plain text file, Word DOCX, or PDF.",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Image to Text Converter - Free Online OCR | ImgToText",
        description:
          "Extract text from images online with ImgToText. Upload a photo or screenshot, convert it to editable text, and copy or download your results.",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", "#hero-lead", "#direct-answer", ".aeo-answer"],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#homepage-faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Can I use this as an img to text converter?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. Upload a PNG, JPG, WEBP, or GIF and extract editable text in seconds — the same free img to text workflow as our dedicated Image to Text page.",
            },
          },
          {
            "@type": "Question",
            name: "How do I capture text from an image?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Upload or paste the image into the tool at the top of the page, pick the document language, run Extract Text, then copy or download the result.",
            },
          },
          {
            "@type": "Question",
            name: "Is ImgToText free?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. No signup and no watermarks. AI OCR is limited to 10 uses per day per IP address; browser OCR remains available after that.",
            },
          },
          {
            "@type": "Question",
            name: "Are my images stored forever?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "No permanent archive of uploads. By default, AI OCR sends images through our server to Google Gemini for that extraction request. See the Privacy Policy and Data Retention pages.",
            },
          },
          {
            "@type": "Question",
            name: "What formats can I upload?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "PNG, JPG, JPEG, WEBP, and GIF. For scanned PDFs, export each page as an image or use our PDF to Text tool.",
            },
          },
          {
            "@type": "Question",
            name: "How accurate is OCR?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Accuracy depends on sharpness, contrast, language, and print vs handwriting. Always proofread critical numbers and names.",
            },
          },
          {
            "@type": "Question",
            name: "Does the site show ads?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ads may appear when advertising is enabled (for example, via Google AdSense). Cookie choices are explained in the Cookie Policy.",
            },
          },
          {
            "@type": "Question",
            name: "Can I extract text from Tamil or Hindi images?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. ImgToText supports Tamil (தமிழ்) and Hindi (हिंदी) along with 10+ other languages. Both our client-side Tesseract engine and Gemini AI fallback accurately recognize Indic scripts and character matras.",
            },
          },
        ],
      },
    ],
  };
}
