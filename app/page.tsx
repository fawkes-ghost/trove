import { Hero } from '@/components/hero/Hero';
import { Ledger } from '@/components/ledger/Ledger';

export default function Home() {
  return (
    <main>
      <Hero />
      <Ledger />
      <section id="waitlist" className="border-t border-ink/15 px-6 py-16 md:px-10">
        <p className="max-w-[40rem] text-lg">Founding friends hear first when entries open.</p>
      </section>
    </main>
  );
}
