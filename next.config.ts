import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import { assertEscape, unpublishedVenueTerms } from './config/prize';
import { assertVenueUnpublished } from './lib/venue-guard';

// Fails the build if config/prize.ts breaks the economics or the compliance canon, or if
// the venue's name has leaked out of config before permission exists.
assertEscape();
assertVenueUnpublished(unpublishedVenueTerms, ['app', 'components', 'lib', 'content']);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Legal documents live as MDX in content/legal and are imported by their pages.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // The brand marks are read from disk and inlined by components/brand/Marks.tsx.
  outputFileTracingIncludes: { '/*': ['./public/brand/*.svg'] },
  // Everything under public/media is content-addressed by its filename: a new cut is a new
  // name, never a new body at the same path, so it can be cached for a year and never
  // revalidated.
  async headers() {
    return [
      {
        source: '/media/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
