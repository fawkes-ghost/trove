# Trove site specification (v3, 23 Nov 2026)

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
action, the box behind the cap in the hero, the line drawn under a promise in the draw in
writing, the discs on the rail, the founding friend sticker. Surfaces stay snow, cloud, ink and loch. No gradient washes on
chrome.

### Two registers, two voices

The site speaks in two registers and keeps them apart.

**Loud, once.** The promise: the chance of winning in the hero, the cap beside it, the email
field. One screen, and the sticker a founding friend gets for signing up.

**The house, everywhere else.** The escape, the company, how it works, the questions: set
the way a good hotel sets its stationery. Moderate serif headings with air around them, a
small sentence case label above, hairlines, plain text links, photographs as plates with
their captions beneath. Nothing here competes with the hero. References for this register:
nihi.com, aman.com, fabersett.com, wildseekersafaris.com, wildernessdestinations.com and
Black Tomato's Keepers. Taken from them: pace, restraint, composed photography, credentials
stated plainly. Not taken: tracked capitals (Trove is sentence case), cream and beige, and
badges for awards and memberships Trove has not earned. Trove's trust comes from its
arithmetic and its paper, so its credentials are the draw's own undertakings, in writing.

| Voice | Face | Notes |
| --- | --- | --- |
| What the site says | Newsreader 400, optical size following the font size | Headlines, the prize sentence, captions' titles. Class `display`; section headings add `heading-section` (32px to 48px) |
| What the site promises | DM Sans 800 | The numbers and undertakings the draw stands on: the chance, the cap, the giving share, the guarantee. Class `figure`; `figure-marked` draws the gold line under it, `mark-box` sets it ink on gold |
| Everything else | DM Sans 400, 500 and 700 | Body, navigation, forms, kickers, the compliance strip, the rail |

There is no monospace anywhere. A number in running text takes the face around it;
numerals are tabular. The heavy sans is at full size once, in the hero; in the draw in
writing it is the size of a subheading. Headlines ragged left. No word-level emphasis
inside a headline; italic is a whole clause or nothing. Measure under 70 characters. Links
that are not calls to action use `link-quiet`.

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
|  England’s finest country houses,   One email when entries open.   |
|  and £1,600 in cash.                18+. UK residents. Key terms.  |
|   serif, the page’s h1               the form, the note, the strip |
+------------------------------------------------------------------+
|  3,000 entries. Never more.  •  One winner guaranteed.  •  Free    |
+------------------------------------------------------------------+
     the rail: one quiet line on daylight, drifting, gold discs
```

In order: the kicker, the number, the twist line with the cap in a gold box, the prize
sentence (the page’s one `h1`), the email field and its button, one line saying what
signing up brings and that nothing is paid, the compliance strip, then the rail beneath
the film. The form is a field and a button: the signup check runs unseen and shows itself
only if it needs the person to do something. The words sit in the flow of the hero, not over it,
so on a short window the film grows with them and nothing slides under the header. The
number’s size answers to the window’s height as well as its width, so the email field
stays on the first screen.

Every figure in that wireframe is illustrative and is rendered from config. The venue is
not named until `venue.permissionGranted` is true; until then “one of England’s finest
country houses”. The rail’s “One winner guaranteed.” is shown only while
`compliance.noRollover` is true. The escape page uses the same hero with the escape’s name
leading the kicker.

### The rhythm, in order
Film, daylight, cloud, daylight, daylight, loch, daylight, daylight, loch:
1. **Hero** (snow over film), then the rail. As in the wireframe above. The one loud screen.
2. **The escape** (daylight). A label, the heading, the county in a paragraph, then exactly
   what is included as a ruled list: the stay, the cash, when it is taken, the cash
   alternative, the prize in all. One tall photograph beside the words and a pair beneath,
   each a plate with its title and one line under it. No carousel and nothing that moves by
   itself; the one edge-to-edge photograph lives on the escape page. Venue unnamed until permitted; no
   venue still until `venue.footageLicensed`.
3. **The draw, in writing** (a sheet of paper on cloud). The company's wordmark as a
   letterhead, the heading, then the undertakings as ruled rows: on the left the promise in
   the heavy sans, marked in gold (the cap, the worst-case chance, one winner while
   `compliance.noRollover` is true, free by post, the giving share, the cash alternative);
   on the right what it means in plain words. Signed with the registered company name and
   number, with links to the key terms and the Companies House record, a review link the day
   `organisation.review` is set, and a line saying the terms are drafts until
   `launch.termsInForce`. This is the trust section: no badge, logo row or testimonial
   appears on the site until it is real.
4. **How it works** (daylight). Three ruled columns in order: a step, a short title in the
   serif, one or two sentences. No cards.
5. **The field** (daylight), unchanged.
6. **The mission** (loch): the kicker, the statement at display size, the giving line with
   its figure in gold, and "Why Trove exists."
7. **Fair questions** (daylight).
8. **Founding friends** (daylight): kicker, "Become a founding friend.", two sentences, the form.
9. **Footer** (loch). Nothing sits between the founding friends form and the footer.

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
- **The rail.** The promises, written twice end to end and moved half their length over
  70 seconds, so the loop has no seam and the drift is slow enough to read. Straight, small,
  ink on daylight, gold discs between the lines. Reduced motion: still.
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
- **The signup check.** Cloudflare Turnstile runs with `appearance: 'interaction-only'`: no
  box is drawn unless a challenge needs the person, so the form does not shift for nearly
  everyone and shows the box beneath the button for the few who are challenged.
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
   escape. Your chance of winning is at least”), then the rail. The one loud screen.
2. What you win (daylight). No prize strip: the rail already runs under the hero, and two
   bands of facts in a row was one too many. The two parts of the prize stand side by side
   with a vertical rule between, the stay in words and the cash as a figure in the serif,
   then a ruled list: when the stay is taken, the cash alternative with its amount and a
   link to the terms, the prize in all. No cards and no picture.
3. The place (daylight). The destination’s name and one sentence on the left, the county in
   prose on the right. Then the photographs: one edge to edge between the rules, drifting
   slowly in its frame as it passes, with its title and one line beneath it; the others as a
   pair of plates. Nothing is set over a picture. Venue unnamed until permitted; no venue
   still until `venue.footageLicensed`.
4. Your chances (`#odds`). Two rows of the same two columns: the words beside the field,
   then the cap (the ledger figure, marked in gold at the size of a subheading) beside the
   ladder and the calculator.
5. Where the money goes (loch). The heading and the locality statement on the left; the
   share on the right, in the heavy sans and in gold.
6. Enter (a sheet of paper on cloud, as the draw in writing is on the home page). The
   wordmark as a letterhead, the answer sentence, then the choice as ruled rows: a gold disc
   marks the one chosen, the label, the worst-case chance, the price in the serif. The free
   postal route is the last row, in the same type and the same columns. One call to action
   beneath, with what goes to the destination for that choice. Signed with the registered
   company name and number, the key terms and the Companies House record. No countdown, no
   deadline, no “Enter now”, no default to a bundle.
7. Free entry by post: one paragraph and the link.
8. Founding friends, while the escape is not open.
9. Questions.
10. The compliance strip.

Sections two to five share one layout on a wide screen (`split`): the heading and one
sentence in a narrow column on the left, the matter on the right. Below 900px they are one
column in the same order.

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
