'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { WaitlistLink } from '@/components/hero/WaitlistLink';

// The join bar, on phones only (below 900px, where the header carries no call to action).
// It rises from the foot once the hero has scrolled away, so the call to action is always
// under the thumb, and steps aside while the waitlist form itself or the footer is on
// screen, and while the cookie banner is up. The key terms link travels with it, because
// it is a promotional surface. Values only: the line is built on the server from config.
export function JoinBar({ line, terms, termsHref }: { line: string; terms: string; termsHref: string }) {
  const [heroGone, setHeroGone] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[data-hero]');
    const targets = [document.getElementById('waitlist'), document.querySelector('footer')].filter(Boolean) as Element[];
    const visible = new Set<Element>();
    const heroObserver = hero ? new IntersectionObserver(([entry]) => setHeroGone(!entry.isIntersecting && entry.boundingClientRect.top < 0)) : null;
    const formObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target) : visible.delete(entry.target)));
      setFormInView(visible.size > 0);
    });
    if (hero && heroObserver) heroObserver.observe(hero);
    targets.forEach((target) => formObserver.observe(target));
    return () => {
      heroObserver?.disconnect();
      formObserver.disconnect();
    };
  }, []);

  const shown = heroGone && !formInView;

  return (
    <div
      className={`join-bar fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-snow/92 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out min-[900px]:hidden ${shown ? 'translate-y-0' : 'translate-y-full'}`}
      aria-hidden={!shown}
      inert={!shown}
      data-join-bar={shown ? 'shown' : 'hidden'}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{line}</p>
          <Link href={termsHref} className="block text-xs leading-snug text-ink/70 underline underline-offset-2">
            {terms}
          </Link>
        </div>
        <WaitlistLink className="btn inline-flex h-11 shrink-0 items-center bg-sun px-4 text-sm font-medium text-ink">Secure your place</WaitlistLink>
      </div>
    </div>
  );
}
