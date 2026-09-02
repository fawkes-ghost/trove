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
| `--accent` | from `escape.theme.accent` | The ledger figure and buttons outside the hero. Never in the hero, where the button is snow with ink text. Hampshire winter: rosehip `#D9455F` |
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
|                     Your chance to win               kicker, sans  |
|                A long weekend at one of              display, snow |
|             England’s finest country houses.         centred       |
|   Three nights, breakfast, and £1,300 in cash. A £4,000 prize.     |
|      [ One winner is guaranteed. Entries are capped at 3,000. ]    |
|                     [ Join the waitlist ]            snow fill,    |
|                                                      ink text      |
|        Fifteen pence in every pound goes to community              |
|        and countryside causes in Hampshire.          sans 14, snow |
|                                                                    |
|                        ( scroll )            the scroll button     |
|  18+. UK residents. Free postal entry, identical odds, same cap.   |
|  Significant conditions.                     mono 11, strip        |
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

### Below the hero, in order
1. **The ledger.** Entries taken against the cap, live once entries open; the worst-case
   odds beside it. Mono. This is the honesty device; give it room.
2. **What you win.** The prize components from config, each with one photograph.
   The cash line is explicit. Cash alternative and claim window in one sentence with a
   link to terms.
3. **Where the money goes.** Moss section. The 15% stated as pence in the pound, the
   locality statement from config, no charity named until cleared. One photograph of
   the countryside, not the venue.
4. **How it works.** Three steps, because it is literally a sequence: enter, we draw,
   you escape. Postal route linked from step one.
5. **Why Trove.** Two paragraphs from the founder's voice and one portrait or landscape.
6. **Waitlist.** The form again, with the founding friends count if we choose to show it.
7. Footer.

### Review against the generic default
The default for this brief would be cream, a high-contrast serif, a terracotta accent and
identical rounded cards. This plan uses a cool snow base, a soft variable serif, a
per-escape accent chosen from the destination, and sections that are prose and pictures
with the ledger as the only "component". The one moment is the logo, which is ours.

## 3. The standard escape page (`/escapes/[slug]`)

Identical structure for every escape so the template is the product:

1. Hero film and the five lines (as home).
2. The ledger and the odds.
3. What you win, with the cash line and the cash alternative sentence.
4. The destination, in pictures and 150 words. Venue unnamed until permitted.
5. Where the money goes, with the locality statement.
6. Enter: the bundles from config as three plain options, no strikethrough, no "best
   value" badge. Disabled and labelled "Join the waitlist" until the escape opens.
7. Free entry by post: one paragraph and the link.
8. Questions: eight to ten, answered plainly.
9. Significant conditions strip.

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
