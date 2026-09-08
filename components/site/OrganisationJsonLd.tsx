import { escape } from '@/config/prize';
import { organisation, sameAsLinks } from '@/config/organisation';
import { contactEmail, siteUrl } from '@/lib/site';

// The Organization block, on every page. Name, url, the icon from public/brand, the giving
// line as the description, the one contact address, and the sameAs links as each goes live.
// Legal name and address render only once set in config.
export function OrganisationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: organisation.name,
    url: siteUrl,
    logo: { '@type': 'ImageObject', url: `${siteUrl}/brand/icon.svg` },
    description: escape.charity.localityStatement,
    contactPoint: [{ '@type': 'ContactPoint', email: contactEmail, contactType: 'customer service', areaServed: 'GB', availableLanguage: 'en' }],
    sameAs: sameAsLinks(),
    ...(organisation.legalName ? { legalName: organisation.legalName } : {}),
    ...(organisation.address ? { address: { '@type': 'PostalAddress', ...organisation.address } } : {}),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
