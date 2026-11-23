import { Hero } from '@/components/hero/Hero';
import { EscapeIntro } from '@/components/home/EscapeIntro';
import { FairDraw } from '@/components/home/FairDraw';
import { OddsSection } from '@/components/home/OddsSection';
import { Mission } from '@/components/home/Mission';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';
import { HowItWorks } from '@/components/home/HowItWorks';
import { HomeQuestions } from '@/components/home/HomeQuestions';

// The rhythm, in two registers. Loud once: the hero (the chance over the film, the email
// field, the rail of promises beneath). Then the house, quietly: the escape (daylight), how
// the draw is kept fair (a panel on cloud), how it works (daylight), the field
// (daylight), the mission (loch), fair questions and founding friends (daylight), then the
// footer (loch).
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <EscapeIntro />
      <FairDraw />
      <HowItWorks />
      <OddsSection />
      <Mission />
      <HomeQuestions />
      <Waitlist />
    </main>
  );
}
