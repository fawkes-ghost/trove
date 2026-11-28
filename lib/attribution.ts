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

// GA4 config fields that restore the session's campaign when the tag loads on a page that
// no longer carries it. Empty when the current address still has its own tags (GA reads
// those itself) or when nothing was captured. Returned as JSON safe to place inside an
// inline script: every < is escaped, so no value can close the script element.
export function campaignConfig(): string {
  try {
    if (new URLSearchParams(window.location.search).get('utm_source')) return '{}';
    const a = readAttribution();
    const fields: Record<string, string> = {};
    if (a.utm_source) {
      fields.campaign_source = a.utm_source;
      if (a.utm_medium) fields.campaign_medium = a.utm_medium;
      if (a.utm_campaign) fields.campaign_name = a.utm_campaign;
      if (a.utm_content) fields.campaign_content = a.utm_content;
    }
    if (a.referrer) {
      const external = new URL(a.referrer).origin !== window.location.origin;
      if (external) fields.page_referrer = a.referrer;
    }
    return JSON.stringify(fields).replace(/</g, '\\u003c');
  } catch {
    return '{}';
  }
}
