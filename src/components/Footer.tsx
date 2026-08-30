import React from 'react';
import { Cat, Heart } from 'lucide-react';
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#275240] text-white flex items-center justify-center font-bold">
              <Cat className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-[#275240] block leading-tight font-display">
                Brenda <span className="font-serif italic">Cat Sitter</span>
              </span>
              <span className="text-[11px] text-[#275240]/70">Cuido a tu gato con amor y de forma personalizada</span>
            </div>
          </div>

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