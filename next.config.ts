import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import { assertEscape } from './config/prize';

// Fails the build if config/prize.ts breaks the economics or the compliance canon.
assertEscape();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Legal documents live as MDX in content/legal and are imported by their pages.
  pageExtensions: ['ts', 'tsx', 'mdx'],
  // The brand marks are read from disk and inlined by components/brand/Marks.tsx.
  outputFileTracingIncludes: { '/*': ['./public/brand/*.svg'] },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
