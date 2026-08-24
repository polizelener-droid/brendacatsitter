import React from 'react';
import { Camera, Heart, Sparkles, Utensils } from 'lucide-react';

export const WhyHomeCareSection: React.FC = () => {
  const visitItems = [
    {
      icon: <Utensils className="h-5 w-5" aria-hidden="true" />,
      title: 'Comida y agua',
      desc: 'Según su rutina habitual.',
    },
    {
      icon: <Sparkles className="h-5 w-5" aria-hidden="true" />,
      title: 'Arenero limpio',
      desc: 'Higiene en cada visita.',
    },
    {
      icon: <Heart className="h-5 w-5" aria-hidden="true" />,
      title: 'Juego y compañía',
      desc: 'Respetando sus tiempos.',
    },
    {
      icon: <Camera className="h-5 w-5" aria-hidden="true" />,
      title: 'Fotos y videos',
      desc: 'Para que sepas cómo está.',
    },
  ];

  return (
    <section id="incluye" className="bg-[#e2e8dc] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">Qué incluye cada visita</h2>
          <span className="text-sm font-semibold text-[#275240]/65">45 minutos de cuidado a domicilio</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visitItems.map((item) => (
            <div key={item.title} className="flex items-start gap-3 rounded-2xl border border-[#275240]/10 bg-white p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e2e8dc] text-[#275240]">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#275240]">{item.title}</h3>
                <p className="mt-0.5 text-xs leading-relaxed text-[#275240]/65">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
