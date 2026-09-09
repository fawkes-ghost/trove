'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { WaitlistLink } from '@/components/hero/WaitlistLink';

type Props = {
  // The prize in its short form, from config.
  prize: string;
  // The middle slot: the worst-case odds until entries open, then entries taken against the cap.
  middle: string;
  // A review platform mark, once a config value exists. Hidden until then.
  review: { label: string; url: string } | null;
};

// One ink line, fixed to the top of the screen once the hero (or, on a page without one,
// the page's heading) has left the viewport: the prize on the left, the odds in mono in the
// middle, an empty slot for a review mark, and the call to action in the accent. Below
// 900px only the call to action remains, fixed to the foot within thumb's reach. Rendered
// in a portal at body level, shown and hidden by IntersectionObserver, never by scroll
// position. No countdown, ever.
export function StickyBar({ prize, middle, review }: Props) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    const anchor = document.querySelector('[data-hero]') ?? document.querySelector('main h1');
    const form = document.getElementById('waitlist');
    if (!anchor) return;
    let anchorVisible = true;
    let formVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === anchor) anchorVisible = entry.isIntersecting;
          if (entry.target === form) formVisible = entry.isIntersecting;
        }
        setShow(!anchorVisible && !formVisible);
      },
      { threshold: 0 },
    );
    observer.observe(anchor);
    if (form) observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        data-sticky-bar={show ? 'shown' : 'hidden'}
        aria-hidden={!show}
        className={`fixed inset-x-0 top-0 z-30 hidden items-center gap-8 bg-ink px-10 py-3 text-snow transition-transform duration-300 min-[900px]:flex ${show ? 'translate-y-0' : 'pointer-events-none -translate-y-full'}`}
      >
        <p className="text-sm">{prize}</p>
        <p className="font-mono text-[13px] text-snow/80" data-sticky-middle>
          {middle}
        </p>
        <span className="ml-auto flex items-center gap-6">
          {review ? (
            <a href={review.url} rel="noopener" className="text-sm text-snow/80 underline underline-offset-4" data-review-slot>
              {review.label}
            </a>
          ) : (
            <span data-review-slot hidden />
          )}
          <WaitlistLink className="btn inline-flex h-10 items-center bg-accent px-5 text-sm font-medium text-ink">Secure your place</WaitlistLink>
        </span>
      </div>
      <div
        data-sticky-cta={show ? 'shown' : 'hidden'}
        aria-hidden={!show}
        className={`fixed inset-x-0 z-30 transition-transform duration-300 min-[900px]:hidden ${show ? 'translate-y-0' : 'pointer-events-none translate-y-full'}`}
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--consent-h, 0px))' }}
      >
        <WaitlistLink className="btn flex h-14 w-full items-center justify-center bg-accent text-base font-medium text-ink">Secure your place</WaitlistLink>
      </div>
    </>,
    document.body,
  );
}
