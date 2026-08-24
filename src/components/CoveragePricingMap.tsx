import React from 'react';
import { Clock3, MapPinned, MapPin, PawPrint } from 'lucide-react';

type ZoneKey = 'zone1' | 'zone2' | 'zone3';

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
  zone3: {
    tile: 'border-[#ddd095] bg-[#f9f1c9] text-[#8d7a2d]',
    dot: 'bg-[#e5d57e]',
    card: 'border-[#ddd095] bg-[#fffdf2]',
    title: 'text-[#9a8735]',
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
  { name: 'Puerto Madero', zone: 'zone3' },
];

const zones = [
  {
    key: 'zone1' as const,
    name: 'Zona 1',
    subtitle: 'Tarifa habitual',
    prices: [
      ['Lunes a viernes', '$18.000'],
      ['Sábados', '$21.000'],
      ['Domingos y feriados', '$25.000'],
    ],
    neighborhoods:
      'Vicente López · Florida · Saavedra · Núñez · Belgrano · Villa Pueyrredón · Villa Urquiza · Coghlan · Colegiales',
  },
  {
    key: 'zone2' as const,
    name: 'Zona 2',
    subtitle: 'Con adicional por viático',
    prices: [
      ['Lunes a viernes', '$20.000'],
      ['Sábados', '$23.000'],
      ['Domingos y feriados', '$27.000'],
    ],
    neighborhoods:
      'Palermo · Recoleta · Villa Ortúzar · Villa Crespo · Chacarita · Villa Devoto · Parque Chas · Agronomía · La Paternal · Almagro · Villa Real',
  },
  {
    key: 'zone3' as const,
    name: 'Zona 3',
    subtitle: 'Cobertura especial',
    prices: [
      ['Lunes a viernes', '$22.000'],
      ['Sábados', '$25.000'],
      ['Domingos y feriados', '$29.000'],
    ],
    neighborhoods: 'Puerto Madero',
  },
];

const Tile: React.FC<{ tile: NeighborhoodTile }> = ({ tile }) => (
  <div
    className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-3.5 py-2.5 text-center text-[11px] font-extrabold leading-tight shadow-sm sm:text-xs ${zoneStyles[tile.zone].tile}`}
  >
    {tile.name}
  </div>
);

export const CoveragePricingMap: React.FC = () => {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#275240]/15 bg-[#fffdf8] shadow-sm">
      <div className="border-b border-[#275240]/10 px-5 py-6 sm:px-7 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#275240]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-extrabold uppercase tracking-[0.16em]">Cobertura por zona</span>
            </div>
            <div className="flex items-center gap-3">
              <h4 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">
                Zonas de cobertura y tarifas
              </h4>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#275240]/10 bg-gradient-to-br from-[#dff1fb] via-[#f8ddea] to-[#f9f1c9] text-[#275240] shadow-sm">
                <MapPinned className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#275240]/75 sm:text-sm">
            Los barrios están agrupados por color según la tarifa correspondiente.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.25fr_1fr] lg:p-8">
        <div className="rounded-3xl border border-[#275240]/10 bg-white p-4 sm:p-5">
          <div className="relative overflow-hidden rounded-3xl border border-[#275240]/10 bg-[#f6f5f1] p-4 sm:p-5">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#27524012_1px,transparent_1px),linear-gradient(to_bottom,#27524012_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative flex flex-wrap gap-2.5 sm:gap-3">
              {coverageTiles.map((tile) => (
                <Tile key={tile.name} tile={tile} />
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3 text-sm font-extrabold sm:text-base">
            <span className={`inline-flex items-center gap-2.5 ${zoneStyles.zone1.title}`}>
              <span className={`h-3.5 w-3.5 rounded-full ${zoneStyles.zone1.dot}`} /> Zona 1
            </span>
            <span className={`inline-flex items-center gap-2.5 ${zoneStyles.zone2.title}`}>
              <span className={`h-3.5 w-3.5 rounded-full ${zoneStyles.zone2.dot}`} /> Zona 2
            </span>
            <span className={`inline-flex items-center gap-2.5 ${zoneStyles.zone3.title}`}>
              <span className={`h-3.5 w-3.5 rounded-full ${zoneStyles.zone3.dot}`} /> Zona 3
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {zones.map((zone) => (
            <div key={zone.key} className={`rounded-3xl border p-4 sm:p-5 ${zoneStyles[zone.key].card}`}>
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current bg-white/80">
                  <PawPrint className={`h-5 w-5 ${zoneStyles[zone.key].title}`} aria-hidden="true" />
                </div>
                <div>
                  <h5 className={`font-display text-2xl font-black sm:text-3xl ${zoneStyles[zone.key].title}`}>{zone.name}</h5>
                  <p className={`text-sm font-bold sm:text-base ${zoneStyles[zone.key].title}`}>{zone.subtitle}</p>
                </div>
              </div>

              <div className="space-y-1.5 border-y border-current/10 py-3">
                {zone.prices.map(([label, price]) => (
                  <div key={label} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                    <span className="font-semibold text-[#275240]/80">{label}</span>
                    <strong className="font-black text-[#275240]">{price}</strong>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-[#275240]/70">{zone.neighborhoods}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-[#275240]/10 bg-white/70 px-5 py-4 text-xs text-[#275240]/75 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
        <span className="inline-flex items-center gap-2 font-bold text-[#275240]">
          <Clock3 className="h-4 w-4" aria-hidden="true" /> Visitas de 45 min
        </span>
        <span>Si tenés dudas sobre tu barrio, consultanos disponibilidad.</span>
      </div>
    </div>
  );
};
