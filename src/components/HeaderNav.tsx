import React, { useState, useEffect } from 'react';
import { Cat, Menu, X, Heart } from 'lucide-react';
import { CONTACT_INFO } from '../data/catData';
import { WhatsAppIcon } from './WhatsAppIcon';
import { scrollToHash } from '../utils/smoothScroll';

export const HeaderNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToHash(href);
    if (href && href !== '#') {
      history.replaceState(null, '', href);
    } else {
      history.replaceState(null, '', window.location.pathname);
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Sobre Mí', href: '#sobre-mi' },
    { name: 'Servicios & Tarifas', href: '#servicios' },
    { name: 'Clientes Felices', href: '#fotos' },
    { name: 'Testimonios', href: '#resenas' },
    { name: 'Cobertura', href: '#cobertura' },
    { name: 'Redes Sociales', href: '#contacto' },
  ];

  const waLink = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(CONTACT_INFO.whatsappBaseMessage)}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F2F9F8]/95 backdrop-blur-md shadow-xs border-b border-[#CCE7E5] py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            id="brand-logo-link"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 sm:gap-2.5 group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#0E9F8F] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform border border-[#8FE0D8]">
              <Cat className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#132E35] block leading-none font-display truncate">
                Brenda <span className="text-[#0B8276] italic font-serif">Cat Sitter</span>
              </span>
              <span className="text-xs text-[#3B5259] font-medium flex items-center gap-1 mt-0.5">
                <Heart className="w-3 h-3 text-[#0E9F8F] fill-[#0E9F8F] shrink-0" /> Cuidado a Domicilio
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#CCE7E5] shadow-2xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xs font-semibold text-[#132E35] hover:text-[#0B8276] hover:bg-[#E0F2F1] px-3 py-1.5 rounded-full transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* WhatsApp CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 border border-emerald-400/40"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white" />
              <span>Consultar WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="lg:hidden p-2 rounded-xl text-[#132E35] bg-white border border-[#CCE7E5] hover:bg-[#E0F2F1] transition-colors shadow-2xs shrink-0"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 px-3 border border-[#CCE7E5] bg-[#F2F9F8]/98 backdrop-blur-xl rounded-2xl shadow-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 text-sm font-semibold text-[#132E35] hover:bg-[#E0F2F1] rounded-xl transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 mt-1 border-t border-[#CCE7E5]">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-bold shadow-sm border border-emerald-300/40"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  Consultar Tarifas por WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
