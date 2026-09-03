// In-memory attempt limiting for the gate, per IP. Five wrong passphrases in ten minutes
// blocks that IP for ten minutes. The map lives in the server process, so on Vercel each
// instance keeps its own count; that is enough to slow a guesser down, which is the aim.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_FAILURES = 5;

type Attempt = { failures: number; windowStart: number; blockedUntil: number };

const attempts = new Map<string, Attempt>();

function prune(now: number): void {
  if (attempts.size < 1000) return;
  for (const [ip, record] of attempts) {
    if (now - record.windowStart > WINDOW_MS && record.blockedUntil < now) attempts.delete(ip);
  }
}

export function attemptAllowed(ip: string, now = Date.now()): boolean {
  const record = attempts.get(ip);
  return !record || record.blockedUntil <= now;
}

export function recordFailure(ip: string, now = Date.now()): void {
  prune(now);
  const record = attempts.get(ip);
  if (!record || now - record.windowStart > WINDOW_MS) {
    attempts.set(ip, { failures: 1, windowStart: now, blockedUntil: 0 });
    return;
  }
  record.failures += 1;
  if (record.failures >= MAX_FAILURES) record.blockedUntil = now + WINDOW_MS;
}

export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}
