import React from 'react';
import { Camera, Heart } from 'lucide-react';
import brendaPhoto from '../assets/images/brenda_con_gato.png';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="bg-[#fffdf8] py-10 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 rounded-[2rem] border border-[#275240]/10 bg-white p-4 shadow-sm sm:p-6 md:grid-cols-[280px_1fr] md:gap-8">
          <div className="mx-auto w-full max-w-[280px]">
            <img
              src={brendaPhoto}
              alt="Brenda junto a un gato"
              referrerPolicy="no-referrer"
              className="aspect-[4/5] w-full rounded-2xl object-cover shadow-sm"
            />
          </div>

          <div className="text-center md:text-left">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#275240]/55">
              Sobre mí
            </p>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#275240] sm:text-3xl">
              Hola, soy Brenda
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#275240]/80 sm:text-base md:mx-0">
              Cuido gatos a domicilio para que puedan quedarse tranquilos en su casa, respetando sus rutinas y su personalidad mientras vos estás afuera.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e2e8dc] px-3 py-2 text-xs font-bold text-[#275240]">
                <Heart className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                Cuidado personalizado
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e2e8dc] px-3 py-2 text-xs font-bold text-[#275240]">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Fotos y videos en cada visita
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
