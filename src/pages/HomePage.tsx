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

    const root = document.documentElement;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-reveal]'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return;
    }

    root.classList.add('scroll-reveal-active');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealItems.forEach((item) => {
      if (!item.classList.contains('is-visible')) observer.observe(item);
    });

    return () => {
      observer.disconnect();
      root.classList.remove('scroll-reveal-active');
    };
  }, []);

  return (
    <div className="page-enter min-h-screen overflow-x-hidden bg-[#e2e8dc] text-zinc-900 font-sans selection:bg-rose-200 selection:text-rose-950">
      <HeaderNav />
      <main>
        <div className="scroll-reveal is-visible" data-scroll-reveal>
          <HeroSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <AboutSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <WhyHomeCareSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <BookingStepsSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <ServicesSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <CatGallerySection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <TestimonialsSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <FaqSection />
        </div>
        <div className="scroll-reveal" data-scroll-reveal>
          <ContactSection />
        </div>
      </main>
      <div className="scroll-reveal" data-scroll-reveal>
        <Footer />
      </div>
      <FloatingWhatsApp />
    </div>
  );
};
