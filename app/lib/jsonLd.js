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
          "Free Online OCR",
          "Image to Text Converter",
          "OCR Text Extractor",
        ],
        description:
          "Free online OCR tool to convert images, screenshots, JPG, PNG, and scanned documents into editable text.",
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: ["en", "hi", "es", "fr", "de", "ar", "zh", "ja"],
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
        inLanguage: ["en", "hi", "es", "fr", "de", "ar", "zh", "ja"],
        featureList: [
          "Image to text conversion",
          "Screenshot to text extraction",
          "Handwriting OCR notes extraction",
          "Receipt and invoice OCR",
          "Scanned document OCR",
          "PDF to text extraction",
          "Image to Word DOCX converter",
          "Image to searchable PDF converter",
          "Multi-language text recognition including Hindi and English",
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
            text: "Select the language that matches the text in the image for better OCR accuracy.",
          },
          {
            "@type": "HowToStep",
            name: "Extract and copy text",
            text: "Run OCR, review the editable text, then copy it or download it as a plain text file.",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        url: SITE_URL,
        name: "Image to Text – Free Online OCR",
        description:
          "Convert images to editable text online for free. AI OCR with browser fallback for JPG, PNG, screenshots, and scans.",
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
            name: "How do I extract text from an image for free without software?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can extract text directly in your web browser on imgtotext.in. Simply drag and drop your JPG, PNG, or screenshot, select the language (English, Hindi, and 10+ others), and click Extract Text. The tool converts pixels into editable text with zero sign-up and no installation.",
            },
          },
          {
            "@type": "Question",
            name: "Can I convert handwriting from a photo into text?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. You can upload clear photographs of handwritten notes, whiteboards, or notebooks to the Handwriting to Text tool on imgtotext.in. Multimodal AI OCR processes the handwriting strokes and outputs editable text that you can copy or export as DOCX, TXT, or PDF.",
            },
          },
          {
            "@type": "Question",
            name: "Is OCR Text Extractor free?",
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
        ],
      },
    ],
  };
}
