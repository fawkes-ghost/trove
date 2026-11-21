'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { ShareButton } from '@/components/share/ShareButton';

export type FlowOption = {
  entries: number;
  label: string; // "Three entries"
  price: string; // formatted on the server
  odds: string; // worst-case odds, formatted on the server
  causes: string; // what this choice gives to the destination, formatted on the server
};

type Props = {
  preview: boolean;
  escapeHref: string;
  destination: string;
  options: FlowOption[];
  start: number;
  facts: { cap: string; maxPerPerson: string; share: string; creditCardCap: string; minimumAge: number; residency: string };
  links: { postal: string; keyTerms: string; terms: string; privacy: string; playingResponsibly: string; signposting: { label: string; href: string }[] };
  share: { title: string; text: string; url: string };
};

type Step = 'choose' | 'details' | 'pay' | 'done';
type Details = { first: string; last: string; email: string; mobile: string; dob: string; postcode: string; declared: boolean; emailNews: boolean; textNews: boolean };
type Errors = Partial<Record<keyof Details, string>>;

const empty: Details = { first: '', last: '', email: '', mobile: '', dob: '', postcode: '', declared: false, emailNews: false, textNews: false };
const heardAbout = ['TikTok', 'Instagram', 'A friend', 'Search', 'Podcast or press', 'An ad elsewhere', 'Somewhere else'];

function ageOn(dob: string, today = new Date()): number | null {
  const date = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  let age = today.getFullYear() - date.getFullYear();
  const beforeBirthday = today.getMonth() < date.getMonth() || (today.getMonth() === date.getMonth() && today.getDate() < date.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

function check(details: Details, minimumAge: number): Errors {
  const errors: Errors = {};
  if (!details.first.trim()) errors.first = 'Enter your first name.';
  if (!details.last.trim()) errors.last = 'Enter your last name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email.trim())) errors.email = 'Enter an email address, like name@example.com.';
  if (!/^(?:\+447|07)\d{9}$/.test(details.mobile.replace(/[\s()-]/g, ''))) errors.mobile = 'Enter a UK mobile number, like 07700 900123.';
  const age = ageOn(details.dob);
  if (age === null) errors.dob = 'Enter your date of birth.';
  else if (age < minimumAge) errors.dob = `You need to be ${minimumAge} or over to enter.`;
  if (!/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i.test(details.postcode.trim())) errors.postcode = 'Enter a UK postcode, like SW4 7TB.';
  if (!details.declared) errors.declared = 'Tick to confirm before you continue.';
  return errors;
}

// The entry flow, phone first, in four steps: choose, about you (which is also the account,
// with no password), check and pay, and the confirmation. Values only: every string with a
// figure arrives formatted from the server. Nothing here is sent anywhere. The details stay
// in this component's memory, the payment step has no provider behind it, and on a preview
// the screens say so.
export function EntryFlow({ preview, escapeHref, destination, options, start, facts, links, share }: Props) {
  const [step, setStep] = useState<Step>('choose');
  const [picked, setPicked] = useState(start);
  const [details, setDetails] = useState<Details>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [heard, setHeard] = useState<number>(-1);
  const top = useRef<HTMLDivElement>(null);
  const choice = options[picked];

  useEffect(() => {
    top.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [step]);

  const stepNumber = step === 'choose' ? 1 : step === 'details' ? 2 : 3;

  function field(name: keyof Details) {
    return {
      id: `entry-${name}`,
      name,
      value: details[name] as string,
      onChange: (event: { target: { value: string } }) => setDetails((current) => ({ ...current, [name]: event.target.value })),
      'aria-invalid': errors[name] ? true : undefined,
      'aria-describedby': `entry-${name}-help`,
    };
  }

  function submitDetails(event: FormEvent) {
    event.preventDefault();
    const found = check(details, facts.minimumAge);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      document.getElementById(`entry-${firstError}`)?.focus();
      return;
    }
    setStep('pay');
  }

  const strip = (
    <p className="rule-t mt-10 pt-3 font-mono text-[11px] leading-relaxed text-ink/75">
      Open to {facts.residency} residents aged {facts.minimumAge} or over.{' '}
      <Link href={links.postal} className="underline underline-offset-4">
        Free entry by post
      </Link>{' '}
      gives the same chance of winning. Read the{' '}
      <Link href={links.keyTerms} className="underline underline-offset-4">
        key terms
      </Link>
      .
    </p>
  );

  return (
    <main className="px-6 pt-24 pb-16 md:px-10 md:pt-28">
      <div ref={top} tabIndex={-1} className="mx-auto max-w-[34rem] outline-none" data-entry-flow={step}>
        {preview ? (
          <p className="mb-6 rounded-2xl bg-cloud px-4 py-3 text-sm" data-flow-preview>
            <strong className="font-semibold">Preview.</strong> Entries are not open. Nothing you type here is saved or sent, and no payment can be taken.
          </p>
        ) : null}

        {step !== 'done' ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              {step === 'choose' ? (
                <Link href={escapeHref} className="inline-flex min-h-11 items-center gap-1.5 text-base">
                  <span aria-hidden="true">←</span> Back
                </Link>
              ) : (
                <button type="button" onClick={() => setStep(step === 'pay' ? 'details' : 'choose')} className="inline-flex min-h-11 items-center gap-1.5 text-base">
                  <span aria-hidden="true">←</span> Back
                </button>
              )}
              <p className="font-mono text-xs text-ink/70">Step {stepNumber} of 3</p>
            </div>
            <div className="grid grid-cols-3 gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((n) => (
                <span key={n} className={`h-1 rounded-full ${n <= stepNumber ? 'bg-sun' : 'bg-mist'}`} />
              ))}
            </div>
          </div>
        ) : null}

        {step === 'choose' ? (
          <section className="mt-6 flex flex-col gap-5">
            <h1 className="display text-[2rem] leading-tight">Choose your entries.</h1>
            <p className="text-base text-ink/80">
              There are never more than {facts.cap} entries in the {destination} draw. If fewer sell, your chance gets better.
            </p>
            <fieldset className="flex flex-col gap-2.5">
              <legend className="sr-only">Number of entries</legend>
              {options.map((option, index) => {
                const on = index === picked;
                return (
                  <label key={option.entries} className={`flex cursor-pointer items-center gap-4 rounded-2xl border-2 px-4 py-3.5 ${on ? 'border-ink bg-cloud' : 'border-mist bg-snow hover:border-ink/40'}`}>
                    <input type="radio" name="entries" checked={on} onChange={() => setPicked(index)} className="sr-only" />
                    <span aria-hidden="true" className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink">
                      {on ? <span className="h-3 w-3 rounded-full bg-sun" /> : null}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-base font-semibold">{option.label}</span>
                      <span className="font-mono text-xs text-ink/70">At least {option.odds}</span>
                    </span>
                    <span className="font-mono text-base">{option.price}</span>
                  </label>
                );
              })}
            </fieldset>
            <p className="font-mono text-xs leading-relaxed text-ink/70">Each person can have up to {facts.maxPerPerson} entries in this draw, online and by post together.</p>
            <p className="text-sm">
              Prices include VAT. {facts.share} of what you pay goes to charities in {destination}: {choice.causes} for this choice.
            </p>
            <button type="button" onClick={() => setStep('details')} className="btn min-h-[52px] bg-ink text-base font-semibold text-snow hover:bg-loch">
              Continue
            </button>
            <p className="text-center text-sm">
              Rather not pay?{' '}
              <Link href={links.postal} className="underline underline-offset-4">
                Enter free by post
              </Link>
              , same odds.
            </p>
          </section>
        ) : null}

        {step === 'details' ? (
          <form noValidate onSubmit={submitDetails} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="display text-[2rem] leading-tight">About you.</h1>
              <p className="text-[15px] text-ink/80">This also makes your Trove account, where your entries and limits live. There is no password: we email you a sign-in link.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" name="first" error={errors.first}>
                <input {...field('first')} autoComplete="given-name" className="field-input" />
              </Field>
              <Field label="Last name" name="last" error={errors.last}>
                <input {...field('last')} autoComplete="family-name" className="field-input" />
              </Field>
            </div>
            <Field label="Email" name="email" help="Your entry numbers, receipt and sign-in link go here." error={errors.email}>
              <input {...field('email')} type="email" inputMode="email" autoComplete="email" className="field-input" />
            </Field>
            <Field label="Mobile" name="mobile" help="So we can call you if you win." error={errors.mobile}>
              <input {...field('mobile')} type="tel" inputMode="tel" autoComplete="tel" className="field-input" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date of birth" name="dob" help={`Entrants must be ${facts.minimumAge} or over.`} error={errors.dob}>
                <input {...field('dob')} type="date" autoComplete="bday" className="field-input" />
              </Field>
              <Field label="Postcode" name="postcode" help="The draw is for UK residents." error={errors.postcode}>
                <input {...field('postcode')} autoComplete="postal-code" autoCapitalize="characters" className="field-input" />
              </Field>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-start gap-3 text-sm leading-snug">
                <input
                  id="entry-declared"
                  type="checkbox"
                  checked={details.declared}
                  onChange={(event) => setDetails((current) => ({ ...current, declared: event.target.checked }))}
                  aria-invalid={errors.declared ? true : undefined}
                  aria-describedby="entry-declared-help"
                  className="mt-0.5 h-[22px] w-[22px] shrink-0 accent-[#1F3A33]"
                />
                <span>
                  I am {facts.minimumAge} or over, I live in the UK, and I accept the{' '}
                  <Link href={links.terms} className="underline underline-offset-4">
                    terms
                  </Link>{' '}
                  and{' '}
                  <Link href={links.keyTerms} className="underline underline-offset-4">
                    key terms
                  </Link>
                  .
                </span>
              </label>
              <p id="entry-declared-help" className="pl-[34px] text-sm text-[#9A3412]">
                {errors.declared ?? ''}
              </p>
            </div>
            <fieldset className="rule-t flex flex-col gap-3 pt-4">
              <legend className="pt-4 text-sm font-semibold">News from Trove, if you want it</legend>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={details.emailNews} onChange={(event) => setDetails((current) => ({ ...current, emailNews: event.target.checked }))} className="mt-0.5 h-[22px] w-[22px] shrink-0 accent-[#1F3A33]" />
                <span>Email me when a new escape opens.</span>
              </label>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={details.textNews} onChange={(event) => setDetails((current) => ({ ...current, textNews: event.target.checked }))} className="mt-0.5 h-[22px] w-[22px] shrink-0 accent-[#1F3A33]" />
                <span>Text me when a new escape opens.</span>
              </label>
              <p className="text-[13px] text-ink/70">
                Both are optional and you can stop either at any time. Your details are used as our{' '}
                <Link href={links.privacy} className="underline underline-offset-4">
                  privacy notice
                </Link>{' '}
                explains.
              </p>
            </fieldset>
            <button type="submit" className="btn min-h-[52px] bg-ink text-base font-semibold text-snow hover:bg-loch">
              Continue to payment
            </button>
          </form>
        ) : null}

        {step === 'pay' ? (
          <section className="mt-6 flex flex-col gap-4">
            <h1 className="display text-[2rem] leading-tight">Check and pay.</h1>
            <dl className="flex flex-col gap-2 rounded-2xl bg-cloud px-4 py-4 text-sm">
              <Row term="Draw" value={destination} />
              <Row term="Entries" value={choice.label} />
              <Row term="Your chance, at least" value={choice.odds} />
              <div className="rule-t mt-1 flex justify-between gap-3 pt-2 text-base">
                <dt className="font-semibold">Total, VAT included</dt>
                <dd className="font-mono">{choice.price}</dd>
              </div>
              <p className="text-[13px] text-ink/75">
                {choice.causes} of this goes to charities in {destination}.
              </p>
            </dl>
            <div className="flex flex-col gap-2" aria-label="Payment">
              <p className="rounded-2xl border border-dashed border-mist px-4 py-4 text-sm text-ink/75">
                Apple Pay, Google Pay and card fields appear here, supplied by our payment provider, so your card details never reach Trove.
              </p>
            </div>
            <p className="text-[13px] text-ink/75">Credit card spending with Trove is capped at {facts.creditCardCap} a month. Debit cards are not affected.</p>
            <button type="button" disabled className="btn min-h-[52px] bg-ink text-base font-semibold text-snow disabled:opacity-50">
              Pay {choice.price}
            </button>
            <p className="text-center text-[13px] text-ink/75">{preview ? 'Payment is not switched on in this preview.' : 'Your entry numbers are given once payment clears.'}</p>
            {preview ? (
              <button type="button" onClick={() => setStep('done')} className="btn min-h-12 border border-ink/60 text-base font-medium">
                See the confirmation screen
              </button>
            ) : null}
          </section>
        ) : null}

        {step === 'done' ? (
          <section className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl bg-loch px-5 py-6 text-snow">
              <span aria-hidden="true" className="absolute -top-12 -right-8 h-28 w-28 rounded-full bg-sun" />
              <h1 className="display relative text-[2rem] leading-tight">You are in the draw.</h1>
              <p className="relative mt-3 text-[15px] text-snow/90">
                {choice.label} in the {destination} draw. Your entry numbers appear here, and in your account, once payment clears.
              </p>
              <p className="relative mt-3 font-mono text-xs leading-relaxed text-snow/85">Your chance is at least {choice.odds}. We draw the winner when all the entries have gone or on the closing date, whichever comes first.</p>
            </div>
            <p className="text-sm">We email your receipt and a link to confirm your account.</p>
            <fieldset className="flex flex-col gap-3">
              <legend className="mb-1 text-base font-semibold">One quick question. How did you first hear about Trove?</legend>
              <div className="flex flex-wrap gap-2">
                {heardAbout.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={heard === index}
                    onClick={() => setHeard(heard === index ? -1 : index)}
                    className={`min-h-11 rounded-full border-[1.5px] px-4 text-sm ${heard === index ? 'border-ink bg-ink text-snow' : 'border-mist'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[13px] text-ink/70">Optional. It helps us spend less on ads.</p>
            </fieldset>
            <div className="flex flex-col gap-2 rounded-2xl border-[1.5px] border-mist px-4 py-4">
              <p className="text-base font-semibold">Set a monthly limit, if you like.</p>
              <p className="text-sm text-ink/75">You choose the most you can spend with Trove each month, including nothing at all. If you skip this, we ask before your next order.</p>
              <Link href={links.playingResponsibly} className="btn mt-1 inline-flex min-h-12 items-center justify-center border-[1.5px] border-ink text-base font-medium">
                Set a limit
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold">Tell your plus one.</p>
              <ShareButton {...share} placement="confirmation" className="min-h-12 w-full border-[1.5px] border-ink text-base font-medium" />
            </div>
            <p className="text-sm text-ink/75">
              Worried about spending?{' '}
              {links.signposting.map((item, index) => (
                <span key={item.href}>
                  <a href={item.href} rel="noopener" className="underline underline-offset-4">
                    {item.label}
                  </a>
                  {index < links.signposting.length - 1 ? ' and ' : '.'}
                </span>
              ))}
            </p>
          </section>
        ) : null}

        {strip}
      </div>
    </main>
  );
}

function Field({ label, name, help, error, children }: { label: string; name: string; help?: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <label htmlFor={`entry-${name}`} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      <p id={`entry-${name}-help`} className={`text-[13px] leading-snug ${error ? 'text-[#9A3412]' : 'text-ink/70'}`}>
        {error ?? help ?? ''}
      </p>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink/75">{term}</dt>
      <dd className="text-right font-mono">{value}</dd>
    </div>
  );
}
