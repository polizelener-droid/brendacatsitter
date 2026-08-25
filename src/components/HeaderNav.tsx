import React, { useEffect, useState } from 'react';
import { Cat, Heart, Menu, X } from 'lucide-react';
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
    { name: 'Zonas y presupuesto', href: '#zonas-presupuesto' },
    { name: 'Reseñas', href: '#resenas' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'border-b border-[#275240]/10 bg-[#e2e8dc]/95 py-2.5 shadow-xs backdrop-blur-md'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <a
            href="#"
            id="brand-logo-link"
            onClick={(e) => handleNavClick(e, '#')}
            className="group flex min-w-0 items-center gap-2 sm:gap-2.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e2e8dc] bg-[#275240] text-white shadow-sm transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
              <Cat className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <span className="block truncate font-display text-lg font-bold leading-none tracking-tight text-[#275240] sm:text-xl">
                Brenda <span className="font-serif italic">Cat Sitter</span>
              </span>
              <span className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[#275240]">
                <Heart className="h-3 w-3 shrink-0 fill-[#275240]" /> Cuidado a domicilio
              </span>
            </div>
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
