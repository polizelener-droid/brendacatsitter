import React from 'react';
import { Clock3, MapPin, PawPrint } from 'lucide-react';

type ZoneKey = 'zone1' | 'zone2' | 'zone3';

type NeighborhoodTile = {
  name: string;
  zone: ZoneKey;
};

const zoneStyles: Record<ZoneKey, { tile: string; dot: string; card: string; title: string }> = {
  zone1: {
    tile: 'border-[#9eb58f] bg-[#dfe8d8] text-[#275240]',
    dot: 'bg-[#789266]',
    card: 'border-[#9eb58f] bg-[#f7faf5]',
    title: 'text-[#466838]',
  },
  zone2: {
    tile: 'border-[#95bddb] bg-[#dcecf7] text-[#245a78]',
    dot: 'bg-[#6fa5ca]',
    card: 'border-[#95bddb] bg-[#f5faff]',
    title: 'text-[#2d78a8]',
  },
  zone3: {
    tile: 'border-[#d9aa8d] bg-[#f5dfd2] text-[#7e4935]',
    dot: 'bg-[#d58e68]',
    card: 'border-[#d9aa8d] bg-[#fff8f4]',
    title: 'text-[#9a5d42]',
  },
};

const northRow: NeighborhoodTile[] = [
  { name: 'Vicente López', zone: 'zone1' },
  { name: 'Florida', zone: 'zone1' },
];

const mapRows: NeighborhoodTile[][] = [
  [
    { name: 'Saavedra', zone: 'zone1' },
    { name: 'Núñez', zone: 'zone1' },
    { name: 'Belgrano', zone: 'zone1' },
    { name: 'Palermo', zone: 'zone2' },
    { name: 'Recoleta', zone: 'zone2' },
  ],
  [
    { name: 'Villa Pueyrredón', zone: 'zone1' },
    { name: 'Villa Urquiza', zone: 'zone1' },
    { name: 'Coghlan', zone: 'zone1' },
    { name: 'Colegiales', zone: 'zone1' },
    { name: 'Villa Ortúzar', zone: 'zone2' },
    { name: 'Villa Crespo', zone: 'zone2' },
    { name: 'Chacarita', zone: 'zone2' },
  ],
  [
    { name: 'Villa Devoto', zone: 'zone2' },
    { name: 'Parque Chas', zone: 'zone2' },
    { name: 'Agronomía', zone: 'zone2' },
    { name: 'La Paternal', zone: 'zone2' },
    { name: 'Almagro', zone: 'zone2' },
    { name: 'Puerto Madero', zone: 'zone3' },
  ],
  [{ name: 'Villa Real', zone: 'zone2' }],
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
      'Núñez · Saavedra · Belgrano · Villa Urquiza · Colegiales · Coghlan · Villa Pueyrredón · Vicente López · Florida',
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
      'Palermo · Villa Crespo · Almagro · Villa Devoto · Villa Real · Recoleta · Chacarita · La Paternal · Agronomía · Parque Chas · Villa Ortúzar',
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
    className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-3 py-2 text-center text-[11px] font-extrabold leading-tight shadow-sm sm:text-xs ${zoneStyles[tile.zone].tile}`}
  >
    {tile.name}
  </div>
);

export const CoveragePricingMap: React.FC = () => {
  return (
    <div className="mt-8 overflow-hidden rounded-[2rem] border border-[#275240]/15 bg-[#fffdf8] shadow-sm">
      <div className="border-b border-[#275240]/10 px-5 py-6 sm:px-7 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[#275240]">
              <MapPin className="h-5 w-5" aria-hidden="true" />
              <span className="text-xs font-extrabold uppercase tracking-[0.16em]">Cobertura por zona</span>
            </div>
            <h4 className="font-display text-2xl font-extrabold text-[#275240] sm:text-3xl">
              Zonas de cobertura y tarifas
            </h4>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[#275240]/75 sm:text-sm">
            El color de cada barrio indica la tarifa correspondiente según la zona de cobertura.
          </p>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.25fr_1fr] lg:p-8">
        <div className="rounded-3xl border border-[#275240]/10 bg-white p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {northRow.map((tile) => (
              <Tile key={tile.name} tile={tile} />
            ))}
            <span className="ml-auto hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-[#275240]/45 sm:inline">
              Norte
            </span>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-[#275240]/10 bg-[#f6f5f1] p-3 sm:p-4">
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#27524012_1px,transparent_1px),linear-gradient(to_bottom,#27524012_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="relative space-y-2.5">
              {mapRows.map((row, index) => (
                <div
                  key={index}
                  className={`flex flex-wrap gap-2 ${index === 1 ? 'sm:pl-5' : ''} ${index === 2 ? 'sm:pl-2' : ''}`}
                >
                  {row.map((tile) => (
                    <Tile key={tile.name} tile={tile} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-bold sm:text-xs">
            <span className="inline-flex items-center gap-2 text-[#466838]">
              <span className={`h-2.5 w-2.5 rounded-full ${zoneStyles.zone1.dot}`} /> Zona 1
            </span>
            <span className="inline-flex items-center gap-2 text-[#2d78a8]">
              <span className={`h-2.5 w-2.5 rounded-full ${zoneStyles.zone2.dot}`} /> Zona 2
            </span>
            <span className="inline-flex items-center gap-2 text-[#9a5d42]">
              <span className={`h-2.5 w-2.5 rounded-full ${zoneStyles.zone3.dot}`} /> Zona 3
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {zones.map((zone) => (
            <div key={zone.key} className={`rounded-3xl border p-4 sm:p-5 ${zoneStyles[zone.key].card}`}>
              <div className="mb-3 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current bg-white/80">
                  <PawPrint className={`h-5 w-5 ${zoneStyles[zone.key].title}`} aria-hidden="true" />
                </div>
                <div>
                  <h5 className={`font-display text-xl font-black ${zoneStyles[zone.key].title}`}>{zone.name}</h5>
                  <p className={`text-xs font-bold ${zoneStyles[zone.key].title}`}>{zone.subtitle}</p>
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
