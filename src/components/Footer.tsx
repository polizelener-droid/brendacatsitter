import React from 'react';
import { Heart } from 'lucide-react';
import { openBrendaLogo } from './LogoLightbox';
import { scrollToHash } from '../utils/smoothScroll';

export const Footer: React.FC = () => {
  const footerLinks = [
    { name: 'Servicios & Tarifas', href: '#servicios' },
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Clientes Felices', href: '#fotos' },
    { name: 'Testimonios', href: '#resenas' },
    { name: 'Cobertura', href: '#cobertura' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
    history.replaceState(null, '', href);
  };

  return (
    <footer className="bg-[#e2e8dc] py-10 text-[#275240] border-t border-[#275240]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#275240]/10 text-center md:text-left">
          <button
            type="button"
            onClick={openBrendaLogo}
            aria-label="Abrir logo de Brenda Cat Sitter"
            className="shrink-0 transition-transform hover:scale-[1.03]"
          >
            <img src="/brenda-logo.jpg" alt="Brenda Cat Sitter" className="h-28 w-28 rounded-full object-cover shadow-sm" />
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-[#275240] font-display">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:opacity-70 transition-opacity"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#275240]/70 gap-2 text-center sm:text-left font-medium">
          <p>© Brenda Cat Sitter. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1 justify-center">
            Hecho con <Heart className="w-3.5 h-3.5 text-[#275240] fill-[#275240] inline" /> pensando en el bienestar de tus gatos
          </p>
        </div>
      </div>
    </footer>
  );
};