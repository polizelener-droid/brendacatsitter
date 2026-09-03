import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToHash } from '../utils/smoothScroll';

export const HeaderNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
    { name: 'Qué incluye', href: '#incluye' },
    { name: 'Cómo reservar', href: '#como-reservar' },
    { name: 'Zonas y presupuesto', href: '#zonas-presupuesto' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#275240]/10 bg-[#e2e8dc]/95 py-2 shadow-xs backdrop-blur-md'
          : 'bg-transparent py-2.5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-9">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#"
            id="brand-logo-link"
            onClick={(e) => handleNavClick(e, '#')}
            className="group shrink-0 rounded-full transition-transform hover:scale-[1.02]"
            aria-label="Brenda Cat Sitter - Inicio"
          >
            <img
              src="/brenda-logo.jpg"
              alt="Brenda Cat Sitter"
              className="h-14 w-14 rounded-full object-cover shadow-sm sm:h-16 sm:w-16"
            />
          </a>

          <nav className="hidden items-center gap-1 rounded-full border border-[#275240]/10 bg-white/85 px-3 py-1.5 shadow-2xs backdrop-blur-md lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-[#275240] transition-colors hover:bg-[#e2e8dc]"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="shrink-0 rounded-xl border border-[#275240]/10 bg-white p-2 text-[#275240] shadow-2xs transition-colors hover:bg-[#e2e8dc] lg:hidden"
            aria-label="Menú"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mt-3 rounded-2xl border border-[#275240]/10 bg-[#e2e8dc]/98 px-3 pb-4 pt-3 shadow-xl backdrop-blur-xl lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="rounded-xl px-3.5 py-2 text-sm font-semibold text-[#275240] transition-colors hover:bg-white/60"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
