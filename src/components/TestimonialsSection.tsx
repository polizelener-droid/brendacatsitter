import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/catData';
import {
  Star,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Heart,
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const total = TESTIMONIALS.length;

  // Responsive cards visible per slide in carousel
  const getCardsPerPage = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 640) return 2;
    }
    return 1;
  };

  const [cardsPerPage, setCardsPerPage] = useState(getCardsPerPage());

  useEffect(() => {
    const handleResize = () => setCardsPerPage(getCardsPerPage());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, total - cardsPerPage);

  // Ensure index is valid
  useEffect(() => {
    if (currentIndex > maxIndex && maxIndex >= 0) {
      setCurrentIndex(0);
    }
  }, [total, maxIndex, currentIndex]);

  // Auto slide interval
  useEffect(() => {
    if (!isPlaying || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, maxIndex]);

  const handlePrev = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Touch Swipe handlers
  const minSwipeDistance = 40;
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  return (
    <section id="resenas" className="py-14 sm:py-16 bg-[#F2F9F8] border-t border-[#CCE7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132E35] tracking-tight font-display">
              Lo que dicen las familias que me confían sus gatos
            </h2>
            <p className="mt-1 text-[#3B5259] text-xs sm:text-sm font-normal">
              Opiniones reales de tutores publicadas en Instagram.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0 self-start sm:self-end">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#132E35] bg-white hover:bg-[#E0F2F1]/50 px-3.5 py-2 rounded-xl border border-[#CCE7E5] shadow-2xs transition-all"
              title={isPlaying ? 'Pausar avance automático' : 'Activar avance automático'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-[#0E9F8F]" /> : <Play className="w-3.5 h-3.5 text-[#0E9F8F]" />}
            </button>

            <button
              onClick={handlePrev}
              aria-label="Anterior"
              className="w-9 h-9 rounded-xl bg-white border border-[#CCE7E5] text-[#132E35] shadow-2xs hover:bg-[#E0F2F1]/50 active:scale-95 transition-all flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4 text-[#0E9F8F]" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Siguiente"
              className="w-9 h-9 rounded-xl bg-white border border-[#CCE7E5] text-[#132E35] shadow-2xs hover:bg-[#E0F2F1]/50 active:scale-95 transition-all flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4 text-[#0E9F8F]" />
            </button>
          </div>
        </div>

        {/* CAROUSEL VIEW */}
        <div
          className="overflow-hidden py-2"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerPage)}%)`,
            }}
          >
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 flex flex-col px-2"
              >
                <div className="bg-white p-6 rounded-2xl border border-[#CCE7E5] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between h-full group">
                  
                  {/* Top Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar with subtle Instagram Story Ring */}
                        <div className="p-0.5 rounded-full bg-gradient-to-tr from-[#CCE7E5] via-[#0E9F8F] to-[#0B8276] shrink-0">
                          <div className="w-8 h-8 rounded-full bg-[#E0F2F1] text-[#0B8276] font-bold text-xs flex items-center justify-center border-2 border-white font-display">
                            {item.author.charAt(1).toUpperCase()}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-[#132E35] text-xs sm:text-sm truncate max-w-[140px] font-display">
                              {item.author}
                            </span>
                            <CheckCircle className="w-3.5 h-3.5 text-[#0E9F8F] shrink-0" />
                          </div>
                          <span className="text-[10px] text-[#3B5259] font-medium">
                            {item.date || 'Instagram'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 bg-[#E0F2F1]/60 px-2.5 py-1 rounded-md border border-[#B2DDD9]">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] font-bold text-[#132E35]">5.0</span>
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-[#3B5259] text-xs sm:text-sm leading-relaxed font-normal mb-5 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-[#CCE7E5] flex items-center justify-between mt-auto text-xs">
                    {item.catName ? (
                      <span className="font-bold text-[#0B8276] bg-[#E0F2F1] px-3 py-1 rounded-md border border-[#B2DDD9] text-[11px] font-display">
                        🐱 {item.catName}
                      </span>
                    ) : (
                      <span className="text-[#3B5259] font-medium text-[11px]">
                        Cuidado a domicilio
                      </span>
                    )}

                    <div className="flex items-center gap-1 text-[#3B5259] font-medium text-[11px]">
                      <Heart className="w-3.5 h-3.5 text-[#0E9F8F] fill-[#0E9F8F]" />
                      <span>Me gusta</span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};


