import type { ReactNode } from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { SiteStickyBar } from '@/components/site/SiteStickyBar';

// The site chrome: smooth scroll, header with menu, the sticky bar, footer. Nothing sits
// between a page's last section and the footer. Every public page lives in
// this group. The holding and enter pages in app/(gate) render without it.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <SiteStickyBar />
      {children}
      <Footer />
    </>
  );
}
