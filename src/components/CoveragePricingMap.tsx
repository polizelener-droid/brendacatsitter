import React from 'react';
import { Clock3, MessageCircle, PawPrint } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BudgetCalculatorSection } from './BudgetCalculatorSection';
import { buildWhatsAppUrl } from '../data/whatsappContacts';

type ZoneKey = 'zone1' | 'zone2';

type NeighborhoodTile = {
  name: string;
  zone: ZoneKey;
};

const zoneStyles: Record<ZoneKey, { tile: string; dot: string; card: string; title: string }> = {
  zone1: {
    tile: 'border-[#a8c9df] bg-[#dff1fb] text-[#3e6f8f]',
    dot: 'bg-[#8fc1df]',
    card: 'border-[#a8c9df] bg-[#f4fbff]',
    title: 'text-[#4a7ea0]',
  },
  zone2: {
    tile: 'border-[#dfb4c9] bg-[#f8ddea] text-[#935b77]',
    dot: 'bg-[#e4a9c6]',
    card: 'border-[#dfb4c9] bg-[#fff6fa]',
    title: 'text-[#a46a87]',
  },
};

const coverageTiles: NeighborhoodTile[] = [
  { name: 'Vicente López', zone: 'zone1' },
  { name: 'Florida', zone: 'zone1' },
  { name: 'Saavedra', zone: 'zone1' },
  { name: 'Núñez', zone: 'zone1' },
  { name: 'Belgrano', zone: 'zone1' },
  { name: 'Villa Pueyrredón', zone: 'zone1' },
  { name: 'Villa Urquiza', zone: 'zone1' },
  { name: 'Coghlan', zone: 'zone1' },
  { name: 'Colegiales', zone: 'zone1' },
  { name: 'Palermo', zone: 'zone2' },
  { name: 'Recoleta', zone: 'zone2' },
  { name: 'Villa Ortúzar', zone: 'zone2' },
  { name: 'Villa Crespo', zone: 'zone2' },
  { name: 'Chacarita', zone: 'zone2' },
  { name: 'Villa Devoto', zone: 'zone2' },
  { name: 'Parque Chas', zone: 'zone2' },
  { name: 'Agronomía', zone: 'zone2' },
  { name: 'La Paternal', zone: 'zone2' },
  { name: 'Almagro', zone: 'zone2' },
  { name: 'Villa Real', zone: 'zone2' },
];

const zones = [
  {
    key: 'zone1' as const,
    name: 'Zona 1',
    prices: [
      ['Lunes a viernes', '$18.000'],
      ['Sábados', '$21.000'],
      ['Domingos y feriados', '$25.000'],
    ],
  },
  {
    key: 'zone2' as const,
    name: 'Zona 2',
    prices: [
      ['Lunes a viernes', '$20.000'],
      ['Sábados', '$23.000'],
      ['Domingos y feriados', '$27.000'],
    ],
  },
];

const Tile: React.FC<{ tile: NeighborhoodTile }> = ({ tile }) => (
  <div
    className={`inline-flex min-h-10 items-center justify-center rounded-2xl border px-3.5 py-2 text-center text-[11px] font-extrabold leading-tight sm:text-xs ${zoneStyles[tile.zone].tile}`}
  >
    {tile.name}
  </div>
);

export const CoveragePricingMap: React.FC = () => {
  const { contact } = useContent();
  const brendaWhatsAppUrl = buildWhatsAppUrl(contact.whatsapp, contact.whatsappBaseMessage);

  return (
    <div id="zonas-presupuesto" className="mt-6 scroll-mt-24 rounded-[2rem] border border-[#275240]/12 bg-white p-5 shadow-sm sm:p-7">
      <h3 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">
        Zonas, tarifas y presupuesto
      </h3>
      <p className="mt-1.5 text-xs text-[#275240]/60 sm:text-sm">
        Encontrá tu zona, revisá la tarifa por visita de 45 minutos y calculá el valor estimado de tu servicio.
      </p>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-3xl border border-[#275240]/10 bg-[#f7f7f3] p-4">
            <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(to_right,#27524012_1px,transparent_1px),linear-gradient(to_bottom,#27524012_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative flex flex-wrap gap-2.5">
              {coverageTiles.map((tile) => (
                <Tile key={tile.name} tile={tile} />
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-extrabold">
            <span className={`inline-flex items-center gap-2 ${zoneStyles.zone1.title}`}>
              <span className={`h-3 w-3 rounded-full ${zoneStyles.zone1.dot}`} /> Zona 1
            </span>
            <span className={`inline-flex items-center gap-2 ${zoneStyles.zone2.title}`}>
              <span className={`h-3 w-3 rounded-full ${zoneStyles.zone2.dot}`} /> Zona 2
            </span>
          </div>

          <div className="mt-5 rounded-3xl border border-[#275240]/10 bg-[#f7f8f4] p-4 sm:p-5">
            <div className="flex items-center gap-2 text-[#275240]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <h4 className="text-sm font-extrabold sm:text-base">¿Querés consultar disponibilidad?</h4>
            </div>
            <p className="mt-1 text-xs text-[#275240]/65">Te lleva directo al WhatsApp de Brenda.</p>

            <a
              href={brendaWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex min-h-16 items-center justify-between gap-3 rounded-2xl border border-[#b9d3bf] bg-[#f7fbf7] px-4 py-3 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="text-left">
                <span className="mb-1 flex items-center gap-2 text-xs font-bold text-[#275240]/75">
                  <span className={`h-2.5 w-2.5 rounded-full ${zoneStyles.zone1.dot}`} />
                  <span className={`h-2.5 w-2.5 rounded-full ${zoneStyles.zone2.dot}`} />
                  Todas las zonas
                </span>
                <strong className="block text-base font-black text-[#275240]">Hablar con Brenda</strong>
                <span className="mt-0.5 block text-xs text-[#275240]/65">Brenda te responde por WhatsApp.</span>
              </div>
              <WhatsAppIcon className="h-7 w-7 shrink-0 fill-[#25D366] text-[#25D366]" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          {zones.map((zone) => (
            <div key={zone.key} className={`rounded-3xl border p-4 ${zoneStyles[zone.key].card}`}>
              <div className="mb-3 flex items-center gap-2.5">
                <PawPrint className={`h-5 w-5 ${zoneStyles[zone.key].title}`} aria-hidden="true" />
                <h4 className={`font-display text-xl font-black sm:text-2xl ${zoneStyles[zone.key].title}`}>
                  {zone.name}
                </h4>
              </div>

              <div className="space-y-2">
                {zone.prices.map(([label, price]) => (
                  <div key={label} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="font-semibold text-[#275240]/75">{label}</span>
                    <strong className="font-black text-[#275240]">{price}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5 border-t border-[#275240]/10 pt-4 text-xs text-[#275240]/70 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 font-bold text-[#275240]">
          <Clock3 className="h-4 w-4" aria-hidden="true" /> Tarifas por visita de 45 minutos
        </span>
        <span>Si tu barrio queda cerca, consultanos disponibilidad.</span>
      </div>

      <BudgetCalculatorSection />
    </div>
  );
};
