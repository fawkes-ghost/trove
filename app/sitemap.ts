import type { MetadataRoute } from 'next';
import { escapes } from '@/lib/escapes';
import { routes } from '@/lib/routes';
import { journal, journalPath } from '@/lib/journal';
import { siteUrl } from '@/lib/site';

// Every public route. The confirm and unsubscribe pages and the gate routes are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ['/', '/escapes', ...routes.information.map((r) => r.href), ...routes.legal.map((r) => r.href)];
  const escapePaths = escapes.map((item) => `/escapes/${item.slug}`);
  const journalPaths = journal.map(journalPath);
  return [...new Set([...staticPaths, ...escapePaths, ...journalPaths])].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === '/' || path.startsWith('/escapes') ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/escapes/') ? 0.9 : 0.6,
  }));
}
