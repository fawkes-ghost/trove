// The company behind the site, for the Organization structured data. Anything null is not
// yet true and does not render; set each field the day it becomes so. The contact email
// lives in lib/site.ts and is read from there.
export const organisation = {
  name: 'Trove',
  legalName: 'Trove Wild Limited' as string | null, // the registered company name
  companyNumber: '17524782' as string | null,     // Companies House, England and Wales
  address: {                                 // the registered office, as filed at Companies House
    streetAddress: 'Suite 54, 101 Clapham High Street',
    addressLocality: 'London',
    postalCode: 'SW4 7TB',
    addressCountry: 'GB',
  } as null | {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: 'GB';
  },
  // The review platform mark in the sticky bar, once a listing exists. Hidden until then.
  review: null as null | { label: string; url: string },
  sameAs: {                                  // each becomes a link the day the account or listing is live
    instagram: 'https://www.instagram.com/trovewild/' as string | null,
    tiktok: null as string | null,
    linkedin: null as string | null,
    trustpilot: null as string | null,
    companiesHouse: 'https://find-and-update.company-information.service.gov.uk/company/17524782' as string | null,
  },
  // The footer's social and review slots, in order. A slot is hidden until its sameAs url
  // above is set; the day it is, the footer links it without a copy change, using the
  // handle here if there is one and the network's name if not.
  social: [
    { network: 'Instagram', key: 'instagram', handle: null as string | null },
    { network: 'TikTok', key: 'tiktok', handle: null as string | null },
    { network: 'Reviews', key: 'trustpilot', handle: null as string | null },
  ] as { network: string; key: SocialKey; handle: string | null }[],
};

export type SocialKey = 'instagram' | 'tiktok' | 'linkedin' | 'trustpilot' | 'companiesHouse';

// The live sameAs links, in a stable order, for structured data.
export function sameAsLinks(): string[] {
  return Object.values(organisation.sameAs).filter((url): url is string => typeof url === 'string' && url.length > 0);
}
