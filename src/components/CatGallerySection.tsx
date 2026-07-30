import React, { useState } from 'react';
import { CAT_CLIENTS, CatClient } from '../data/catData';
import { ChevronLeft, ChevronRight, Maximize2, X, Grid, Camera } from 'lucide-react';

export const CatGallerySection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'carousel' | 'grid'>('carousel');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const totalCats = CAT_CLIENTS.length;
  const activeCat = CAT_CLIENTS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCats - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCats);
  };

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  return (
    <section id="fotos" className="py-12 sm:py-16 bg-[#F2F9F8] border-t border-[#CCE7E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#CCE7E5] pb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132E35] tracking-tight font-display">
              Gatitos que cuido en sus casas
            </h2>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#CCE7E5] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'carousel'
                  ? 'bg-[#0E9F8F] text-white shadow-xs'
                  : 'text-[#3B5259] hover:text-[#132E35]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Ver de a uno</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-[#0E9F8F] text-white shadow-xs'
                  : 'text-[#3B5259] hover:text-[#132E35]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grilla</span>
            </button>
          </div>
        </div>

        {/* CAROUSEL VIEW */}
        {viewMode === 'carousel' ? (
          <div className="max-w-xl mx-auto">
            <div className="relative flex items-center justify-center py-2">
              
              {/* Prev Button */}
              <button
                onClick={handlePrev}
                aria-label="Anterior foto"
                className="absolute left-0 sm:-left-6 z-20 w-11 h-11 rounded-full bg-white border border-[#CCE7E5] text-[#132E35] shadow-sm flex items-center justify-center hover:bg-[#E0F2F1] active:scale-95 transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-[#132E35]" />
              </button>

              {/* Main Photo Card */}
              <div
                className="w-full bg-white p-3 sm:p-4 rounded-2xl shadow-sm border border-[#CCE7E5] group relative cursor-pointer"
                onClick={() => openLightbox(currentIndex)}
              >
                <div className="relative h-80 sm:h-[400px] rounded-xl overflow-hidden bg-[#132E35]">
                  <img
                    key={activeCat.id}
                    src={activeCat.image}
                    alt={`Gato ${activeCat.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white p-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                    <h3 className="text-2xl font-bold font-display">{activeCat.name}</h3>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                aria-label="Siguiente foto"
                className="absolute right-0 sm:-right-6 z-20 w-11 h-11 rounded-full bg-white border border-[#CCE7E5] text-[#132E35] shadow-sm flex items-center justify-center hover:bg-[#E0F2F1] active:scale-95 transition-all"
              >
                <ChevronRight className="w-6 h-6 text-[#132E35]" />
              </button>
            </div>

            {/* Photo Counter */}
            <div className="flex items-center justify-center my-3">
              <span className="text-xs font-bold text-[#3B5259]">
                {currentIndex + 1} de {totalCats}
              </span>
            </div>

            {/* Thumbnails Ribbon */}
            <div className="mt-2 pt-4 border-t border-[#CCE7E5] overflow-x-auto pb-2 scrollbar-thin">
              <div className="flex items-center gap-2.5 min-w-max justify-center px-1">
                {CAT_CLIENTS.map((cat: CatClient, idx: number) => {
                  const isActive = idx === currentIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        isActive
                          ? 'border-[#0E9F8F] ring-2 ring-[#E0F2F1] scale-105 z-10'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-14 h-14 object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* GRID VIEW */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CAT_CLIENTS.map((cat: CatClient, idx: number) => (
              <div
                key={cat.id}
                onClick={() => openLightbox(idx)}
                className="group relative h-64 rounded-2xl overflow-hidden bg-white border border-[#CCE7E5] cursor-pointer shadow-xs hover:shadow-md transition-all"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-3.5">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display leading-tight">{cat.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIGHTBOX MODAL */}
        {selectedPhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
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
                  src={CAT_CLIENTS[selectedPhotoIndex].image}
                  alt={CAT_CLIENTS[selectedPhotoIndex].name}
                  className="max-h-[75vh] w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-4 text-white font-display">
                <h3 className="text-2xl font-bold">{CAT_CLIENTS[selectedPhotoIndex].name}</h3>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
