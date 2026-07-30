import React, { useState } from 'react';
import { CONTACT_INFO } from '../data/catData';
import { Send, CheckCircle2, Cat } from 'lucide-react';
import { WhatsAppLogo, InstagramLogo, TikTokLogo, GmailLogo } from './SocialLogos';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [catInfo, setCatInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const message = `Hola Brenda! Mi nombre es ${name}. 
Quiero consultar por el cuidado de mi gato:
- WhatsApp / Teléfono: ${phone}
- Barrio / Zona: ${neighborhood || 'A confirmar'}
- Detalle de mi(s) gato(s) y fechas: ${catInfo || 'Sin detalle adicional'}`;

    const waUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-12 sm:py-16 bg-[#F2F9F8] text-[#132E35] border-t border-[#CCE7E5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#132E35] tracking-tight font-display">
            Contacto y Redes Sociales
          </h2>
          <p className="mt-1 text-[#3B5259] text-xs sm:text-sm font-normal">
            Seguí el día a día de las visitas o escribime directamente por el medio que prefieras.
          </p>
        </div>

        {/* Compact Contact Method Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto mb-8">
          
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(CONTACT_INFO.whatsappBaseMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card group bg-white hover:bg-[#E0F2F1]/50 border border-[#CCE7E5] hover:border-[#8FE0D8] p-4 rounded-2xl transition-all shadow-2xs hover:shadow-xs text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="p-2.5 mb-2 rounded-xl bg-[#E0F2F1] group-hover:scale-105 transition-transform">
                <WhatsAppLogo className="w-6 h-6" />
              </div>
              <strong className="block text-xs sm:text-sm font-bold text-[#132E35] font-display">WhatsApp</strong>
              <p className="text-[10px] text-[#3B5259] mb-3">Mensaje directo</p>
            </div>
            <span className="btn btn-ghost inline-flex items-center justify-center text-[11px] font-bold text-[#132E35] bg-[#E0F2F1] group-hover:bg-[#D0EBE8] px-3 py-1.5 rounded-full border border-[#B2DDD9] transition-colors w-full">
              Chat directo
            </span>
          </a>

          {/* Instagram Card */}
          <a
            href={CONTACT_INFO.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card group bg-white hover:bg-[#E0F2F1]/50 border border-[#CCE7E5] hover:border-[#8FE0D8] p-4 rounded-2xl transition-all shadow-2xs hover:shadow-xs text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="p-2.5 mb-2 rounded-xl bg-[#E0F2F1] group-hover:scale-105 transition-transform">
                <InstagramLogo className="w-6 h-6" />
              </div>
              <strong className="block text-xs sm:text-sm font-bold text-[#132E35] font-display">Instagram</strong>
              <p className="text-[10px] text-[#3B5259] mb-3">Fotos & historias</p>
            </div>
            <span className="btn btn-ghost inline-flex items-center justify-center text-[11px] font-bold text-[#132E35] bg-[#E0F2F1] group-hover:bg-[#D0EBE8] px-3 py-1.5 rounded-full border border-[#B2DDD9] transition-colors w-full">
              @{CONTACT_INFO.instagram}
            </span>
          </a>

          {/* TikTok Card */}
          <a
            href={CONTACT_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card group bg-white hover:bg-[#E0F2F1]/50 border border-[#CCE7E5] hover:border-[#8FE0D8] p-4 rounded-2xl transition-all shadow-2xs hover:shadow-xs text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="p-2.5 mb-2 rounded-xl bg-[#E0F2F1] group-hover:scale-105 transition-transform">
                <TikTokLogo className="w-6 h-6" />
              </div>
              <strong className="block text-xs sm:text-sm font-bold text-[#132E35] font-display">TikTok</strong>
              <p className="text-[10px] text-[#3B5259] mb-3">Videos & tips</p>
            </div>
            <span className="btn btn-ghost inline-flex items-center justify-center text-[11px] font-bold text-[#132E35] bg-[#E0F2F1] group-hover:bg-[#D0EBE8] px-3 py-1.5 rounded-full border border-[#B2DDD9] transition-colors w-full">
              @{CONTACT_INFO.tiktok}
            </span>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="card group bg-white hover:bg-[#E0F2F1]/50 border border-[#CCE7E5] hover:border-[#8FE0D8] p-4 rounded-2xl transition-all shadow-2xs hover:shadow-xs text-center flex flex-col items-center justify-between"
          >
            <div className="flex flex-col items-center">
              <div className="p-2.5 mb-2 rounded-xl bg-[#E0F2F1] group-hover:scale-105 transition-transform">
                <GmailLogo className="w-6 h-6" />
              </div>
              <strong className="block text-xs sm:text-sm font-bold text-[#132E35] font-display">Email</strong>
              <p className="text-[10px] text-[#3B5259] mb-3">Consultas formales</p>
            </div>
            <span className="btn btn-ghost inline-flex items-center justify-center text-[11px] font-bold text-[#132E35] bg-[#E0F2F1] group-hover:bg-[#D0EBE8] px-3 py-1.5 rounded-full border border-[#B2DDD9] transition-colors w-full truncate">
              {CONTACT_INFO.email}
            </span>
          </a>

        </div>

        {/* Quick Direct Form */}
        <div className="max-w-xl mx-auto bg-white border border-[#CCE7E5] p-5 sm:p-6 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-2 mb-3">
            <Cat className="w-4 h-4 text-[#0E9F8F]" />
            <h3 className="text-xs sm:text-sm font-bold text-[#132E35] font-display">
              ¿Querés hacer una consulta directa por WhatsApp?
            </h3>
          </div>

          {submitted ? (
            <div className="p-4 bg-[#E0F2F1] border border-[#B2DDD9] text-[#132E35] rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#0E9F8F] shrink-0" />
              <div>
                <p className="font-bold text-xs text-[#132E35] font-display">¡Consulta enviada a WhatsApp!</p>
                <p className="text-[11px] text-[#3B5259]">Brenda te responderá a la brevedad.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Tu Nombre *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F2F9F8] border border-[#CCE7E5] text-[#132E35] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E9F8F] focus:bg-white"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="WhatsApp *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F2F9F8] border border-[#CCE7E5] text-[#132E35] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E9F8F] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Barrio / Zona"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                    className="w-full bg-[#F2F9F8] border border-[#CCE7E5] text-[#132E35] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E9F8F] focus:bg-white"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Gato(s) y fechas de viaje"
                    value={catInfo}
                    onChange={(e) => setCatInfo(e.target.value)}
                    className="w-full bg-[#F2F9F8] border border-[#CCE7E5] text-[#132E35] rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#0E9F8F] focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#0E9F8F] hover:bg-[#0B8276] text-white font-bold rounded-lg shadow-2xs transition-colors flex items-center justify-center gap-2 text-xs border border-white/10"
              >
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Enviar Consulta a WhatsApp</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
