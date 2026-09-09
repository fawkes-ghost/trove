'use client';

import { useEffect, useId, useState } from 'react';
import { costFor, oddsForEntries } from '@/lib/odds';
import { count, gbp, gbpPence, numberWord, sentenceCase } from '@/lib/format';

type Bundle = { entries: number; price: number };

type Props = {
  cap: number;
  maxPerPerson: number;
  price: number;
  bundles: Bundle[];
  share: number;
  destination: string;
  fieldId?: string;
};

// The ladder and the calculator as one. Hovering or tapping a tier, or changing the
// number, sets the entries and updates the cost, the worst-case odds, what goes to the
// destination's causes, and the marks lit in the field. This is a client component, so it
// takes values, never the config object. Numerals are tabular throughout.
export function OddsCalculator({ cap, maxPerPerson, price, bundles, share, destination, fieldId }: Props) {
  const [entries, setEntries] = useState(1);
  const id = useId();
  const held = Math.min(Math.max(entries || 1, 1), maxPerPerson);
  const cost = costFor(held, bundles, price);
  const giving = cost * share;

  useEffect(() => {
    if (!fieldId) return;
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.querySelectorAll<SVGElement>('.field-lit').forEach((mark) => {
      if (Number(mark.dataset.mark) < held) mark.setAttribute('data-on', '');
      else mark.removeAttribute('data-on');
    });
  }, [fieldId, held]);

  return (
    <div data-odds-calculator>
      <ol className="flex flex-col">
        {bundles.map((bundle) => (
          <li key={bundle.entries}>
            <button
              type="button"
              onPointerEnter={() => setEntries(bundle.entries)}
              onFocus={() => setEntries(bundle.entries)}
              onClick={() => setEntries(bundle.entries)}
              aria-pressed={held === bundle.entries}
              data-tier={bundle.entries}
              className={`grid w-full items-baseline gap-2 rule-t py-5 text-left md:grid-cols-[14rem_1fr] ${held === bundle.entries ? 'text-ink' : 'text-ink/70'}`}
            >
              <span className="font-mono text-[1.75rem] leading-none md:text-[2rem]">{oddsForEntries(bundle.entries, { cap })}</span>
              <span className="text-base">
                {sentenceCase(numberWord(bundle.entries))} {bundle.entries === 1 ? 'entry' : 'entries'} for {gbp(bundle.price)}.
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 rule-t pt-8 md:grid-cols-[10rem_1fr] md:gap-0">
        <div className="flex flex-col gap-2">
          <label htmlFor={id} className="text-sm font-medium">
            Entries
          </label>
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={1}
            max={maxPerPerson}
            step={1}
            value={entries}
            onChange={(event) => setEntries(Number(event.target.value))}
            className="h-12 w-32 border border-ink/40 bg-snow px-4 text-base text-ink focus:border-ink focus:outline-none"
          />
        </div>
        <dl className="grid gap-6 sm:grid-cols-3 md:rule-l md:pl-10" data-odds-figures>
          <div>
            <dt className="text-sm text-ink/70">{count(held)} {held === 1 ? 'entry' : 'entries'} cost</dt>
            <dd className="mt-2 font-mono text-[1.75rem] leading-none md:text-[2rem]" data-odds-cost>
              {gbp(cost)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink/70">Worst-case odds</dt>
            <dd className="mt-2 font-mono text-[1.75rem] leading-none md:text-[2rem]" data-odds-result>
              {oddsForEntries(held, { cap })}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink/70">To {destination} causes</dt>
            <dd className="mt-2 font-mono text-[1.75rem] leading-none md:text-[2rem]" data-odds-giving>
              {gbpPence(giving)}
            </dd>
          </div>
        </dl>
      </div>
      <p className="mt-6 max-w-[40rem] text-base text-ink/70">
        Those are your worst-case odds with {count(held)} {held === 1 ? 'entry' : 'entries'}, if all {count(cap)} are taken. The cost takes the largest bundles first.
      </p>
    </div>
  );
}
