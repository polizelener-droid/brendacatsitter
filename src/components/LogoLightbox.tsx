import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const LogoLightbox: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-brenda-logo', handleOpen);
    return () => window.removeEventListener('open-brenda-logo', handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Logo de Brenda Cat Sitter"
      onClick={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen(false)}
        className="absolute right-5 top-5 rounded-full bg-white/90 p-2 text-[#275240] shadow-lg transition-transform hover:scale-105"
        aria-label="Cerrar logo"
      >
        <X className="h-6 w-6" />
      </button>
      <img
        src="/brenda-logo.jpg"
        alt="Brenda Cat Sitter"
        className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export const openBrendaLogo = () => {
  window.dispatchEvent(new Event('open-brenda-logo'));
};
