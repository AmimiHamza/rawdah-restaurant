import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Narrative from '@/components/Narrative';
import Menu from '@/components/Menu';
import Reservation from '@/components/Reservation';
import OnlineOrder from '@/components/OnlineOrder';
import PrivateDining from '@/components/PrivateDining';
import DashboardPreview from '@/components/DashboardPreview';
import Contact from '@/components/Contact';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Narrative />
        <Menu />
        <Reservation />
        <OnlineOrder />
        <PrivateDining />
        <DashboardPreview />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
