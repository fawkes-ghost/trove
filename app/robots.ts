import type { MetadataRoute } from 'next';
import { gatePassphrase } from '@/lib/gate';
import { siteUrl } from '@/lib/site';

// Read at request time so it follows the gate: while GATE_PASSPHRASE is set, everything is
// disallowed; unset it at launch and the site opens to every crawler. The answer engines
// are named so their allow is explicit, not inherited.
export const dynamic = 'force-dynamic';

export const answerEngines = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended'];

export default function robots(): MetadataRoute.Robots {
  if (gatePassphrase()) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: answerEngines, allow: '/' },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
