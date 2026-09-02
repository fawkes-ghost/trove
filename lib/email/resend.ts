// STUB: Resend confirmation email for the waitlist. Not wired in this branch.
//
// When the sending domain exists, this becomes a server-side call (a route handler or a
// server action) that the form invokes after a successful signup. Until then it does
// nothing and the form does not call it. The existing waitlist-signup edge function has
// its own confirmation email from the previous site; that is replaced, not duplicated,
// when this is wired.
//
// Needs: RESEND_API_KEY (server only), a verified sending domain, and the Trove email
// template with the significant conditions link and an unsubscribe link.

export type WaitlistConfirmation = { email: string };

export async function sendWaitlistConfirmation(_confirmation: WaitlistConfirmation): Promise<void> {
  // Intentionally empty until Resend is configured.
}
