import React from 'react';
import { Camera, Heart, Clock, Sparkles } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { WhatsAppIcon } from './WhatsAppIcon';

export const HeroSection: React.FC = () => {
  const { contact } = useContent();
  const waLink = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappBaseMessage)}`;

  return (
    <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-[#e2e8dc] border-b border-[#e2e8dc]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex max-w-full items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-[#e2e8dc] border border-[#275240]/10 text-[#275240] text-[11px] sm:text-sm font-bold mb-5 text-balance">
          <span>Servicio de Cuidado de Gatos Exclusivo a Domicilio</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#275240] tracking-tight leading-[1.12] mb-5 font-display text-balance">
          Cuidadora de gatos <span className="text-[#275240] font-serif italic">a domicilio</span>
        </h1>

        <p className="text-base sm:text-lg text-[#275240] mb-7 max-w-2xl mx-auto leading-relaxed font-normal text-pretty">
          Visitas personalizadas de <strong className="text-[#275240] font-bold">45 minutos dedicados</strong> para que tu gato conserve su paz, rutinas y territorio mientras viajás. Comida fresca, mimos, juego y reportes detallados en vivo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 w-full">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-whatsapp-cta"
            className="w-full sm:w-auto max-w-full inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold px-5 sm:px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all border border-emerald-300/40"
          >
            <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
            <span className="text-center">Hablar con Brenda por WhatsApp</span>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-7">
          <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e8dc] border border-[#275240]/10 text-xs font-bold text-[#275240]">
            <Clock className="w-3.5 h-3.5 text-[#275240] shrink-0" /> 45 min de atención exclusiva
          </span>
          <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e8dc] border border-[#275240]/10 text-xs font-bold text-[#275240]">
            <Camera className="w-3.5 h-3.5 text-[#275240] shrink-0" /> Fotos y videos en vivo
          </span>
          <span className="inline-flex max-w-full items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2e8dc] border border-[#275240]/10 text-xs font-bold text-[#275240]">
            <Sparkles className="w-3.5 h-3.5 text-[#275240] shrink-0" /> Higiene de litera impecable
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-[#275240]/10 max-w-xl mx-auto text-center">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#275240]">
            <div className="w-7 h-7 rounded-full bg-[#e2e8dc] border border-[#275240]/10 flex items-center justify-center shrink-0 text-[#275240]">
              <Camera className="w-4 h-4" />
            </div>
            <span>Seguimiento diario por WhatsApp</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#275240]">
            <div className="w-7 h-7 rounded-full bg-[#e2e8dc] border border-[#275240]/10 flex items-center justify-center shrink-0 text-[#275240]">
              <Heart className="w-4 h-4 fill-[#275240]" />
            </div>
            <span>100% Cariño & Respeto por los gatos</span>
          </div>
        </div>
      </div>
    </section>
  );
};
