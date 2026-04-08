import Navigation      from '@/components/Navigation';
import HeroOwner       from '@/components/HeroOwner';
import StatsBar        from '@/components/StatsBar';
import WhatYouGet      from '@/components/WhatYouGet';
import DashboardPreview from '@/components/DashboardPreview';
import Contact         from '@/components/Contact';
import Footer          from '@/components/Footer';
import WhatsAppButton  from '@/components/WhatsAppButton';
import ScrollProgress  from '@/components/ScrollProgress';
import BackToTop       from '@/components/BackToTop';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroOwner />
        <StatsBar />
        <WhatYouGet />
        <DashboardPreview />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
