'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import type { Route } from '@/lib/routes';
import { WaitlistLink } from '@/components/hero/WaitlistLink';
import { Menu } from './Menu';

type Props = {
  // The prize in its short form, from config.
  prize: string;
  // The middle slot: the worst-case odds until entries open, then entries taken against the cap.
  middle: string;
  // A review platform mark, once a config value exists. Hidden until then.
  review: { label: string; url: string } | null;
  // The icon's source, read on the server, so the tile can sit in the bar.
  iconSvg: string;
  // The route lists for the nav trigger below 900px.
  groups: { escapes: Route[]; information: Route[]; legal: Route[] };
};

// One ink line fixed to the top of the screen once the hero (or, on a page without one,
// the page's heading) has left the viewport. From 900px: the logo tile, the prize on the
// left, the odds in mono, an empty slot for a review mark, and the call to action in the
// accent. Below 900px: the logo tile and the nav trigger only. Nothing is ever fixed to the
// foot of the screen. Rendered in a portal at body level, shown and hidden by
// IntersectionObserver, never by scroll position. No countdown, ever.
export function StickyBar({ prize, middle, review, iconSvg, groups }: Props) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setMounted(true);
    const anchor = document.querySelector('[data-hero]') ?? document.querySelector('main h1');
    if (!anchor) return;
    const observer = new IntersectionObserver((entries) => setShow(!entries[entries.length - 1].isIntersecting), { threshold: 0 });
    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      data-sticky-bar={show ? 'shown' : 'hidden'}
      aria-hidden={!show}
      className={`on-film fixed inset-x-0 top-0 z-30 flex items-center gap-6 bg-ink px-6 py-3 text-snow transition-transform duration-300 md:gap-8 md:px-10 ${show ? 'translate-y-0' : 'pointer-events-none -translate-y-full'}`}
    >
      <Link href="/" aria-label="Trove home" className="brand-mark brand-icon block h-7 shrink-0" dangerouslySetInnerHTML={{ __html: iconSvg }} />
      <p className="hidden text-sm min-[900px]:block">{prize}</p>
      <p className="hidden font-mono text-[13px] text-snow/80 min-[900px]:block" data-sticky-middle>
        {middle}
      </p>
      <span className="ml-auto hidden items-center gap-6 min-[900px]:flex">
        {review ? (
          <a href={review.url} rel="noopener" className="text-sm text-snow/80 underline underline-offset-4" data-review-slot>
            {review.label}
          </a>
        ) : (
          <span data-review-slot hidden />
        )}
        <WaitlistLink className="btn inline-flex h-10 items-center bg-accent px-5 text-sm font-medium text-ink">Secure your place</WaitlistLink>
      </span>
      <span className="ml-auto min-[900px]:hidden">
        <Menu groups={groups} />
      </span>
    </div>,
    document.body,
  );
}
