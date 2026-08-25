import React, { useEffect } from 'react';
import { HeaderNav } from '../components/HeaderNav';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyHomeCareSection } from '../components/WhyHomeCareSection';
import { BookingStepsSection } from '../components/BookingStepsSection';
import { CatGallerySection } from '../components/CatGallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FaqSection } from '../components/FaqSection';
import { ContactSection } from '../components/ContactSection';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#e2e8dc] text-zinc-900 font-sans selection:bg-rose-200 selection:text-rose-950">
      <HeaderNav />
      <main>
        <HeroSection />
        <AboutSection />
        <WhyHomeCareSection />
        <BookingStepsSection />
        <ServicesSection />
        <CatGallerySection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
