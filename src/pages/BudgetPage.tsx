import React, { useEffect } from 'react';
import { BudgetCalculatorSection } from '../components/BudgetCalculatorSection';

type ZoneKey = 'zone1' | 'zone2';

type Neighborhood = {
  name: string;
  zone: ZoneKey;
};

const neighborhoods: Neighborhood[] = [
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

const zoneStyles: Record<ZoneKey, string> = {
  zone1: 'border-[#a8c9df] bg-[#dff1fb] text-[#3e6f8f]',
  zone2: 'border-[#dfb4c9] bg-[#f8ddea] text-[#935b77]',
};

export const BudgetPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#d7dfd2] text-zinc-900 font-sans">
      <main className="mx-auto grid min-h-screen max-w-6xl items-start gap-5 px-3 py-4 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <BudgetCalculatorSection />

        <aside className="mt-6 rounded-[1.75rem] border border-[#275240]/10 bg-[#f7f8f4] p-4 sm:p-5 lg:sticky lg:top-6">
          <h2 className="font-display text-xl font-extrabold tracking-tight text-[#275240] sm:text-2xl">
            Zonas de cobertura
          </h2>
          <p className="mt-1.5 text-xs leading-relaxed text-[#275240]/60 sm:text-sm">
            Revisá qué barrios corresponden a cada zona antes de elegir tu presupuesto.
          </p>

          <div className="mt-4 rounded-2xl border border-[#275240]/10 bg-white p-3">
            <div className="relative flex flex-wrap gap-2">
              {neighborhoods.map((neighborhood) => (
                <span
                  key={neighborhood.name}
                  className={`inline-flex min-h-9 items-center justify-center rounded-2xl border px-3 py-1.5 text-center text-[10px] font-extrabold leading-tight sm:text-[11px] ${zoneStyles[neighborhood.zone]}`}
                >
                  {neighborhood.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-extrabold sm:text-sm">
            <span className="inline-flex items-center gap-2 text-[#4a7ea0]">
              <span className="h-3 w-3 rounded-full bg-[#8fc1df]" /> Zona 1
            </span>
            <span className="inline-flex items-center gap-2 text-[#a46a87]">
              <span className="h-3 w-3 rounded-full bg-[#e4a9c6]" /> Zona 2
            </span>
          </div>
        </aside>
      </main>
    </div>
  );
};
