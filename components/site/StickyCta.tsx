'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { WaitlistLink } from '@/components/hero/WaitlistLink';

// Below 900px: one line, paper on ink, fixed to the foot of the screen. Rendered in a
// portal at body level so no transformed ancestor can turn its fixed position into an
// absolute one, with its bottom at the safe-area inset (plus the consent banner's height
// while that is open). Appears once the hero, and with it its call to action and
// compliance strip, has left the viewport, and hides while the waitlist form is on
// screen, both by IntersectionObserver, never by scroll position.
export function StickyCta() {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hero = document.querySelector('[data-hero]');
    const form = document.getElementById('waitlist');
    if (!hero) return;
    let heroVisible = true;
    let formVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) heroVisible = entry.isIntersecting;
          if (entry.target === form) formVisible = entry.isIntersecting;
        }
        setShow(!heroVisible && !formVisible);
      },
      { threshold: 0 },
    );
    observer.observe(hero);
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      data-sticky-cta={show ? 'shown' : 'hidden'}
      aria-hidden={!show}
      className={`fixed inset-x-0 z-30 transition-transform duration-300 min-[900px]:hidden ${show ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--consent-h, 0px))' }}
    >
      <WaitlistLink className="flex h-14 w-full items-center justify-center bg-ink text-base font-medium text-snow">Secure your place</WaitlistLink>
    </div>,
    document.body,
  );
}
