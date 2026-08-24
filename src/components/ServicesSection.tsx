import React from 'react';
import { Home, Calendar, Key, CreditCard, AlertCircle, Info, MessageCircle } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { CoveragePricingMap } from './CoveragePricingMap';

export const ServicesSection: React.FC = () => {
  const { services, rates, contact } = useContent();
  const whatsappNumber = contact.whatsapp.replace(/\D/g, '') || '5491161386748';
  const virtualMeetingMessage =
    'Hola Brenda, me gustaría coordinar una charla virtual gratuita para conocerte antes de reservar.';
  const virtualMeetingUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(virtualMeetingMessage)}`;

  const virtualMeetingService = services.find((service) => {
    const normalizedTitle = service.title.toLocaleLowerCase('es');
    return (
      normalizedTitle.includes('charla virtual') ||
      normalizedTitle.includes('entrevista virtual') ||
      normalizedTitle.includes('videollamada') ||
      normalizedTitle.includes('meet')
    );
  });

  const virtualTitle = virtualMeetingService?.title || 'Charla virtual gratuita';
  const virtualDescription =
    virtualMeetingService?.description ||
    'Una charla breve para conocernos, resolver dudas y contarte cómo funciona el servicio antes de reservar.';

  return (
    <section id="servicios" className="py-12 sm:py-16 bg-[#e2e8dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 mb-10">
          <div className="rounded-3xl border border-[#275240]/15 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DDF2F0] text-[#275240]">
                <Home className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h2 className="font-display text-xl font-extrabold text-[#275240] sm:text-2xl">
                  Entrevista previa
                </h2>
                <div className="mt-1 font-display text-2xl font-black text-[#275240]">
                  {rates.interview}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#275240]/80 sm:text-sm">
                  {rates.interviewDesc}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-[#275240]/15 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e2e8dc] text-[#275240]">
                  <MessageCircle className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="mb-2 inline-flex rounded-full bg-[#e2e8dc] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#275240]">
                    Gratis
                  </span>
                  <h2 className="font-display text-xl font-extrabold text-[#275240] sm:text-2xl">
                    {virtualTitle}
                  </h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#275240]/80 sm:text-sm">
                    {virtualDescription}
                  </p>
                </div>
              </div>

              <a
                href={virtualMeetingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#275240] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1f4033] focus:outline-none focus:ring-2 focus:ring-[#275240] focus:ring-offset-2 sm:w-auto sm:self-end"
                aria-label="Agendar charla virtual gratuita por WhatsApp"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                Agendar charla gratuita
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white via-[#e2e8dc] to-[#e2e8dc] text-[#275240] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-[#e2e8dc]">
          <div className="relative z-10">
            <div className="mb-8 pb-5 border-b border-[#e2e8dc]">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#275240] font-display">Tarifas de las Visitas</h3>
              <p className="text-xs sm:text-sm text-[#275240] mt-1 font-medium">
                {rates.periodNotice} • {rates.duration}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/95 p-5 rounded-2xl border border-[#e2e8dc] shadow-2xs">
                <div className="flex items-center gap-2 text-[#275240] text-xs font-bold mb-1.5">
                  <Calendar className="w-4 h-4" /> Lunes a Viernes
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#275240] font-display">{rates.weekday}</div>
                <p className="text-xs text-[#275240] mt-1">Por visita de 45 minutos</p>
              </div>
              <div className="bg-white/95 p-5 rounded-2xl border border-[#e2e8dc] shadow-2xs">
                <div className="flex items-center gap-2 text-[#275240] text-xs font-bold mb-1.5">
                  <Calendar className="w-4 h-4" /> Sábados
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#275240] font-display">{rates.saturday}</div>
                <p className="text-xs text-[#275240] mt-1">Por visita de 45 minutos</p>
              </div>
              <div className="bg-white/95 p-5 rounded-2xl border border-[#e2e8dc] shadow-2xs">
                <div className="flex items-center gap-2 text-[#275240] text-xs font-bold mb-1.5">
                  <Calendar className="w-4 h-4" /> Domingos y Feriados
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#275240] font-display">{rates.sundayHoliday}</div>
                <p className="text-xs text-[#275240] mt-1">Por visita de 45 minutos</p>
              </div>
              <div className="bg-[#DDF2F0]/90 p-5 rounded-2xl border border-[#e2e8dc] shadow-2xs">
                <div className="flex items-center gap-2 text-[#275240] text-xs font-bold mb-1.5">
                  <Home className="w-4 h-4" /> Entrevista Previa
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#275240] font-display">{rates.interview}</div>
                <p className="text-xs text-[#275240] font-medium mt-1 leading-relaxed">{rates.interviewDesc}</p>
              </div>
            </div>

            <CoveragePricingMap />

            <div className="grid md:grid-cols-3 gap-6 pt-6 mt-8 border-t border-[#e2e8dc]">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e2e8dc] text-[#275240] flex items-center justify-center shrink-0 border border-[#e2e8dc] mt-0.5">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#275240] text-xs sm:text-sm mb-0.5 font-display">Entrega de Llaves</h4>
                  <p className="text-xs text-[#275240] leading-relaxed">{rates.keyHandover}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e2e8dc] text-[#275240] flex items-center justify-center shrink-0 border border-[#e2e8dc] mt-0.5">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#275240] text-xs sm:text-sm mb-0.5 font-display">Políticas de Pago</h4>
                  <p className="text-xs text-[#275240] leading-relaxed">{rates.paymentTerms}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#e2e8dc] text-[#275240] flex items-center justify-center shrink-0 border border-[#e2e8dc] mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#275240] text-xs sm:text-sm mb-0.5 font-display">Cancelaciones & Reembolsos</h4>
                  <p className="text-xs text-[#275240] leading-relaxed">{rates.cancellationPolicy}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#e2e8dc] flex items-center gap-3 bg-white/90 p-4 rounded-2xl border border-[#e2e8dc]">
              <Info className="w-4 h-4 text-[#275240] shrink-0" />
              <p className="text-xs text-[#275240] leading-relaxed">
                <strong className="text-[#275240]">Aviso de Mantenimiento de Litera:</strong> Incluye higiene diaria en todas las visitas. A partir del 7mo día consecutivo se realiza además una limpieza profunda completa de la bandeja sanitaria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};