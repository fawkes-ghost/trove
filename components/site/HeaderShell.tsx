'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Route } from '@/lib/routes';
import { WaitlistLink } from '@/components/hero/WaitlistLink';
import { Menu } from './Menu';

type Props = {
  iconSvg: string;
  wordmarkSvg: string;
  primary: Route[];
  groups: { escapes: Route[]; information: Route[]; legal: Route[] };
  // The prize in short form, the prize value alone for narrow centres, and the odds in mono.
  prize: string;
  prizeValue: string;
  odds: string;
};

// The one fixed bar on the page, with two states. At the top of the page: the logo and
// wordmark on the left, the nav in the centre, the call to action on the right, over the
// film or on snow. Once the hero (or, on a page without one, the heading) has left the
// viewport: ink, the logo tile alone on the left, the prize line and the odds in the
// centre, and the same call to action on the right, the same element throughout. The
// centre is a grid column that owns its width: the odds drop first when it is tight,
// then the prize line shortens to the value alone, and nothing ever runs under the logo.
// Below 900px the bar carries the logo tile and the nav trigger only. Nothing is ever
// fixed to the foot of the screen.
export function HeaderShell({ iconSvg, wordmarkSvg, primary, groups, prize, prizeValue, odds }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const anchor = document.querySelector('[data-hero]') ?? document.querySelector('main h1');
    if (!anchor) return;
    const observer = new IntersectionObserver((entries) => setScrolled(!entries[entries.length - 1].isIntersecting), { threshold: 0 });
    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-40 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-6 px-6 py-4 md:px-10 ${scrolled ? 'on-film bg-ink text-snow' : ''}`}
      data-header={scrolled ? 'scrolled' : 'top'}
    >
      <Link href="/" className="flex items-center gap-[10px]" aria-label="Trove home">
        <span className="brand-mark brand-icon header-icon block h-7" dangerouslySetInnerHTML={{ __html: iconSvg }} />
        {/* The wordmark's own class sets display, so its visibility lives on a wrapper. */}
        <span className={`h-[22px] ${scrolled ? 'hidden' : 'hidden min-[900px]:block'}`}>
          <span className="brand-mark h-[22px]" dangerouslySetInnerHTML={{ __html: wordmarkSvg }} />
        </span>
      </Link>

      <div className="@container hidden min-w-0 justify-center min-[900px]:flex">
        {scrolled ? (
          <p className="flex min-w-0 items-baseline gap-6 whitespace-nowrap text-sm" data-header-centre="prize">
            <span className="hidden @[24rem]:inline">{prize}</span>
            <span className="@[24rem]:hidden">{prizeValue}</span>
            <span className="hidden font-mono text-[13px] text-snow/80 @[38rem]:inline" data-header-odds>
              {odds}
            </span>
          </p>
        ) : (
          <nav aria-label="Primary" className="flex items-center gap-8 whitespace-nowrap" data-header-centre="nav">
            {primary.map((route) => (
              <Link key={route.href} href={route.href} className="text-sm font-medium underline-offset-4 hover:underline">
                {route.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
      <div className="hidden min-[900px]:block">
        <WaitlistLink className={`btn inline-flex h-10 items-center px-4 text-sm font-medium ${scrolled ? 'bg-accent text-ink' : 'border border-current'}`} data-header-cta>
          Secure your place
        </WaitlistLink>
      </div>

      <div className="col-start-3 min-[900px]:hidden">
        <Menu groups={groups} />
      </div>
    </header>
  );
}
