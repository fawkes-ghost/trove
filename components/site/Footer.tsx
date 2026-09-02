import Link from 'next/link';
import { compliance } from '@/config/prize';
import { routes, freePostalRoute, signposting } from '@/lib/routes';
import { ComplianceStrip } from './ComplianceStrip';

const slots = ['Instagram', 'TikTok', 'Reviews'];

// Moss block, rows of text. Compliance strip, DCMS signposting, social and review slots, legal links.
export function Footer() {
  const [first, second] = compliance.dcmsVoluntaryCode.signposting;
  return (
    <footer className="bg-moss px-6 py-12 text-snow md:px-10">
      <div className="flex flex-col gap-8">
        <ComplianceStrip className="text-snow/90" />
        <p className="text-sm">
          Please play responsibly. Support from{' '}
          <a href={signposting[first]} rel="noopener" className="underline underline-offset-4">
            {first}
          </a>{' '}
          and{' '}
          <a href={signposting[second]} rel="noopener" className="underline underline-offset-4">
            {second}
          </a>
          .{' '}
          <Link href="/legal/playing-responsibly" className="underline underline-offset-4">
            Playing responsibly
          </Link>
          .
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-snow/80" aria-label="Social and reviews">
          {slots.map((slot) => (
            <li key={slot}>{slot}</li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-snow/80" aria-label="Legal">
          {routes.legal.map((route) => (
            <li key={route.href}>
              <Link href={route.href} className="hover:text-snow">
                {route.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="hover:text-snow">
              Contact
            </Link>
          </li>
          <li>
            <Link href={freePostalRoute} className="hover:text-snow">
              Free entry by post
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
