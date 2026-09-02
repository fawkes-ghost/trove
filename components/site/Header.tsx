import Link from 'next/link';
import { Icon, Wordmark } from '@/components/brand/Marks';
import { routes } from '@/lib/routes';
import { Menu } from './Menu';

// Logo top left as one link, hamburger top right, nothing else.
export function Header() {
  return (
    <header className="site-header absolute inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
      <Link href="/" className="flex items-center gap-[10px]" aria-label="Trove home">
        <Icon height={28} className="header-icon" />
        <Wordmark height={22} />
      </Link>
      <Menu groups={routes} />
    </header>
  );
}
