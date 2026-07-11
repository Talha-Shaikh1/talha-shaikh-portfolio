type Entry = { count: number; resetAt: number };
const WINDOW_MS = 10 * 60 * 1000;
const MAX = 5;
const store = new Map<string, Entry>();

/** Best-effort in-memory limiter. Per serverless instance; fine for spam control. */
export function rateLimit(key: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX - 1 };
  }
  if (entry.count >= MAX) return { ok: false, remaining: 0 };
  entry.count += 1;
  return { ok: true, remaining: MAX - entry.count };
}
