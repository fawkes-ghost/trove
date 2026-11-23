import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, Newsreader } from 'next/font/google';
import { escape } from '@/config/prize';

import { siteUrl } from '@/lib/site';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { Analytics } from '@/components/consent/Analytics';
import { AttributionCapture } from '@/components/attribution/AttributionCapture';
import { OrganisationJsonLd } from '@/components/site/OrganisationJsonLd';
import './globals.css';

// Two families, two voices. Newsreader, a serif drawn for news, for what the site says:
// headlines and statements. DM Sans, the nearest open match to the logo, for everything
// else: text, buttons and small print at ordinary weights, and at its heaviest for what the
// site promises, the figures and the hero's number. Both are variable, so one file each
// covers every weight, and Newsreader redraws itself for the size it is set at.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-text',
  axes: ['opsz'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Trove', template: '%s · Trove' },
  description: 'Win a luxury escape in the UK. One winner per draw, a fixed number of entries so you know your chances before you enter, and free entry by post.',
  alternates: { canonical: '/' },
  openGraph: { siteName: 'Trove', type: 'website', locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
};

// The browser chrome on phones takes the page colour, so the site reads as one light surface.
export const viewport: Viewport = {
  themeColor: '#F7F8F5',
};

// Decides before first paint whether motion runs at all (data-motion="full" unless the
// visitor asks for reduced motion), whether the reveals arm (data-reveal="on", the same
// condition). The hero sunrise in app/globals.css runs off the same attribute.
// Runs as the document parses so nothing flashes either way; without it every act is in its
// final state. The reveal gate carries its own fail-safe: if components/motion/Reveals.tsx
// never announces itself the attribute is dropped and every revealed block is simply
// visible, so a failed bundle can never leave a section blank. It is dropped shortly after
// load, which is as soon as a missing bundle can be inferred, with a four second ceiling in
// case load never fires.
const momentGate = `try{var d=document.documentElement;var r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(!r){d.dataset.motion="full";d.dataset.reveal="on";var c=function(){if(!d.dataset.revealLive){delete d.dataset.reveal}};addEventListener("load",function(){setTimeout(c,300)});setTimeout(c,4000)}}catch(e){}`;

// Html, fonts, consent and analytics only. The header, menu and footer live in
// app/(site)/layout.tsx so the holding and enter pages can render without them.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      // The gate script sets data-motion and data-reveal on <html> before hydration, by design.
      suppressHydrationWarning
      className={`${newsreader.variable} ${dmSans.variable}`}
    >
      <body>
        <OrganisationJsonLd />
        {/* A real inline script, not next/script: beforeInteractive scripts are queued until
            Next's runtime loads, which on a slow connection is well after first paint. This
            one runs as the document parses, so the page opens as snow. */}
        <script id="moment-gate" dangerouslySetInnerHTML={{ __html: momentGate }} />
        {children}
        <ConsentBanner />
        <Analytics />
        <AttributionCapture />
      </body>
    </html>
  );
}
