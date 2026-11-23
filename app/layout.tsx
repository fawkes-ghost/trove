import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { DM_Sans, Fraunces, IBM_Plex_Mono, Instrument_Sans, Instrument_Serif, Newsreader } from 'next/font/google';
import { escape } from '@/config/prize';

import { siteUrl } from '@/lib/site';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { Analytics } from '@/components/consent/Analytics';
import { AttributionCapture } from '@/components/attribution/AttributionCapture';
import { OrganisationJsonLd } from '@/components/site/OrganisationJsonLd';
import { TypeSwitcher, type TypeOption } from '@/components/preview/TypeSwitcher';
import './globals.css';
import './type-options.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

// Low sun type: Fraunces for display, Instrument Sans for body and UI, Plex Mono for the
// ledger and the compliance strip only.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  // PREVIEW ONLY: the variable font, so the options can use 600 for figures.
  display: 'swap',
});

// PREVIEW ONLY: the faces behind the type options. Not preloaded, so the current site's
// first paint is unchanged; an option's faces load when it is chosen.
const optInstrumentSerif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--font-opt-instrument-serif', display: 'swap', preload: false });
const optNewsreader = Newsreader({ subsets: ['latin'], axes: ['opsz'], style: ['normal', 'italic'], variable: '--font-opt-newsreader', display: 'swap', preload: false });
const optDmSans = DM_Sans({ subsets: ['latin'], axes: ['opsz'], variable: '--font-opt-dm-sans', display: 'swap', preload: false });

const typeOptions: TypeOption[] = [
  { id: 'current', name: 'Current', faces: 'Fraunces, Instrument Sans, IBM Plex Mono.' },
  { id: 'a', name: 'A Editorial', faces: 'Instrument Serif headlines. Instrument Sans for text, buttons and figures.' },
  { id: 'b', name: 'B All sans', faces: 'DM Sans throughout, the nearest free match to the logo.' },
  { id: 'c', name: 'C Broadsheet', faces: 'Newsreader headlines. Instrument Sans for text, buttons and figures.' },
  { id: 'loud', name: 'D Loud', faces: 'Broadsheet for what we say, the logo’s heavy sans for what we promise. A new hero, a ribbon, a sticker when you sign up.' },
];

// PREVIEW ONLY: applies the chosen option before first paint, from ?type= or the last choice.
const typeGate = `try{var k="trove:type-option";var p=new URLSearchParams(location.search).get("type");if(p){localStorage.setItem(k,p)}var v=p||localStorage.getItem(k);if(v&&v!=="current"){document.documentElement.dataset.type=v}}catch(e){}`;

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400'],
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
      className={`${fraunces.variable} ${instrumentSans.variable} ${plexMono.variable} ${optInstrumentSerif.variable} ${optNewsreader.variable} ${optDmSans.variable}`}
    >
      <body>
        <OrganisationJsonLd />
        {/* A real inline script, not next/script: beforeInteractive scripts are queued until
            Next's runtime loads, which on a slow connection is well after first paint. This
            one runs as the document parses, so the page opens as snow. */}
        <script id="moment-gate" dangerouslySetInnerHTML={{ __html: momentGate }} />
        <script id="type-gate" dangerouslySetInnerHTML={{ __html: typeGate }} />
        {children}
        <TypeSwitcher options={typeOptions} />
        <ConsentBanner />
        <Analytics />
        <AttributionCapture />
      </body>
    </html>
  );
}
