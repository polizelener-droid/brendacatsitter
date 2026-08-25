import React from 'react';
import { InstagramLogo, WhatsAppLogo } from './SocialLogos';
import { useContent } from '../content/ContentContext';
import {
  POLI_WHATSAPP,
  POLI_WHATSAPP_BASE_MESSAGE,
  buildWhatsAppUrl,
} from '../data/whatsappContacts';

export const ContactSection: React.FC = () => {
  const { contact } = useContent();
  const brendaWhatsAppUrl = buildWhatsAppUrl(contact.whatsapp, contact.whatsappBaseMessage);
  const poliWhatsAppUrl = buildWhatsAppUrl(POLI_WHATSAPP, POLI_WHATSAPP_BASE_MESSAGE);

  return (
    <section id="contacto" className="bg-[#e2e8dc] py-12 sm:py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#275240]/10 bg-white p-6 text-center shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">¿Hablamos?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-[#275240]/70">
            Elegí tu zona y escribile directamente a quien la cubre.
          </p>

          <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
            <a
              href={brendaWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#275240] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1f4033]"
            >
              <WhatsAppLogo className="h-5 w-5" />
              Zona 1 · Hablar con Brenda
            </a>

            <a
              href={poliWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#275240] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1f4033]"
            >
              <WhatsAppLogo className="h-5 w-5" />
              Zonas 2 y 3 · Hablar con Poli
            </a>
          </div>

          <a
            href={contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-3 inline-flex min-h-12 w-full max-w-2xl items-center justify-center gap-2 rounded-2xl border border-[#275240]/15 bg-[#fffdf8] px-5 py-3 text-sm font-bold text-[#275240] transition hover:bg-[#e2e8dc]/60"
          >
            <InstagramLogo className="h-5 w-5" />
            @{contact.instagram}
          </a>
        </div>
      </div>
    </section>
  );
};
