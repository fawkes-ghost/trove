import type { ReactNode } from 'react';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Reveals } from '@/components/motion/Reveals';
import { JoinBar } from '@/components/site/JoinBar';
import { compliance, escape } from '@/config/prize';
import { gbp } from '@/lib/format';
import { escapeTitle } from '@/lib/escapes';

// The site chrome: smooth scroll, the one fixed header, footer, and on phones the join bar. Nothing sits
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
      <JoinBar line={`${escapeTitle(escape)}. A ${gbp(escape.prize.value)} prize.`} terms={`${compliance.minimumAge}+, ${compliance.residency}. Free postal entry. Key terms.`} termsHref={compliance.significantConditionsPath} />
    </>
  );
}
