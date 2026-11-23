# Trove brand kit

Every file here is made from the two drawings on the site (`public/brand/wordmark.svg` and
`public/brand/icon.svg`, plus the small cut in `app/icon.svg`). Only colours, grounds and sizes
change. Nothing is redrawn. To rebuild the kit after a logo change, run `brand/build/kit.py`
and then `brand/build/raster.cjs` from the repository root.

| Folder | What is in it |
| --- | --- |
| `wordmark/svg` | Seven colourways: colour, reversed, white-gold, ink, snow, black, white |
| `wordmark/png` | The same seven on a clear background, 2400 and 600 pixels wide |
| `wordmark/on-ground` | Nine ready-made plates with clear space, 2000 by 1000 |
| `icon/svg`, `icon/png` | Six tiles at 1024, 512, 192 and 180, and the small cut at 48, 32 and 16 |
| `social/profile` | Square profile pictures at 1080 and 400: ink, snow and gold |
| `social/covers` | LinkedIn, X, Facebook, YouTube, share image, Instagram post and story, on loch and on snow |
| `email` | The wordmark at 480 pixels wide, colour and reversed |

## Which file

- Light ground: `trove-wordmark-colour`. Dark ground: `trove-wordmark-reversed`. Pure black: `trove-wordmark-white-gold`.
- On gold, brass or kraft: `trove-wordmark-ink`. The gold X is never set on gold.
- One-colour print, deboss, foil, engraving: `trove-wordmark-black`, `-white`, `-ink` or `-snow`.
- Profile pictures: `social/profile/trove-profile-ink-1080` on every platform.
- Favicons and anything at 32 pixels or under: the `-small` icon files.

## Rules

- One X of clear space on every side of the wordmark.
- No smaller than 64 pixels wide on screen, 18mm in print, 40mm in thread.
- Do not stretch, tilt, recolour, retype or crowd the logo. The X is never used on its own and is not decoration: where the wordmark will not fit, use the icon.
- Colours: snow #F7F8F5, cloud #EEF0EA, mist #B9C7C1, sun #E9A23B, loch #1F3A33, ink #142520, icon tile #101614.
