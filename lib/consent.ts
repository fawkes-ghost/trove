export type Consent = 'accepted' | 'declined';

export const CONSENT_KEY = 'trove:consent';
export const CONSENT_EVENT = 'trove:consent';

// Reads the stored choice. Null means the visitor has not chosen yet.
export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

// Stores the choice and tells listeners (the analytics loader) about it.
export function writeConsent(consent: Consent): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Storage unavailable: the choice holds for this page only.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: consent }));
}

// Subscribes to changes; returns the unsubscribe.
export function onConsent(listener: (consent: Consent) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<Consent>).detail);
  window.addEventListener(CONSENT_EVENT, handler);
  return () => window.removeEventListener(CONSENT_EVENT, handler);
}
