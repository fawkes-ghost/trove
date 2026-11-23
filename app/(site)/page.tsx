import { Hero } from '@/components/hero/Hero';
import { OddsBand } from '@/components/home/OddsBand';
import { DestinationSection } from '@/components/home/DestinationSection';
import { EscapeReel } from '@/components/media/EscapeReel';
import { OddsSection } from '@/components/home/OddsSection';
import { Mission } from '@/components/home/Mission';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';
import { HowItWorks } from '@/components/home/HowItWorks';
import { HomeQuestions } from '@/components/home/HomeQuestions';

// The rhythm: the hero (the chance over the film, the ribbon of promises across its foot),
// cloud (the odds band), daylight
// (how it works, three cloud steps), daylight (the destination), film (the reel), daylight (the field), loch (the mission), daylight
// (fair questions), daylight (founding friends), then the footer (loch).
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <OddsBand />
      <HowItWorks />
      <DestinationSection />
      <EscapeReel />
      <OddsSection />
      <Mission />
      <HomeQuestions />
      <Waitlist />
    </main>
  );
}
