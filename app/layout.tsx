import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import Script from 'next/script';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { escape } from '@/config/prize';
import { ConsentBanner } from '@/components/consent/ConsentBanner';
import { Analytics } from '@/components/consent/Analytics';
import { AttributionCapture } from '@/components/attribution/AttributionCapture';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT'],
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trove',
  description: 'A UK luxury travel prize draw. One escape per draw.',
};

// The accent is one per escape and comes from config, never from a stylesheet.
const accent = { '--accent': escape.theme.accent } as CSSProperties;

// Decides before first paint whether the logo moment plays: fresh session, home page,
// motion allowed. Runs in the head so nothing flashes either way.
const momentGate = `try{if(location.pathname==="/"&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&!sessionStorage.getItem("trove:logo-moment")){document.documentElement.dataset.moment="play"}}catch(e){}`;

// Html, fonts, consent and analytics only. The header, menu and footer live in
// app/(site)/layout.tsx so the holding and enter pages can render without them.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      style={accent}
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Script id="moment-gate" strategy="beforeInteractive">
          {momentGate}
        </Script>
        {children}
        <ConsentBanner />
        <Analytics />
        <AttributionCapture />
      </body>
    </html>
  );
}
