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

// The entry choice as one decision, set as ruled rows on the sheet: pick how many entries,
// see the price and the worst-case odds on the row, and what goes to the destination for
// that choice beneath, then one call to action. The single entry is selected to begin with,
// so nothing nudges anyone towards spending more. The free postal route is the last row, in
// the same type and the same columns as the paid ones, as the CAP code and the ASA expect.
// While the escape is not open the action is the waitlist, and the sheet says so. Values
// only: every string is built on the server from config.
const ROW = 'grid grid-cols-[1.125rem_minmax(0,1fr)_auto] items-baseline gap-x-4 gap-y-1 rule-t py-5 sm:grid-cols-[1.125rem_minmax(0,13rem)_minmax(0,1fr)_auto] sm:gap-x-6';
const DETAIL = 'col-span-2 col-start-2 row-start-2 text-base text-ink/70 sm:col-span-1 sm:col-start-3 sm:row-start-1';
const PRICE = 'display col-start-3 row-start-1 text-[1.75rem] sm:col-start-4';

export function EntryChooser({ options, open, postal, flow }: Props) {
  const [selected, setSelected] = useState(0);
  const choice = options[selected];

  return (
    <div className="mt-10">
      <fieldset className="m-0 min-w-0 border-0 p-0" data-entry-chooser>
        <legend className="sr-only">How many entries</legend>
        {options.map((option, index) => {
          const active = index === selected;
          return (
            <label
              key={option.entries}
              className={`${ROW} cursor-pointer has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-ink`}
              data-entry-option={option.entries}
              data-active={active ? '' : undefined}
            >
              <input type="radio" name="entries" value={option.entries} checked={active} onChange={() => setSelected(index)} className="sr-only" />
              <span aria-hidden="true" className={`col-start-1 row-start-1 h-[1.125rem] w-[1.125rem] translate-y-[0.15em] rounded-full border ${active ? 'border-ink bg-sun' : 'border-ink/40'}`} />
              <span className="col-start-2 row-start-1 text-lg font-medium">{option.label}</span>
              <span className={DETAIL}>At least {option.odds}</span>
              <span className={PRICE}>{option.price}</span>
            </label>
          );
        })}
      </fieldset>
      <div className={ROW} data-entry-postal>
        <p className="col-start-2 row-start-1 text-lg font-medium">One free entry by post</p>
        <p className={DETAIL}>
          {postal.line}{' '}
          <Link href={postal.href} className="link-quiet text-ink">
            How to enter by post
          </Link>
          .
        </p>
        <p className={PRICE}>Free</p>
      </div>

      <div className="rule-t flex flex-col gap-5 pt-6 md:flex-row md:items-center md:justify-between md:gap-10">
        <p className="max-w-[34rem] text-base" aria-live="polite" data-entry-summary>
          {choice.label} for {choice.price}. Your chance is at least {choice.odds}. {choice.causes}.
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
      {!open ? <p className="mt-4 text-sm text-ink/70">Entries aren’t open yet. Founding friends hear first, and enter before the public.</p> : null}
      {flow?.preview ? (
        <p className="mt-2 text-sm" data-flow-preview-link>
          <Link href={`${flow.href}?entries=${choice.entries}`} className="link-quiet">
            Preview the entry flow
          </Link>{' '}
          <span className="text-ink/70">(preview deployments only, no payment taken)</span>
        </p>
      ) : null}
    </div>
  );
}
