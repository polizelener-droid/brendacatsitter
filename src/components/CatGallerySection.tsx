import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CAT_CLIENTS, type CatClient } from '../data/catData';
import { useContent } from '../content/ContentContext';
import { ChevronLeft, ChevronRight, Grid2X2, Images, X } from 'lucide-react';

type GalleryView = 'multiple' | 'grid';

export const CatGallerySection: React.FC = () => {
  const { cats: remoteCats } = useContent();
  const cats = remoteCats?.length ? remoteCats : CAT_CLIENTS;
  const trackRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<GalleryView>('multiple');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const selectedCat = selectedPhotoIndex === null ? null : cats[selectedPhotoIndex];

  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedPhotoIndex(null);
      if (event.key === 'ArrowLeft') {
        setSelectedPhotoIndex((index) => (index === null ? index : (index - 1 + cats.length) % cats.length));
      }
      if (event.key === 'ArrowRight') {
        setSelectedPhotoIndex((index) => (index === null ? index : (index + 1) % cats.length));
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedPhotoIndex, cats.length]);

  if (!cats.length) return null;

  const scrollCards = (direction: 'left' | 'right') => {
    const track = trackRef.current;
    if (!track) return;
    const amount = Math.max(280, track.clientWidth * 0.72);
    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= maxScrollLeft - 4;

    if (direction === 'left' && atStart) {
      track.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      return;
    }

    if (direction === 'right' && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    track.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const CatCard: React.FC<{ cat: CatClient; index: number; compact?: boolean }> = ({ cat, index, compact = false }) => (
    <button
      type="button"
      onClick={() => setSelectedPhotoIndex(index)}
      className={`group overflow-hidden rounded-2xl border border-[#275240]/10 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${compact ? 'w-[44vw] max-w-[210px] shrink-0 snap-start sm:w-[30%] sm:max-w-none lg:w-[23.5%]' : 'w-full'}`}
      aria-label={`Ver foto de ${cat.name}`}
    >
      <div className="aspect-[4/5] overflow-hidden bg-[#d7dfd1]">
        <img src={cat.image} alt={cat.name} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]" />
      </div>
      <div className="px-3 py-2.5 text-center">
        <span className="font-display text-sm font-extrabold text-[#275240] sm:text-base">{cat.name}</span>
      </div>
    </button>
  );

  return (
    <section id="fotos" className="bg-[#e2e8dc] py-10 sm:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#275240]/10 bg-white/85 p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-[#275240] sm:text-2xl">Michis que ya cuidé</h2>
              <p className="mt-1 text-xs text-[#275240]/60 sm:text-sm">Algunos de los gatitos que me confiaron sus familias.</p>
            </div>
            <div className="inline-flex w-fit rounded-full border border-[#275240]/10 bg-[#e2e8dc] p-1">
              <button type="button" onClick={() => setViewMode('multiple')} aria-pressed={viewMode === 'multiple'} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition sm:text-sm ${viewMode === 'multiple' ? 'bg-[#275240] text-white shadow-sm' : 'text-[#275240]/70 hover:text-[#275240]'}`}>
                <Images className="h-3.5 w-3.5" aria-hidden="true" /> Ver varias
              </button>
              <button type="button" onClick={() => setViewMode('grid')} aria-pressed={viewMode === 'grid'} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition sm:text-sm ${viewMode === 'grid' ? 'bg-[#275240] text-white shadow-sm' : 'text-[#275240]/70 hover:text-[#275240]'}`}>
                <Grid2X2 className="h-3.5 w-3.5" aria-hidden="true" /> Grilla
              </button>
            </div>
          </div>

          {viewMode === 'multiple' ? (
            <div className="relative">
              <button type="button" onClick={() => scrollCards('left')} aria-label="Ver michis anteriores" className="absolute -left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#275240]/15 bg-white text-[#275240] shadow-sm transition hover:bg-[#e2e8dc] sm:flex">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <div ref={trackRef} className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-5 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4 sm:px-5 sm:pr-5">
                {cats.map((cat: CatClient, index: number) => <CatCard key={cat.id} cat={cat} index={index} compact />)}
              </div>
              <button type="button" onClick={() => scrollCards('right')} aria-label="Ver más michis" className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#275240]/15 bg-white text-[#275240] shadow-sm transition hover:bg-[#e2e8dc] sm:flex">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-2 text-center text-[11px] text-[#275240]/45 sm:hidden">Deslizá para ver más</p>
            </div>
          ) : (
            <div ref={gridRef} className="grid max-h-[540px] grid-cols-2 gap-3 overflow-y-auto pr-1 scroll-smooth scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-h-[620px] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {cats.map((cat: CatClient, index: number) => <CatCard key={cat.id} cat={cat} index={index} />)}
            </div>
          )}
        </div>

        {selectedCat && createPortal(
          <div
            className="fixed inset-0 z-[120] flex h-dvh w-screen items-center justify-center bg-black/92 p-3 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-label={`Foto de ${selectedCat.name}`}
            onClick={() => setSelectedPhotoIndex(null)}
          >
            <button type="button" onClick={() => setSelectedPhotoIndex(null)} aria-label="Cerrar imagen" className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2.5 text-white transition hover:bg-white/25">
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedPhotoIndex((index) => (index === null ? index : (index - 1 + cats.length) % cats.length));
              }}
              aria-label="Foto anterior"
              className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:flex"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setSelectedPhotoIndex((index) => (index === null ? index : (index + 1) % cats.length));
              }}
              aria-label="Foto siguiente"
              className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:flex"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
            <figure className="flex h-full w-full max-w-6xl flex-col items-center justify-center gap-3" onClick={(event) => event.stopPropagation()}>
              <img
                src={selectedCat.image}
                alt={selectedCat.name}
                referrerPolicy="no-referrer"
                className="max-h-[min(86dvh,920px)] max-w-[min(96vw,1100px)] rounded-2xl object-contain shadow-2xl"
              />
              <figcaption className="font-display text-lg font-bold text-white sm:text-2xl">{selectedCat.name}</figcaption>
            </figure>
          </div>,
          document.body,
        )}
      </div>
    </section>
  );
};
