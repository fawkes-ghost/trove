import { Hero } from '@/components/hero/Hero';
import { OddsBand } from '@/components/home/OddsBand';
import { DestinationSection } from '@/components/home/DestinationSection';
import { EscapeReel } from '@/components/media/EscapeReel';
import { OddsSection } from '@/components/home/OddsSection';
import { Mission } from '@/components/home/Mission';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';

// The rhythm: the horizon hero (film above, daylight below), cloud (the odds band), daylight
// (the destination), film (the reel), daylight (the field), loch (the mission), daylight
// (founding friends), then the footer (loch).
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <OddsBand />
      <DestinationSection />
      <EscapeReel />
      <OddsSection />
      <Mission />
      <Waitlist />
    </main>
  );
}
