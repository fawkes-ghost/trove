// The public origin, used for canonicals, the sitemap and structured data. Set
// NEXT_PUBLIC_SITE_URL in Vercel once the domain is live.
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trovewild.com').replace(/\/$/, '');
