import { Hero } from '@/components/hero/Hero';
import { OddsBand } from '@/components/home/OddsBand';
import { DestinationSection } from '@/components/home/DestinationSection';
import { EscapeReel } from '@/components/media/EscapeReel';
import { OddsSection } from '@/components/home/OddsSection';
import { Mission } from '@/components/home/Mission';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';

// The rhythm: ink (hero), ink (the odds band), snow (the destination), film (the reel), snow
// (the field), snow (the mission panel), snow (founding friends), then the layout's reel
// (film) and the footer (moss).
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
