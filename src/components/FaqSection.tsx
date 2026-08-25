import React from 'react';
import { ChevronDown, CircleHelp } from 'lucide-react';

const faqs = [
  {
    question: '¿Cuánto dura cada visita?',
    answer: 'Cada visita dura 45 minutos dedicados al cuidado, la rutina, la higiene, el juego y la compañía de tu gato.',
  },
  {
    question: '¿Mandamos fotos y videos?',
    answer: 'Sí. Durante el servicio recibís seguimiento por WhatsApp con fotos, videos y novedades para que sepas cómo está tu gato.',
  },
  {
    question: '¿Con quién hablo según mi zona?',
    answer: 'Si estás en Zona 1, te atiende Brenda. Si estás en Zona 2 o Zona 3, te atiende Poli. La página te dirige automáticamente al WhatsApp correspondiente.',
  },
  {
    question: '¿Qué pasa si mi barrio no aparece?',
    answer: 'Si estás cerca de una zona de cobertura, consultanos igual. Revisamos la ubicación y la disponibilidad antes de confirmar.',
  },
  {
    question: '¿Puedo saber el precio antes de escribir?',
    answer: 'Sí. En “Zonas, tarifas y presupuesto” podés elegir tu zona, cantidad de gatos y días para obtener un presupuesto estimado.',
  },
  {
    question: '¿Hay una instancia para conocernos antes?',
    answer: 'Sí. Podés coordinar una entrevista presencial o una charla virtual gratuita antes de reservar el servicio.',
  },
] as const;

export const FaqSection: React.FC = () => (
  <section id="preguntas" className="bg-[#e2e8dc] py-10 sm:py-12 scroll-mt-24">
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#275240] shadow-sm">
          <CircleHelp className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">Preguntas frecuentes</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#275240]/65">
          Algunas respuestas rápidas antes de reservar.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="group rounded-2xl border border-[#275240]/10 bg-white shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-extrabold text-[#275240] sm:text-base">
              {faq.question}
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="border-t border-[#275240]/8 px-5 py-4">
              <p className="text-sm leading-relaxed text-[#275240]/70">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  </section>
);
