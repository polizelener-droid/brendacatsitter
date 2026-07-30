import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, KeyRound, Sparkles } from 'lucide-react';

export const WhyHomeCareSection: React.FC = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#0E9F8F] shrink-0" />,
      title: 'Cero Estrés Territorial',
      desc: 'Evita la ansiedad de traslados y guarderías.',
    },
    {
      icon: <CheckCircle2 className="w-4 h-4 text-[#0E9F8F] shrink-0" />,
      title: 'Sin Riesgo de Contagios',
      desc: 'Cero contacto con animales desconocidos.',
    },
    {
      icon: <Clock className="w-4 h-4 text-[#0E9F8F] shrink-0" />,
      title: 'Rutinas e Higiene Intactas',
      desc: 'Mantiene sus horarios y descansos de siempre.',
    },
    {
      icon: <KeyRound className="w-4 h-4 text-[#0E9F8F] shrink-0" />,
      title: 'Hogar Habitado y Seguro',
      desc: 'Supervisión presencial mientras viajás.',
    },
  ];

  return (
    <section className="py-10 bg-[#F2F9F8] border-y border-[#CCE7E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#132E35] tracking-tight font-display">
            ¿Por qué elegir cuidado a domicilio?
          </h2>
          <p className="text-xs sm:text-sm text-[#3B5259] max-w-xl font-normal">
            Los gatos son territoriales: quedarse en su casa conserva sus olores, sus hábitos cotidianos y les evita el estrés de un traslado.
          </p>
        </div>

        {/* 4 Compact Inline Benefit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl border border-[#CCE7E5] shadow-2xs flex items-start gap-3"
            >
              <div>
                <h3 className="text-sm font-bold text-[#132E35] mb-1 font-display">
                  {b.title}
                </h3>
                <p className="text-xs text-[#3B5259] leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

