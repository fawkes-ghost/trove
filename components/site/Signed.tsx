import Link from 'next/link';
import { organisation } from '@/config/organisation';
import { launch } from '@/config/launch';
import { significantConditions } from '@/lib/routes';

// The foot of anything set on the company's paper: the registered name and number, the key
// terms, the Companies House record, a review link the day one exists, and a plain line
// while the terms are still drafts. Nothing here is typed in: it is read from the
// organisation and launch config, and a slot that is not real yet does not render.
export function Signed({ className = '' }: { className?: string }) {
  const { legalName, companyNumber } = organisation;
  return (
    <div className={`rule-t flex flex-col gap-4 pt-8 text-base ${className}`} data-signed>
      {legalName && companyNumber ? (
        <p>
          <span className="display text-[1.375rem] leading-tight">{legalName}.</span>
          <span className="mt-1 block text-sm text-ink/70">
            Registered in England and Wales, company number {companyNumber}.
          </span>
        </p>
      ) : null}
      <p className="flex flex-wrap gap-x-8 gap-y-3">
        <Link href={significantConditions} className="link-quiet">
          Read the key terms.
        </Link>
        {organisation.sameAs.companiesHouse ? (
          <a href={organisation.sameAs.companiesHouse} rel="noopener" className="link-quiet">
            Companies House record.
          </a>
        ) : null}
        {organisation.review ? (
          <a href={organisation.review.url} rel="noopener" className="link-quiet">
            {organisation.review.label}
          </a>
        ) : null}
      </p>
      {launch.termsInForce ? null : (
        <p className="text-sm text-ink/60">The terms, key terms and policies are drafts for solicitor review and are not yet in force.</p>
      )}
    </div>
  );
}
