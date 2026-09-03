'use client';

import { useEffect } from 'react';
import { captureAttribution } from '@/lib/attribution';

// Records the landing page, referrer and campaign tags once per session. See lib/attribution.ts.
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}
