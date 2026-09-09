// The company behind the site, for the Organization structured data. Anything null is not
// yet true and does not render; set each field the day it becomes so. The contact email
// lives in lib/site.ts and is read from there.
export const organisation = {
  name: 'Trove',
  legalName: null as string | null,          // the registered company name, on incorporation
  address: null as null | {                  // the registered office, on incorporation
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: 'GB';
  },
  // The review platform mark in the sticky bar, once a listing exists. Hidden until then.
  review: null as null | { label: string; url: string },
  sameAs: {                                  // each becomes a link the day the account or listing is live
    instagram: null as string | null,
    tiktok: null as string | null,
    linkedin: null as string | null,
    trustpilot: null as string | null,
    companiesHouse: null as string | null,
  },
  // The footer's social and review slots, in order. Text until a handle exists; the day
  // one does, set it here and the footer links it without a copy change. The link goes
  // to the matching sameAs url above.
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
