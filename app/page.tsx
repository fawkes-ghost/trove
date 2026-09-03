import { Hero } from '@/components/hero/Hero';
import { Ledger } from '@/components/ledger/Ledger';
import { Waitlist } from '@/components/waitlist/Waitlist';

export default function Home() {
  return (
    <main>
      <Hero />
      <Ledger />
      <Waitlist />
    </main>
  );
}
