import type { MetadataRoute } from 'next';
import { organisation } from '@/config/organisation';

// The web app manifest, so "Add to home screen" on Android and desktop Chrome shows the trove
// icon (the t with the gold X on the ink tile) and the site's own name and colours. The PNGs
// are the trove x kit's icon-192 and icon-512, copied unchanged into public/brand.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Trove · ${organisation.tagline.replace(/\.$/, '')}`,
    short_name: 'Trove',
    description: 'Luxury escapes to win, with a fixed number of entries, so you know your chance before you enter. Free entry by post.',
    start_url: '/',
    display: 'browser',
    background_color: '#F7F8F5',
    theme_color: '#F7F8F5',
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
