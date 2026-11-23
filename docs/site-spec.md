# Trove site specification (v2, 23 Nov 2026)

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

### Palette

| Token | Value | Use |
| --- | --- | --- |
| `--snow` | `#F7F8F5` | Page background. Cool daylight, not cream |
| `--cloud` | `#EEF0EA` | The alternate band |
| `--ink` | `#142520` | Text. Deep loch, never pure black |
| `--loch` | `#1F3A33` | The few dark blocks, the footer |
| `--sun` | `#E9A23B` | The gold. A fill only, with ink on it, never gold text on a light ground |
| `--film` | media only | Warm winter grade: low sun, long shadows, breath in the air, no midday blue |

The gold is the highlighter. It marks what Trove promises and nothing else: the call to
action, the box behind the cap in the hero, the line drawn under a figure, the ribbon, the
founding friend sticker. Surfaces stay snow, cloud, ink and loch. No gradient washes on
chrome.

### Type: two voices

| Voice | Face | Notes |
| --- | --- | --- |
| What the site says | Newsreader 400, optical size following the font size | Headlines, the prize sentence, pull lines. Class `display` |
| What the site promises | DM Sans 800 | The numbers the draw stands on: the chance, the cap, the giving share, the ledger figure. Class `figure`; `figure-marked` draws the gold line under it, `mark-box` sets it ink on gold |
| Everything else | DM Sans 400, 500 and 700 | Body, navigation, forms, kickers, the compliance strip, the ribbon |

There is no monospace anywhere. A number in running text takes the face around it;
numerals are tabular. Only a figure the draw stands on takes the heavy sans, and only where
it is the point of the block, so a page never shouts twice in one screen. Headlines ragged
left. No word-level emphasis inside a headline; italic is a whole clause or nothing.
Measure under 70 characters.

### The one memorable moment
The number. The chance of winning is the largest thing on the page, as wide as the screen,
in the heavy sans over the film: the one thing no other prize draw can put in its hero,
because theirs has no cap. Beneath it, once, on arrival, “Unlimited entries.” is struck out
in gold and gives way to the cap. Then the prize sentence and the email field, so the first
screen is the whole proposition and the whole action. Nothing else on the page competes
with it. Reduced motion: the promise is in place from first paint and the struck line
never shows.

### Hero wireframe (desktop; below 900px the lower half is one column, in the same order)

```
+------------------------------------------------------------------+
| [trove x]          nav                  [Secure your place] [menu] |
|                                                                    |
|   FILM (full bleed, silent, seamless loop; scrim from the foot     |
|   and the left so snow reads over any frame; poster first)         |
|                                                                    |
|  Your chance of winning is at least               sans 500, snow   |
|  1 in 3,000.                                      sans 800, as     |
|                                                   wide as the page |
|  [3,000] entries. Never more.       [ Your email address        ]  |
|  Win three nights at one of         [ Secure your place         ]  |
|  England’s finest country houses,   18+. UK residents. Free entry  |
|  and £1,600 in cash.                by post. Key terms.            |
|   serif, the page’s h1               the form and the strip        |
+------------------------------------------------------------------+
|/ 3,000 entries. Never more. • One winner guaranteed. • Free entry /|
+------------------------------------------------------------------+
        the ribbon: gold, tilted, looping, ink discs between
```

In order: the kicker, the number, the twist line with the cap in a gold box, the prize
sentence (the page’s one `h1`), the email field and its button, the compliance strip, then
the ribbon across the foot of the film. The words sit in the flow of the hero, not over it,
so on a short window the film grows with them and nothing slides under the header. The
number’s size answers to the window’s height as well as its width, so the email field
stays on the first screen.

Every figure in that wireframe is illustrative and is rendered from config. The venue is
not named until `venue.permissionGranted` is true; until then “one of England’s finest
country houses”. The ribbon’s “One winner guaranteed.” is shown only while
`compliance.noRollover` is true. The escape page uses the same hero with the escape’s name
leading the kicker.

### The rhythm, in order
Ink, ink, snow, film, snow, snow, snow, film, moss:
1. **Hero** (snow over film), then the ribbon. As in the wireframe above.
2. **Your odds of winning** (ink band). Three figures in the heavy sans, the cap, the
   worst-case odds and the giving share as a percentage, each marked in gold and each with
   its one-line caption directly beneath it. A figure and its caption are one unit and are
   never separated: three across from 900px, one above the other below it, and the figures
   scale with the window so they never touch. “Read the key terms.” has its own line
   beneath the units, under a rule, never a fourth figure.
3. **The destination** (snow). Kicker and headline; the venue unnamed until permitted.
4. **The reel** (film). Full-bleed licensed stills from `media.stills`, sixteen by nine from
   768px and four by five below it so a caption sits in the lower third clear of the arrows,
   crossfade on a four second timer, swipe on touch, pause on hover, static
   under reduced motion.
   No venue still until `venue.footageLicensed`. Until the Hampshire stills are licensed,
   AI-generated placeholder stills, mood only, with no venue depicted. No arrows: nothing
   holds contrast over a frame that changes under it, so the dots are the one control, each
   an 8px mark inside a 24px target, and a swipe turns the reel on touch.
5. **The field** (snow), unchanged.
6. **The mission panel** (snow): a moss-tinted panel with a hairline and a 12px radius, the
   kicker, the statement at display size, the giving line with its figure in moss, and
   "Why Trove exists."
7. **Founding friends** (snow): kicker, "Become a founding friend.", two sentences, the form.
8. **Footer** (moss). Nothing sits between the founding friends form and the footer; the
   reel appears only where it belongs to a section.

Kickers sitewide are sentence case with a full stop, never caps. Buttons are pills: hover
darkens, a press darkens more, nothing fades. No arrows in buttons, no dashes.

### The motion, as built

What runs on the page today, act by act, with its still version. Every act reads the
document's inline gate: `data-motion="full"` is set before first paint unless the visitor
asks for reduced motion, and without it every act stands in its final, server-rendered
state.

- **The hero.** The number, the prize sentence and the form are server rendered and still.
  One thing moves on arrival, in CSS, needing no script: “Unlimited entries.” shows, a gold
  line strikes through it from 750ms, it lifts away, and from 2.15s the cap line pops into
  the same place. The two lines share one grid cell, so nothing shifts. The struck line is
  hidden from assistive technology; the promise is what is read. Reduced motion: the
  promise from first paint, the struck line never shown.
- **The ribbon.** The promises, written twice end to end and moved half their length over
  38 seconds, so the loop has no seam. Tilted, wider than the page so its ends never show,
  ink discs between the lines. Reduced motion: still.
- **The film.** The poster is preloaded from the head and is the first paint layer; the loop
  mounts above it once the poster has arrived and fades in over 700ms once it is *playing*,
  never merely once it could play; the scrim sits above both. Neither cut carries an audio
  stream. The element is muted as a property as well as an attribute, before any request to
  play, and carries `playsinline`, `loop`, `autoplay` and `disablepictureinpicture`. A device
  that refuses autoplay, which is what Low Power Mode and Low Data Mode do, takes the film off
  the page and leaves the poster: iOS draws its own play control over any paused video, so a
  film on screen and not running is worse than no film. A pause from the system is asked to
  resume once the page is visible, and gives up its place if it cannot. Reduced motion: the
  poster alone.
- **Scroll.** Lenis on desktop, driven by the GSAP ticker so ScrollTrigger reads the
  smoothed position. Any device whose primary pointer is coarse keeps native scroll, and
  every scroll-bound act there runs from IntersectionObserver lines across the viewport
  (`observeLines`, nineteen lines a twentieth apart), never from a scroll event. Beyond the
  field's steps, nothing on any device scrubs with the scroll position. Reduced motion:
  native scroll everywhere.
- **The field.** On a touch device it is capped at 60% of the viewport's height and centres
  in its column, so the marks, the heading and the ladder are one screen rather than two.
  One mark is lit at rest, and the field is built to light up to the largest bundle: the
  steps run as the section crosses the screen and it returns to one when it leaves. On touch
  the sequence runs from the observer lines, with one frame-coalesced scroll listener behind
  them so a jump settles on the step the section's position asks for.
  Draws in over 800ms, top to bottom, once its top reaches 80% of the
  viewport (a ScrollTrigger on desktop, an observer on touch), then lights its marks: at
  once, one after another, or step by step as the section moves through the viewport, with
  progress measured as 0 when its top reaches the 60% line and 1 when its bottom does. On
  the escape page the calculator lights as many marks as it is given, on hover, tap or a
  typed number, with no scroll dependency. Reduced motion: nothing runs; the field is drawn
  and lit as the server rendered it.
- **The reel.** Crossfades on a four second timer over 700ms, with arrows, dots and swipe on
  touch, and pauses while hovered or focused. A still with a title or a caption shows them
  over its lower third on a scrim; a bare still is bare. Reduced motion: no timer and no
  crossfade; the still changes only on an arrow, a dot or a swipe.
- **The form.** On success the field gives way to the founding friend sticker, tilted, which
  pops in over 550ms, and twenty-six pieces of paper confetti in gold, ink and snow fall
  once and are removed after 3.2 seconds. Then “Check your email.” Someone already on the
  list gets the sticker without the confetti. The confirm page gives the same sticker and
  confetti when the place is confirmed. The sticker carries no number: the signup function
  does not return one, and it never shows a number that is not the person’s real place. The
  confetti is discs and slips of paper, never the X. Reduced motion: the sticker, still,
  and no confetti.
- **The header.** Exactly one fixed bar, one element throughout, with two states, switched
  by an IntersectionObserver on the hero (or, on a page without one, the first heading). At
  the top: logo and wordmark, the nav in the centre, the outlined call to action. Once the
  hero has left the viewport: ink, the logo tile alone, the short prize line and the odds in
  the centre, the same call to action filled with the accent. Below 900px: the tile and the
  nav trigger only. The switch is a change of colour and content, not a transition, so it is
  the same under reduced motion.
- **The foot.** Nothing is fixed to the foot of the screen: no mobile call to action bar, no
  portal, no reel above the footer. The one thing that can occupy the foot is the consent
  banner while it is open, and while it is, on narrow screens the hero's compliance strip
  sticks just above it and the body reserves the banner's height, so nothing the page must
  show is covered.

### The finish

- **Rhythm.** One spacing scale in tokens (`--gutter`, `--space-strip`, `--space-section`,
  `--space-page-top`) and the classes on it (`section`, `section-half`, `section-strip`,
  `page`, `page-head`, `page-body`). Every section on every page uses one of them.
- **Reveals.** Two, and no more. The field draws itself in, and one reveal utility carries a
  named list of blocks: twenty pixels up and into view over 280ms on
  `cubic-bezier(0.4, 0, 0.6, 1)`, fired once by an IntersectionObserver when the block's top
  crosses the line 15% into the viewport, then unobserved. Children of a group stagger by
  80ms to a maximum of five. `will-change` goes on for the animation and comes off after.
  The list is section headings, the mission panel, the destination block and the founding
  friends block. Never body copy, the field, the reel, the nav, the strip or the hero, and
  never applied globally. Everything is server rendered and visible; the start state is CSS
  behind a gate the inline script sets before first paint only when motion is allowed, and
  that gate drops itself if the runtime never lands, so a failed bundle leaves the page
  visible rather than blank. Reduced motion arms nothing: no gate, no observer, final state.
  Nothing else fades, slides or scrubs on scroll.
- **Buttons.** Hover is a press darkening (`.btn`, brightness 0.9, 0.82 when pressed);
  nothing fades on hover.

## 3. The standard escape page (`/escapes/[slug]`)

The escape page sells the escape; the home page sells the proposition. Identical structure
for every escape so the template is the product:

1. The hero, as on the home page, with the escape’s name leading the kicker (“The Hampshire
   escape. Your chance of winning is at least”), then the ribbon.
2. The prize strip: one row, ink on snow, a rule above and below, nights, guests,
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
the worst-case odds in the centre (entries taken against the cap once entries
open), the same call to action filled with the accent. A grid with fixed columns, so
nothing overlaps at any width: the odds drop first when the centre is tight, then the
prize line shortens to the value alone. The nav trigger sits in the top right at every
width, to the right of the call to action from 900px, so the full route list is always one
tap away. Below 900px the same two states run, without the call to action: the tile and the wordmark at the top,
the tile alone once scrolled. There the band is one line, a 40px tile with 12px above and
below it, the same height in both states so nothing jumps, and the nav trigger keeps its
44px target without setting that height. Nothing is ever fixed to the foot of the screen.
No countdown, ever.

## 4. The escapes index (`/escapes`)

A vertical list, not a card grid. Each row: film still, destination, nights, prize value,
odds, status (open, coming, drawn), one line of the locality statement. Drawn escapes
show the winner's first name and county and link to the result page.

## 5. Legal pages

Two-column layout above 900px: a sticky contents column on the left generated from the
page's headings, the document on the right with a measure of 70 characters. Below 900px
the contents collapse to a "Contents" disclosure at the top. Documents live as MDX in
`content/legal/`. Terms carry over from drawtravel.com and are updated for Trove, the
config figures, the claim window and cash alternative, and the DCMS controls. The stay's
dates are a choice from dates we offer, never an open choice: once the winner has replied
we send a set number of dates (`prize.datesOffered`), and one clock (`prize.claimWindowDays`,
from the day the dates are sent) covers both picking a date and taking the cash alternative.
Choosing neither means the cash alternative, so the cost is fixed either way and nothing
stays open. The stay is booked only after that choice, never ahead of it. Playing
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

Delivery: every file this app shows lives in `public/media` and is served by this app.
Nothing under `media/` comes from Supabase or any other origin, so a page never waits on a
second connection. `next.config.ts` gives `/media/*` a year, `immutable`: a new cut is a new
filename, never a new body at the same path. The hero film ships in two cuts, the 1600 wide
master and a 960 wide rendition at CRF 30, offered first below 900px through a `source`
media query, so a phone never fetches the wide one.
