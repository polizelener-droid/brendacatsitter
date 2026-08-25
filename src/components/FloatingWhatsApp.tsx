import React from 'react';
import { useContent } from '../content/ContentContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildWhatsAppUrl } from '../data/whatsappContacts';

export const FloatingWhatsApp: React.FC = () => {
  const { contact } = useContent();
  const waLink = buildWhatsAppUrl(contact.whatsapp, contact.whatsappBaseMessage);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-trigger"
        className="group flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 relative border-2 border-white"
        aria-label="Hablar con Brenda por WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 fill-white" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
        </span>
      </a>
    </div>
  );
};
