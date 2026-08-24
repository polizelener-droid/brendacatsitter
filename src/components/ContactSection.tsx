import React from 'react';
import { InstagramLogo, WhatsAppLogo } from './SocialLogos';
import { useContent } from '../content/ContentContext';

export const ContactSection: React.FC = () => {
  const { contact } = useContent();

  return (
    <section id="contacto" className="bg-[#e2e8dc] py-12 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#275240]/10 bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">¿Hablamos?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#275240]/70">
            Para consultar disponibilidad o reservar, escribime por WhatsApp. También podés ver visitas y novedades en Instagram.
          </p>

          <div className="mx-auto mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappBaseMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#275240] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1f4033]"
            >
              <WhatsAppLogo className="h-5 w-5" />
              Escribirme por WhatsApp
            </a>

            <a
              href={contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-[#275240]/15 bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#275240] transition hover:bg-[#e2e8dc]/60"
            >
              <InstagramLogo className="h-5 w-5" />
              @{contact.instagram}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
