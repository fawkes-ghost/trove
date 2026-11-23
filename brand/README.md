# Brand

`kit/` holds the wordmark and icon in every colourway and platform size. `kit/README.md` says
which file to use where. The brand book, with the strategy, the usage rules, the platform
sizes and the merchandise drawings, is published as an artifact:
https://claude.ai/artifact/RFq9N8kxUcXFGdM969Z1Rt

`build/` regenerates all of it from the drawings the site uses (`public/brand/wordmark.svg`,
`public/brand/icon.svg`, `app/icon.svg`). The marks are never redrawn here: the scripts read
their path data and change only fills, grounds and sizes.

```bash
python3 brand/build/kit.py
node brand/build/raster.cjs
python3 brand/build/book.py
```

Colours, type and copy rules live in `CLAUDE.md` and `docs/site-spec.md`, which stay the source
of truth. Nothing in this folder is served by the site.
