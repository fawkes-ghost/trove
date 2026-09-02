#!/usr/bin/env bash
# Rule 1 in CLAUDE.md: no figure in copy or components.
# Fails on any pound sign, "1 in N" odds or thousands separator in app/ or components/.
# config/ is the only place a figure is written and is not searched.
set -u
cd "$(dirname "$0")/.."

pattern='£|1 in [0-9]|[0-9],[0-9]{3}'
hits=$(grep -rnE --include='*.ts' --include='*.tsx' --include='*.mdx' --include='*.md' --include='*.css' "$pattern" app components 2>/dev/null || true)

if [ -n "$hits" ]; then
  echo "$hits"
  echo
  echo "check:figures: hardcoded figure(s) found. Read them from config/prize.ts instead."
  exit 1
fi

echo "check:figures: clean"
