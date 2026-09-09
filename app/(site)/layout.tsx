import type { ReactNode } from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { EscapeReel } from '@/components/media/EscapeReel';
import { SiteStickyBar } from '@/components/site/SiteStickyBar';

// The site chrome: smooth scroll, header with menu, the sticky bar, the reel above the
// footer, footer. Every public page lives in
// this group. The holding and enter pages in app/(gate) render without it.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <SiteStickyBar />
      {children}
      <EscapeReel />
      <Footer />
    </>
  );
}
