import { Hero } from '@/components/hero/Hero';
import { OddsSection } from '@/components/home/OddsSection';
import { Mission } from '@/components/home/Mission';
import { GivingSection } from '@/components/home/GivingSection';
import { EscapeCard } from '@/components/home/EscapeCard';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';

// The hero, the field, the mission, the giving field, the open escape as a card, how it
// works, the waitlist. The ledger and the ladder live on the escape page.
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <OddsSection />
      <Mission />
      <GivingSection />
      <EscapeCard />
      <HowItWorks />
      <Waitlist />
    </main>
  );
}
