import { Hero } from '@/components/hero/Hero';
import { Proposition } from '@/components/home/Proposition';
import { HowItWorks } from '@/components/home/HowItWorks';
import { WhyTrove } from '@/components/home/WhyTrove';
import { Waitlist } from '@/components/waitlist/Waitlist';
import { WebSiteJsonLd } from '@/components/site/WebSiteJsonLd';

// The ledger lives on the escape page. The home page states the proposition.
export default function Home() {
  return (
    <main>
      <WebSiteJsonLd />
      <Hero />
      <Proposition />
      <HowItWorks />
      <WhyTrove />
      <Waitlist />
    </main>
  );
}
