import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import brendaPhoto from '../assets/images/brenda_con_gato.png';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre-mi" className="py-14 sm:py-18 bg-[#F2F9F8] overflow-hidden border-t border-[#CCE7E5]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          {/* Brenda's Photo Column */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#0E9F8F] to-[#8FE0D8] rounded-3xl blur-xs opacity-40 group-hover:opacity-60 transition duration-300"></div>
              <div className="relative bg-white p-3 rounded-2xl border border-[#CCE7E5] shadow-sm">
                <img
                  src={brendaPhoto}
                  alt="Brenda sonriendo junto a un gato atigrado y blanco"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[380px] object-cover rounded-xl shadow-2xs"
                />
                <div className="mt-3 text-center">
                  <span className="font-display font-bold text-sm text-[#132E35] block">Brenda</span>
                  <span className="text-xs text-[#0B8276] font-medium">Cuidadora de gatos a domicilio</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Column */}
          <div className="md:col-span-7 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#132E35] tracking-tight leading-tight mb-4 font-display">
              ¡Hola! Soy Brenda, tu Cat Sitter de confianza
            </h2>

            <p className="text-[#3B5259] text-sm sm:text-base leading-relaxed mb-4">
              Desde siempre sentí una conexión muy especial con los animales, y en particular con los gatos. Me apasiona su lenguaje silencioso, su elegancia y esa forma única que tienen de transmitir cariño cuando se sienten seguros.
            </p>

            <p className="text-[#3B5259] text-sm sm:text-base leading-relaxed mb-6">
              Entiendo perfectamente que los gatos son seres extremadamente territoriales. Cambiarlos de ambiente o llevarlos a una guardería suele generarles mucha ansiedad. Por eso, mi servicio de <strong className="text-[#132E35] font-semibold">cuidado a domicilio</strong> garantiza que tu gatito conserve sus rutinas, sus olores, sus rincones preferidos y su tranquilidad intacta mientras vos disfrutás de tu viaje.
            </p>

            {/* Core Values List */}
            <div className="grid sm:grid-cols-2 gap-3 text-left">
              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#CCE7E5]">
                <CheckCircle2 className="w-4 h-4 text-[#0E9F8F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#132E35] font-display">Respeto por su carácter</h4>
                  <p className="text-[11px] text-[#3B5259] mt-0.5">Adaptada a sus tiempos y personalidad.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#CCE7E5]">
                <CheckCircle2 className="w-4 h-4 text-[#0E9F8F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#132E35] font-display">Atención a cada detalle</h4>
                  <p className="text-[11px] text-[#3B5259] mt-0.5">Comida fresca, litera y mimitos.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#CCE7E5]">
                <CheckCircle2 className="w-4 h-4 text-[#0E9F8F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#132E35] font-display">Tranquilidad para vos</h4>
                  <p className="text-[11px] text-[#3B5259] mt-0.5">Fotos y videos diarios en directo.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-[#CCE7E5]">
                <CheckCircle2 className="w-4 h-4 text-[#0E9F8F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#132E35] font-display">Responsabilidad total</h4>
                  <p className="text-[11px] text-[#3B5259] mt-0.5">Cuidado prudente de tu hogar.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
