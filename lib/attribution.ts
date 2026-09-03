export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  referrer: string | null;
  landing_path: string | null;
};

export const ATTRIBUTION_KEY = 'trove:attribution';

const empty: Attribution = { utm_source: null, utm_medium: null, utm_campaign: null, utm_content: null, referrer: null, landing_path: null };

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
