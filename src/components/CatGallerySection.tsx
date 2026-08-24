import React, { useRef, useState } from 'react';
import { CAT_CLIENTS, type CatClient } from '../data/catData';
import { useContent } from '../content/ContentContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export const CatGallerySection: React.FC = () => {
  const { cats: remoteCats } = useContent();
  const cats = remoteCats?.length ? remoteCats : CAT_CLIENTS;
  const trackRef = useRef<HTMLDivElement>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  if (!cats.length) return null;

  const scrollCards = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;

    const amount = Math.max(260, track.clientWidth * 0.78);
    track.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="fotos" className="overflow-hidden bg-[#e2e8dc] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-extrabold tracking-tight text-[#275240] sm:text-2xl">
              Michis que ya cuidé
            </h2>
            <p className="mt-1 text-xs text-[#275240]/60 sm:text-sm">
              Algunos de los gatitos que me confiaron sus familias.
            </p>
          </div>

          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollCards('left')}
              aria-label="Ver michis anteriores"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#275240]/15 bg-white text-[#275240] transition hover:bg-[#e2e8dc]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollCards('right')}
              aria-label="Ver más michis"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#275240]/15 bg-white text-[#275240] transition hover:bg-[#e2e8dc]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-8 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:pr-0"
        >
          {cats.map((cat: CatClient, index: number) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedPhotoIndex(index)}
              className="group relative w-[72vw] max-w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-[#275240]/10 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:w-[31%] sm:max-w-none lg:w-[23.5%]"
              aria-label={`Ver foto de ${cat.name}`}
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#e2e8dc]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-3.5 py-3">
                <span className="font-display text-sm font-extrabold text-[#275240] sm:text-base">
                  {cat.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-2 text-center text-[11px] text-[#275240]/45 sm:hidden">
          Deslizá para ver más
        </p>

        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button
              type="button"
              onClick={() => setSelectedPhotoIndex(null)}
              aria-label="Cerrar imagen"
              className="absolute right-4 top-4 z-50 rounded-full bg-white/20 p-2.5 text-white transition hover:bg-white/30"
            >
              <X className="h-6 w-6" />
            </button>

            <div
              className="flex max-h-[88vh] max-w-3xl flex-col items-center"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={cats[selectedPhotoIndex].image}
                alt={cats[selectedPhotoIndex].name}
                referrerPolicy="no-referrer"
                className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
              />
              <h3 className="mt-3 font-display text-xl font-bold text-white">
                {cats[selectedPhotoIndex].name}
              </h3>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
