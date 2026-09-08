#!/usr/bin/env bash
# After the build: no unpublished venue term may appear in anything served, meaning the
# client chunks and the prerendered pages and payloads. Server-only chunks hold config by
# design and are not served. The terms are read from config/prize.ts so the words live
# nowhere else.
set -euo pipefail
cd "$(dirname "$0")/.."
terms=$(sed -nE "s/^export const unpublishedVenueTerms = \[(.*)\] as const;/\1/p" config/prize.ts | tr -d "'\" " | tr ',' '\n')
[ -n "$terms" ] || { echo "check:bundle: no unpublishedVenueTerms found in config/prize.ts"; exit 1; }
status=0
while IFS= read -r term; do
  [ -z "$term" ] && continue
  if hits=$(grep -rl --exclude-dir=cache "$term" .next/static .next/server/app 2>/dev/null) && [ -n "$hits" ]; then
    echo "check:bundle: “$term” is in the build output:"; echo "$hits"; status=1
  fi
done <<< "$terms"
[ $status -eq 0 ] && echo "check:bundle: clean"
exit $status
