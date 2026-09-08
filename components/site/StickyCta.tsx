'use client';

import { useEffect, useState } from 'react';
import { WaitlistLink } from '@/components/hero/WaitlistLink';

// Below 900px: one line, paper on ink, fixed to the foot of the screen. Appears once the
// hero, and with it its call to action and compliance strip, has left the viewport, and
// hides while the waitlist form is on screen. Sits above the consent banner when that is
// open.
export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cta = document.querySelector('[data-hero]');
    const form = document.getElementById('waitlist');
    if (!cta) return;
    let ctaVisible = true;
    let formVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === cta) ctaVisible = entry.isIntersecting;
          if (entry.target === form) formVisible = entry.isIntersecting;
        }
        setShow(!ctaVisible && !formVisible);
      },
      { threshold: 0 },
    );
    observer.observe(cta);
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      data-sticky-cta={show ? 'shown' : 'hidden'}
      aria-hidden={!show}
      className={`fixed inset-x-0 z-30 transition-transform duration-300 min-[900px]:hidden ${show ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
      style={{ bottom: 'var(--consent-h, 0px)' }}
    >
      <WaitlistLink className="flex h-14 w-full items-center justify-center bg-ink text-base font-medium text-snow">Secure your place</WaitlistLink>
    </div>
  );
}
