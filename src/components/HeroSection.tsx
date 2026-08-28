import React from 'react';
import { Camera, Clock, Heart, MapPin, MessageCircle } from 'lucide-react';
import heroPhoto from '../assets/images/brenda_hero_cat_sitter_1785293436439.jpg';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-[#275240]/10 bg-[#d7dfd2] pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-[#c6d2bf]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[#edf1e9]/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:px-9">
        <div className="text-center lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#275240]/10 bg-[#eef2eb] px-3 py-1.5 text-[11px] font-extrabold text-[#275240] shadow-sm sm:text-sm">
            <Heart className="h-3.5 w-3.5 fill-[#275240]" />
            Cat sitter a domicilio
          </div>

          <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-[#275240] sm:text-5xl lg:text-6xl">
            Tu gato se queda en casa.
            <span className="mt-1 block font-serif italic">Yo lo cuido por vos.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#275240]/80 sm:text-lg lg:mx-0">
            Visitas personalizadas de <strong className="font-extrabold text-[#275240]">45 minutos</strong> con comida, agua, limpieza del arenero, juego, mimos y fotos o videos en cada visita.
          </p>

          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            <a
              href="#zonas-presupuesto"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#275240] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition-transform hover:-translate-y-0.5"
            >
              Ver zonas y presupuesto
              <MapPin className="h-4 w-4" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#275240]/15 bg-[#eef2eb] px-5 py-3.5 text-sm font-extrabold text-[#275240] shadow-sm transition-colors hover:bg-[#e5ebe1]"
            >
              Escribirme
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2eb] px-3 py-2 text-xs font-bold text-[#275240] shadow-sm">
              <Clock className="h-3.5 w-3.5" /> 45 minutos por visita
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2eb] px-3 py-2 text-xs font-bold text-[#275240] shadow-sm">
              <Camera className="h-3.5 w-3.5" /> Fotos y videos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2eb] px-3 py-2 text-xs font-bold text-[#275240] shadow-sm">
              <Heart className="h-3.5 w-3.5 fill-[#275240]" /> Cuidado personalizado
            </span>
          </div>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#275240]/10 bg-[#cfd9ca]/75 px-3.5 py-2.5 text-xs font-bold text-[#275240] sm:text-sm">
            <MapPin className="h-4 w-4 shrink-0" />
            CABA + Florida + Vicente López + Olivos + Sáenz Peña
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px] lg:mx-0 lg:ml-auto">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-[2rem] border border-[#275240]/10 bg-[#c6d2bf] sm:-left-4 sm:-top-4" />
          <div className="relative overflow-hidden rounded-[2rem] border border-[#275240]/10 bg-[#eef2eb] p-2 shadow-xl">
            <img
              src={heroPhoto}
              alt="Brenda cuidando un gato"
              className="aspect-[4/5] w-full rounded-[1.55rem] object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/40 bg-[#eef2eb]/92 p-4 shadow-lg backdrop-blur-md">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#275240]/55">Mientras vos viajás</p>
              <p className="mt-1 font-display text-lg font-extrabold leading-tight text-[#275240] sm:text-xl">
                Tu gato sigue con su rutina, en su lugar de siempre.
              </p>
            </div>
          </div>

          <div className="absolute -right-3 top-6 hidden rounded-2xl border border-[#275240]/10 bg-[#eef2eb] px-3 py-2 text-xs font-extrabold text-[#275240] shadow-lg sm:flex sm:items-center sm:gap-2">
            <Camera className="h-4 w-4" />
            Reportes en cada visita
          </div>
        </div>
      </div>
    </section>
  );
};
