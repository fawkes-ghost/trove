import type { ReactNode } from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Reveals } from '@/components/motion/Reveals';

// The site chrome: smooth scroll, the one fixed header, footer. Nothing sits
// between a page's last section and the footer. Every public page lives in
// this group. The holding and enter pages in app/(gate) render without it.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Reveals />
      <Header />
      {children}
      <Footer />
    </>
  );
}
