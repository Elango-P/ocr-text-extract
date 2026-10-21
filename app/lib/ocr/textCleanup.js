/**
 * OCR Text Cleanup Tools
 *
 * Implements non-destructive text normalization and formatting tools.
 * Each operation reports what was modified, enabling exact undo operations and comparison.
 */

/**
 * Collapses 3 or more consecutive line breaks into a clean double line break (paragraph spacing).
 * Also trims lines that contain only whitespace.
 *
 * @param {string} text
 * @returns {{ text: string, changed: boolean, count: number, description: string }}
 */
export function removeExcessiveBlankLines(text) {
  if (!text) return { text: "", changed: false, count: 0, description: "No text to clean" };

  // Normalize blank lines with whitespace to empty lines
  const normalizedBlankLines = text.replace(/^[ \t]+$/gm, "");

  // Match 3 or more newlines
  const regex = /\n{3,}/g;
  let matchCount = 0;
  const matches = normalizedBlankLines.match(regex);
  if (matches) {
    matchCount = matches.length;
  }

  const cleaned = normalizedBlankLines.replace(regex, "\n\n").trim();
  const changed = cleaned !== text;

  return {
    text: cleaned,
    changed,
    count: matchCount,
    description: changed
      ? `Removed excessive blank lines in ${matchCount} location${matchCount === 1 ? "" : "s"}.`
      : "No excessive blank lines found.",
  };
}

/**
 * Normalizes horizontal whitespace:
 * - Removes trailing spaces from each line.
 * - Collapses consecutive spaces/tabs into a single space.
 *
 * @param {string} text
 * @returns {{ text: string, changed: boolean, count: number, description: string }}
 */
export function normalizeWhitespace(text) {
  if (!text) return { text: "", changed: false, count: 0, description: "No text to clean" };

  let count = 0;

  // Trim trailing whitespace per line
  const noTrailing = text.replace(/[ \t]+$/gm, () => {
    count++;
    return "";
  });

  // Collapse 2+ consecutive spaces within a line
  const cleaned = noTrailing.replace(/[ \t]{2,}/g, () => {
    count++;
    return " ";
  });

  const changed = cleaned !== text;

  return {
    text: cleaned,
    changed,
    count,
    description: changed
      ? `Normalized whitespace across ${count} occurrence${count === 1 ? "" : "s"}.`
      : "Whitespace is already normalized.",
  };
}

/**
 * Fixes obvious line-break issues:
 * 1. Hyphenated words broken across a line break (e.g. "connec-\ntion" -> "connection").
 * 2. Unintended line breaks mid-sentence (when a line does not end with sentence-ending punctuation
 *    and the subsequent line starts with a lowercase letter).
 *
 * @param {string} text
 * @returns {{ text: string, changed: boolean, count: number, description: string }}
 */
export function fixLineBreaks(text) {
  if (!text) return { text: "", changed: false, count: 0, description: "No text to clean" };

  let count = 0;

  // 1. Hyphenated wrap healing
  let cleaned = text.replace(/([a-zA-Z]{2,})-\r?\n[ \t]*([a-zA-Z]{2,})/g, (_, p1, p2) => {
    count++;
    return `${p1}${p2}`;
  });

  // 2. Mid-sentence breaks (line ends with letter/comma, next line starts with lowercase letter)
  cleaned = cleaned.replace(/([a-zA-Z0-9,;])\r?\n[ \t]*([a-z])/g, (_, p1, p2) => {
    count++;
    return `${p1} ${p2}`;
  });

  const changed = cleaned !== text;

  return {
    text: cleaned,
    changed,
    count,
    description: changed
      ? `Healed ${count} mid-sentence or hyphenated line break${count === 1 ? "" : "s"}.`
      : "No broken mid-sentence line breaks found.",
  };
}

/**
 * Preserves paragraphs:
 * Takes text where lines in the same paragraph were broken by the OCR engine,
 * flows lines within paragraphs together with spaces, while strictly preserving
 * double line breaks (\n\n) as paragraph divisions.
 *
 * @param {string} text
 * @returns {{ text: string, changed: boolean, count: number, description: string }}
 */
export function preserveParagraphs(text) {
  if (!text) return { text: "", changed: false, count: 0, description: "No text to clean" };

  // Split into paragraphs by 2 or more newlines
  const paragraphs = text.split(/\r?\n\s*\r?\n/);
  let unwrappedCount = 0;

  const processed = paragraphs.map((para) => {
    const lines = para.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length > 1) unwrappedCount++;
    // Check if line looks like a list item (e.g. bullet, number, dash)
    const isList = lines.some((l) => /^[-*•\d+.]\s+/.test(l));
    if (isList) {
      // Keep individual lines for list items
      return lines.join("\n");
    }
    // Join wrapped lines with space
    return lines.join(" ");
  });

  const cleaned = processed.join("\n\n").trim();
  const changed = cleaned !== text;

  return {
    text: cleaned,
    changed,
    count: unwrappedCount,
    description: changed
      ? `Re-flowed ${unwrappedCount} paragraph${unwrappedCount === 1 ? "" : "s"} while preserving paragraph breaks.`
      : "Paragraphs are already cleanly formatted.",
  };
}

/**
 * Removes repeated headers and footers only when explicitly chosen.
 * Searches for page numbering patterns ("Page 1 of 5", "Page 2", "- 3 -")
 * and optionally user-supplied header/footer phrases.
 *
 * @param {string} text
 * @param {Array<string>} [customPatterns]
 * @returns {{ text: string, changed: boolean, count: number, description: string }}
 */
export function removeRepeatedHeadersFooters(text, customPatterns = []) {
  if (!text) return { text: "", changed: false, count: 0, description: "No text to clean" };

  let count = 0;
  const lines = text.split(/\r?\n/);

  // Default page number patterns
  const isPageNumLine = (line) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (/^(?:page\s+)?\d+(?:\s+(?:of|\/)\s+\d+)?$/i.test(trimmed)) return true;
    if (/^[-—]\s*\d+\s*[-—]$/.test(trimmed)) return true;
    if (customPatterns.some((pattern) => pattern && trimmed.toLowerCase().includes(pattern.toLowerCase()))) {
      return true;
    }
    return false;
  };

  const filtered = lines.filter((line) => {
    if (isPageNumLine(line)) {
      count++;
      return false;
    }
    return true;
  });

  const cleaned = filtered.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  const changed = cleaned !== text;

  return {
    text: cleaned,
    changed,
    count,
    description: changed
      ? `Removed ${count} header/footer or page number line${count === 1 ? "" : "s"}.`
      : "No repeated header/footer patterns detected.",
  };
}
