import React from 'react';
import { Utensils, Sparkles, Heart, Camera, Clock, Home, Check, Calendar, Key, CreditCard, AlertCircle, Info, MessageCircle } from 'lucide-react';
import { SERVICES, type ServiceItem } from '../data/catData';
import { useContent } from '../content/ContentContext';
import { CoveragePricingMap } from './CoveragePricingMap';

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-6 h-6 text-[#275240]" />,
  Utensils: <Utensils className="w-6 h-6 text-[#275240]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#275240]" />,
  Heart: <Heart className="w-6 h-6 text-[#275240]" />,
  Camera: <Camera className="w-6 h-6 text-[#275240]" />,
  Home: <Home className="w-6 h-6 text-[#275240]" />,
};

export const ServicesSection: React.FC = () => {
  const { services, rates, contact } = useContent();
  const whatsappNumber = contact.whatsapp.replace(/\D/g, '') || '5491161386748';
  const virtualMeetingMessage =
    'Hola Brenda, me gustaría coordinar una charla virtual gratuita de 15 minutos para conocerte antes de reservar.';
  const virtualMeetingUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(virtualMeetingMessage)}`;
  const isVirtualMeetingService = (title: string) => {
    const normalizedTitle = title.toLocaleLowerCase('es');
    return (
      normalizedTitle.includes('charla virtual') ||
      normalizedTitle.includes('entrevista virtual') ||
      normalizedTitle.includes('videollamada') ||
      normalizedTitle.includes('meet')
    );
  };
  const isPaidInterviewService = (service: ServiceItem) => {
    const normalizedTitle = service.title.toLocaleLowerCase('es');
    return service.id === 'home-interview' || normalizedTitle.includes('entrevista previa');
  };

  const virtualMeetingService = services.find((service) =>
    isVirtualMeetingService(service.title),
  );
  const configuredVisitServices = services.filter(
    (service) =>
      !isVirtualMeetingService(service.title) && !isPaidInterviewService(service),
  );
  const defaultVisitServices = SERVICES.filter(
    (service) =>
      !isVirtualMeetingService(service.title) && !isPaidInterviewService(service),
  );
  const visitServices =
    configuredVisitServices.length > 0 ? configuredVisitServices : defaultVisitServices;

  return (
    <section id="servicios" className="py-12 sm:py-16 bg-[#e2e8dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#e2e8dc]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#275240] tracking-tight font-display">
              ¿Qué incluye cada visita de 45 minutos?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#275240] max-w-lg leading-relaxed font-normal">
            Alimentación adecuada, agua limpia, higiene de bandeja sanitaria, reportes con fotos/videos en tiempo real y compañía respetando los tiempos de tu gato.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {visitServices.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group p-4 rounded-2xl bg-white border border-[#e2e8dc] hover:border-[#e2e8dc] transition-all hover:shadow-sm flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#e2e8dc] border border-[#e2e8dc] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#e2e8dc] transition-colors">
                {iconMap[service.iconName] || <Heart className="w-4 h-4 text-[#275240]" />}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#275240] mb-1 font-display">{service.title}</h3>
                <p className="text-[#275240] text-xs leading-relaxed">{service.description}</p>
                {service.highlight && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#275240]">
                    <Check className="w-3.5 h-3.5 text-[#275240] shrink-0" />
                    <span>{service.highlight}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {virtualMeetingService && (
          <div className="mb-10 rounded-3xl border border-[#275240]/15 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#e2e8dc] text-[#275240]">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <span className="mb-2 inline-flex rounded-full bg-[#e2e8dc] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#275240]">
                    Nuevo servicio
                  </span>
                  <h3 className="font-display text-xl font-extrabold text-[#275240] sm:text-2xl">
                    {virtualMeetingService.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-[#275240] sm:text-sm">
                    {virtualMeetingService.description}
                  </p>
                  {virtualMeetingService.highlight && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#275240]">
                      <Check className="h-4 w-4 shrink-0" />
                      <span>{virtualMeetingService.highlight}</span>
                    </div>
                  )}
                </div>
              </div>
              <a
                href={virtualMeetingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#275240] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1f4033] focus:outline-none focus:ring-2 focus:ring-[#275240] focus:ring-offset-2 lg:w-auto"
                aria-label="Agendar charla virtual gratuita por WhatsApp"
              >
                <MessageCircle className="h-4 w-4 shrink-0" />
                Agendar charla gratuita
              </a>
            </div>
          </div>
        )}

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