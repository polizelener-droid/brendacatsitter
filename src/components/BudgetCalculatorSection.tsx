import React, { useMemo, useState } from 'react';
import { Calculator, CalendarDays, Cat, MapPin, MessageCircle } from 'lucide-react';
import { useContent } from '../content/ContentContext';

const WHATSAPP_NUMBER = '5491161386748';
const EXTRA_CAT_RATE = 5_000;
const MAX_TOTAL_DAYS = 90;
const MAX_CATS = 10;

const ZONE_SURCHARGE = {
  1: 0,
  2: 2_000,
  3: 4_000,
} as const;

type CoverageZone = keyof typeof ZONE_SURCHARGE;

function parseArgentinePrice(value: string, fallback: number): number {
  const parsed = Number(value.replace(/\D/g, ''));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function formatPesos(value: number): string {
  return `$${new Intl.NumberFormat('es-AR', {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

function safeDayCount(value: string): number {
  return Math.min(MAX_TOTAL_DAYS, Math.max(0, Math.floor(Number(value) || 0)));
}

function safeCatCount(value: string): number {
  return Math.min(MAX_CATS, Math.max(1, Math.floor(Number(value) || 1)));
}

const zoneButtonStyles: Record<CoverageZone, string> = {
  1: 'border-[#a8c9df] bg-[#dff1fb] text-[#3e6f8f]',
  2: 'border-[#dfb4c9] bg-[#f8ddea] text-[#935b77]',
  3: 'border-[#ddd095] bg-[#f9f1c9] text-[#8d7a2d]',
};

export const BudgetCalculatorSection: React.FC = () => {
  const { rates } = useContent();
  const [zone, setZone] = useState<CoverageZone>(1);
  const [cats, setCats] = useState(1);
  const [weekdays, setWeekdays] = useState(1);
  const [saturdays, setSaturdays] = useState(0);
  const [sundaysAndHolidays, setSundaysAndHolidays] = useState(0);

  const prices = useMemo(() => {
    const surcharge = ZONE_SURCHARGE[zone];

    return {
      weekday: parseArgentinePrice(rates.weekday, 18_000) + surcharge,
      saturday: parseArgentinePrice(rates.saturday, 21_000) + surcharge,
      sundayHoliday: parseArgentinePrice(rates.sundayHoliday, 25_000) + surcharge,
    };
  }, [rates.weekday, rates.saturday, rates.sundayHoliday, zone]);

  const totalDays = weekdays + saturdays + sundaysAndHolidays;
  const exceedsDayLimit = totalDays > MAX_TOTAL_DAYS;
  const extraCats = Math.max(0, cats - 3);
  const extraPerVisit = extraCats * EXTRA_CAT_RATE;
  const total =
    weekdays * (prices.weekday + extraPerVisit) +
    saturdays * (prices.saturday + extraPerVisit) +
    sundaysAndHolidays * (prices.sundayHoliday + extraPerVisit);

  const whatsappMessage = [
    'Hola Brenda! Calculé un presupuesto desde tu página web.',
    `• Zona de cobertura: Zona ${zone}`,
    `• Cantidad de gatos: ${cats}`,
    `• Días de lunes a viernes: ${weekdays}`,
    `• Sábados: ${saturdays}`,
    `• Domingos y feriados: ${sundaysAndHolidays}`,
    `• Presupuesto estimado desde: ${formatPesos(total)}`,
    'Quería consultar disponibilidad y confirmar el valor final.',
  ].join('\n');

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section id="presupuesto" className="bg-[#e2e8dc] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#275240]/15 bg-white p-5 shadow-[0_18px_55px_rgba(39,82,64,0.10)] sm:p-8 lg:p-10">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#275240] text-white shadow-sm">
            <Calculator className="h-6 w-6" aria-hidden="true" />
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#275240] sm:text-4xl">
            Calculá tu presupuesto
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#275240]/80 sm:text-base">
            Elegí tu zona, la cantidad de gatos y los días del servicio.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#275240]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              ¿De qué zona sos?
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {([1, 2, 3] as CoverageZone[]).map((zoneOption) => {
                const selected = zone === zoneOption;
                return (
                  <button
                    key={zoneOption}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setZone(zoneOption)}
                    className={`min-h-12 rounded-2xl border px-3 py-2 text-sm font-extrabold transition sm:text-base ${zoneButtonStyles[zoneOption]} ${
                      selected ? 'ring-2 ring-[#275240]/35 ring-offset-2' : 'opacity-75 hover:opacity-100'
                    }`}
                  >
                    Zona {zoneOption}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-center text-[11px] text-[#275240]/60 sm:text-xs">
              Podés ver qué barrios incluye cada zona en el mapa de arriba.
            </p>
          </div>

          <div>
            <label htmlFor="cantidad-gatos" className="mb-2 flex items-center gap-2 text-sm font-bold text-[#275240]">
              <Cat className="h-4 w-4" aria-hidden="true" />
              ¿Cuántos gatos?
            </label>
            <select
              id="cantidad-gatos"
              value={cats}
              onChange={(event) => setCats(safeCatCount(event.target.value))}
              className="min-h-14 w-full rounded-2xl border border-[#275240]/20 bg-white px-4 text-base text-[#275240] outline-none transition focus:border-[#275240] focus:ring-4 focus:ring-[#275240]/10"
            >
              {Array.from({ length: MAX_CATS }, (_, index) => index + 1).map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity} {quantity === 1 ? 'gato' : 'gatos'}
                </option>
              ))}
            </select>
          </div>

          <fieldset aria-describedby="day-limit-help day-limit-error">
            <legend className="mb-1 flex items-center gap-2 text-sm font-bold text-[#275240]">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              ¿Qué días incluye el servicio?
            </legend>
            <p id="day-limit-help" className="mb-3 text-xs text-[#275240]/60">
              Máximo: {MAX_TOTAL_DAYS} días en total.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <DayInput
                id="dias-semana"
                label="Lunes a viernes"
                value={weekdays}
                onChange={setWeekdays}
                isInvalid={exceedsDayLimit}
              />
              <DayInput
                id="dias-sabado"
                label="Sábados"
                value={saturdays}
                onChange={setSaturdays}
                isInvalid={exceedsDayLimit}
              />
              <DayInput
                id="dias-domingo"
                label="Domingos y feriados"
                value={sundaysAndHolidays}
                onChange={setSundaysAndHolidays}
                isInvalid={exceedsDayLimit}
              />
            </div>
            {exceedsDayLimit && (
              <p
                id="day-limit-error"
                role="alert"
                className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
              >
                Podés calcular hasta {MAX_TOTAL_DAYS} días en total. Ingresaste {totalDays}.
              </p>
            )}
          </fieldset>
        </div>

        <div className="mt-7 rounded-3xl bg-[#e2e8dc] p-5 text-center sm:p-7" aria-live="polite">
          <span className="text-sm font-semibold text-[#275240]/75">Presupuesto estimado desde</span>
          <strong className="mt-1 block font-display text-4xl font-black text-[#275240] sm:text-5xl">
            {exceedsDayLimit ? '—' : formatPesos(total)}
          </strong>
          <p className="mt-2 text-sm text-[#275240]/80">
            Zona {zone} · {totalDays} {totalDays === 1 ? 'día' : 'días'} · {cats} {cats === 1 ? 'gato' : 'gatos'}
          </p>
          {!exceedsDayLimit && extraCats > 0 && (
            <p className="mt-1 text-xs font-semibold text-[#275240]/70">
              Incluye adicional por cantidad de gatos.
            </p>
          )}
        </div>

        <p className="mt-5 text-center text-xs leading-relaxed text-[#275240]/65 sm:text-sm">
          La entrevista previa no está incluida en este cálculo. Desde el cuarto gato se aplica un adicional por visita.
        </p>

        {exceedsDayLimit ? (
          <button
            type="button"
            disabled
            aria-describedby="day-limit-error"
            className="mt-6 flex min-h-14 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#275240]/45 px-6 py-4 text-center text-sm font-bold text-white sm:text-base"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Corregí la cantidad de días para continuar
          </button>
        ) : (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[#275240] px-6 py-4 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#1e3f32] focus:outline-none focus:ring-4 focus:ring-[#275240]/25 sm:text-base"
            aria-label="Consultar disponibilidad con Brenda por WhatsApp"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Consultar disponibilidad por WhatsApp
          </a>
        )}
      </div>
    </section>
  );
};

type DayInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  isInvalid: boolean;
};

const DayInput: React.FC<DayInputProps> = ({ id, label, value, onChange, isInvalid }) => (
  <div>
    <label htmlFor={id} className="mb-2 block min-h-8 text-xs font-semibold leading-snug text-[#275240] sm:text-sm">
      {label}
    </label>
    <input
      id={id}
      type="number"
      min="0"
      max={MAX_TOTAL_DAYS}
      step="1"
      inputMode="numeric"
      value={value}
      aria-invalid={isInvalid}
      onChange={(event) => onChange(safeDayCount(event.target.value))}
      className={`min-h-14 w-full rounded-2xl border bg-white px-4 text-base text-[#275240] outline-none transition focus:ring-4 ${
        isInvalid
          ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
          : 'border-[#275240]/20 focus:border-[#275240] focus:ring-[#275240]/10'
      }`}
    />
  </div>
);
