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
  sameAs: {                                  // each becomes a link the day the account or listing is live
    instagram: null as string | null,
    tiktok: null as string | null,
    linkedin: null as string | null,
    trustpilot: null as string | null,
    companiesHouse: null as string | null,
  },
};

// The live sameAs links, in a stable order, for structured data.
export function sameAsLinks(): string[] {
  return Object.values(organisation.sameAs).filter((url): url is string => typeof url === 'string' && url.length > 0);
}
