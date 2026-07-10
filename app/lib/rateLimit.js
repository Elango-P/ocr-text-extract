/** In-memory Gemini OCR rate limit: 10 requests per IP per UTC day. */

export const OCR_DAILY_LIMIT = 10;

const buckets = new Map();

function utcDayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function nextUtcMidnightIso(date = new Date()) {
  const next = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + 1));
  return next.toISOString();
}

function pruneOldBuckets(today) {
  for (const key of buckets.keys()) {
    if (!key.endsWith(`:${today}`)) {
      buckets.delete(key);
    }
  }
}

export function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

/**
 * Consume one Gemini OCR attempt for this IP/day if under the limit.
 * Counts before the Gemini call so retries cannot bypass the cap.
 */
export function checkAndConsume(ip, { limit = OCR_DAILY_LIMIT } = {}) {
  const today = utcDayKey();
  pruneOldBuckets(today);

  const key = `${ip || "unknown"}:${today}`;
  const used = buckets.get(key) || 0;
  const resetAt = nextUtcMidnightIso();

  if (used >= limit) {
    return {
      allowed: false,
      remaining: 0,
      limit,
      resetAt,
      used,
    };
  }

  const nextUsed = used + 1;
  buckets.set(key, nextUsed);

  return {
    allowed: true,
    remaining: Math.max(0, limit - nextUsed),
    limit,
    resetAt,
    used: nextUsed,
  };
}

export function peekQuota(ip, { limit = OCR_DAILY_LIMIT } = {}) {
  const today = utcDayKey();
  const key = `${ip || "unknown"}:${today}`;
  const used = buckets.get(key) || 0;
  return {
    remaining: Math.max(0, limit - used),
    limit,
    resetAt: nextUtcMidnightIso(),
    used,
  };
}
