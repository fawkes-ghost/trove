'use client';

import { useState } from 'react';
import Link from 'next/link';
import { WaitlistLink } from '@/components/hero/WaitlistLink';

export type EntryOption = {
  entries: number;
  label: string; // "Three entries"
  price: string; // formatted on the server
  odds: string; // worst-case odds, formatted on the server
  causes: string; // the share to the destination for this choice, formatted on the server
};

type Props = {
  options: EntryOption[];
  open: boolean;
  postal: { href: string; line: string };
  // The entry flow, when it exists on this deployment. Open and live, the main button goes
  // there; on a preview a quiet link to it sits under the chooser.
  flow: { href: string; preview: boolean } | null;
};

// The entry choice as one decision: pick how many entries, see the price, the worst-case
// odds and what goes to the destination for that choice, then one call to action. The
// single entry is selected to begin with, so nothing nudges anyone towards spending more.
// The free postal route sits beside the paid options with the same weight, as the CAP code
// and the ASA expect. While the escape is not open the action is the waitlist, and the
// page says so. Values only: every string is built on the server from config.
export function EntryChooser({ options, open, postal, flow }: Props) {
  const [selected, setSelected] = useState(0);
  const choice = options[selected];

  return (
    <div className="mt-10 grid gap-4 min-[900px]:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] min-[900px]:gap-6">
      <fieldset className="rounded-3xl border border-ink/15 bg-cloud p-4 md:p-6" data-entry-chooser>
        <legend className="sr-only">How many entries</legend>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {options.map((option, index) => {
            const active = index === selected;
            return (
              <label
                key={option.entries}
                className={`relative flex cursor-pointer flex-col gap-1 rounded-2xl border-2 bg-snow px-4 py-3.5 transition-colors ${active ? 'border-sun' : 'border-transparent hover:border-mist'}`}
                data-entry-option={option.entries}
              >
                <input type="radio" name="entries" value={option.entries} checked={active} onChange={() => setSelected(index)} className="sr-only" />
                <span className="text-base font-medium">{option.label}</span>
                <span className="display text-[1.75rem] leading-none">{option.price}</span>
                <span className="text-sm text-ink/70">Worst case {option.odds}</span>
                {active ? <span aria-hidden="true" className="absolute top-3.5 right-3.5 h-3 w-3 rounded-full bg-sun" /> : null}
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-base" aria-live="polite" data-entry-summary>
            {choice.label} for {choice.price}. Worst-case odds {choice.odds}. {choice.causes}.
          </p>
          {open && flow && !flow.preview ? (
            <Link href={`${flow.href}?entries=${choice.entries}`} className="btn inline-flex h-12 shrink-0 items-center justify-center bg-sun px-7 text-base font-medium text-ink">
              Enter
            </Link>
          ) : open ? (
            <button type="button" disabled className="btn h-12 shrink-0 bg-sun px-7 text-base font-medium text-ink disabled:opacity-60">
              Enter
            </button>
          ) : (
            <WaitlistLink className="btn inline-flex h-12 shrink-0 items-center justify-center bg-sun px-7 text-base font-medium text-ink">Secure your place</WaitlistLink>
          )}
        </div>
        {!open ? <p className="mt-3 text-sm text-ink/70">Entries are not open yet. Founding friends hear first, and enter before the public.</p> : null}
        {flow?.preview ? (
          <p className="mt-2 text-sm" data-flow-preview-link>
            <Link href={`${flow.href}?entries=${choice.entries}`} className="underline underline-offset-4">
              Preview the entry flow
            </Link>{' '}
            <span className="text-ink/70">(preview deployments only, no payment taken)</span>
          </p>
        ) : null}
      </fieldset>

      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-ink/15 p-4 md:p-6" data-entry-postal>
        <div className="flex flex-col gap-2">
          <p className="text-base font-medium">One free entry by post</p>
          <p className="display text-[1.75rem] leading-none">Free</p>
          <p className="text-base text-ink/80">{postal.line}</p>
        </div>
        <Link href={postal.href} className="btn inline-flex h-12 items-center justify-center border border-ink/25 px-6 text-base font-medium hover:border-ink">
          How to enter by post
        </Link>
      </div>
    </div>
  );
}
