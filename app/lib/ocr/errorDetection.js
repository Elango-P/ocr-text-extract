/**
 * OCR Error Detection & Proofreading Engine
 *
 * Implements:
 * 1. Genuine OCR engine confidence inspection (when supported by engine, e.g. Tesseract.js word confidence).
 * 2. Context-aware character confusion heuristics (O/0, I/1, S/5) only when surrounding context indicates an error.
 * 3. Suspicious date formats (impossible months/days, OCR digit/letter mixups in years).
 * 4. Malformed email addresses (commas instead of dots, duplicate @, spaces).
 * 5. Broken words and hyphenated line-breaks.
 * 6. Symbol noise and unusual character sequences.
 *
 * Note: Never modifies text automatically. Provides user inspection, dismissals, and manual/suggested fixes.
 */

/**
 * Escapes regex special characters in a string.
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Validates whether a day/month/year combination is plausibly a real calendar date.
 */
function isInvalidDateValues(day, month, year) {
  const d = parseInt(day, 10);
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);

  if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
  if (m < 1 || m > 12) return true;
  if (d < 1 || d > 31) return true;
  if (y < 1900 || y > 2100) return true;

  // Days in month check
  const daysInMonth = [31, (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (d > daysInMonth[m - 1]) return true;

  return false;
}

/**
 * Analyzes extracted text and returns an array of detected issues.
 *
 * @param {string} text - The current extracted or edited text
 * @param {Object} options
 * @param {Array} [options.words] - Optional word objects from OCR engine with { text, confidence, bbox }
 * @param {string} [options.engine] - 'ai' | 'browser' | null
 * @param {Set|Array} [options.dismissedIds] - IDs of warnings dismissed by user
 * @returns {Array<Object>} List of error items
 */
export function detectOcrErrors(text, { words = [], engine = null, dismissedIds = new Set() } = {}) {
  if (!text || typeof text !== "string") return [];

  const dismissed = dismissedIds instanceof Set ? dismissedIds : new Set(dismissedIds || []);
  const issues = [];
  const seenKeys = new Set();

  const addIssue = (issue) => {
    if (dismissed.has(issue.id)) return;
    const dedupeKey = `${issue.type}-${issue.word}-${issue.index}`;
    if (seenKeys.has(dedupeKey)) return;
    seenKeys.add(dedupeKey);
    issues.push(issue);
  };

  // -------------------------------------------------------------
  // 1. GENUINE OCR ENGINE CONFIDENCE SCORES (when available)
  // -------------------------------------------------------------
  // Only Tesseract browser OCR provides word-level confidence. Gemini AI OCR does not expose token confidence.
  if (engine === "browser" && Array.isArray(words) && words.length > 0) {
    for (const w of words) {
      const cleanWord = (w.text || "").trim();
      if (!cleanWord || cleanWord.length < 2) continue;
      // Skip pure punctuation/numbers if high confidence
      if (typeof w.confidence === "number" && w.confidence > 0 && w.confidence < 70) {
        // Find index in current text
        const regex = new RegExp(`\\b${escapeRegExp(cleanWord)}\\b`, "g");
        let match;
        while ((match = regex.exec(text)) !== null) {
          const id = `engine-conf-${match.index}-${cleanWord}`;
          addIssue({
            id,
            type: "ocr_confidence",
            isGenuineEngineConfidence: true,
            severity: w.confidence < 50 ? "high" : "medium",
            categoryLabel: `Low Engine Confidence (${Math.round(w.confidence)}%)`,
            word: cleanWord,
            index: match.index,
            length: cleanWord.length,
            message: `The browser OCR engine reported a ${Math.round(w.confidence)}% recognition confidence for this word.`,
            confidence: Math.round(w.confidence),
            suggestedFix: null, // genuine confidence requires human review
          });
          break; // Flag first occurrence per word item
        }
      }
    }
  }

  // -------------------------------------------------------------
  // 2. CONTEXT-AWARE CHARACTER CONFUSIONS (O/0, I/1, S/5)
  // -------------------------------------------------------------

  // A. Digit '0' inside predominantly alphabetic word (e.g. "c0mpany", "w0rd", "inf0rmation")
  const digit0InWordRegex = /\b([a-zA-Z]{1,15})0([a-zA-Z]{1,15})\b/g;
  let match;
  while ((match = digit0InWordRegex.exec(text)) !== null) {
    const fullWord = match[0];
    const replacement = fullWord.replace(/0/g, "o");
    const id = `conf-0-to-o-${match.index}-${fullWord}`;
    addIssue({
      id,
      type: "confusion",
      isGenuineEngineConfidence: false,
      severity: "medium",
      categoryLabel: "Character Mixup (0 vs O)",
      word: fullWord,
      index: match.index,
      length: fullWord.length,
      message: `Contains digit '0' surrounded by letters. Usually an OCR confusion for lowercase 'o' or uppercase 'O'.`,
      suggestedFix: replacement,
    });
  }

  // B. Letter 'O' or 'o' inside predominantly numeric context (e.g. "$1,O00", "2O24", "198O", "12:3O")
  const letterOInNumberRegex = /(?:\$|€|£|₹|#|\b)(\d{1,4})[Oo](\d{1,4}|\b)/g;
  while ((match = letterOInNumberRegex.exec(text)) !== null) {
    const fullSnippet = match[0];
    if (/^no\d+$/i.test(fullSnippet)) continue;
    const replacement = fullSnippet.replace(/[Oo]/g, "0");
    const id = `conf-o-to-0-${match.index}-${fullSnippet}`;
    addIssue({
      id,
      type: "confusion",
      isGenuineEngineConfidence: false,
      severity: "medium",
      categoryLabel: "Character Mixup (O vs 0)",
      word: fullSnippet,
      index: match.index,
      length: fullSnippet.length,
      message: `Contains letter 'O' inside numbers. Likely intended to be digit '0'.`,
      suggestedFix: replacement,
    });
  }

  // C. Digit '1' inside predominantly alphabetic word (e.g. "rec1pe", "c1ty", "art1cle", "f1rst")
  const digit1InWordRegex = /\b([a-zA-Z]{1,15})1([a-zA-Z]{1,15})\b/g;
  while ((match = digit1InWordRegex.exec(text)) !== null) {
    const fullWord = match[0];
    const replacement = fullWord.replace(/1/g, "i");
    const id = `conf-1-to-i-${match.index}-${fullWord}`;
    addIssue({
      id,
      type: "confusion",
      isGenuineEngineConfidence: false,
      severity: "medium",
      categoryLabel: "Character Mixup (1 vs I)",
      word: fullWord,
      index: match.index,
      length: fullWord.length,
      message: `Contains digit '1' surrounded by letters. Often an OCR confusion for 'i' or 'l'.`,
      suggestedFix: replacement,
    });
  }

  // D. Letter 'I' or 'l' inside purely numeric amounts/dates (e.g. "$I00", "202l", "l999")
  const letterLInNumberRegex = /(?:\$|€|£|₹|\b)(\d{1,3})[Il](\d{1,4})/g;
  while ((match = letterLInNumberRegex.exec(text)) !== null) {
    const fullSnippet = match[0];
    const replacement = fullSnippet.replace(/[Il]/g, "1");
    const id = `conf-l-to-1-${match.index}-${fullSnippet}`;
    addIssue({
      id,
      type: "confusion",
      isGenuineEngineConfidence: false,
      severity: "medium",
      categoryLabel: "Character Mixup (I/l vs 1)",
      word: fullSnippet,
      index: match.index,
      length: fullSnippet.length,
      message: `Contains letter 'I' or 'l' inside a number. Likely intended to be digit '1'.`,
      suggestedFix: replacement,
    });
  }

  // E. Digit '5' inside alphabetic word (e.g. "te5t", "ye5", "re5ult", "5peak")
  const digit5InWordRegex = /\b([a-zA-Z]{1,15})5([a-zA-Z]{1,15})\b/g;
  while ((match = digit5InWordRegex.exec(text)) !== null) {
    const fullWord = match[0];
    const replacement = fullWord.replace(/5/g, "s");
    const id = `conf-5-to-s-${match.index}-${fullWord}`;
    addIssue({
      id,
      type: "confusion",
      isGenuineEngineConfidence: false,
      severity: "medium",
      categoryLabel: "Character Mixup (5 vs S)",
      word: fullWord,
      index: match.index,
      length: fullWord.length,
      message: `Contains digit '5' surrounded by letters. Usually an OCR confusion for 's' or 'S'.`,
      suggestedFix: replacement,
    });
  }

  // -------------------------------------------------------------
  // 3. SUSPICIOUS DATES
  // -------------------------------------------------------------
  const dateRegex = /\b(\d{1,4})[./-](\d{1,2})[./-](\d{2,4})\b/g;
  while ((match = dateRegex.exec(text)) !== null) {
    const [rawDate, p1, p2, p3] = match;
    let isInvalid = false;
    let hint = "";

    if (p1.length === 4) {
      if (isInvalidDateValues(p3, p2, p1)) {
        isInvalid = true;
        hint = `Month ${p2} or Day ${p3} appears out of calendar range.`;
      }
    } else if (p3.length === 4) {
      const d1 = parseInt(p1, 10);
      const d2 = parseInt(p2, 10);
      if (d1 > 31 || d2 > 31 || (d1 > 12 && d2 > 12) || d1 === 0 || d2 === 0) {
        isInvalid = true;
        hint = `Invalid day or month value in date (${rawDate}).`;
      }
    }

    if (isInvalid) {
      const id = `suspicious-date-${match.index}-${rawDate}`;
      addIssue({
        id,
        type: "date",
        isGenuineEngineConfidence: false,
        severity: "medium",
        categoryLabel: "Suspicious Date",
        word: rawDate,
        index: match.index,
        length: rawDate.length,
        message: hint || `The date "${rawDate}" has values outside standard calendar limits.`,
        suggestedFix: null,
      });
    }
  }

  // -------------------------------------------------------------
  // 4. MALFORMED EMAIL ADDRESSES
  // -------------------------------------------------------------
  const commaEmailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+,[a-zA-Z]{2,}\b/g;
  while ((match = commaEmailRegex.exec(text)) !== null) {
    const rawEmail = match[0];
    const fixed = rawEmail.replace(/,/g, ".");
    const id = `email-comma-${match.index}-${rawEmail}`;
    addIssue({
      id,
      type: "email",
      isGenuineEngineConfidence: false,
      severity: "high",
      categoryLabel: "Malformed Email Address",
      word: rawEmail,
      index: match.index,
      length: rawEmail.length,
      message: `Contains a comma instead of a dot in the email domain name.`,
      suggestedFix: fixed,
    });
  }

  const doubleAtEmailRegex = /[a-zA-Z0-9._%+-]+@{2,}[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g;
  while ((match = doubleAtEmailRegex.exec(text)) !== null) {
    const rawEmail = match[0];
    const fixed = rawEmail.replace(/@{2,}/g, "@");
    const id = `email-double-at-${match.index}-${rawEmail}`;
    addIssue({
      id,
      type: "email",
      isGenuineEngineConfidence: false,
      severity: "high",
      categoryLabel: "Malformed Email Address",
      word: rawEmail,
      index: match.index,
      length: rawEmail.length,
      message: `Contains duplicate '@' characters in the email address.`,
      suggestedFix: fixed,
    });
  }

  // -------------------------------------------------------------
  // 5. BROKEN WORDS & HYPHENATED LINE BREAKS
  // -------------------------------------------------------------
  const hyphenWrapRegex = /\b([a-zA-Z]{2,})-\r?\n[ \t]*([a-zA-Z]{2,})\b/g;
  while ((match = hyphenWrapRegex.exec(text)) !== null) {
    const [fullMatch, part1, part2] = match;
    const healed = `${part1}${part2}`;
    const id = `hyphen-break-${match.index}-${healed}`;
    addIssue({
      id,
      type: "broken_word",
      isGenuineEngineConfidence: false,
      severity: "low",
      categoryLabel: "Hyphenated Line Break",
      word: fullMatch.replace(/\r?\n/, "↵"),
      index: match.index,
      length: fullMatch.length,
      message: `Word was split across a line break ("${part1}-" and "${part2}"). Can be merged into "${healed}".`,
      suggestedFix: healed,
    });
  }

  const hyphenSpaceRegex = /\b([a-zA-Z]{2,})-\s+([a-zA-Z]{2,})\b/g;
  while ((match = hyphenSpaceRegex.exec(text)) !== null) {
    const [fullMatch, part1, part2] = match;
    const healed = `${part1}${part2}`;
    const id = `hyphen-space-${match.index}-${healed}`;
    addIssue({
      id,
      type: "broken_word",
      isGenuineEngineConfidence: false,
      severity: "low",
      categoryLabel: "Stray Space After Hyphen",
      word: fullMatch,
      index: match.index,
      length: fullMatch.length,
      message: `Stray space after hyphen ("${fullMatch}"). Can be merged into "${healed}".`,
      suggestedFix: healed,
    });
  }

  // -------------------------------------------------------------
  // 6. SYMBOL NOISE / UNUSUAL CHARACTER SEQUENCES
  // -------------------------------------------------------------
  const symbolNoiseRegex = /([|~^#$]{3,}|[!]{4,}|\?\?\?+)/g;
  while ((match = symbolNoiseRegex.exec(text)) !== null) {
    const noise = match[0];
    const id = `symbol-noise-${match.index}-${noise}`;
    addIssue({
      id,
      type: "symbol_noise",
      isGenuineEngineConfidence: false,
      severity: "low",
      categoryLabel: "Unusual Symbol Burst",
      word: noise,
      index: match.index,
      length: noise.length,
      message: `Unusual sequence of repeated symbols. Commonly caused by image border artifacts or scanner noise.`,
      suggestedFix: "",
    });
  }

  return issues.sort((a, b) => a.index - b.index);
}
