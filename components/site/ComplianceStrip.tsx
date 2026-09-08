import Link from 'next/link';
import { compliance } from '@/config/prize';
import { freePostalRoute, significantConditions } from '@/lib/routes';

// The strip at the base of the hero and in the footer. Mono, every promotional surface.
export function ComplianceStrip({ className = '' }: { className?: string }) {
  return (
    <p className={`font-mono text-[11px] leading-relaxed ${className}`}>
      Open to {compliance.residency} residents aged {compliance.minimumAge} or over.{' '}
      <Link href={freePostalRoute} className="underline underline-offset-4">
        Free entry by post
      </Link>{' '}
      has identical odds inside the same cap. Read the{' '}
      <Link href={significantConditions} className="underline underline-offset-4">
        key terms
      </Link>
      .
    </p>
  );
}
