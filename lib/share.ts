import type { Escape } from '@/config/prize';
import { siteUrl } from '@/lib/site';
import { numberWord, sentenceCase } from '@/lib/format';
import { venueLine } from '@/lib/escapes';

// The words that travel with a shared link, built from config so no figure is typed. The
// prize is for two, so the line asks who you would take, and stops there.
export function shareCopy(e: Escape, path = '/') {
  return {
    title: `Trove. ${e.destination}.`,
    text: `${sentenceCase(numberWord(e.nights))} nights for ${numberWord(e.party)} at ${venueLine(e)}, with the odds published before you enter. Who would you take?`,
    url: `${siteUrl}${path}`,
  };
}
