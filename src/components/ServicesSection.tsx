import React from 'react';
import { Utensils, Sparkles, Heart, Camera, Clock, Home, Check, Calendar, Key, CreditCard, AlertCircle, Info } from 'lucide-react';
import { SERVICES, SERVICE_RATES, ServiceItem } from '../data/catData';

const iconMap: Record<string, React.ReactNode> = {
  Clock: <Clock className="w-6 h-6 text-[#0E9F8F]" />,
  Utensils: <Utensils className="w-6 h-6 text-[#0E9F8F]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#0E9F8F]" />,
  Heart: <Heart className="w-6 h-6 text-[#0E9F8F]" />,
  Camera: <Camera className="w-6 h-6 text-[#0E9F8F]" />,
  Home: <Home className="w-6 h-6 text-[#0E9F8F]" />,
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-12 sm:py-16 bg-[#F2F9F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-[#CCE7E5]">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132E35] tracking-tight font-display">
              ¿Qué incluye cada visita de 45 minutos?
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#3B5259] max-w-lg leading-relaxed font-normal">
            Alimentación adecuada, agua limpia, higiene de bandeja sanitaria, reportes con fotos/videos en tiempo real y compañía respetando los tiempos de tu gato.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {SERVICES.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group p-4 rounded-2xl bg-white border border-[#CCE7E5] hover:border-[#8FE0D8] transition-all hover:shadow-sm flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#E0F2F1] border border-[#B2DDD9] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#D0EBE8] transition-colors">
                {iconMap[service.iconName] || <Heart className="w-4 h-4 text-[#0E9F8F]" />}
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#132E35] mb-1 font-display">
                  {service.title}
                </h3>
                <p className="text-[#3B5259] text-xs leading-relaxed">
                  {service.description}
                </p>
                {service.highlight && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#0B8276]">
                    <Check className="w-3.5 h-3.5 text-[#0E9F8F] shrink-0" />
                    <span>{service.highlight}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* PROMINENT RATES & POLICIES CARD */}
        <div className="bg-gradient-to-br from-white via-[#EBF7F6] to-[#E0F2F1] text-[#132E35] rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-[#CCE7E5]">
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8 pb-5 border-b border-[#CCE7E5]">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#132E35] font-display">
                Tarifas de las Visitas
              </h3>
              <p className="text-xs sm:text-sm text-[#3B5259] mt-1 font-medium">
                {SERVICE_RATES.periodNotice} • {SERVICE_RATES.duration}
              </p>
            </div>

            {/* Rates Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/95 p-5 rounded-2xl border border-[#CCE7E5] shadow-2xs">
                <div className="flex items-center gap-2 text-[#0B8276] text-xs font-bold mb-1.5">
                  <Calendar className="w-4 h-4" /> Lunes a Viernes
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#132E35] font-display">{SERVICE_RATES.weekday}</div>
                <p className="text-xs text-[#3B5259] mt-1">Por visita de 45 minutos</p>
              </div>

              <div className="bg-white/95 p-5 rounded-2xl border border-[#CCE7E5] shadow-2xs">
                <div className="flex items-center gap-2 text-[#0B8276] text-xs font-bold mb-1.5">
                  <Calendar className="w-4 h-4" /> Sábados
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#132E35] font-display">{SERVICE_RATES.saturday}</div>
                <p className="text-xs text-[#3B5259] mt-1">Por visita de 45 minutos</p>
              </div>

              <div className="bg-white/95 p-5 rounded-2xl border border-[#CCE7E5] shadow-2xs">
                <div className="flex items-center gap-2 text-[#0B8276] text-xs font-bold mb-1.5">
                  <Calendar className="w-4 h-4" /> Domingos y Feriados
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#132E35] font-display">{SERVICE_RATES.sundayHoliday}</div>
                <p className="text-xs text-[#3B5259] mt-1">Por visita de 45 minutos</p>
              </div>

              <div className="bg-[#DDF2F0]/90 p-5 rounded-2xl border border-[#B2DDD9] shadow-2xs">
                <div className="flex items-center gap-2 text-[#0B8276] text-xs font-bold mb-1.5">
                  <Home className="w-4 h-4" /> Entrevista Previa
                </div>
                <div className="text-2xl sm:text-3xl font-black text-[#132E35] font-display">{SERVICE_RATES.interview}</div>
                <p className="text-xs text-[#3B5259] font-medium mt-1 leading-relaxed">{SERVICE_RATES.interviewDesc}</p>
              </div>
            </div>

            {/* Policies & Details Grid */}
            <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#CCE7E5]">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] text-[#0B8276] flex items-center justify-center shrink-0 border border-[#B2DDD9] mt-0.5">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#132E35] text-xs sm:text-sm mb-0.5 font-display">Entrega de Llaves</h4>
                  <p className="text-xs text-[#3B5259] leading-relaxed">
                    {SERVICE_RATES.keyHandover}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] text-[#0B8276] flex items-center justify-center shrink-0 border border-[#B2DDD9] mt-0.5">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#132E35] text-xs sm:text-sm mb-0.5 font-display">Políticas de Pago</h4>
                  <p className="text-xs text-[#3B5259] leading-relaxed">
                    {SERVICE_RATES.paymentTerms}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E0F2F1] text-[#0B8276] flex items-center justify-center shrink-0 border border-[#B2DDD9] mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-[#132E35] text-xs sm:text-sm mb-0.5 font-display">Cancelaciones & Reembolsos</h4>
                  <p className="text-xs text-[#3B5259] leading-relaxed">
                    {SERVICE_RATES.cancellationPolicy}
                  </p>
                </div>
              </div>
            </div>

            {/* Extra Cleaning Note */}
            <div className="mt-6 pt-5 border-t border-[#CCE7E5] flex items-center gap-3 bg-white/90 p-4 rounded-2xl border border-[#CCE7E5]">
              <Info className="w-4 h-4 text-[#0E9F8F] shrink-0" />
              <p className="text-xs text-[#3B5259] leading-relaxed">
                <strong className="text-[#132E35]">Aviso de Mantenimiento de Litera:</strong> Incluye higiene diaria en todas las visitas. A partir del 7mo día consecutivo se realiza además una limpieza profunda completa de la bandeja sanitaria.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
