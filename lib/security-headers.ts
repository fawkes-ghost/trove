// The security headers sent with every response, set once in next.config.ts.
//
// The Content-Security-Policy is a fixed allowlist, not a nonce policy. A nonce has to be
// minted per request, which would make every page dynamically rendered and take the
// prerendered pages off the CDN. So inline scripts are allowed ('unsafe-inline'): the
// moment-gate script in app/layout.tsx, the GA4 init in components/consent/Analytics.tsx
// and the payload scripts Next writes into each page all depend on it. What the policy does
// hold is where things may come from and go to: scripts, frames, requests, images, film and
// fonts are limited to this site and the few origins named below, the site cannot be framed,
// forms post only to the site, and plugins and <base> rewrites are off.
//
// Adding a third party means adding its origin here, in the directive that matches how it
// is loaded, or the browser will block it.

const TURNSTILE = 'https://challenges.cloudflare.com';
const TAG_MANAGER = 'https://www.googletagmanager.com';
// GA4 collects on google-analytics.com and, for some regions, on analytics.google.com.
const GA_COLLECT = ['https://*.google-analytics.com', 'https://*.analytics.google.com'];

// The origin the waitlist forms call (the Supabase edge functions). Read from the same
// variable the forms read, so the policy follows the project they point at. Unset, the
// forms send nothing and the policy allows nothing extra.
function supabaseOrigin(): string | null {
  const value = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

const dev = process.env.NODE_ENV !== 'production';

export function contentSecurityPolicy(): string {
  // next dev evaluates code for fast refresh and holds a websocket open for it, so the
  // policy is looser there by those two entries and no more.
  const supabase = supabaseOrigin();

  const directives: Record<string, (string | null | false)[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", dev && "'unsafe-eval'", TURNSTILE, TAG_MANAGER],
    // React writes style attributes into the markup (the image blur, the sticker's confetti).
    'style-src': ["'self'", "'unsafe-inline'"],
    // data: is the blurred placeholder under each photograph.
    'img-src': ["'self'", 'data:', ...GA_COLLECT, TAG_MANAGER],
    'font-src': ["'self'"],
    'media-src': ["'self'"],
    'connect-src': ["'self'", supabase, ...GA_COLLECT, TAG_MANAGER, dev && 'ws:'],
    'frame-src': [TURNSTILE],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'none'"],
  };

  return Object.entries(directives)
    .map(([name, sources]) => `${name} ${sources.filter(Boolean).join(' ')}`)
    .join('; ');
}

export function securityHeaders(): { key: string; value: string }[] {
  const headers = [
    { key: 'Content-Security-Policy', value: contentSecurityPolicy() },
    // The same rule as frame-ancestors, for browsers that predate it.
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ];
  // Not under next dev: its error page loads a manifest it serves as JSON from a .js path,
  // and nosniff makes the browser refuse it. The production build serves real types.
  if (!dev) headers.push({ key: 'X-Content-Type-Options', value: 'nosniff' });
  return headers;
}
