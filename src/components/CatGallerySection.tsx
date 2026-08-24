import React, { useEffect, useRef, useState } from 'react';
import { CAT_CLIENTS, type CatClient } from '../data/catData';
import { useContent } from '../content/ContentContext';
import { ChevronLeft, ChevronRight, Maximize2, X, Grid, Camera } from 'lucide-react';

export const CatGallerySection: React.FC = () => {
  const { cats: remoteCats } = useContent();
  const cats = remoteCats?.length ? remoteCats : CAT_CLIENTS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const thumbBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
    clickIndex: null as number | null,
  });

  const totalCats = cats.length;
  const activeCat = cats[currentIndex] ?? cats[0];

  useEffect(() => {
    setCurrentIndex(0);
  }, [cats.length]);

  useEffect(() => {
    if (dragState.current.active || !activeCat) return;
    const track = thumbsRef.current;
    const el = thumbBtnRefs.current[currentIndex];
    if (!track || !el) return;

    const left = el.offsetLeft - track.clientWidth / 2 + el.offsetWidth / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [currentIndex, activeCat]);

  if (!activeCat || totalCats === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCats - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCats);
  };

  const onThumbPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = thumbsRef.current;
    if (!track) return;

    const btn = (e.target as HTMLElement).closest('button');
    const clickIndex = btn ? thumbBtnRefs.current.findIndex((el) => el === btn) : -1;

    dragState.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: track.scrollLeft,
      moved: false,
      clickIndex: clickIndex >= 0 ? clickIndex : null,
    };
  };

  const onThumbPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = thumbsRef.current;
    if (!track || !dragState.current.active) return;
    const dx = e.clientX - dragState.current.startX;

    if (Math.abs(dx) > 8) {
      if (!dragState.current.moved) {
        dragState.current.moved = true;
        track.setPointerCapture(e.pointerId);
        track.classList.add('cursor-grabbing');
      }
      track.scrollLeft = dragState.current.scrollLeft - dx;
    }
  };

  const onThumbPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = thumbsRef.current;
    const { moved, clickIndex } = dragState.current;

    if (track?.hasPointerCapture(e.pointerId)) {
      track.releasePointerCapture(e.pointerId);
    }
    track?.classList.remove('cursor-grabbing');

    if (!moved && clickIndex !== null) {
      setCurrentIndex(clickIndex);
    }

    dragState.current.active = false;
    dragState.current.moved = false;
    dragState.current.clickIndex = null;
  };

  const openLightbox = (index: number) => setSelectedPhotoIndex(index);
  const closeLightbox = () => setSelectedPhotoIndex(null);

  return (
    <section id="fotos" className="bg-[#fffdf8] py-10 sm:py-12 overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6 pb-4 border-b border-[#275240]/10">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#275240] tracking-tight font-display">
              Algunos de los michis que cuidé
            </h2>
          </div>

          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#275240]/10 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'carousel'
                  ? 'bg-[#275240] text-white shadow-xs'
                  : 'text-[#275240] hover:bg-[#e2e8dc]/50'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>De a uno</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#275240] text-white shadow-xs'
                  : 'text-[#275240] hover:bg-[#e2e8dc]/50'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grilla</span>
            </button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <div className="max-w-sm mx-auto w-full px-8 sm:px-10">
            <div className="relative flex items-center justify-center py-1">
              <button
                onClick={handlePrev}
                aria-label="Anterior foto"
                className="absolute -left-8 sm:-left-10 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#275240]/10 text-[#275240] shadow-sm flex items-center justify-center hover:bg-[#e2e8dc] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div
                className="w-full min-w-0 bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm border border-[#275240]/10 group relative cursor-pointer"
                onClick={() => openLightbox(currentIndex)}
              >
                <div className="relative aspect-[3/4] max-h-[52vh] mx-auto rounded-xl overflow-hidden bg-[#e2e8dc]">
                  <img
                    key={activeCat.id}
                    src={activeCat.image}
                    alt={`Gato ${activeCat.name}`}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white p-1.5 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                    <h3 className="text-xl font-bold font-display">{activeCat.name}</h3>
                  </div>
                </div>
              </div>

              <button
                onClick={handleNext}
                aria-label="Siguiente foto"
                className="absolute -right-8 sm:-right-10 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#275240]/10 text-[#275240] shadow-sm flex items-center justify-center hover:bg-[#e2e8dc] active:scale-95 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-center my-2">
              <span className="text-[11px] font-bold text-[#275240]">
                {currentIndex + 1} de {totalCats}
              </span>
            </div>

            <div className="mt-1 pt-3 border-t border-[#275240]/10">
              <div
                ref={thumbsRef}
                onPointerDown={onThumbPointerDown}
                onPointerMove={onThumbPointerMove}
                onPointerUp={onThumbPointerUp}
                onPointerCancel={onThumbPointerUp}
                className="overflow-x-auto cursor-grab select-none scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                <div className="flex items-center gap-1.5 px-0.5 w-max">
                  {cats.map((cat: CatClient, idx: number) => {
                    const isActive = idx === currentIndex;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        ref={(el) => {
                          thumbBtnRefs.current[idx] = el;
                        }}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                          isActive
                            ? 'border-[#275240] ring-1 ring-[#e2e8dc] scale-105 z-10'
                            : 'border-transparent opacity-55 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          draggable={false}
                          className="w-10 h-10 object-cover object-top pointer-events-none"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {cats.map((cat: CatClient, idx: number) => (
              <div
                key={cat.id}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-[3/4] rounded-xl overflow-hidden bg-[#e2e8dc] border border-[#275240]/10 cursor-pointer shadow-xs hover:shadow-md transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <h3 className="text-base font-bold text-white font-display leading-tight">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              aria-label="Cerrar imagen"
              className="absolute top-4 right-4 text-white bg-white/20 p-2.5 rounded-full hover:bg-white/30 transition-colors z-50"
            >
              <X className="w-6 h-6" />
            </button>
            <div
              className="max-w-3xl max-h-[85vh] flex flex-col items-center justify-center text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src={cats[selectedPhotoIndex].image}
                  alt={cats[selectedPhotoIndex].name}
                  className="max-h-[75vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-white font-display">
                <h3 className="text-2xl font-bold">{cats[selectedPhotoIndex].name}</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
