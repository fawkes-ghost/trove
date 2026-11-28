export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_path: string | null;
  // The share code of the friend whose link brought this visitor, if any. Recorded so we can
  // see how far one founding friend's link travels. Nothing is given for it.
  ref: string | null;
};

export const ATTRIBUTION_KEY = 'trove:attribution';

const empty: Attribution = { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, referrer: null, landing_path: null, ref: null };

// Share codes are eight letters and digits (made by the waitlist-signup function); anything
// else is dropped rather than stored.
function shareCode(value: string | null): string | null {
  const code = (value ?? '').trim().toUpperCase();
  return /^[A-Z0-9]{6,12}$/.test(code) ? code : null;
}

// Adds the visitor's own share code to a link they are about to send.
export function withShareCode(url: string, code: string | null): string {
  const valid = shareCode(code);
  if (!valid) return url;
  return `${url}${url.includes('?') ? '&' : '?'}ref=${valid}`;
}

function clean(value: string | null): string | null {
  const trimmed = (value ?? '').trim().slice(0, 200);
  return trimmed.length ? trimmed : null;
}

// Reads how the visitor arrived and keeps it in memory for the session only. Nothing
// leaves the browser until the person submits the waitlist form. Runs once per session:
// the first page of the visit is the landing page.
export function captureAttribution(): void {
  try {
    if (window.sessionStorage.getItem(ATTRIBUTION_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const record: Attribution = {
      utm_source: clean(params.get('utm_source')),
      utm_medium: clean(params.get('utm_medium')),
      utm_campaign: clean(params.get('utm_campaign')),
      utm_content: clean(params.get('utm_content')),
      referrer: clean(document.referrer),
      landing_path: clean(window.location.pathname),
      ref: shareCode(params.get('ref')),
    };
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(record));
  } catch {
    // Storage unavailable: no attribution for this visit.
  }
}

export function readAttribution(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    return raw ? { ...empty, ...(JSON.parse(raw) as Partial<Attribution>) } : empty;
  } catch {
    return empty;
  }
}
