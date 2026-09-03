import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { escapes, getEscape, venueLine } from '@/lib/escapes';
import { gbp, numberWord, sentenceCase } from '@/lib/format';
import { Hero } from '@/components/hero/Hero';
import { Ledger } from '@/components/ledger/Ledger';
import { WhatYouWin } from '@/components/escape/WhatYouWin';
import { Destination } from '@/components/escape/Destination';
import { WhereTheMoneyGoes } from '@/components/escape/WhereTheMoneyGoes';
import { OddsLadder } from '@/components/escape/OddsLadder';
import { Enter } from '@/components/escape/Enter';
import { PostalEntry } from '@/components/escape/PostalEntry';
import { Questions } from '@/components/escape/Questions';
import { EscapeJsonLd } from '@/components/escape/EscapeJsonLd';
import { ComplianceStrip } from '@/components/site/ComplianceStrip';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://trovewild.com';

export function generateStaticParams() {
  return escapes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = getEscape(slug);
  if (!item) return {};
  return {
    title: `The ${item.destination} escape`,
    description: `${sentenceCase(numberWord(item.nights))} nights for two at ${venueLine(item)}, with ${gbp(item.prize.cash)} in cash. A ${gbp(item.prize.value)} prize. ${item.charity.localityStatement}`,
  };
}

// The standard escape page. One template, every escape identical in form, driven entirely
// by the Escape object.
export default async function EscapePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getEscape(slug);
  if (!item) notFound();

  return (
    <main>
      <EscapeJsonLd escape={item} url={`${siteUrl}/escapes/${item.slug}`} />
      <Hero escape={item} moment={false} />
      <Ledger escape={item} />
      <WhatYouWin escape={item} />
      <Destination escape={item} />
      <WhereTheMoneyGoes escape={item} />
      <OddsLadder escape={item} />
      <Enter escape={item} />
      <PostalEntry escape={item} />
      <Questions />
      <section className="border-t border-ink/15 px-6 py-6 md:px-10">
        <ComplianceStrip className="text-ink/75" />
      </section>
    </main>
  );
}
