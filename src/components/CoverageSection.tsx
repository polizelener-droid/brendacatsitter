import React from 'react';
import { COVERAGE_NEIGHBORHOODS, CONTACT_INFO } from '../data/catData';
import { MapPin, CheckCircle2, MessageCircle } from 'lucide-react';

export const CoverageSection: React.FC = () => {
  const waLink = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent('Hola Brenda! Quería consultar si tenés cobertura para mi gato en mi zona:')}`;

  return (
    <section id="cobertura" className="py-14 bg-[#F2F9F8] border-t border-[#CCE7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132E35] tracking-tight mb-2 font-display">
            Zonas de Cobertura
          </h2>
          <p className="text-[#3B5259] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
            Atención a domicilio en los siguientes barrios. Si tu zona está cerca, consultame directamente por WhatsApp.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto mb-8">
          {COVERAGE_NEIGHBORHOODS.map((barrio, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#CCE7E5] text-[#132E35] text-xs sm:text-sm font-bold shadow-2xs hover:bg-[#E0F2F1]/50 transition-colors font-display"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0E9F8F]" />
              <span>{barrio}</span>
            </div>
          ))}
        </div>

        {/* Custom Area CTA */}
        <div className="text-center">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#132E35] bg-[#E0F2F1] hover:bg-[#D0EBE8] px-6 py-3 rounded-full transition-all border border-[#B2DDD9] shadow-2xs hover:scale-102"
          >
            <MessageCircle className="w-4 h-4 text-[#0E9F8F]" />
            <span>Consultar disponibilidad para mi zona por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
