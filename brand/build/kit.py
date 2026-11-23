# Builds brand/kit from the marks in public/brand and app/icon.svg. Run from the repository
# root: python3 brand/build/kit.py, then node brand/build/raster.cjs for the PNG files. Nothing is redrawn: the path data is
# read from the source files and only fills, grounds and sizes change.
import re, json, os, shutil
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
def paths(file):
    s = open(os.path.join(ROOT, file), encoding='utf-8').read()
    return re.findall(r'<path fill="([^"]+)" d="([^"]+)"', s), s
wm_paths, _ = paths('public/brand/wordmark.svg')
ic_paths, ic_src = paths('public/brand/icon.svg')
sm_paths, sm_src = paths('app/icon.svg')
WM_L, WM_X = wm_paths[0][1], wm_paths[1][1]
IC_T, IC_X = ic_paths[0][1], ic_paths[1][1]
SM_T, SM_X = sm_paths[0][1], sm_paths[1][1]
IC_RX = re.search(r'rx="(\d+)"', ic_src).group(1); SM_RX = re.search(r'rx="(\d+)"', sm_src).group(1)
TILE = re.search(r'<rect[^>]*fill="([^"]+)"', ic_src).group(1)
C = dict(ink='#142520', tile=TILE, loch='#1F3A33', snow='#F7F8F5', cloud='#EEF0EA', mist='#B9C7C1', sun='#E9A23B', black='#000000', white='#FFFFFF')
# wordmark geometry (viewBox 14 -680 2556 691); the X is 270 units square
WX, WY, WW, WH, XU = 14, -680, 2556, 691, 270

def wordmark(l, x, w=None, bg=None, pad=0, canvas=None):
    """pad in X units of clear space; canvas=(W,H) px centres the mark on a ground."""
    if canvas:
        W, H = canvas; frac = pad  # pad here = fraction of canvas width the wordmark takes
        mw = W * frac; mh = mw * WH / WW; s = mw / WW
        tx = (W - mw) / 2 - WX * s; ty = (H - mh) / 2 - WY * s
        g = f'<g transform="translate({tx:.2f} {ty:.2f}) scale({s:.5f})"><path fill="{l}" d="{WM_L}"/><path fill="{x}" d="{WM_X}"/></g>'
        return f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" role="img" aria-label="trove"><title>trove</title><rect width="{W}" height="{H}" fill="{bg}"/>{g}</svg>'
    p = pad * XU
    vb = f'{WX-p} {WY-p} {WW+2*p} {WH+2*p}'
    size = f' width="{w}" height="{round(w*(WH+2*p)/(WW+2*p))}"' if w else ''
    ground = f'<rect x="{WX-p}" y="{WY-p}" width="{WW+2*p}" height="{WH+2*p}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg"{size} viewBox="{vb}" role="img" aria-label="trove"><title>trove</title>{ground}<path fill="{l}" d="{WM_L}"/><path fill="{x}" d="{WM_X}"/></svg>'

def icon(tile, t, x, w=None, small=False, bleed=False):
    T, X, rx = (SM_T, SM_X, SM_RX) if small else (IC_T, IC_X, IC_RX)
    if bleed: rx = 0
    size = f' width="{w}" height="{w}"' if w else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg"{size} viewBox="0 0 100 100" role="img" aria-label="trove"><title>trove</title><rect width="100" height="100" rx="{rx}" fill="{tile}"/><path fill="{t}" d="{T}"/><path fill="{x}" d="{X}"/></svg>'

KIT = os.path.join(ROOT, 'brand', 'kit')
for sub in ('wordmark', 'icon', 'x', 'social', 'email'):  # 'x' is cleared if an older kit left it
    shutil.rmtree(os.path.join(KIT, sub), ignore_errors=True)
jobs = []  # (svg string sized in px, png path)
def save(rel, svg):
    p = os.path.join(KIT, rel); os.makedirs(os.path.dirname(p), exist_ok=True); open(p, 'w', encoding='utf-8').write(svg + '\n')
def png(rel, svg):
    p = os.path.join(KIT, rel); os.makedirs(os.path.dirname(p), exist_ok=True); jobs.append({'svg': svg, 'out': p})

WMS = {  # name: (letters, X)
 'colour': (C['ink'], C['sun']), 'reversed': (C['snow'], C['sun']), 'white-gold': (C['white'], C['sun']),
 'ink': (C['ink'], C['ink']), 'snow': (C['snow'], C['snow']), 'black': (C['black'], C['black']), 'white': (C['white'], C['white']),
}
for n, (l, x) in WMS.items():
    save(f'wordmark/svg/trove-wordmark-{n}.svg', wordmark(l, x))
    for w in (2400, 600): png(f'wordmark/png/trove-wordmark-{n}-{w}.png', wordmark(l, x, w=w))
GROUNDS = {  # name: (ground, letters, X)
 'on-snow': (C['snow'], C['ink'], C['sun']), 'on-white': (C['white'], C['ink'], C['sun']), 'on-cloud': (C['cloud'], C['ink'], C['sun']),
 'on-ink': (C['ink'], C['snow'], C['sun']), 'on-loch': (C['loch'], C['snow'], C['sun']), 'on-black': (C['black'], C['white'], C['sun']),
 'on-gold': (C['sun'], C['ink'], C['ink']), 'black-on-white': (C['white'], C['black'], C['black']), 'white-on-black': (C['black'], C['white'], C['white']),
}
for n, (bg, l, x) in GROUNDS.items():
    png(f'wordmark/on-ground/trove-wordmark-{n}-2000x1000.png', wordmark(l, x, bg=bg, pad=0.5, canvas=(2000, 1000)))
ICONS = {  # name: (tile, t, X)
 'ink': (C['tile'], C['white'], C['sun']), 'loch': (C['loch'], C['snow'], C['sun']), 'snow': (C['snow'], C['ink'], C['sun']),
 'gold': (C['sun'], C['ink'], C['ink']), 'black': (C['black'], C['white'], C['white']), 'white': (C['white'], C['black'], C['black']),
}
for n, (tile, t, x) in ICONS.items():
    save(f'icon/svg/trove-icon-{n}.svg', icon(tile, t, x))
    for w in (1024, 512, 192, 180): png(f'icon/png/trove-icon-{n}-{w}.png', icon(tile, t, x, w=w))
    save(f'icon/svg/trove-icon-{n}-small.svg', icon(tile, t, x, small=True))
    for w in (48, 32, 16): png(f'icon/png/trove-icon-{n}-small-{w}.png', icon(tile, t, x, w=w, small=True))
# No X-alone files: CLAUDE.md rule 4, the X is never used on its own.
# social: full-bleed squares (the platform crops the circle) and wordmark-only covers
for n in ('ink', 'snow', 'gold'):
    tile, t, x = ICONS[n]
    png(f'social/profile/trove-profile-{n}-1080.png', icon(tile, t, x, w=1080, bleed=True))
    png(f'social/profile/trove-profile-{n}-400.png', icon(tile, t, x, w=400, bleed=True))
COVERS = {  # file: (W, H, fraction of width the wordmark takes)
 'linkedin-company-cover-1128x191': (1128, 191, 0.16), 'linkedin-personal-banner-1584x396': (1584, 396, 0.22),
 'x-header-1500x500': (1500, 500, 0.24), 'facebook-cover-1640x624': (1640, 624, 0.26),
 'youtube-banner-2560x1440': (2560, 1440, 0.22), 'share-image-1200x630': (1200, 630, 0.42),
 'instagram-post-1080x1350': (1080, 1350, 0.5), 'story-1080x1920': (1080, 1920, 0.5),
}
for n, (W, H, frac) in COVERS.items():
    for gname, (bg, l, x) in {'loch': (C['loch'], C['snow'], C['sun']), 'snow': (C['snow'], C['ink'], C['sun'])}.items():
        png(f'social/covers/trove-{n}-{gname}.png', wordmark(l, x, bg=bg, pad=frac, canvas=(W, H)))
png('email/trove-email-wordmark-480.png', wordmark(C['ink'], C['sun'], w=480))
png('email/trove-email-wordmark-reversed-480.png', wordmark(C['snow'], C['sun'], w=480))
json.dump(jobs, open(os.path.join(HERE, 'jobs.json'), 'w'))
json.dump(dict(WM_L=WM_L, WM_X=WM_X, IC_T=IC_T, IC_X=IC_X, SM_T=SM_T, SM_X=SM_X, IC_RX=IC_RX, SM_RX=SM_RX, C=C), open(os.path.join(HERE, 'marks.json'), 'w'))
print(len(jobs), 'png jobs;', sum(len(f) for _, _, f in os.walk(KIT)), 'svg files; tile', TILE, 'rx', IC_RX, SM_RX)
