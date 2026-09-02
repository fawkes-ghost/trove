import type { NextConfig } from 'next';
import { assertEscape } from './config/prize';

// Fails the build if config/prize.ts breaks the economics or the compliance canon.
assertEscape();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The brand marks are read from disk and inlined by components/brand/Marks.tsx.
  outputFileTracingIncludes: { '/*': ['./public/brand/*.svg'] },
};

export default nextConfig;
