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

const MapLabel: React.FC<{ x: number; y: number; lines: string[] }> = ({ x, y, lines }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fill="#275240"
    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontWeight="700"
    fontSize="13"
  >
    {lines.map((line, index) => (
      <tspan key={line} x={x} dy={index === 0 ? 0 : 15}>
        {line}
      </tspan>
    ))}
  </text>
);

const CabaCoverageMap: React.FC = () => (
  <div className="mt-6 flex flex-1 items-center justify-center overflow-hidden rounded-3xl border border-[#275240]/10 bg-[#fffaf3] p-2 sm:p-3">
    <svg
      viewBox="0 0 620 720"
      className="h-auto w-full"
      role="img"
      aria-label="Mapa ilustrado de las zonas de cobertura de Brenda Cat Sitter en CABA y zona norte"
    >
      <defs>
        <filter id="softMapShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#275240" floodOpacity="0.10" />
        </filter>
        <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#edf8fd" />
          <stop offset="100%" stopColor="#d8eff9" />
        </linearGradient>
      </defs>

      <rect width="620" height="720" rx="26" fill="#fffaf3" />

      <g opacity="0.65" stroke="#8fa58f" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M34 70c20 4 35 14 45 31M45 61c-4 11-5 22-4 34M55 73c8-12 15-20 23-25" />
        <path d="M530 68c20 3 36 14 48 30M547 56c-3 13-4 24-2 36M557 73c9-11 17-18 25-23" />
      </g>

      <path
        d="M432 145c44 6 91 22 126 53 23 20 35 46 42 75v287c-21-17-45-24-69-24-29 0-53 11-72 25-20 16-43 25-70 28-30 3-60-5-86-19-33-19-61-47-78-80-20-39-29-82-24-126 5-45 25-88 57-121 31-33 75-60 124-77 20-7 42-14 70-21Z"
        fill="url(#riverGradient)"
        opacity="0.9"
      />

      <g filter="url(#softMapShadow)" stroke="#ffffff" strokeWidth="3" strokeLinejoin="round">
        <path d="M111 86 181 48 245 74 244 143 174 168 117 145Z" fill="#dff1fb" />
        <path d="M273 78 334 93 353 147 318 177 283 148 260 114Z" fill="#dff1fb" />

        <path d="M123 183 189 164 213 223 168 253 108 235Z" fill="#dff1fb" />
        <path d="M191 164 251 151 287 196 253 236 213 223Z" fill="#dff1fb" />
        <path d="M167 253 213 223 240 262 211 297 172 289Z" fill="#dff1fb" />
        <path d="M252 236 307 216 343 259 322 307 262 306 240 262Z" fill="#dff1fb" />
        <path d="M105 235 168 253 172 289 142 336 82 322Z" fill="#dff1fb" />
        <path d="M142 336 172 289 211 297 235 346 190 376 139 364Z" fill="#dff1fb" />
        <path d="M211 297 262 306 286 350 235 346Z" fill="#dff1fb" />

        <path d="M286 196 372 194 419 237 392 305 322 307 343 259Z" fill="#f8ddea" />
        <path d="M419 237 468 253 497 302 462 338 392 305Z" fill="#f8ddea" />
        <path d="M190 376 235 346 286 350 307 395 258 426 205 418Z" fill="#f8ddea" />
        <path d="M286 350 322 307 392 305 408 365 350 402 307 395Z" fill="#f8ddea" />
        <path d="M408 365 462 338 506 365 490 413 430 417Z" fill="#f8ddea" />
        <path d="M82 322 139 364 149 414 104 451 61 413Z" fill="#f8ddea" />
        <path d="M149 414 205 418 226 463 180 493 123 474 104 451Z" fill="#f8ddea" />
        <path d="M258 426 307 395 350 402 359 455 309 474 263 460Z" fill="#f8ddea" />
        <path d="M226 463 263 460 309 474 303 522 248 531 205 502Z" fill="#f8ddea" />
        <path d="M61 413 104 451 123 474 105 522 61 545 39 495Z" fill="#f8ddea" />

        <path d="M497 302 536 310 551 353 540 400 510 414 490 413 506 365Z" fill="#f9f1c9" />

        <path d="M359 455 430 417 490 413 498 471 461 514 397 522 303 522 309 474Z" fill="#eeeeea" />
        <path d="M105 522 205 502 248 531 225 584 150 605 83 571Z" fill="#eeeeea" />
        <path d="M248 531 303 522 397 522 379 584 300 607 225 584Z" fill="#eeeeea" />
        <path d="M397 522 461 514 498 471 524 514 505 568 446 596 379 584Z" fill="#eeeeea" />
      </g>

      <g fill="none" stroke="#9dcfe5" strokeWidth="2" strokeLinecap="round" opacity="0.7">
        <path d="M507 180q8-8 16 0t16 0" />
        <path d="M536 214q8-8 16 0t16 0" />
        <path d="M520 248q8-8 16 0t16 0" />
      </g>

      <MapLabel x={178} y={102} lines={['Vicente', 'López']} />
      <MapLabel x={307} y={119} lines={['Florida']} />
      <MapLabel x={154} y={211} lines={['Saavedra']} />
      <MapLabel x={244} y={190} lines={['Núñez']} />
      <MapLabel x={205} y={269} lines={['Coghlan']} />
      <MapLabel x={292} y={266} lines={['Belgrano']} />
      <MapLabel x={111} y={278} lines={['Villa', 'Pueyrredón']} />
      <MapLabel x={185} y={330} lines={['Villa', 'Urquiza']} />
      <MapLabel x={253} y={332} lines={['Colegiales']} />

      <MapLabel x={365} y={253} lines={['Palermo']} />
      <MapLabel x={449} y={287} lines={['Recoleta']} />
      <MapLabel x={222} y={391} lines={['Villa', 'Ortúzar']} />
      <MapLabel x={336} y={361} lines={['Villa', 'Crespo']} />
      <MapLabel x={456} y={387} lines={['Chacarita']} />
      <MapLabel x={100} y={373} lines={['Villa', 'Devoto']} />
      <MapLabel x={171} y={447} lines={['Agronomía']} />
      <MapLabel x={309} y={434} lines={['Parque', 'Chas']} />
      <MapLabel x={278} y={496} lines={['La', 'Paternal']} />
      <MapLabel x={334} y={442} lines={['Almagro']} />
      <MapLabel x={73} y={480} lines={['Villa', 'Real']} />
      <MapLabel x={524} y={356} lines={['Puerto', 'Madero']} />

      <g transform="translate(67 570)" fill="#d9c8b6" opacity="0.9">
        <ellipse cx="37" cy="73" rx="29" ry="41" />
        <circle cx="37" cy="29" r="20" />
        <path d="M21 18 25 0 35 12M45 12 55 0 54 19" />
        <path d="M12 90c-28 6-24 37 3 34 13-1 20-9 24-17-12 7-22 7-28 2-6-5-5-13 1-19Z" />
      </g>

      <g transform="translate(365 625)" fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" fontWeight="800" fontSize="13">
        <g transform="translate(0 0)">
          <circle cx="12" cy="12" r="9" fill="#8fc1df" />
          <text x="28" y="17" fill="#4a7ea0">Zona 1</text>
        </g>
        <g transform="translate(82 0)">
          <circle cx="12" cy="12" r="9" fill="#e4a9c6" />
          <text x="28" y="17" fill="#a46a87">Zona 2</text>
        </g>
        <g transform="translate(164 0)">
          <circle cx="12" cy="12" r="9" fill="#e5d57e" />
          <text x="28" y="17" fill="#9a8735">Zona 3</text>
        </g>
      </g>

      <text
        x="310"
        y="690"
        textAnchor="middle"
        fill="#275240"
        opacity="0.65"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontWeight="600"
        fontSize="12"
      >
        Mapa ilustrativo · Barrios agrupados según tarifa
      </text>
    </svg>
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
        <div className="flex h-full flex-col rounded-3xl border border-[#275240]/10 bg-white p-4 sm:p-5">
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

          <CabaCoverageMap />
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
