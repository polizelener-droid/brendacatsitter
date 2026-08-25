import React from 'react';
import { Camera, Heart, Clock, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-[#e2e8dc] border-b border-[#e2e8dc]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex max-w-full items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#e2e8dc] border border-[#e2e8dc] text-[#275240] text-[11px] sm:text-sm font-bold mb-5 shadow-2xs text-balance">
          <span>Servicio de Cuidado de Gatos Exclusivo a Domicilio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#275240] tracking-tight leading-[1.12] mb-5 font-display text-balance">
          Cuidadora de gatos <span className="text-[#275240] font-serif italic">a domicilio</span>
        </h1>

        <p className="text-base sm:text-lg text-[#275240] mb-8 max-w-2xl mx-auto leading-relaxed font-normal text-pretty">
          Visitas personalizadas de <strong className="text-[#275240] font-bold">45 minutos dedicados</strong> para que tu gato conserve su paz, rutinas y territorio mientras viajás. Comida fresca, mimos, juego y reportes detallados en vivo.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-7">
          <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e8dc] text-xs font-bold text-[#275240] shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#275240] shrink-0" /> 45 min de atención exclusiva
          </span>
          <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e8dc] text-xs font-bold text-[#275240] shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#275240] shrink-0" /> Fotos y videos en vivo
          </span>
          <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#e2e8dc] text-xs font-bold text-[#275240] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#275240] shrink-0" /> Higiene de litera impecable
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-[#e2e8dc] max-w-xl mx-auto text-center">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#275240]">
            <div className="w-7 h-7 rounded-full bg-[#e2e8dc] flex items-center justify-center shrink-0 text-[#275240]">
              <Camera className="w-4 h-4" />
            </div>
            <span>Seguimiento diario por WhatsApp</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#275240]">
            <div className="w-7 h-7 rounded-full bg-[#e2e8dc] flex items-center justify-center shrink-0 text-[#275240]">
              <Heart className="w-4 h-4 fill-[#275240]" />
            </div>
            <span>100% Cariño & Respeto por los gatos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
