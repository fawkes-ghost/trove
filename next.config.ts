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
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
