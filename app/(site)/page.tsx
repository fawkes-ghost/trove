import { Hero } from '@/components/hero/Hero';
import { StatStrip } from '@/components/home/StatStrip';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyTrove } from '@/components/home/WhyTrove';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';

// The ledger lives on the escape page. The home page states the facts in a strip.
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <StatStrip />
      <HowItWorks />
      <WhyTrove />
      <Waitlist />
    </main>
  );
}
