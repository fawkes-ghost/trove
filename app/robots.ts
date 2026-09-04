import type { MetadataRoute } from 'next';
import { gatePassphrase } from '@/lib/gate';
import { siteUrl } from '@/lib/site';

// Read at request time so it follows the gate: while GATE_PASSPHRASE is set, everything
// is disallowed; unset it at launch and the site opens to crawlers with the sitemap.
export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  if (gatePassphrase()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/confirm', '/enter', '/holding'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
