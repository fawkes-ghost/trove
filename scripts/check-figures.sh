#!/usr/bin/env bash
# Rule 1 in CLAUDE.md: no figure in copy or components. Fails on any pound sign, "1 in N" odds
# or thousands separator in app/, components/ or content/; config/ is the only place a figure is
# written and is not searched. Then rule 3: no em or en dashes anywhere. Then no icon packs or
# component kits.
set -u
cd "$(dirname "$0")/.."

pattern='£|1 in [0-9]|[0-9],[0-9]{3}'
hits=$(grep -rnE --include='*.ts' --include='*.tsx' --include='*.mdx' --include='*.md' --include='*.css' "$pattern" app components content 2>/dev/null || true)

if [ -n "$hits" ]; then
  echo "$hits"
  echo
  echo "check:figures: hardcoded figure(s) found. Read them from config/prize.ts instead."
  exit 1
fi

# CLAUDE.md rule 3: no em or en dashes anywhere, code comments included.
dashes=$(grep -rnP '[\x{2014}\x{2013}]' app components lib config content docs scripts next.config.ts CLAUDE.md 2>/dev/null || true)
if [ -n "$dashes" ]; then
  echo "$dashes"
  echo
  echo "check:figures: em or en dash found. Use commas, colons and full stops."
  exit 1
fi

# No icon packs and no component kits: every mark is ours and every control is written here.
kits=$(grep -rnE "lucide|shadcn|@radix-ui|components/ui/" app components lib package.json 2>/dev/null || true)
if [ -n "$kits" ]; then
  echo "$kits"
  echo
  echo "check:figures: Lucide, shadcn or Radix import found. Draw the mark or write the control."
  exit 1
fi

echo "check:figures: clean"
