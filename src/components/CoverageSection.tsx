import React from 'react';
import { useContent } from '../content/ContentContext';
import { CheckCircle2 } from 'lucide-react';

export const CoverageSection: React.FC = () => {
  const { neighborhoods } = useContent();

  return (
    <section id="cobertura" className="py-14 bg-[#e2e8dc] border-t border-[#e2e8dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#275240] tracking-tight mb-2 font-display">
            Zonas de Cobertura
          </h2>
          <p className="text-[#275240] text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-normal">
            Atención a domicilio en estos barrios. Si tu zona está cerca, escribinme y lo vemos juntos.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
          {neighborhoods.map((barrio, idx) => (
            <div
              key={`${barrio}-${idx}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#e2e8dc] text-[#275240] text-xs sm:text-sm font-bold shadow-2xs hover:bg-[#e2e8dc]/50 transition-colors font-display"
            >
              <CheckCircle2 className="w-4 h-4 text-[#275240]" />
              <span>{barrio}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
