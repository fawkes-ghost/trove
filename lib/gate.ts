// The gate. While GATE_PASSPHRASE is set, every route renders the holding page unless the
// visitor carries the gate cookie. The cookie value is an HMAC of a fixed string keyed by
// the passphrase, so it cannot be forged and changing the passphrase signs everyone out.
// Unset the variable and the gate is off: previews are unaffected.
//
// Everything here runs in both the edge runtime (proxy.ts) and node (the enter action),
// so it uses Web Crypto only.

export const GATE_COOKIE = 'trove-gate';
export const GATE_COOKIE_DAYS = 30;
export const HOLDING_PATH = '/holding';
export const ENTER_PATH = '/enter';

// Routes that render as themselves while the gate is up. Everything else shows the
// holding page. Static assets are excluded by the matcher in proxy.ts.
const exemptExact = new Set([ENTER_PATH, '/confirm', '/free-entry-by-post']);
const exemptPrefixes = ['/legal/'];

export function gatePassphrase(): string | null {
  const value = process.env.GATE_PASSPHRASE?.trim();
  return value ? value : null;
}

export function isGateExempt(pathname: string): boolean {
  if (exemptExact.has(pathname)) return true;
  return exemptPrefixes.some((prefix) => pathname.startsWith(prefix));
}

const encoder = new TextEncoder();

async function hmacHex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey('raw', encoder.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// The value the cookie must carry for a given passphrase.
export function gateToken(passphrase: string): Promise<string> {
  return hmacHex(passphrase, 'trove-gate-v1');
}

// Constant-time comparison so a wrong guess takes as long as a right one.
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
