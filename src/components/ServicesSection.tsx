import React from 'react';
import { AlertCircle, ChevronDown, CreditCard, Home, Info, Key, MessageCircle } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { CoveragePricingMap } from './CoveragePricingMap';

export const ServicesSection: React.FC = () => {
  const { rates, contact } = useContent();
  const whatsappNumber = contact.whatsapp.replace(/\D/g, '') || '5491161386748';

  const virtualMeetingMessage =
    'Hola Brenda, me gustaría coordinar una charla virtual gratuita para conocerte antes de reservar.';
  const virtualMeetingUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(virtualMeetingMessage)}`;

  const interviewMessage =
    'Hola Brenda, me gustaría coordinar una entrevista previa presencial para conocernos antes de reservar.';
  const interviewUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(interviewMessage)}`;

  return (
    <section id="servicios" className="bg-[#e2e8dc] py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-[#275240]/12 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#DDF2F0] text-[#275240]">
                <Home className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-extrabold text-[#275240]">Entrevista previa</h2>
                  <strong className="font-display text-xl font-black text-[#275240]">{rates.interview}</strong>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#275240]/75">
                  Visita presencial para conocernos, ver la rutina del gato y ubicar todo lo necesario.
                </p>
                <a
                  href={interviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#275240] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1f4033]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Agendar por WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#275240]/12 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e2e8dc] text-[#275240]">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-xl font-extrabold text-[#275240]">Charla virtual</h2>
                  <span className="rounded-full bg-[#e2e8dc] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#275240]">
                    Gratis
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#275240]/75">
                  Videollamada de 15 minutos para conocernos y sacarte dudas antes de reservar.
                </p>
                <a
                  href={virtualMeetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#275240] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1f4033]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Agendar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        <CoveragePricingMap />

        <details className="group mt-5 rounded-2xl border border-[#275240]/10 bg-white/85 shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-sm font-bold text-[#275240]">
            Condiciones del servicio
            <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>

          <div className="border-t border-[#275240]/10 p-5">
            <div className="grid gap-5 md:grid-cols-3">
              <div className="flex gap-3">
                <Key className="mt-0.5 h-4 w-4 shrink-0 text-[#275240]" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-bold text-[#275240]">Entrega de llaves</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#275240]/75">{rates.keyHandover}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-[#275240]" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-bold text-[#275240]">Pago</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#275240]/75">{rates.paymentTerms}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#275240]" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-bold text-[#275240]">Cancelaciones</h4>
                  <p className="mt-1 text-xs leading-relaxed text-[#275240]/75">{rates.cancellationPolicy}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex gap-3 rounded-xl bg-[#f7f8f4] p-3.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#275240]" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-[#275240]/75">
                La higiene del arenero está incluida en cada visita. Desde el 7.º día consecutivo se realiza además una limpieza profunda de la bandeja.
              </p>
            </div>
          </div>
        </details>
      </div>
    </section>
  );
};
