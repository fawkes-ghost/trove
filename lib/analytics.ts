import { readConsent } from './consent';

// GA4 property for the site. Consent-gated: nothing loads before the visitor accepts.
export const GA_MEASUREMENT_ID = 'G-D22MTTKX1B';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Sends an event to GA4 only when consent was given and the tag has loaded. Otherwise nothing.
export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}): void {
  if (readConsent() !== 'accepted') return;
  if (typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}
