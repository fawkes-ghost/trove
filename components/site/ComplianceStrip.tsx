import Link from 'next/link';
import { compliance } from '@/config/prize';
import { freePostalRoute, significantConditions } from '@/lib/routes';

// The strip at the base of the hero and in the footer. Mono, every promotional surface.
export function ComplianceStrip({ className = '' }: { className?: string }) {
  return (
    <p className={`font-mono text-[11px] leading-relaxed ${className}`}>
      {compliance.minimumAge}+. {compliance.residency} residents.{' '}
      <Link href={freePostalRoute} className="underline underline-offset-4">
        Free postal entry
      </Link>
      , identical odds, same cap.{' '}
      <Link href={significantConditions} className="underline underline-offset-4">
        Significant conditions
      </Link>
      .
    </p>
  );
}
