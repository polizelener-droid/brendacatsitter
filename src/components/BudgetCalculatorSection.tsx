import React, { useMemo, useState } from 'react';
import { Calculator, CalendarDays, Cat, MessageCircle } from 'lucide-react';
import { useContent } from '../content/ContentContext';

const WHATSAPP_NUMBER = '5491161386748';
const EXTRA_CAT_RATE = 5_000;

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
  return Math.max(0, Math.floor(Number(value) || 0));
}

export const BudgetCalculatorSection: React.FC = () => {
  const { rates } = useContent();
  const [cats, setCats] = useState(1);
  const [weekdays, setWeekdays] = useState(1);
  const [saturdays, setSaturdays] = useState(0);
  const [sundaysAndHolidays, setSundaysAndHolidays] = useState(0);

  const prices = useMemo(
    () => ({
      weekday: parseArgentinePrice(rates.weekday, 18_000),
      saturday: parseArgentinePrice(rates.saturday, 21_000),
      sundayHoliday: parseArgentinePrice(rates.sundayHoliday, 25_000),
    }),
    [rates.weekday, rates.saturday, rates.sundayHoliday],
  );

  const totalDays = weekdays + saturdays + sundaysAndHolidays;
  const extraCats = Math.max(0, cats - 3);
  const extraPerVisit = extraCats * EXTRA_CAT_RATE;
  const total =
    weekdays * (prices.weekday + extraPerVisit) +
    saturdays * (prices.saturday + extraPerVisit) +
    sundaysAndHolidays * (prices.sundayHoliday + extraPerVisit);

  const whatsappMessage = [
    'Hola Brenda! Calculé un presupuesto desde tu página web.',
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
            Indicá cuántos gatos son y cuántos días corresponden a cada tarifa.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="cantidad-gatos" className="mb-2 flex items-center gap-2 text-sm font-bold text-[#275240]">
              <Cat className="h-4 w-4" aria-hidden="true" />
              ¿Cuántos gatos?
            </label>
            <select
              id="cantidad-gatos"
              value={cats}
              onChange={(event) => setCats(Number(event.target.value))}
              className="min-h-14 w-full rounded-2xl border border-[#275240]/20 bg-white px-4 text-base text-[#275240] outline-none transition focus:border-[#275240] focus:ring-4 focus:ring-[#275240]/10"
            >
              {Array.from({ length: 8 }, (_, index) => index + 1).map((quantity) => (
                <option key={quantity} value={quantity}>
                  {quantity} {quantity === 1 ? 'gato' : 'gatos'}
                </option>
              ))}
            </select>
          </div>

          <fieldset>
            <legend className="mb-3 flex items-center gap-2 text-sm font-bold text-[#275240]">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              ¿Qué días incluye el servicio?
            </legend>
            <div className="grid gap-4 md:grid-cols-3">
              <DayInput
                id="dias-semana"
                label="Días de lunes a viernes"
                value={weekdays}
                onChange={setWeekdays}
              />
              <DayInput
                id="dias-sabado"
                label="Días sábado"
                value={saturdays}
                onChange={setSaturdays}
              />
              <DayInput
                id="dias-domingo"
                label="Días domingo y feriados"
                value={sundaysAndHolidays}
                onChange={setSundaysAndHolidays}
              />
            </div>
          </fieldset>
        </div>

        <div className="mt-7 rounded-3xl bg-[#e2e8dc] p-5 text-center sm:p-7" aria-live="polite">
          <span className="text-sm font-semibold text-[#275240]/75">Presupuesto estimado desde</span>
          <strong className="mt-1 block font-display text-4xl font-black text-[#275240] sm:text-5xl">
            {formatPesos(total)}
          </strong>
          <p className="mt-2 text-sm text-[#275240]/80">
            {totalDays} {totalDays === 1 ? 'día' : 'días'} en total · {cats} {cats === 1 ? 'gato' : 'gatos'}
          </p>
          {extraCats > 0 && (
            <p className="mt-1 text-xs font-semibold text-[#275240]/75">
              Incluye {formatPesos(extraPerVisit)} extra por visita por cantidad de gatos.
            </p>
          )}
        </div>

        <div className="mt-5 space-y-2 text-center text-xs leading-relaxed text-[#275240]/70 sm:text-sm">
          <p>La entrevista previa tiene un valor de {rates.interview} y no está incluida en este cálculo.</p>
          <p>Desde el cuarto gato se suman {formatPesos(EXTRA_CAT_RATE)} por cada gato extra, por visita.</p>
        </div>

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
      </div>
    </section>
  );
};

type DayInputProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
};

const DayInput: React.FC<DayInputProps> = ({ id, label, value, onChange }) => (
  <div>
    <label htmlFor={id} className="mb-2 block min-h-10 text-xs font-semibold leading-snug text-[#275240] sm:text-sm">
      {label}
    </label>
    <input
      id={id}
      type="number"
      min="0"
      step="1"
      inputMode="numeric"
      value={value}
      onChange={(event) => onChange(safeDayCount(event.target.value))}
      className="min-h-14 w-full rounded-2xl border border-[#275240]/20 bg-white px-4 text-base text-[#275240] outline-none transition focus:border-[#275240] focus:ring-4 focus:ring-[#275240]/10"
    />
  </div>
);
