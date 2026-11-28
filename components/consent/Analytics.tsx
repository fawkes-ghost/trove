'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/analytics';
import { onConsent, readConsent } from '@/lib/consent';
import { campaignConfig } from '@/lib/attribution';

// Loads GA4 only after the visitor has accepted. Renders nothing otherwise, so no tag,
// no request and no cookie exist before consent.
//
// A visitor often accepts on a later page than the one they landed on, and by then the
// campaign tags have left the address bar and the referrer is this site, so GA would file
// the visit as direct. The tags and outside referrer captured on the first page of the
// session (lib/attribution.ts) are handed to the config call instead, so a WhatsApp or
// Instagram link is still credited to WhatsApp or Instagram.
export function Analytics() {
  const [allowed, setAllowed] = useState(false);
  const [config, setConfig] = useState('{}');

  useEffect(() => {
    setConfig(campaignConfig());
    setAllowed(readConsent() === 'accepted');
    return onConsent((consent) => {
      setConfig(campaignConfig());
      setAllowed(consent === 'accepted');
    });
  }, []);

  if (!allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}', Object.assign({ anonymize_ip: true }, ${config}));`}
      </Script>
    </>
  );
}
