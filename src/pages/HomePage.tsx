import React, { useEffect } from 'react';
import { HeaderNav } from '../components/HeaderNav';
import { HeroSection } from '../components/HeroSection';
import { ServicesSection } from '../components/ServicesSection';
import { BudgetCalculatorSection } from '../components/BudgetCalculatorSection';
import { AboutSection } from '../components/AboutSection';
import { WhyHomeCareSection } from '../components/WhyHomeCareSection';
import { CatGallerySection } from '../components/CatGallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ContactSection } from '../components/ContactSection';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';
import { Footer } from '../components/Footer';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-pink-50/70 via-rose-50/40 to-white text-zinc-900 font-sans selection:bg-rose-200 selection:text-rose-950">
      <HeaderNav />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <CatGallerySection />
        <WhyHomeCareSection />
        <BudgetCalculatorSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};
