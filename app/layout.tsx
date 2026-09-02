import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';
import { Fraunces, Geist, Geist_Mono } from 'next/font/google';
import { escape } from '@/config/prize';
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-GB"
      style={accent}
      className={`${fraunces.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
