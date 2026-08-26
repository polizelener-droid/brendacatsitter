import React from 'react';
import { Calculator, KeyRound, MapPin, MessageCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Encontrá tu zona',
    description: 'Buscá tu barrio y fijate si corresponde a Zona 1 o 2.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Calculá tu presupuesto',
    description: 'Elegí zona, cantidad de gatos y días para ver un valor estimado.',
    icon: Calculator,
  },
  {
    number: '03',
    title: 'Escribinos por WhatsApp',
    description: 'Zona 1 va con Brenda. Zona 2, con Poli.',
    icon: MessageCircle,
  },
  {
    number: '04',
    title: 'Coordinamos los detalles',
    description: 'Definimos fechas, rutina, llaves y todo lo necesario antes de empezar.',
    icon: KeyRound,
  },
] as const;

export const BookingStepsSection: React.FC = () => (
  <section id="como-reservar" className="bg-[#e2e8dc] py-8 sm:py-10 scroll-mt-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-[#275240]/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#275240]/55">Paso a paso</span>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">Cómo reservar</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#275240]/65">
            Todo el proceso en cuatro pasos simples, desde encontrar tu zona hasta coordinar la visita.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.number} className="relative rounded-3xl border border-[#275240]/10 bg-[#f7f8f4] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#275240] text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="font-display text-xl font-black text-[#275240]/20">{step.number}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-extrabold text-[#275240]">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#275240]/68 sm:text-sm">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);
