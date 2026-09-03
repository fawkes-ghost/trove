import Link from 'next/link';
import { Icon, Wordmark } from '@/components/brand/Marks';
import { routes, freePostalRoute } from '@/lib/routes';
import { WaitlistLink } from '@/components/hero/WaitlistLink';
import { Menu } from './Menu';

// The primary routes, shown in the header from 900px up. Below that the hamburger overlay
// carries every route.
const primary = [
  { label: 'Escapes', href: '/escapes' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Why Trove', href: '/why' },
  { label: 'Free entry by post', href: freePostalRoute },
];

// Logo top left as one link. From 900px, the primary routes and the waitlist call to
// action; below, the hamburger.
export function Header() {
  return (
    <header className="site-header absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="flex items-center gap-[10px]" aria-label="Trove home">
        <Icon height={28} className="header-icon" />
        <Wordmark height={22} />
      </Link>
      <nav aria-label="Primary" className="hidden items-center gap-8 min-[900px]:flex">
        {primary.map((route) => (
          <Link key={route.href} href={route.href} className="text-sm font-medium underline-offset-4 hover:underline">
            {route.label}
          </Link>
        ))}
        <WaitlistLink className="inline-flex h-10 items-center border border-current px-4 text-sm font-medium">Join the waitlist</WaitlistLink>
      </nav>
      <div className="min-[900px]:hidden">
        <Menu groups={routes} />
      </div>
    </header>
  );
}
