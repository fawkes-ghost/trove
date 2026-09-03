import { NextResponse, type NextRequest } from 'next/server';
import { ENTER_PATH, GATE_COOKIE, HOLDING_PATH, gatePassphrase, gateToken, isGateExempt, safeEqual } from '@/lib/gate';

// Everything except Next internals, the brand and media folders, and any path with a file
// extension. Those are static assets and pass through untouched.
export const config = {
  matcher: ['/((?!_next/|brand/|media/|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};

const NOINDEX = 'noindex, nofollow';

export default async function proxy(request: NextRequest) {
  const passphrase = gatePassphrase();
  if (!passphrase) return NextResponse.next();

  const { pathname } = request.nextUrl;

  if (pathname === ENTER_PATH) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', NOINDEX);
    return response;
  }
  if (isGateExempt(pathname)) return NextResponse.next();

  const cookie = request.cookies.get(GATE_COOKIE)?.value ?? '';
  const open = cookie.length > 0 && safeEqual(cookie, await gateToken(passphrase));

  if (open) {
    if (pathname === HOLDING_PATH) return NextResponse.redirect(new URL('/', request.url));
    return NextResponse.next();
  }

  // The URL stays as requested; the holding page renders in its place.
  const url = request.nextUrl.clone();
  url.pathname = HOLDING_PATH;
  url.search = '';
  const response = NextResponse.rewrite(url);
  response.headers.set('X-Robots-Tag', NOINDEX);
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Vary', 'Cookie');
  return response;
}
