import { Hero } from '@/components/hero/Hero';
import { Mission } from '@/components/home/Mission';
import { EscapeCard } from '@/components/home/EscapeCard';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';

// The hero, the mission, the open escape as a card, how it works, the waitlist. The ledger
// and the figures live on the escape page.
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <Mission />
      <EscapeCard />
      <HowItWorks />
      <Waitlist />
    </main>
  );
}
