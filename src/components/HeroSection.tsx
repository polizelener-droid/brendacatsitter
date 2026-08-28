import React from 'react';
import { Camera, Clock, Heart, MessageCircle, PawPrint } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-b border-[#275240]/10 bg-[#d7dfd2] pt-24 pb-12 md:pt-32 md:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-10 top-16 h-44 w-44 rounded-full bg-[#c4d0be]/60 blur-3xl" />
        <div className="absolute -right-10 top-10 h-56 w-56 rounded-full bg-[#edf1e9]/80 blur-3xl" />

        <div className="absolute left-[8%] top-24 rotate-[-18deg] text-[#275240]/10">
          <PawPrint className="h-10 w-10" />
        </div>
        <div className="absolute right-[10%] top-32 rotate-[16deg] text-[#275240]/10">
          <PawPrint className="h-8 w-8" />
        </div>
        <div className="absolute left-[16%] bottom-20 rotate-[12deg] text-[#275240]/10">
          <PawPrint className="h-9 w-9" />
        </div>
        <div className="absolute right-[14%] bottom-16 rotate-[-10deg] text-[#275240]/10">
          <PawPrint className="h-10 w-10" />
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-7 lg:px-9">
        <div className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-full border border-[#275240]/10 bg-[#eef2eb] px-3 py-1.5 text-[11px] font-extrabold text-[#275240] shadow-sm sm:text-sm">
          <Heart className="h-3.5 w-3.5 fill-[#275240]" />
          Cat sitter a domicilio
        </div>

        <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.16em] text-[#275240]/60">
          Hola, soy Brenda
        </p>

        <h1 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] text-[#275240] sm:text-5xl lg:text-6xl">
          Tu gato, cuidado y tranquilo
          <span className="mt-1 block font-serif italic">en su propia casa.</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#275240]/80 sm:text-lg">
          Voy a domicilio para cuidar a tu gato, respetar su rutina y mandarte fotos y videos en cada visita.
        </p>

        <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <a
            href="#zonas-presupuesto"
            className="inline-flex items-center justify-center rounded-2xl bg-[#275240] px-5 py-3.5 text-sm font-extrabold text-white shadow-md transition-transform hover:-translate-y-0.5"
          >
            Ver zonas y presupuesto
          </a>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#275240]/15 bg-[#eef2eb] px-5 py-3.5 text-sm font-extrabold text-[#275240] shadow-sm transition-colors hover:bg-[#e5ebe1]"
          >
            Escribirme
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
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
      </div>
    </section>
  );
};
