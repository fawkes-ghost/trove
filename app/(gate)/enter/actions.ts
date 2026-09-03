'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ENTER_PATH, GATE_COOKIE, GATE_COOKIE_DAYS, gatePassphrase, gateToken, safeEqual } from '@/lib/gate';
import { attemptAllowed, clearAttempts, recordFailure } from '@/lib/gate-rate-limit';

// Checks the passphrase. Right: sets the gate cookie for thirty days and goes to the home
// page. Wrong: back to the form with the message. Too many wrong: back with the limit message.
export async function enter(formData: FormData): Promise<void> {
  const passphrase = gatePassphrase();
  if (!passphrase) redirect('/');

  const requestHeaders = await headers();
  const ip = (requestHeaders.get('x-forwarded-for') ?? '').split(',')[0].trim() || requestHeaders.get('x-real-ip') || 'unknown';

  if (!attemptAllowed(ip)) redirect(`${ENTER_PATH}?error=limit`);

  const submitted = String(formData.get('passphrase') ?? '');
  const expected = await gateToken(passphrase);
  const ok = submitted.length > 0 && safeEqual(await gateToken(submitted), expected);

  if (!ok) {
    recordFailure(ip);
    redirect(`${ENTER_PATH}?error=1`);
  }

  clearAttempts(ip);
  const jar = await cookies();
  jar.set({
    name: GATE_COOKIE,
    value: expected,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: GATE_COOKIE_DAYS * 24 * 60 * 60,
  });
  redirect('/');
}
