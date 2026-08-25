import React, { useState } from 'react';
import { useContent } from '../content/ContentContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import {
  POLI_WHATSAPP,
  POLI_WHATSAPP_BASE_MESSAGE,
  buildWhatsAppUrl,
} from '../data/whatsappContacts';

export const FloatingWhatsApp: React.FC = () => {
  const { contact } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const brendaWaLink = buildWhatsAppUrl(contact.whatsapp, contact.whatsappBaseMessage);
  const poliWaLink = buildWhatsAppUrl(POLI_WHATSAPP, POLI_WHATSAPP_BASE_MESSAGE);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="w-60 rounded-2xl border border-[#275240]/10 bg-white p-2.5 shadow-2xl">
          <p className="px-2 pb-2 text-xs font-bold text-[#275240]">¿De qué zona sos?</p>
          <a
            href={brendaWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-[#275240] transition hover:bg-[#e2e8dc]/70"
          >
            <WhatsAppIcon className="h-4 w-4 fill-[#25D366] text-[#25D366]" />
            Zona 1 · Brenda
          </a>
          <a
            href={poliWaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-bold text-[#275240] transition hover:bg-[#e2e8dc]/70"
          >
            <WhatsAppIcon className="h-4 w-4 fill-[#25D366] text-[#25D366]" />
            Zonas 2 y 3 · Poli
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        id="floating-whatsapp-trigger"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 relative border-2 border-white"
        aria-label="Elegir contacto de WhatsApp según zona"
        aria-expanded={isOpen}
      >
        <WhatsAppIcon className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
      </button>
    </div>
  );
};
