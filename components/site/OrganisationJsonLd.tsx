import { organisation, sameAsLinks } from '@/config/organisation';
import { contactEmail, siteUrl } from '@/lib/site';

// The Organization block, on every page. Name, url, the logo PNG from public/brand, a
// figure-free description, the one contact address, and the sameAs links as each goes live.
// Legal name and address render only once set in config.
export function OrganisationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: organisation.name,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/brand/trove-logo.png`, width: 1600, height: 433 },
    // No figure here: it is on every page, the holding page included, and the share is under review.
    description: 'A UK prize draw for luxury escapes. A fixed number of entries so you know your chances before you enter, free entry by post, and part of every paid entry given to charities where the escape is.',
    contactPoint: [{ '@type': 'ContactPoint', email: contactEmail, contactType: 'customer service', areaServed: 'GB', availableLanguage: 'en' }],
    sameAs: sameAsLinks(),
    ...(organisation.legalName ? { legalName: organisation.legalName } : {}),
    ...(organisation.address ? { address: { '@type': 'PostalAddress', ...organisation.address } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
