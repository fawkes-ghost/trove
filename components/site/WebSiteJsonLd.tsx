import { organisation } from '@/config/organisation';
import { siteUrl } from '@/lib/site';

// The WebSite block, on the home page only, pointing at the Organization as publisher.
export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: organisation.name,
    inLanguage: 'en-GB',
    publisher: { '@id': `${siteUrl}/#organization` },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
