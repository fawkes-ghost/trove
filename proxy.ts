import { NextResponse, type NextRequest } from 'next/server';
import { ENTER_PATH, GATE_COOKIE, HOLDING_PATH, gatePassphrase, gateToken, isGateExempt, safeEqual } from '@/lib/gate';

// Everything except Next internals, the brand and media folders, and any path with a file
// extension. Those are static assets and pass through untouched.
export const config = {
  matcher: ['/((?!_next/|brand/|media/|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};

const NOINDEX = 'noindex, nofollow';

// While the gate is up nothing on the site is indexable: every response carries the
// header, exempt routes and open sessions included. Unsetting GATE_PASSPHRASE at launch
// removes it everywhere, and app/robots.ts follows the same switch.
function noindex(response: NextResponse): NextResponse {
  response.headers.set('X-Robots-Tag', NOINDEX);
  return response;
}

export default async function proxy(request: NextRequest) {
  const passphrase = gatePassphrase();
  if (!passphrase) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === ENTER_PATH || isGateExempt(pathname)) return noindex(NextResponse.next());

  const cookie = request.cookies.get(GATE_COOKIE)?.value ?? '';
  const open = cookie.length > 0 && safeEqual(cookie, await gateToken(passphrase));

  if (open) {
    if (pathname === HOLDING_PATH) return noindex(NextResponse.redirect(new URL('/', request.url)));
    return noindex(NextResponse.next());
  }

  // The URL stays as requested; the holding page renders in its place.
  const url = request.nextUrl.clone();
  url.pathname = HOLDING_PATH;
  url.search = '';
  const response = noindex(NextResponse.rewrite(url));
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Cookie');
  return response;
}
