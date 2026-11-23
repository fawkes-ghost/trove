import { Hero } from '@/components/hero/Hero';
import { EscapeIntro } from '@/components/home/EscapeIntro';
import { InWriting } from '@/components/home/InWriting';
import { OddsSection } from '@/components/home/OddsSection';
import { Mission } from '@/components/home/Mission';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';
import { HowItWorks } from '@/components/home/HowItWorks';
import { HomeQuestions } from '@/components/home/HomeQuestions';

// The rhythm, in two registers. Loud once: the hero (the chance over the film, the email
// field, the rail of promises beneath). Then the house, quietly: the escape (daylight), the
// draw in writing (a sheet of paper on cloud), how it works (daylight), the field
// (daylight), the mission (loch), fair questions and founding friends (daylight), then the
// footer (loch).
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <EscapeIntro />
      <InWriting />
      <HowItWorks />
      <OddsSection />
      <Mission />
      <HomeQuestions />
      <Waitlist />
    </main>
  );
}
