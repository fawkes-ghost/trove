# Builds the brand book page (the published artifact) from brand/build/marks.json, which
# kit.py writes. Run after kit.py: python3 brand/build/book.py
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
M = json.load(open(os.path.join(HERE, 'marks.json'))); C = M['C']
INK, TILE, LOCH, SNOW, CLOUD, MIST, SUN, BLACK, WHITE = C['ink'], C['tile'], C['loch'], C['snow'], C['cloud'], C['mist'], C['sun'], C['black'], C['white']
COTTON = '#ECE6D8'

def wm_svg(l, x, cls='wm', w=''):
    return f'<svg class="{cls}" viewBox="14 -680 2556 691" role="img" aria-label="trove" style="--l:{l};--x:{x};{("width:"+w) if w else ""}"><use href="#wm"/></svg>'
def wm(x, y, w, l, xc, rot=None):
    s = w / 2556
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x - 14*s:.2f} {y + 680*s:.2f}){r} scale({s:.5f})" style="--l:{l};--x:{xc}"><use href="#wm"/></g>'
def ic(x, y, size, tile, l, xc, rx=23, small=False, stroke=''):
    s = size / 100
    g = 'igs' if small else 'ig'
    st = f' stroke="{stroke}" stroke-width="{1/s:.2f}"' if stroke else ''
    return f'<g transform="translate({x} {y}) scale({s})" style="--l:{l};--x:{xc}"><rect width="100" height="100" rx="{rx}" fill="{tile}"{st}/><use href="#{g}"/></g>'
def xm(x, y, size, fill):
    s = size / 270
    return f'<g transform="translate({x - 2300*s:.2f} {y + 285*s:.2f}) scale({s:.5f})" style="--x:{fill}"><use href="#xm"/></g>'
def icon_svg(tile, l, xc, small=False, rx=None, cls='ic', w=''):
    rx = rx if rx is not None else (M['SM_RX'] if small else M['IC_RX'])
    return f'<svg class="{cls}" viewBox="0 0 100 100" role="img" aria-label="trove icon" style="--l:{l};--x:{xc};{("width:"+w) if w else ""}"><rect width="100" height="100" rx="{rx}" fill="{tile}"/><use href="#{"igs" if small else "ig"}"/></svg>'

def cmyk(h):
    r, g, b = [int(h[i:i+2], 16) / 255 for i in (1, 3, 5)]
    k = 1 - max(r, g, b)
    if k >= 1: return '0 / 0 / 0 / 100'
    c, m, y = [(1 - v - k) / (1 - k) for v in (r, g, b)]
    return ' / '.join(str(round(v * 100)) for v in (c, m, y, k))
def rgb(h): return ' '.join(str(int(h[i:i+2], 16)) for i in (1, 3, 5))

# ---------- colourway boards
WMB = [
 ('Primary', 'Light grounds. The default.', SNOW, INK, SUN, 'colour'),
 ('On white', 'Documents, print, other people’s pages.', WHITE, INK, SUN, 'colour'),
 ('On cloud', 'The alternate band on the site.', CLOUD, INK, SUN, 'colour'),
 ('Reversed on loch', 'The footer, covers, dark merchandise.', LOCH, SNOW, SUN, 'reversed'),
 ('Reversed on ink', 'The consent bar, dark screens.', INK, SNOW, SUN, 'reversed'),
 ('On black', 'Other people’s black backgrounds.', BLACK, WHITE, SUN, 'white-gold'),
 ('On gold', 'The whole wordmark in ink. Never a gold X on gold.', SUN, INK, INK, 'ink'),
 ('Black, one colour', 'Single-colour print, fax, stamps, engraving.', WHITE, BLACK, BLACK, 'black'),
 ('White, one colour', 'Single-colour print on a dark material.', BLACK, WHITE, WHITE, 'white'),
 ('Ink, one colour', 'Deboss, foil or one-colour screen print.', SNOW, INK, INK, 'ink'),
 ('Snow, one colour', 'One-colour print on loch or ink.', LOCH, SNOW, SNOW, 'snow'),
]
def board():
    out = []
    for name, use, bg, l, x, f in WMB:
        out.append(f'''<figure class="spec"><div class="tile" style="background:{bg}">{wm_svg(l, x)}</div>
<figcaption><b>{name}</b><span>{use}</span><code>trove-wordmark-{f}</code></figcaption></figure>''')
    film = f'''<figure class="spec"><div class="tile film">{wm_svg(SNOW, SUN)}</div>
<figcaption><b>On film and photographs</b><span>Reversed, over the darkest part of the frame or a scrim. Never over a bright sky.</span><code>trove-wordmark-reversed</code></figcaption></figure>'''
    return '\n'.join(out) + '\n' + film
ICB = [
 ('Ink tile', 'The default, everywhere square.', TILE, WHITE, SUN, 'ink'),
 ('Loch tile', 'Where the page around it is black.', LOCH, SNOW, SUN, 'loch'),
 ('Snow tile', 'On dark pages and dark app trays.', SNOW, INK, SUN, 'snow'),
 ('Gold tile', 'One-offs. The X turns ink.', SUN, INK, INK, 'gold'),
 ('Black, one colour', 'Single-colour print.', BLACK, WHITE, WHITE, 'black'),
 ('White, one colour', 'Single-colour print, reversed.', WHITE, BLACK, BLACK, 'white'),
]
def icons():
    out = []
    for name, use, tile, l, x, f in ICB:
        out.append(f'''<figure class="spec ico"><div class="tile sq">{icon_svg(tile, l, x)}</div>
<figcaption><b>{name}</b><span>{use}</span><code>trove-icon-{f}</code></figcaption></figure>''')
    return '\n'.join(out)

# ---------- diagrams
def clearspace():
    p = 270
    vb = f'{14-p-40} {-680-p-40} {2556+2*p+80} {691+2*p+80}'
    return f'''<svg class="diagram" viewBox="{vb}" role="img" aria-label="Clear space: one X on every side of the wordmark" style="--l:var(--fg);--x:{SUN}">
<rect x="{14-p}" y="{-680-p}" width="{2556+2*p}" height="{691+2*p}" fill="none" stroke="var(--quiet)" stroke-width="6" stroke-dasharray="26 20"/>
<rect x="14" y="-680" width="2556" height="691" fill="none" stroke="var(--rule-strong)" stroke-width="4"/>
<use href="#wm"/>
<g style="--x:var(--quiet)" opacity=".55">
<g transform="translate({14-p-2300} {-680+ (691-270)/2 + 285})"><use href="#xm"/></g>
<g transform="translate({2570-2300} {-680+ (691-270)/2 + 285})"><use href="#xm"/></g>
<g transform="translate({14+ (2556-270)/2 -2300} {-680-p+285})"><use href="#xm"/></g>
<g transform="translate({14+ (2556-270)/2 -2300} {11+285})"><use href="#xm"/></g>
</g></svg>'''

# ---------- merchandise drawings (400 x 300 each)
def tote(x0, body, handle, l, xc):
    return f'''<path d="M{x0+38} 112 C{x0+38} 46 {x0+112} 46 {x0+112} 112" fill="none" stroke="{handle}" stroke-width="9" stroke-linecap="round"/>
<path d="M{x0+12} 108 H{x0+138} L{x0+148} 272 H{x0+2} Z" fill="{body}"/>
<path d="M{x0+3} 258 H{x0+147} l1 14 H{x0+2} Z" fill="rgba(20,37,32,.08)"/>
{wm(x0+33, 168, 84, l, xc)}'''
def cap(x0, crown, brim, seam, l, xc):
    return f'''<path d="M{x0+18} 196 C{x0+18} 96 {x0+162} 96 {x0+162} 196 Z" fill="{crown}"/>
<path d="M{x0+90} 100 V196 M{x0+52} 112 C{x0+44} 140 {x0+42} 170 {x0+44} 196 M{x0+128} 112 C{x0+136} 140 {x0+138} 170 {x0+136} 196" fill="none" stroke="{seam}" stroke-width="1.5"/>
<circle cx="{x0+90}" cy="99" r="6" fill="{brim}"/>
<path d="M{x0+4} 200 Q{x0+90} 176 {x0+176} 200 Q{x0+90} 226 {x0+4} 200 Z" fill="{brim}"/>
{wm(x0+54, 138, 72, l, xc)}'''
MERCH = [
 ('Tote bag', 'Screen print, one or two colours. Wordmark 180mm wide, centred. Reversed on a loch bag.',
  tote(40, COTTON, '#D8D0BD', INK, SUN) + tote(210, LOCH, '#17302A', SNOW, SUN)),
 ('Cap', 'Embroidered on the front panel, 70mm wide. Two thread colours: the letters and the gold X.',
  cap(14, LOCH, '#17302A', 'rgba(247,248,245,.14)', SNOW, SUN) + cap(206, COTTON, '#D8D0BD', 'rgba(20,37,32,.12)', INK, SUN)),
 ('Sweatshirt', 'Left chest, 80mm wide, embroidered or printed. Nothing on the back.',
  f'''<path d="M150 58 Q200 88 250 58 L302 80 L346 232 L312 242 L284 150 V258 H116 V150 L88 242 L54 232 L98 80 Z" fill="{LOCH}"/>
<path d="M150 58 Q200 88 250 58 Q200 74 150 58 Z" fill="#17302A"/><path d="M116 246 H284 V258 H116 Z" fill="#1A332D"/>
<path d="M54 232 L88 242 L91 231 L57 221 Z M346 232 L312 242 L309 231 L343 221 Z" fill="#1A332D"/>
{wm(212, 116, 52, SNOW, SUN)}'''),
 ('Enamel mug', 'One side. Wordmark 60mm wide. The rim takes the ink.',
  f'''<path d="M250 122 C306 122 306 212 250 212" fill="none" stroke="#FBFBF8" stroke-width="15" stroke-linecap="round"/>
<path d="M130 90 H250 V236 Q250 252 234 252 H146 Q130 252 130 236 Z" fill="#FBFBF8"/>
<rect x="128" y="86" width="124" height="9" rx="4.5" fill="{INK}"/><path d="M236 96 H250 V236 Q250 252 234 252 H226 Q236 250 236 236 Z" fill="rgba(20,37,32,.06)"/>
{wm(146, 152, 88, INK, SUN)}'''),
 ('Luggage tag', 'Deboss or foil on leather. One colour: a deboss has no gold X.',
  f'''<g transform="rotate(-10 200 150)"><path d="M200 40 C150 20 150 86 190 76" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>
<path d="M150 70 Q150 58 162 58 H238 Q250 58 250 70 V248 Q250 260 238 260 H162 Q150 260 150 248 Z" fill="{LOCH}"/>
<circle cx="200" cy="80" r="8" fill="{CLOUD}"/><rect x="164" y="198" width="72" height="1.5" fill="rgba(247,248,245,.3)"/><rect x="164" y="214" width="72" height="1.5" fill="rgba(247,248,245,.3)"/><rect x="164" y="230" width="48" height="1.5" fill="rgba(247,248,245,.3)"/>
{wm(164, 128, 72, '#3A5A51', '#3A5A51')}</g>'''),
 ('Key fob', 'On brass or gold the whole wordmark is ink. The gold X is never set on gold.',
  f'''<circle cx="200" cy="62" r="24" fill="none" stroke="{MIST}" stroke-width="5"/>
<g transform="rotate(8 200 170)"><path d="M168 96 Q168 84 180 84 H220 Q232 84 232 96 V250 Q232 266 200 266 Q168 266 168 250 Z" fill="{SUN}"/><circle cx="200" cy="102" r="7" fill="{CLOUD}"/>
<g transform="rotate(90 200 184)">{wm(154, 172, 92, INK, INK)}</g></g>'''),
 ('Founding friend sticker', 'As on the site: the gold slip, the ink tab, the reversed wordmark.',
  f'''<g transform="rotate(-6 200 150)"><rect x="76" y="96" width="248" height="78" rx="8" fill="{SUN}"/>
<text x="200" y="146" text-anchor="middle" font-family="'DM Sans',Arial,sans-serif" font-weight="800" font-size="30" letter-spacing="-0.8" fill="{INK}">Founding friend.</text>
<rect x="196" y="162" width="128" height="44" rx="6" fill="{INK}"/>{wm(216, 173, 88, SNOW, SUN)}</g>'''),
 ('Enamel pins', '25mm hard enamel. The icon as a round pin, on ink or on snow. Never the X alone.',
  f'''<ellipse cx="128" cy="232" rx="54" ry="7" fill="rgba(20,37,32,.1)"/><ellipse cx="276" cy="232" rx="54" ry="7" fill="rgba(20,37,32,.1)"/>
<circle cx="128" cy="150" r="64" fill="{SUN}"/><circle cx="128" cy="150" r="58" fill="{TILE}"/><g transform="translate(74 97) scale(1.06)" style="--l:{WHITE};--x:{SUN}"><use href="#ig"/></g>
<circle cx="276" cy="150" r="64" fill="{INK}"/><circle cx="276" cy="150" r="58" fill="{SNOW}"/><g transform="translate(222 97) scale(1.06)" style="--l:{INK};--x:{SUN}"><use href="#ig"/></g>'''),
 ('Notebook', 'Blind deboss, one colour, 60mm wide. Bottom right of the cover.',
  f'''<rect x="118" y="34" width="172" height="232" rx="8" fill="{LOCH}"/><rect x="118" y="34" width="16" height="232" rx="6" fill="#17302A"/>
<rect x="262" y="34" width="6" height="232" fill="#152B26"/>{wm(180, 228, 68, '#34564D', '#34564D')}'''),
 ('Letter, envelope and card', 'Wordmark top left at 32mm on a letter. Company details in the footer only.',
  f'''<rect x="40" y="26" width="150" height="212" fill="{WHITE}"/>{wm(54, 42, 44, INK, SUN)}
<g fill="rgba(20,37,32,.16)"><rect x="54" y="82" width="70" height="3"/><rect x="54" y="100" width="122" height="3"/><rect x="54" y="110" width="122" height="3"/><rect x="54" y="120" width="96" height="3"/><rect x="54" y="140" width="122" height="3"/><rect x="54" y="150" width="110" height="3"/><rect x="54" y="222" width="122" height="2"/><rect x="54" y="228" width="80" height="2"/></g>
<rect x="206" y="60" width="164" height="78" fill="{LOCH}"/><path d="M206 60 L288 104 L370 60" fill="none" stroke="rgba(247,248,245,.2)" stroke-width="1.5"/>{wm(262, 112, 52, SNOW, SUN)}
<rect x="218" y="164" width="140" height="80" rx="3" fill="{SNOW}"/>{wm(232, 178, 50, INK, SUN)}<g fill="rgba(20,37,32,.2)"><rect x="232" y="214" width="60" height="2.5"/><rect x="232" y="222" width="84" height="2.5"/><rect x="232" y="230" width="48" height="2.5"/></g>'''),
 ('Phone and browser', 'The ink tile for the app icon and favicon. Under 32 pixels, the small cut.',
  f'''<rect x="52" y="24" width="132" height="252" rx="22" fill="{INK}"/><rect x="60" y="34" width="116" height="232" rx="14" fill="{CLOUD}"/>
<g fill="{MIST}">''' + ''.join(f'<rect x="{72+c*26}" y="{52+r*30}" width="19" height="19" rx="5"/>' for r in range(4) for c in range(4) if not (r == 1 and c == 2)) + f'''</g>
{ic(124, 82, 19, TILE, WHITE, SUN)}
<rect x="210" y="70" width="160" height="110" rx="8" fill="{WHITE}"/><rect x="210" y="70" width="160" height="26" rx="8" fill="{CLOUD}"/><rect x="210" y="88" width="160" height="8" fill="{CLOUD}"/>
<rect x="218" y="75" width="74" height="21" rx="5" fill="{WHITE}"/>{ic(223, 79, 13, TILE, WHITE, SUN, rx=22, small=True)}<rect x="241" y="84" width="40" height="3" fill="rgba(20,37,32,.3)"/>
{wm(226, 112, 46, INK, SUN)}<g fill="rgba(20,37,32,.12)"><rect x="226" y="140" width="120" height="3"/><rect x="226" y="150" width="96" height="3"/></g>'''),
]
def merch():
    return '\n'.join(f'''<figure class="spec"><div class="tile product"><svg viewBox="0 0 400 300" role="img" aria-label="{n}">{d}</svg></div>
<figcaption><b>{n}</b><span>{s}</span></figcaption></figure>''' for n, s, d in MERCH)

# ---------- platform previews
def profile_mock():
    return f'''<svg viewBox="0 0 720 300" role="img" aria-label="A profile page: the cover with the wordmark centred and the round profile picture overlapping its lower left">
<rect width="720" height="300" fill="var(--card)"/><rect width="720" height="150" fill="{LOCH}"/>{wm(260, 48, 200, SNOW, SUN)}
<circle cx="110" cy="150" r="62" fill="var(--card)"/><clipPath id="pc"><circle cx="110" cy="150" r="56"/></clipPath>
<g clip-path="url(#pc)">{ic(54, 94, 112, TILE, WHITE, SUN, rx=0)}</g>
<rect x="40" y="230" width="150" height="12" rx="6" fill="var(--rule-strong)"/><rect x="40" y="254" width="260" height="8" rx="4" fill="var(--rule)"/>
<rect x="560" y="222" width="120" height="34" rx="17" fill="none" stroke="var(--rule-strong)" stroke-width="2"/></svg>'''
def crops():
    def one(x, tile, l, xc, ring=''):
        return f'<clipPath id="c{x}"><circle cx="{x+60}" cy="70" r="60"/></clipPath><g clip-path="url(#c{x})">{ic(x, 10, 120, tile, l, xc, rx=0)}</g>' + (f'<circle cx="{x+60}" cy="70" r="59.5" fill="none" stroke="{ring}"/>' if ring else '')
    return f'''<svg viewBox="0 0 720 150" role="img" aria-label="Profile pictures as the platforms crop them: three circles and one square">
{one(20, TILE, WHITE, SUN)}{one(180, SNOW, INK, SUN, 'var(--rule-strong)')}{one(340, SUN, INK, INK)}
{ic(520, 10, 120, TILE, WHITE, SUN, rx=0)}
<circle cx="80" cy="70" r="40" fill="none" stroke="rgba(247,248,245,.5)" stroke-width="1" stroke-dasharray="4 4"/></svg>'''

PLATFORMS = [
 ('Instagram, TikTok, Facebook, YouTube, WhatsApp profile', '1080 × 1080', 'Circle', 'social/profile/trove-profile-ink-1080'),
 ('X profile', '400 × 400', 'Circle', 'social/profile/trove-profile-ink-400'),
 ('LinkedIn company logo', '400 × 400', 'Square', 'social/profile/trove-profile-ink-400'),
 ('LinkedIn company cover', '1128 × 191', 'Wordmark centred', 'social/covers/trove-linkedin-company-cover-1128x191'),
 ('LinkedIn personal banner', '1584 × 396', 'Wordmark centred', 'social/covers/trove-linkedin-personal-banner-1584x396'),
 ('X header', '1500 × 500', 'Wordmark centred', 'social/covers/trove-x-header-1500x500'),
 ('Facebook cover', '1640 × 624', 'Shown at half size', 'social/covers/trove-facebook-cover-1640x624'),
 ('YouTube banner', '2560 × 1440', 'Logo inside the middle 1546 × 423', 'social/covers/trove-youtube-banner-2560x1440'),
 ('Link preview (share image)', '1200 × 630', 'Fallback when a page has no picture', 'social/covers/trove-share-image-1200x630'),
 ('Instagram post, end card', '1080 × 1350', 'Portrait', 'social/covers/trove-instagram-post-1080x1350'),
 ('Story and reel end card', '1080 × 1920', 'Keep the logo out of the top and bottom fifth', 'social/covers/trove-story-1080x1920'),
 ('Favicon', '16, 32, 48', 'The small cut', 'icon/png/trove-icon-ink-small-16, -32, -48'),
 ('Apple touch icon, Android icon', '180, 192, 512', 'Rounded tile', 'icon/png/trove-icon-ink-180, -192, -512'),
 ('Email header and signature', '480 wide file', 'Shown at 96 to 160 wide', 'email/trove-email-wordmark-480'),
]
def platforms():
    rows = '\n'.join(f'<tr><th scope="row">{a}</th><td class="num">{b}</td><td>{c}</td><td><code>{d}</code></td></tr>' for a, b, c, d in PLATFORMS)
    return f'<div class="scroll"><table><thead><tr><th scope="col">Where</th><th scope="col">Size in pixels</th><th scope="col">Shape and placing</th><th scope="col">File in the kit</th></tr></thead><tbody>{rows}</tbody></table></div>'

PAL = [
 ('Snow', SNOW, INK, 'The page. Cool daylight, never cream.'),
 ('Cloud', CLOUD, INK, 'The alternate band.'),
 ('Mist', MIST, INK, 'Quiet marks and placeholders.'),
 ('Sun', SUN, INK, 'The gold. A fill with ink on it: the button, the X, the mark under a promise. Never gold text on a light ground.'),
 ('Loch', LOCH, SNOW, 'The few dark blocks: the footer, covers, dark merchandise.'),
 ('Ink', INK, SNOW, 'Text and the wordmark. Deep loch, never pure black on screen.'),
 ('Tile', TILE, SNOW, 'The icon’s tile, as drawn. Used only there.'),
 ('Black', BLACK, WHITE, 'One-colour print only.'),
 ('White', WHITE, INK, 'Paper, and the letters on black.'),
]
def palette():
    return '\n'.join(f'''<div class="sw"><div class="chip" style="background:{h};color:{fg}"><span>{n}</span></div>
<dl><div><dt>Hex</dt><dd>{h}</dd></div><div><dt>RGB</dt><dd>{rgb(h)}</dd></div><div><dt>CMYK</dt><dd>{cmyk(h)}</dd></div></dl><p>{u}</p></div>''' for n, h, fg, u in PAL)

def misuse():
    items = [
     ('Don’t stretch or squash it.', f'<g transform="translate(60 95) scale(1.5 0.62)">{wm(0, 0, 190, "var(--fg)", SUN)}</g>'),
     ('Don’t tilt it.', f'<g transform="rotate(-14 200 110)">{wm(95, 80, 210, "var(--fg)", SUN)}</g>'),
     ('Don’t recolour the X.', wm(95, 80, 210, 'var(--fg)', '#D64545')),
     ('Don’t set the letters in gold.', wm(95, 80, 210, SUN, SUN)),
     ('Don’t type it in a font.', '<text x="200" y="132" text-anchor="middle" font-family="Georgia,serif" font-size="62" fill="var(--fg)">Trove</text>'),
     ('Don’t drop the X from a colour version.', f'<svg x="95" y="80" width="210" height="57" viewBox="14 -680 2270 691" style="--l:var(--fg);--x:none"><use href="#wm"/></svg>'),
     ('Don’t crowd it.', wm(120, 86, 160, 'var(--fg)', SUN) + '<text x="200" y="76" text-anchor="middle" font-family="\'DM Sans\',Arial,sans-serif" font-weight="800" font-size="22" fill="var(--fg)">LUXURY ESCAPES</text><text x="200" y="164" text-anchor="middle" font-family="\'DM Sans\',Arial,sans-serif" font-size="18" fill="var(--fg)">prize draw</text>'),
     ('Don’t use the X on its own, or as decoration.', ''.join(xm(70 + i*58, 92, 34, SUN) for i in range(5))),
    ]
    return '\n'.join(f'<figure class="spec no"><div class="tile"><svg viewBox="0 0 400 220" role="img" aria-label="{t}">{d}</svg></div><figcaption><b>{t}</b></figcaption></figure>' for t, d in items)

def sizes():
    return f'''<div class="sizes">
<div><div class="row">{wm_svg('var(--fg)', SUN, w='64px')}{wm_svg('var(--fg)', SUN, w='96px')}{wm_svg('var(--fg)', SUN, w='160px')}</div><p><b>Wordmark.</b> No smaller than 64 pixels wide on a screen, 18mm in print, 40mm in thread.</p></div>
<div><div class="row"><span style="width:16px">{icon_svg(TILE, WHITE, SUN, small=True)}</span><span style="width:32px">{icon_svg(TILE, WHITE, SUN, small=True)}</span><span style="width:48px">{icon_svg(TILE, WHITE, SUN)}</span><span style="width:72px">{icon_svg(TILE, WHITE, SUN)}</span></div><p><b>Icon.</b> Down to 16 pixels. At 32 pixels and under use the small cut, which is drawn heavier. 8mm in print.</p></div>
</div>'''

CSS = '''
/* Layout: a book of plates. One column of sections, each a small label, a serif heading and a
   line of text, then specimens on their real grounds in a grid. The page stays quiet so the
   marks are the only colour. */
:root{--bg:#F7F8F5;--band:#EEF0EA;--card:#FFFFFF;--fg:#142520;--quiet:#586460;--rule:rgba(20,37,32,.15);--rule-strong:rgba(20,37,32,.32);--deep:#1F3A33;--on-deep:#F7F8F5;--sun:#E9A23B;
--serif:"Newsreader",Georgia,"Times New Roman",serif;--sans:"DM Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#0E1814;--band:#14221D;--card:#18282210;--fg:#F7F8F5;--quiet:#A9B8B2;--rule:rgba(247,248,245,.16);--rule-strong:rgba(247,248,245,.36);--deep:#1F3A33;--on-deep:#F7F8F5;--sun:#E9A23B;color-scheme:dark}}
:root[data-theme="dark"]{--bg:#0E1814;--band:#14221D;--card:#18282210;--fg:#F7F8F5;--quiet:#A9B8B2;--rule:rgba(247,248,245,.16);--rule-strong:rgba(247,248,245,.36);--deep:#1F3A33;--on-deep:#F7F8F5;--sun:#E9A23B;color-scheme:dark}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font-family:var(--sans);font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased;font-variant-numeric:tabular-nums}
.wrap{max-width:72rem;margin:0 auto;padding-left:max(20px,env(safe-area-inset-left,0px));padding-right:max(20px,env(safe-area-inset-right,0px))}
#wm path:first-child,#ig path:first-child,#igs path:first-child{fill:var(--l)}
#wm path:last-child,#ig path:last-child,#igs path:last-child,#xm path{fill:var(--x)}
svg{display:block;max-width:100%}
header.cover{padding-block:4.5rem 3.5rem;border-bottom:1px solid var(--rule)}
header.cover .wm{width:min(100%,34rem)}
header.cover p.lede{font-family:var(--serif);font-size:clamp(1.5rem,3.2vw,2.25rem);line-height:1.2;letter-spacing:-.02em;max-width:22em;margin:2.5rem 0 0;text-wrap:balance}
header.cover p.meta{color:var(--quiet);font-size:.9375rem;margin:1.25rem 0 0}
nav.toc{display:flex;flex-wrap:wrap;gap:.25rem 1.25rem;margin-top:2rem;font-size:.9375rem}
nav.toc a,a.q{color:var(--fg);text-decoration:underline;text-decoration-color:var(--rule-strong);text-underline-offset:4px}
nav.toc a:hover,a.q:hover{text-decoration-color:var(--fg)}
a:focus-visible{outline:2px solid var(--fg);outline-offset:3px}
section{padding-block:4rem;border-bottom:1px solid var(--rule)}
section.band{background:var(--band)}
.label{font-size:.875rem;font-weight:500;color:var(--quiet);margin:0 0 .75rem}
h2{font-family:var(--serif);font-weight:400;font-size:clamp(2rem,4vw,3rem);line-height:1.05;letter-spacing:-.022em;margin:0;text-wrap:balance}
h3{font-family:var(--sans);font-weight:500;font-size:1.0625rem;margin:2.75rem 0 1rem}
p.lead{font-size:1.125rem;max-width:38em;margin:1.25rem 0 0}
p{margin:0 0 1em;max-width:40em}
.cols{display:grid;gap:2rem 3rem;margin-top:2.5rem}
@media (min-width:820px){.cols{grid-template-columns:repeat(3,minmax(0,1fr))}.cols.two{grid-template-columns:repeat(2,minmax(0,1fr))}}
.cols>div{min-width:0;border-top:1px solid var(--rule-strong);padding-top:1rem}
.cols b.t{display:block;font-family:var(--serif);font-weight:400;font-size:1.5rem;letter-spacing:-.015em;margin-bottom:.5rem}
.cols p{margin:0;font-size:1rem}
ul.plain{list-style:none;margin:1.5rem 0 0;padding:0;max-width:44em}
ul.plain li{padding:.7rem 0;border-top:1px solid var(--rule)}
ul.plain li:last-child{border-bottom:1px solid var(--rule)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,17rem),1fr));gap:2rem 1.5rem;margin-top:2rem}
.grid.icons{grid-template-columns:repeat(auto-fill,minmax(min(100%,10.5rem),1fr))}
.grid.products{grid-template-columns:repeat(auto-fill,minmax(min(100%,20rem),1fr))}
figure.spec{margin:0;min-width:0}
.tile{aspect-ratio:3/2;display:grid;place-items:center;outline:1px solid var(--rule);outline-offset:-1px}
.tile .wm{width:62%}
.tile.sq{aspect-ratio:1;background:var(--band)}
.tile.sq .ic{width:56%}
.tile.film{background:linear-gradient(180deg,#8E8A78 0%,#6B6A5A 38%,#2C3A33 78%,#16241F 100%);align-items:end;padding-bottom:9%}
.tile.product{aspect-ratio:4/3;background:#EEF0EA;outline-color:var(--rule)}
.tile.product svg{width:100%;height:100%}
figure.no .tile{background:var(--band);aspect-ratio:20/11}
figure.no .tile svg{width:100%;height:100%}
figcaption{display:grid;gap:.15rem;margin-top:.75rem;font-size:.9375rem;line-height:1.45}
figcaption b{font-weight:500}
figcaption span{color:var(--quiet)}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.8125rem;color:var(--quiet);overflow-wrap:anywhere}
.diagram{width:min(100%,44rem);margin-top:2rem}
.sizes{display:grid;gap:2rem 3rem;margin-top:1.5rem}
@media (min-width:820px){.sizes{grid-template-columns:repeat(2,minmax(0,1fr))}}
.sizes .row{display:flex;flex-wrap:wrap;align-items:flex-end;gap:1.5rem;min-height:5rem;padding:1rem 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.sizes .row .wm{flex:none}
.sizes .row span{display:block;flex:none}
.sizes p{font-size:1rem;margin:.9rem 0 0}
.pal{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,13.5rem),1fr));gap:2rem 1.5rem;margin-top:2rem}
.sw{min-width:0}
.chip{aspect-ratio:16/9;display:flex;align-items:flex-end;padding:.75rem .9rem;font-weight:500;outline:1px solid var(--rule);outline-offset:-1px}
.sw dl{margin:.75rem 0 .5rem;font-size:.875rem}
.sw dl div{display:flex;justify-content:space-between;gap:1rem;border-bottom:1px solid var(--rule);padding:.25rem 0}
.sw dt{color:var(--quiet)}.sw dd{margin:0}
.sw p{font-size:.9375rem;color:var(--quiet);margin:0}
.type{display:grid;gap:2.5rem 3rem;margin-top:2rem}
@media (min-width:820px){.type{grid-template-columns:repeat(3,minmax(0,1fr))}}
.type>div{min-width:0;border-top:1px solid var(--rule-strong);padding-top:1rem}
.type .big{font-size:clamp(2.25rem,5vw,3.5rem);line-height:1.02;margin:0 0 1rem}
.type .serif{font-family:var(--serif);letter-spacing:-.022em}
.type .heavy{font-weight:800;letter-spacing:-.045em}
.type p{font-size:.9375rem;color:var(--quiet);margin:0}
.type p.big{color:var(--fg);margin:0 0 1rem}
.say{display:grid;margin-top:2rem;max-width:56rem}
.say>div{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;padding:.85rem 0;border-top:1px solid var(--rule)}
.say>div:last-child{border-bottom:1px solid var(--rule)}
.say>div>*{min-width:0}
.say .h{font-size:.875rem;color:var(--quiet);font-weight:500}
.say .yes{font-family:var(--serif);font-size:1.25rem;letter-spacing:-.01em}
.say .not{color:var(--quiet);text-decoration:line-through;text-decoration-color:var(--rule-strong)}
.scroll{overflow-x:auto;margin-top:2rem}
table{border-collapse:collapse;width:100%;min-width:44rem;font-size:.9375rem}
th,td{text-align:left;padding:.7rem 1rem .7rem 0;border-top:1px solid var(--rule);vertical-align:top}
thead th{font-weight:500;color:var(--quiet);font-size:.875rem;border-top:0}
tbody th{font-weight:500}
td.num{white-space:nowrap}
.mock{margin-top:2rem;display:grid;gap:1.5rem}
.mock svg{width:100%;outline:1px solid var(--rule);outline-offset:-1px}
.mock.crop svg{outline:0;max-width:44rem}
footer{padding-block:3rem 4rem;color:var(--quiet);font-size:.9375rem}
'''

def build():
    defs = f'''<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<g id="wm"><path d="{M['WM_L']}"/><path d="{M['WM_X']}"/></g>
<g id="xm"><path d="{M['WM_X']}"/></g>
<g id="ig"><path d="{M['IC_T']}"/><path d="{M['IC_X']}"/></g>
<g id="igs"><path d="{M['SM_T']}"/><path d="{M['SM_X']}"/></g>
</defs></svg>'''
    return f'''<title>Trove Brand Book</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,800&family=Newsreader:opsz,wght@6..72,400&display=swap">
<style>{CSS}</style>
{defs}
<header class="cover"><div class="wrap">
{wm_svg('var(--fg)', SUN)}
<p class="lede">The wordmark, the icon, the colours and how to use them, from a favicon to a tote bag.</p>
<p class="meta">Brand book, version 1.1. 23 November 2026. Built from the live site and the marks in <code>public/brand</code>.</p>
<nav class="toc" aria-label="Sections"><a href="#brand">The brand</a><a href="#voice">Voice</a><a href="#logo">The logo</a><a href="#colourways">Colourways</a><a href="#colour">Colour</a><a href="#type">Type</a><a href="#misuse">Misuse</a><a href="#platforms">Platforms</a><a href="#merchandise">Merchandise</a><a href="#kit">The kit</a><a href="#decide">To decide</a></nav>
</div></header>

<section id="brand"><div class="wrap">
<p class="label">The brand</p>
<h2>A prize draw you can check.</h2>
<p class="lead">Trove is a UK prize draw for luxury escapes. Each draw has one escape, one winner and a fixed number of entries. Fifteen per cent of entry sales goes to community and countryside causes where the escape is. That share is why Trove exists.</p>
<div class="cols">
<div><b class="t">Fair.</b><p>Entries are capped, so the worst chance of winning is published before anyone pays. Entry by post is free and has the same chance. Every draw has a winner.</p></div>
<div><b class="t">Generous.</b><p>Fifteen pence of every pound goes to causes at the destination. We say where it went after each draw.</p></div>
<div><b class="t">Worth winning.</b><p>A suite in a country house, not the basic room. The film and photographs do the selling. The words say exactly what the prize is.</p></div>
</div>
<div class="cols two">
<div><b class="t">Who it is for.</b><p>Adults in the UK who would love the escape and want to know their chances before they enter. Always 18 and over.</p></div>
<div><b class="t">How it should feel.</b><p>Fun and high end at once. Warm, plain and exact. Closer to a good travel magazine than to a competition site.</p></div>
</div>
<h3>What Trove never does.</h3>
<ul class="plain">
<li>Countdown timers, “win now”, crossed-out prices or exclamation marks.</li>
<li>Extend a closing date. A draw closes at its cap or its last date, whichever comes first.</li>
<li>Name a venue or a charity before there is written permission to.</li>
<li>Use generated pictures of a real place. Licensed film and photographs only.</li>
<li>Show a badge, an award or a review it has not earned.</li>
</ul>
</div></section>

<section id="voice" class="band"><div class="wrap">
<p class="label">Voice</p>
<h2>Say it the way you would to a customer.</h2>
<p class="lead">Lead with the fact or the benefit. Short sentences. The pictures carry the longing, the words carry the facts.</p>
<ul class="plain">
<li>Sentence case everywhere, buttons included. Full stops on headlines.</li>
<li>No exclamation marks and no dashes. Use commas, colons and full stops.</li>
<li>Entries, not tickets. Escape, not holiday or stay. Founding friends, not members.</li>
<li>A draw is named for its destination. It is never numbered.</li>
<li>Every figure comes from the draw’s own settings. None is typed from memory.</li>
<li>A heading never describes the text under it.</li>
</ul>
<div class="say">
<div><span class="h">Trove says</span><span class="h">Trove does not say</span></div>
<div><span class="yes">Become a founding friend.</span><span class="not">Join our exclusive members’ club!</span></div>
<div><span class="yes">How we keep it fair.</span><span class="not">Our commitment to transparency</span></div>
<div><span class="yes">Three nights away, for two.</span><span class="not">An unforgettable luxury getaway</span></div>
<div><span class="yes">Confirm your place.</span><span class="not">Click here to verify your email address</span></div>
</div>
</div></section>

<section id="logo"><div class="wrap">
<p class="label">The logo</p>
<h2>The name, and an X.</h2>
<p class="lead">The wordmark is trove in bold lower case, with a gold X as its full stop. The X is part of the name. The marks are drawings, kept exactly as drawn: never retyped, redrawn or re-angled.</p>
<div class="grid">
<figure class="spec"><div class="tile" style="background:{SNOW}">{wm_svg(INK, SUN)}</div><figcaption><b>The wordmark</b><span>The logo. Use it wherever there is room for it.</span></figcaption></figure>
<figure class="spec"><div class="tile" style="background:{SNOW}">{icon_svg(TILE, WHITE, SUN, w='30%')}</div><figcaption><b>The icon</b><span>The t and the X on a dark tile, for anything square: app icons, profile pictures.</span></figcaption></figure>
<figure class="spec"><div class="tile" style="background:{SNOW}">{icon_svg(TILE, WHITE, SUN, small=True, w='12%')}</div><figcaption><b>The small cut</b><span>A heavier drawing of the icon for 32 pixels and under: favicons, browser tabs.</span></figcaption></figure>
</div>
<h3>Clear space.</h3>
<p>Leave one X of clear space on every side. Nothing comes inside it: no text, no edge, no other logo.</p>
{clearspace()}
<h3>Smallest sizes.</h3>
{sizes()}
<h3>The X never stands alone.</h3>
<p>On its own it reads as the X (Twitter) logo, so it is never an icon, a profile picture, a pin or a seal. Where the wordmark will not fit, use the icon, which keeps the t beside it. It is not a bullet, a pattern, a close button, confetti or a multiplication sign either: on the site the separators are discs and the confetti is paper.</p>
</div></section>

<section id="colourways" class="band"><div class="wrap">
<p class="label">Colourways</p>
<h2>Every ground it will meet.</h2>
<p class="lead">Pick by the ground. In colour the X is always gold, except on gold, where the whole mark is ink. One-colour versions are for print processes that only have one colour.</p>
<h3>The wordmark.</h3>
<div class="grid">{board()}</div>
<h3>The icon.</h3>
<div class="grid icons">{icons()}</div>
</div></section>

<section id="colour"><div class="wrap">
<p class="label">Colour</p>
<h2>Daylight, deep water and one gold.</h2>
<p class="lead">Surfaces stay snow, cloud, loch and ink. The gold is a highlighter for what Trove promises, and it is only ever a fill. The CMYK figures are a screen conversion: ask the printer for a proof before a run.</p>
<div class="pal">{palette()}</div>
</div></section>

<section id="type" class="band"><div class="wrap">
<p class="label">Type</p>
<h2>Two faces, two voices.</h2>
<p class="lead">Newsreader says things. DM Sans does everything else, and at its heaviest it makes the promises. In email, where web fonts do not load, Georgia and Arial stand in.</p>
<div class="type">
<div><p class="big serif">Three nights away, for two.</p><p>Newsreader 400. Headlines and statements, in sentence case with a full stop.</p></div>
<div><p class="big heavy">15%</p><p>DM Sans 800. The chance, the cap and the share that is given. Figures only.</p></div>
<div><p class="big" style="font-size:1.25rem;line-height:1.5;letter-spacing:0">We’ll email you once, on the day entries open. Nothing to pay today.</p><p>DM Sans 400 and 500. Text, buttons, labels and small print.</p></div>
</div>
</div></section>

<section id="misuse"><div class="wrap">
<p class="label">Misuse</p>
<h2>Eight ways to get it wrong.</h2>
<div class="grid">{misuse()}</div>
</div></section>

<section id="platforms" class="band"><div class="wrap">
<p class="label">Platforms</p>
<h2>One picture everywhere.</h2>
<p class="lead">The profile picture is the ink tile on every platform, so Trove looks the same wherever someone meets it. The files are square with no rounded corners, because each platform cuts its own circle. Covers carry the wordmark alone, centred, because the profile picture sits over the lower left.</p>
<div class="mock">{profile_mock()}</div>
<div class="mock crop">{crops()}</div>
<p style="margin-top:1rem;color:var(--quiet);font-size:.9375rem">Three circle crops and the square LinkedIn uses. The snow and gold tiles are alternates for a one-off, not the everyday picture.</p>
{platforms()}
<p style="margin-top:1.25rem;color:var(--quiet);font-size:.9375rem">Platforms change their sizes. Check the upload screen before posting. Each cover comes on loch and on snow.</p>
</div></section>

<section id="merchandise"><div class="wrap">
<p class="label">Merchandise and print</p>
<h2>On things you can hold.</h2>
<p class="lead">One placement per item, and nothing but the logo. The measurements are starting points for the supplier’s proof. Thread and ink are matched by eye to a printed swatch of loch, snow and gold.</p>
<div class="grid products">{merch()}</div>
<ul class="plain">
<li>Screen print and embroidery: two colours at most, the letters and the gold X.</li>
<li>Deboss, foil, engraving and laser: one colour. Use the ink, black or white wordmark.</li>
<li>On gold, brass or kraft card: the ink wordmark, X included.</li>
<li>Embroidery under 40mm wide loses the X. Use a patch, or go larger.</li>
<li>Merchandise is for adults. No children’s sizes and no toys: entry is for people aged 18 and over.</li>
</ul>
</div></section>

<section id="kit" class="band"><div class="wrap">
<p class="label">The kit</p>
<h2>The files, by folder.</h2>
<p class="lead">108 files in <code>brand/kit</code>. SVG for print and anything that scales, PNG for uploads. Every file is made from the two drawings on the site, with only the colours and sizes changed.</p>
<div class="scroll"><table><thead><tr><th scope="col">Folder</th><th scope="col">What is in it</th></tr></thead><tbody>
<tr><th scope="row"><code>wordmark/svg</code></th><td>Seven colourways: colour, reversed, white-gold, ink, snow, black, white.</td></tr>
<tr><th scope="row"><code>wordmark/png</code></th><td>The same seven on a clear background, 2400 and 600 pixels wide.</td></tr>
<tr><th scope="row"><code>wordmark/on-ground</code></th><td>Nine ready-made plates with clear space: on snow, white, cloud, ink, loch, black and gold, plus black on white and white on black.</td></tr>
<tr><th scope="row"><code>icon/svg</code>, <code>icon/png</code></th><td>Six tiles (ink, loch, snow, gold, black, white) at 1024, 512, 192 and 180 pixels, and the small cut at 48, 32 and 16.</td></tr>
<tr><th scope="row"><code>social/profile</code></th><td>Square profile pictures at 1080 and 400 pixels: ink, snow and gold.</td></tr>
<tr><th scope="row"><code>social/covers</code></th><td>LinkedIn company and personal, X, Facebook, YouTube, the share image, an Instagram post and a story, each on loch and on snow.</td></tr>
<tr><th scope="row"><code>email</code></th><td>The wordmark at 480 pixels wide, colour and reversed.</td></tr>
</tbody></table></div>
</div></section>

<section id="decide"><div class="wrap">
<p class="label">To decide</p>
<h2>Three things that need a yes or a no.</h2>
<ul class="plain">
<li><b>Two near-blacks.</b> The icon’s tile is drawn in {TILE}, a shade deeper than the ink ({INK}) used for text and the wordmark. The kit keeps the icon as drawn. The alternative is to redraw the tile in ink.</li>
<li><b>No line under the logo.</b> Covers and merchandise carry the logo only. A strapline would need writing, and any line that promotes the draw needs the key terms one click away.</li>
<li><b>Print matches.</b> Pantone and thread references are not chosen here. Pick them against a printed proof with the first supplier, then add them to this page.</li>
</ul>
</div></section>
<footer><div class="wrap">Trove brand book. Colours, type and rules follow <code>CLAUDE.md</code> and <code>docs/site-spec.md</code> in the site’s repository, which stay the source of truth.</div></footer>
'''
html = build()
open(os.path.join(HERE, 'trove-brand-book.html'), 'w', encoding='utf-8').write(html)
print(len(html), 'bytes')
