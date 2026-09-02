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
   (link to `/terms`). Never publish a closing date and then extend it: the draw closes
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
   words carry the facts.
4. **The logo is kept.** Wordmark and icon SVGs live in `public/brand/` and are used
   as inline SVG so they can animate. Do not redraw them.

## Design direction (new, not frozen)

Modern, not flat. Motion is integrated into the code, not applied as a transition
library afterthought. Reference: spacetime.nl, where the motion is the site. Trove
differs in one way: it must also deliver facts (prize, price, odds, where the money
goes), so motion carries the visitor to the facts and then gets out of the way.

- One memorable moment per page. On the home page it is the logo: the disc rises
  through the ridgeline on first paint as the film brightens, then the ledger types in.
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
- Resend for transactional email. GA4 `G-D22MTTKX1B`, consent-gated, no tag before
  consent.
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
