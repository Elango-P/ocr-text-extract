import { NextResponse } from "next/server";
import {
  OCR_DAILY_LIMIT,
  checkAndConsume,
  getClientIp,
} from "../../lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BASE64_CHARS = 12_000_000; // ~9MB raw image ceiling for inline Gemini requests
const DEFAULT_MODEL = "gemini-2.5-flash";

const LANGUAGE_NAMES = {
  eng: "English",
  spa: "Spanish",
  fra: "French",
  deu: "German",
  ita: "Italian",
  por: "Portuguese",
  rus: "Russian",
  chi_sim: "Chinese (Simplified)",
  jpn: "Japanese",
  kor: "Korean",
  ara: "Arabic",
  hin: "Hindi",
  tam: "Tamil",
};

function getApiKey() {
  return (
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GOOGLE_GENERATION_AI_API_KEY?.trim() ||
    ""
  );
}

function buildPrompt(language) {
  const langName = LANGUAGE_NAMES[language] || language || "the document language";
  return [
    "You are an OCR engine. Extract all readable text from the image.",
    `The document language is primarily ${langName}.`,
    "Preserve natural reading order and line breaks.",
    "Do not translate. Do not summarize. Do not add commentary.",
    "If no text is visible, reply with exactly: NO_TEXT_FOUND",
    "Return only the extracted text.",
  ].join(" ");
}

function withRateHeaders(response, quota) {
  response.headers.set("X-RateLimit-Limit", String(quota.limit));
  response.headers.set("X-RateLimit-Remaining", String(quota.remaining));
  response.headers.set("X-RateLimit-Reset", quota.resetAt);
  return response;
}

export async function POST(request) {
  const apiKey = getApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI OCR is not configured", code: "NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const imageBase64 = typeof body.imageBase64 === "string" ? body.imageBase64.trim() : "";
  const mimeType = typeof body.mimeType === "string" ? body.mimeType.trim() : "";
  const language = typeof body.language === "string" ? body.language.trim() : "eng";

  if (!imageBase64 || !mimeType) {
    return NextResponse.json(
      { error: "imageBase64 and mimeType are required" },
      { status: 400 }
    );
  }

  if (!mimeType.startsWith("image/")) {
    return NextResponse.json({ error: "Only image MIME types are allowed" }, { status: 400 });
  }

  if (imageBase64.length > MAX_BASE64_CHARS) {
    return NextResponse.json({ error: "Image is too large for AI OCR" }, { status: 413 });
  }

  const ip = getClientIp(request);
  const quota = checkAndConsume(ip, { limit: OCR_DAILY_LIMIT });

  if (!quota.allowed) {
    return withRateHeaders(
      NextResponse.json(
        {
          error: "Daily AI OCR limit reached (10 per day). Browser OCR is still available.",
          code: "RATE_LIMITED",
          limit: quota.limit,
          remaining: 0,
          resetAt: quota.resetAt,
        },
        { status: 429 }
      ),
      quota
    );
  }

  const model = process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  let geminiResponse;
  try {
    geminiResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                inline_data: {
                  mime_type: mimeType,
                  data: imageBase64,
                },
              },
              { text: buildPrompt(language) },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
        },
      }),
    });
  } catch (err) {
    console.error("Gemini OCR network error:", err);
    return withRateHeaders(
      NextResponse.json(
        {
          error: "Failed to reach AI OCR service",
          code: "NETWORK_ERROR",
          limit: quota.limit,
          remaining: quota.remaining,
          resetAt: quota.resetAt,
        },
        { status: 502 }
      ),
      quota
    );
  }

  const payload = await geminiResponse.json().catch(() => ({}));

  if (!geminiResponse.ok) {
    const message =
      payload?.error?.message || `AI OCR request failed (${geminiResponse.status})`;
    console.error("Gemini OCR API error:", message);
    return withRateHeaders(
      NextResponse.json(
        {
          error: message,
          code: "GEMINI_ERROR",
          limit: quota.limit,
          remaining: quota.remaining,
          resetAt: quota.resetAt,
        },
        { status: geminiResponse.status >= 400 ? geminiResponse.status : 502 }
      ),
      quota
    );
  }

  const text = (payload?.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("")
    .trim();

  if (!text || text === "NO_TEXT_FOUND") {
    return withRateHeaders(
      NextResponse.json(
        {
          error: "No text detected by AI OCR",
          code: "NO_TEXT",
          text: "",
          limit: quota.limit,
          remaining: quota.remaining,
          resetAt: quota.resetAt,
        },
        { status: 422 }
      ),
      quota
    );
  }

  return withRateHeaders(
    NextResponse.json({
      text,
      engine: "gemini",
      model,
      limit: quota.limit,
      remaining: quota.remaining,
      resetAt: quota.resetAt,
    }),
    quota
  );
}
