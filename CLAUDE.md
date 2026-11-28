# Trove: instructions for every Claude Code session

Trove is a UK luxury travel prize draw. One prize per draw, called an escape. Fifteen
per cent of gross entry sales funds community and countryside causes at the destination.
That is the point of the business, not a feature. Everything on the site serves it.

Source of truth for numbers: Notion, DRAW Headquarters, page 19 (CFO model and draw
config). Source of truth in code: `config/prize.ts`. If you change one, say so in the
PR so the other is updated the same day.

## Rules that never bend

1. **No figure in copy or components.** Prize value, nights, entry price, bundles, cap,
   odds, charity share, destination and cadence are read from `config/prize.ts`. Before
   opening a PR run `grep -rnE "£|1 in [0-9]|[0-9],[0-9]{3}" app components` and justify
   every hit. `assertEscape()` runs in `next.config` at build and must pass.
2. **Compliance canon.** Free postal entry with identical odds inside the same cap.
   18+, UK residents. Significant conditions one click from every promotional surface
   (link to `/legal/significant-conditions`). Never publish a closing date and then extend it: the draw closes
   at the cap or the longstop, whichever is first, and the longstop is set once. No venue
   named and no venue footage used until `venue.permissionGranted` and
   `venue.footageLicensed` are true. No charity named until `charity.beneficiary` is set.
   "One winner is guaranteed" only while `compliance.noRollover` is true. DCMS Voluntary
   Code: £250 per month credit card cap, self-set limits, account suspension and closure,
   GamCare and GambleAware signposting.
3. **Copy conventions.** Full stops on headlines. No exclamation marks. No em or en
   dashes; use commas, colons and full stops. Typographic apostrophes and quotes
   (’ “ ”), never straight ones. Sentence case everywhere, including
   buttons. "Entries" not "tickets". "Founding friends" not "members". "Escape" not
   stay, holiday, vacation. Draws are named by destination and never numbered, in copy,
   routes, filenames and commit messages. No countdown timers, no "win now", no
   strikethrough pricing. Plain and specific: the imagery carries the aspiration, the
   words carry the facts. Write it the way a person would say it to a customer: a heading
   never describes the copy under it (no "in writing", "in plain words"). The cash
   alternative amount appears only in the terms and key terms. Company details (name,
   number, Companies House) sit in the footer, never in page copy.
4. **The logo is trove X** (chosen 21 November 2026): bold lowercase "trove" with a gold
   X as the full stop. Masters are in the project's `brand-round-seven/trove-x-logo-kit/`.
   Wordmark and icon SVGs live in `public/brand/` and are used as inline SVG. Do not
   redraw them. Every colourway and platform size is in `brand/kit`, rebuilt from those
   two drawings by the scripts in `brand/build`; `brand/README.md` links the brand book. Never use the X on its own as an icon or avatar: alone it reads as the
   X (Twitter) logo.
5. **Client components receive values, never the config object.** A client component
   that takes `escape` serialises every config field into the page payload, including
   fields not rendered in copy.

## Design direction (new, not frozen)

Modern, not flat. Motion is integrated into the code, not applied as a transition
library afterthought. Reference: spacetime.nl, where the motion is the site. Trove
differs in one way: it must also deliver facts (prize, price, odds, where the money
goes), so motion carries the visitor to the facts and then gets out of the way.

- Luxury, serif led and photo first since 28 November 2026 (PRs 89 to 95). The
  references are Black Tomato, Aman, Four Seasons and Nihi: room, calm motion, the
  photograph doing the selling.
- One memorable moment per page. On the home page it is the chance of winning, said once
  and calmly in Newsreader 300 under the tagline, with “Unlimited entries.” struck out in
  gold once and replaced by the cap. It is not shouted: no screen-wide number, no gold box.
- Two voices. Newsreader says things: headlines at 400, the chance at 300. DM Sans carries
  everything else at ordinary weights. No monospace. The gold is a highlighter for
  promises: the call to action pill, the strike through “Unlimited entries.”.
- Words: luxury prose, plain facts. Brand and escape prose is warm, unhurried, editorial
  full sentences (place or season first, one true detail, long then short); figures,
  chance, cap, 18+, postal entry and key terms stay plain and exact. No stacked fragments,
  no triads, no “not just X”, none of quiet, beautiful, nestled, curated, sanctuary,
  remarkable. Never describe a prize feature the terms don’t promise. The tone guide is
  the Claude Doc “Trove voice: luxury prose, plain facts”.
- The house everywhere: moderate serif headings, small sentence case labels, hairlines,
  plain text links, photographs as plates with captions beneath. Trust is the rules of the
  draw ("How we keep it fair."). No badge, logo row or testimonial until it is real.
- Respect `prefers-reduced-motion` with a still version of every moment.
- Photography and film do the selling. Licensed footage only. No AI-generated venue
  imagery, ever.
- Write a short plan (layout as an ASCII wireframe, the one moment, type, palette)
  before writing UI code, and ask whether the plan could have been produced for any
  luxury brief. If yes, change it.

## Stack

- Next.js App Router, TypeScript, Tailwind. Every marketing page server-rendered.
- Motion: Framer Motion for component state, GSAP with ScrollTrigger for scroll-driven
  sequences, Lenis for smooth scroll. Three.js / react-three-fiber only if the hero
  genuinely needs WebGL; justify it in the PR.
- Supabase project `uvnhwgbqmwzzdvxxdgzm` is the backend. The waitlist table, auth,
  `waitlist-signup` edge function and media bucket are not modified from this repo.
- Resend for email, sent only by the Supabase edge functions in the `trove-backend`
  repository: the confirmation email (`waitlist-signup`) and the one email on the day
  entries open (`waitlist-entries-open`, which needs a send approved by hand and refuses
  to send until the entry page is live). This repo sends no mail. The confirm and
  unsubscribe pages here POST to those functions. GA4 `G-D22MTTKX1B`, consent-gated, no
  tag before consent.
- The site has been public since 23 November 2026. Anything merged to `main` is live
  within a minute. `main` needs a branch to be up to date before it merges.
- Payments: Stripe in test mode until the company and processor onboarding exist.

## Workflow

- One scoped task per branch, named for the task, never for a draw number.
- Every branch gets a Vercel preview. Nothing merges to `main` without: desktop and
  390px mobile screenshots in the PR, the grep in rule 1, the build passing
  `assertEscape()`, and one sentence naming the memorable element the page spends
  its boldness on.
- Keep PRs small. If a task grows, split the branch.

## Build order

0. `scaffold`: Next.js app, Tailwind, `config/prize.ts`, brand SVGs, fonts, GitHub
   connected to Vercel, preview deploys working, this file in root.
1. `hero-and-ledger`: home page hero reading from config, the logo moment, the live
   entries ledger component (static data for now), compliance strip, terms link.
2. `waitlist`: waitlist form calling the existing edge function, Resend confirmation,
   GA4 consent banner.
3. `escape-page`: the Hampshire escape page, prize components, how the draw works,
   where the money goes, worst-case odds.
4. `terms-and-controls`: significant conditions, full terms, postal entry route page,
   DCMS controls (limits, suspension, closure, signposting). Needed before the
   solicitor's opinion and Meta RMG application.
5. `entry-flow`: bundles, Stripe test checkout, ledger write, receipts.
6. `draw`: auditable draw mechanism, winner record, published result page.
