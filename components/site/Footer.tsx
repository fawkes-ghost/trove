import Link from 'next/link';
import { compliance, escape } from '@/config/prize';
import { organisation } from '@/config/organisation';
import { launch } from '@/config/launch';
import { routes, freePostalRoute, signposting, type Route } from '@/lib/routes';
import { Wordmark } from '@/components/brand/Marks';
import { percent } from '@/lib/format';
import { ComplianceStrip } from './ComplianceStrip';
import { escapeTitle } from '@/lib/escapes';

// Loch block. Four groups of links, the signposting and the key terms, then a plain account
// of what is real today and what is still being finished, read from config/launch.ts and the
// escape, so it changes the day each thing becomes true. The company line, then the wordmark
// set large as the last thing on the page.
export function Footer() {
  const [first, second] = compliance.dcmsVoluntaryCode.signposting;

  const groups: { title: string; links: Route[] }[] = [
    { title: 'Escapes', links: [{ label: escapeTitle(escape), href: `/escapes/${escape.slug}` }, { label: 'All escapes', href: '/escapes' }, { label: 'Results', href: `/escapes/${escape.slug}/winner` }] },
    { title: 'Help', links: [{ label: 'How it works', href: '/how-it-works' }, { label: 'Fair questions', href: '/#questions' }, { label: 'Free entry by post', href: freePostalRoute }, { label: 'Contact', href: '/contact' }, { label: 'Complaints', href: '/legal/complaints' }] },
    { title: 'Trove', links: [{ label: 'Why Trove', href: '/why' }, { label: 'Playing responsibly', href: '/legal/playing-responsibly' }] },
    { title: 'Legal', links: routes.legal.filter((route) => route.href !== '/legal/complaints' && route.href !== '/legal/playing-responsibly') },
  ];

  const status = [
    escape.status === 'open' ? null : 'Entries are not open yet, and no payment is taken on this site.',
    launch.termsInForce ? null : 'The terms, key terms and policies are drafts for solicitor review and are not yet in force.',
    escape.venue.permissionGranted ? null : 'The house is named once it has given its written permission.',
    launch.imageryLicensed ? null : 'The film is an AI-generated stand-in for mood. The photographs are real photographs of the English countryside. None of them shows the house, and licensed film and photography of it replace them before entries open.',
  ].filter((line): line is string => Boolean(line));

  // A social or review slot shows only once its link exists: a platform's name with nothing
  // behind it reads as an unfinished site.
  const social = organisation.social.flatMap((slot) => {
    const url = organisation.sameAs[slot.key];
    return url ? [{ network: slot.network, handle: slot.handle, url }] : [];
  });

  const { legalName, companyNumber, address } = organisation;
  const companyLine =
    legalName && companyNumber && address
      ? `Trove is a trading name of ${legalName}, registered in England and Wales, company number ${companyNumber}. Registered office: ${address.streetAddress}, ${address.addressLocality} ${address.postalCode}.`
      : null;

  return (
    <footer className="bg-moss text-snow">
      <div className="section-half flex flex-col gap-10">
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {groups.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] tracking-[0.12em] text-snow/70 uppercase">{group.title}</p>
              <ul className="mt-4 flex flex-col gap-3 text-base">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:underline hover:underline-offset-4">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="rule-t flex flex-col gap-4 pt-8">
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
            .
          </p>
          {social.length ? (
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-snow/80" aria-label="Social and reviews">
              {social.map((slot) => (
                <li key={slot.network}>
                  <a href={slot.url} rel="noopener" className="-my-2 inline-block py-2 hover:text-snow">
                    {slot.handle ?? slot.network}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {status.length ? (
          <div className="rule-t pt-8" data-site-status>
            <p className="text-[11px] tracking-[0.12em] text-snow/70 uppercase">Where things stand</p>
            <ul className="mt-4 flex max-w-[44rem] flex-col gap-2 text-sm leading-relaxed text-snow/85">
              {status.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {companyLine ? (
          <p className="max-w-[44rem] text-[13px] leading-relaxed text-snow/70">
            {companyLine}{' '}
            {organisation.sameAs.companiesHouse ? (
              <a href={organisation.sameAs.companiesHouse} rel="noopener" className="underline underline-offset-4">
                Companies House record
              </a>
            ) : null}
          </p>
        ) : null}
      </div>
      {/* The brand line, sitting on the wordmark it belongs to. It says nothing about the
          giving, so the giving share is the line straight under it. It names no place: the
          waitlist speaks for Trove as a whole, not one escape. */}
      <div className="flex flex-col gap-2 px-[var(--gutter)]" data-tagline>
        <p className="font-serif text-[clamp(2rem,6vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">{organisation.tagline}</p>
        <p className="max-w-[36rem] text-base text-snow/85">{percent(escape.charity.shareOfGross)} of every paid entry goes to local causes where the escape is.</p>
      </div>
      {/* The wordmark as big as the page allows: edge to edge, sitting on the foot of the
          page, the sun in its own colour on the loch. */}
      <div className="overflow-hidden px-1 pt-6 md:px-2" aria-hidden="true">
        <Wordmark height={180} className="footer-wordmark block w-full text-snow" />
      </div>
    </footer>
  );
}
