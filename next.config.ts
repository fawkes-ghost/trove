import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import { assertEscape, escape, unannouncedPlaceTerms, unpublishedVenueTerms } from './config/prize';
import { assertVenueUnpublished } from './lib/venue-guard';
import { securityHeaders } from './lib/security-headers';

// Fails the build if config/prize.ts breaks the economics or the compliance canon, or if
// the venue's name has leaked out of config before permission exists.
assertEscape();
assertVenueUnpublished(unpublishedVenueTerms, ['app', 'components', 'lib', 'content']);
// While the first escape's place is unannounced, the same guard keeps it off every page.
if (!escape.destinationPublic) assertVenueUnpublished(unannouncedPlaceTerms, ['app', 'components', 'lib', 'content']);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Legal documents live as MDX in content/legal and are imported by their pages.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // The brand marks are read from disk and inlined by components/brand/Marks.tsx.
  outputFileTracingIncludes: { '/*': ['./public/brand/*.svg'] },
  // Photographs go through the image optimiser: AVIF or WebP at the width the screen needs,
  // so a phone on 4G is not sent a desktop-sized JPEG.
  images: { formats: ['image/avif', 'image/webp'] },
  // Two sets of headers. Every response carries the security headers (see
  // lib/security-headers.ts for what the policy allows and why it has no nonce).
  // Everything under public/media is content-addressed by its filename: a new cut is a new
  // name, never a new body at the same path, so it can be cached for a year and never
  // revalidated.
  // The first escape's page lived at /escapes/hampshire until 28 November 2026. Links already
  // shared keep working and land on the page under its public name.
  async redirects() {
    return [{ source: '/escapes/hampshire/:path*', destination: `/escapes/${escape.slug}/:path*`, permanent: true }];
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders() },
      {
        source: '/media/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
