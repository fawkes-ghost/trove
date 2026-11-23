import Link from 'next/link';
import { compliance, escape } from '@/config/prize';
import { organisation } from '@/config/organisation';
import { launch } from '@/config/launch';
import { routes, freePostalRoute, signposting, type Route } from '@/lib/routes';
import { Wordmark } from '@/components/brand/Marks';
import { ComplianceStrip } from './ComplianceStrip';

// Loch block. Four groups of links, the signposting and the key terms, then a plain account
// of what is real today and what is still being finished, read from config/launch.ts and the
// escape, so it changes the day each thing becomes true. The company line, then the wordmark
// set large as the last thing on the page.
export function Footer() {
  const [first, second] = compliance.dcmsVoluntaryCode.signposting;

  const groups: { title: string; links: Route[] }[] = [
    { title: 'Escapes', links: [{ label: escape.destination, href: `/escapes/${escape.slug}` }, { label: 'All escapes', href: '/escapes' }, { label: 'Results', href: `/escapes/${escape.slug}/winner` }] },
    { title: 'Help', links: [{ label: 'How it works', href: '/how-it-works' }, { label: 'Fair questions', href: '/#questions' }, { label: 'Free entry by post', href: freePostalRoute }, { label: 'Contact', href: '/contact' }, { label: 'Complaints', href: '/legal/complaints' }] },
    { title: 'Trove', links: [{ label: 'Why Trove', href: '/why' }, { label: 'Playing responsibly', href: '/legal/playing-responsibly' }] },
    { title: 'Legal', links: routes.legal.filter((route) => route.href !== '/legal/complaints' && route.href !== '/legal/playing-responsibly') },
  ];

  const status = [
    escape.status === 'open' ? null : 'Entries are not open yet, and no payment is taken on this site.',
    launch.termsInForce ? null : 'The terms, key terms and policies are drafts for solicitor review and are not yet in force.',
    escape.venue.permissionGranted ? null : 'The house is named once it has given its written permission.',
    escape.charity.beneficiary ? null : 'The charities we give to are named once our agreement with them is signed.',
    launch.imageryLicensed ? null : 'The film and photographs are AI-generated stand-ins for mood. They do not show the house, and licensed photography replaces them before entries open.',
  ].filter((line): line is string => Boolean(line));

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
              <p className="font-mono text-[11px] tracking-[0.12em] text-snow/70 uppercase">{group.title}</p>
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
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-snow/80" aria-label="Social and reviews">
            {organisation.social.map((slot) => {
              const url = organisation.sameAs[slot.key];
              return (
                <li key={slot.network}>
                  {slot.handle && url ? (
                    <a href={url} rel="noopener" className="hover:text-snow">
                      {slot.handle}
                    </a>
                  ) : (
                    slot.network
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {status.length ? (
          <div className="rule-t pt-8" data-site-status>
            <p className="font-mono text-[11px] tracking-[0.12em] text-snow/70 uppercase">Where things stand</p>
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
      {/* The wordmark as big as the page allows: edge to edge, sitting on the foot of the
          page, the sun in its own colour on the loch. */}
      <div className="overflow-hidden px-1 pt-6 md:px-2" aria-hidden="true">
        <Wordmark height={180} className="footer-wordmark block w-full text-snow" />
      </div>
    </footer>
  );
}
