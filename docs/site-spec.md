# Trove site specification (v1, 2 Sep 2026)

Read with CLAUDE.md and config/prize.ts. This is the design plan and page standard.
Nothing here is a figure; every figure comes from config.

## 1. Sitemap

| Route | Purpose | Notes |
| --- | --- | --- |
| `/` | Home: hero for the open escape, why Trove exists, how it works, where the money goes, waitlist | Waitlist is the only CTA until entries open |
| `/escapes` | Index of escapes: open, coming, drawn | Also the SEO landing page for "win a holiday" searches |
| `/escapes/[slug]` | The standard escape page | One template, every escape identical in form |
| `/escapes/[slug]/winner` | Published result, draw record | After the draw only |
| `/how-it-works` | Enter, we draw, you escape; the cap, the odds, the postal route | Plain, factual |
| `/why` | About us, why we are doing this, the countryside and community hook | Prose and pictures |
| `/free-entry-by-post` | The free postal route | Plain, complete, easy to follow. See section 6 |
| `/legal/terms` | Full terms | Left contents column |
| `/legal/significant-conditions` | The one-click summary CAP 8.17 requires | Linked from every promotional surface |
| `/legal/playing-responsibly` | DCMS Voluntary Code controls, limits, suspension, closure, GamCare and GambleAware | Left contents column |
| `/legal/privacy`, `/legal/cookies`, `/legal/complaints` | | Left contents column |
| `/contact` | Email, postal address, response time | |
| `/journal` | Editorial: destinations, winners, where the money went | Later; SEO |

Header on every page: logo top left (icon plus wordmark, one link to `/`), hamburger top
right, nothing else. The menu is a full-screen overlay that lists the routes above in two
groups: escapes and information; legal in small type at the base.

Footer on every page: the compliance strip (18+, UK residents, free postal entry with
identical odds inside the same cap, significant conditions link), the DCMS signposting
line with GamCare and GambleAware, social slots, review slot, legal links.

## 2. Design plan for the home page and hero

### The brief in one line
Fun and high end at once, Rhode's ease and warmth, colour done professionally, with the
escape as the thing a lucky founding friend gets to live and post. The film sells the
escape; the words say exactly what it is and where the money goes.

### Palette (base tokens; the accent is per escape, from config)

| Token | Value | Use |
| --- | --- | --- |
| `--snow` | `#F2F3EF` | Page background. Cool, not cream |
| `--ink` | `#101214` | Text, the icon tile, primary button |
| `--moss` | `#3F5A3A` | Secondary surfaces, the charity section, footer |
| `--accent` | from `escape.theme.accent` | The ledger figure, the lit marks, and every "Secure your place" fill with ink text, the hero included. The header's stays outlined. Hampshire winter: rosehip `#D9455F` |
| `--film` | media only | Warm winter grade: low sun, long shadows, breath in the air, no midday blue |

Rules: the accent appears at most three times per viewport and never in the hero, where
the film carries all the colour and the text and button are snow. Colour lives in the
accent and the film; surfaces stay snow, ink and moss. No gradient washes on chrome.

### Type (provisional until the founder's references are in)

| Role | Face | Notes |
| --- | --- | --- |
| Display | Fraunces (variable, soft optical axis) | Headlines, the prize line. Playful without being cute |
| Body and UI | Geist Sans | Two weights, 400 and 500 |
| Ledger | Geist Mono | The entries ledger and the compliance strip only |

Numerals in body and UI are tabular. Headlines ragged left. No word-level emphasis inside
a headline; italic is a whole clause or nothing. Measure under 70 characters.

### The one memorable moment
The logo. On first paint the page is snow with the ink icon tile centred; the disc rises
through the ridgeline over ~900ms as the film fades in behind and the tile drifts to the
top left header position. Then the five hero lines settle in order, and the ledger types
its figures. Nothing else on the page animates on load. Reduced motion: film poster and
final positions, no sequence.

### Hero wireframe (desktop; mobile stacks the same order)

```
+------------------------------------------------------------------+
| [icon][Trove]                                            [ menu ] |
|                                                                    |
|   FILM (full bleed, silent, seamless loop, heavy scrim so snow     |
|   text reads over any frame; poster on first paint)                |
|                                                                    |
|              Win an escape to one of England’s       display, snow |
|                 finest country houses.               centred       |
|   Three nights for you and your plus one, and £1,600 in cash.     |
|   A £6,500 prize.                                     sans, snow   |
|         [ One guaranteed winner. 3,000 entries, never more. ]      |
|                     [ Join the waitlist ]            snow fill,    |
|                                                      ink text      |
|        Founding friends enter first, before the public.  sans 14   |
|                                                                    |
|                        ( scroll )            the scroll button     |
|  18+. UK residents. Free postal entry, identical odds, same cap.   |
|  Key terms.                                  mono 11, strip        |
+------------------------------------------------------------------+
```

One centred column, in this order: kicker, headline, sweetener with the cash line, trust
chip, button, the charity line beneath the button. Everything in snow over the film under
a heavy scrim. The accent does not appear in the hero.

Every figure in that wireframe is illustrative and is rendered from config. The venue is
not named until `venue.permissionGranted` is true; until then "one of England's finest
country houses". The scroll button from the previous site is carried over: a single
ink disc with a downward chevron, centred at the base of the hero, which scrolls to the
next section on click.

### The rhythm, in order
Ink, ink, snow, film, snow, snow, snow, film, moss:
1. **Hero** (ink over film). The mono kicker "Coming {month}." appears above the headline
   only once `cadence.announced` is set. The call to action fills with the escape's accent
   and ink text.
2. **The odds, in writing** (ink band). Three figures on one row, the cap, the worst-case
   odds and the giving share as a percentage, one-line captions, "Read the key terms." at
   the right. Stacks at 390.
3. **The destination** (snow). Kicker and headline; the venue unnamed until permitted.
4. **The reel** (film). Full-bleed licensed stills from `media.stills`, crossfade on a four
   second timer, arrows, dots, swipe on touch, pause on hover, static under reduced motion.
   No venue still until `venue.footageLicensed`. Placeholder frames of the montage until
   the Hampshire stills are licensed.
5. **The field** (snow), unchanged.
6. **The mission panel** (snow): a moss-tinted panel with a hairline and a 12px radius, the
   kicker, the statement at display size, the giving line with its figure in moss, and
   "Why Trove exists."
7. **Founding friends** (snow): kicker, "Become a founding friend.", two sentences, the form.
8. **Footer** (moss). Nothing sits between the founding friends form and the footer; the
   reel appears only where it belongs to a section.

Mono kickers sitewide are sentence case with a full stop, never caps. Nothing fades in on
scroll; the field draws in and that is all. Buttons: hover darkens, a press darkens more,
nothing fades. No pills, no arrows in buttons, no dashes.

### The finish

- **Rhythm.** One spacing scale in tokens (`--gutter`, `--space-strip`, `--space-section`,
  `--space-page-top`) and the classes on it (`section`, `section-half`, `section-strip`,
  `page`, `page-head`, `page-body`). Every section on every page uses one of them.
- **Reveals.** The only scroll reveal is the field. Nothing else fades, slides or scrubs on
  scroll.
- **Buttons.** Hover is a press darkening (`.btn`, brightness 0.9, 0.82 when pressed);
  nothing fades on hover.

## 3. The standard escape page (`/escapes/[slug]`)

The escape page sells the escape; the home page sells the proposition. Identical structure
for every escape so the template is the product:

1. Hero film. The headline is the destination ("Hampshire.") with the prize line beneath.
2. The prize strip: one mono row, ink on snow, a rule above and below, nights, guests,
   cash and prize value from config, two by two at 390. No icons.
3. What you win: the stay and the cash side by side with a vertical rule between, one
   still slot each, the cash as the single accent figure, "A cash alternative is
   available. Terms."
4. The destination in prose, then the captioned gallery: the reel, full-bleed on the
   rules. Each still may carry a title and one sentence from config over its lower third on
   a scrim; both are null until the founder writes them. Venue unnamed until permitted; no
   venue still until `venue.footageLicensed`.
5. Your odds (`#odds`): the field, "Not unlimited.", the ladder and the calculator as one.
6. Where the money goes, moss.
7. Enter: the bundles as plain options and the accent call to action. No countdown, no
   deadline, no "Enter now", no pills.
8. Free entry by post: one paragraph and the link.
9. Questions.
10. The compliance strip.

### Rules
One hairline (`--hairline`) in one colour (`--rule`, `--rule-on-ink`), through `rule-t`,
`rule-b` and `rule-l`. Sections are separated by full-width rules; where a section is two
columns a vertical rule stands between them; full-bleed images butt against the rules.

### The header
Exactly one fixed bar on the page, with two states. At the top: logo and wordmark left,
the nav in the centre, "Secure your place" outlined on the right. Once the hero (or the
page heading) has left the viewport: ink, the logo tile alone, the short prize line and
the worst-case odds in mono in the centre (entries taken against the cap once entries
open), the same call to action filled with the accent. A grid with fixed columns, so
nothing overlaps at any width: the odds drop first when the centre is tight, then the
prize line shortens to the value alone. Below 900px the bar carries the logo tile and the
nav trigger only. Nothing is ever fixed to the foot of the screen. No countdown, ever.

## 4. The escapes index (`/escapes`)

A vertical list, not a card grid. Each row: film still, destination, nights, prize value,
odds, status (open, coming, drawn), one line of the locality statement. Drawn escapes
show the winner's first name and county and link to the result page.

## 5. Legal pages

Two-column layout above 900px: a sticky contents column on the left generated from the
page's headings, the document on the right with a measure of 70 characters. Below 900px
the contents collapse to a "Contents" disclosure at the top. Documents live as MDX in
`content/legal/`. Terms carry over from drawtravel.com and are updated for Trove, the
config figures, the claim window and cash alternative, and the DCMS controls. Playing
responsibly covers the £250 monthly credit card cap, self-set limits, account suspension
and closure, and signposts GamCare and GambleAware.

## 6. Free entry by post

The page is plain, complete and easy to follow: what to write, where to send it, that
each postcard is one entry with identical odds inside the same cap, and when the route
closes (with the cap or longstop, never earlier). It is linked from the hero strip, the
escape page and the footer. Handling goes to a postal agent once volume warrants it.

## 7. Social and review slots

Footer carries slots for Instagram, TikTok and a review platform. Use each platform's
official brand assets from their brand resource pages once the accounts exist; until
then the slot renders the platform name in text. Nothing hand-drawn.

## 8. Imagery

Licensed footage and photography only. AI-generated imagery may be used for mood
(landscape, weather, table settings) but never to depict a real venue, a real person,
or anything that could be taken as the actual prize. No venue footage until licensed.
Film grade: warm winter, poster frame for first paint, scrim as a CSS layer.
