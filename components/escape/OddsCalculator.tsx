'use client';

import { useId, useState } from 'react';
import { oddsForEntries } from '@/lib/odds';
import { count } from '@/lib/format';

// The visitor sets a number of entries, up to the per-person limit, and sees the worst-case
// odds. This is a client component, so it takes the two numbers it needs rather than the
// config object: nothing else in config reaches the browser from here.
export function OddsCalculator({ cap, maxPerPerson }: { cap: number; maxPerPerson: number }) {
  const [entries, setEntries] = useState(1);
  const id = useId();
  const held = Math.min(Math.max(entries || 1, 1), maxPerPerson);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-8" data-odds-calculator>
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
      <p className="text-base">
        <span className="font-mono text-[1.75rem] leading-none md:text-[2rem]" data-odds-result>
          {oddsForEntries(held, { cap })}
        </span>
        <span className="mt-2 block text-ink/70">
          Those are your worst-case odds with {count(held)} {held === 1 ? 'entry' : 'entries'}, if all {count(cap)} are taken.
        </span>
      </p>
    </div>
  );
}
