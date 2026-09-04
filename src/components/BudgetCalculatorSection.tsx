import React, { useMemo, useState } from 'react';
import { Calculator, CalendarDays, Cat, ChevronLeft, ChevronRight, MapPin, MessageCircle } from 'lucide-react';
import { useContent } from '../content/ContentContext';
import { buildWhatsAppUrl } from '../data/whatsappContacts';

const EXTRA_CAT_RATE = 5_000;
const MAX_TOTAL_DAYS = 90;
const MAX_CATS = 10;
const ZONE_SURCHARGE = { 1: 0, 2: 2_000 } as const;
type CoverageZone = keyof typeof ZONE_SURCHARGE;

function parseArgentinePrice(value: string, fallback: number): number { const parsed = Number(value.replace(/\D/g, '')); return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback; }
function formatPesos(value: number): string { return `$${new Intl.NumberFormat('es-AR', { maximumFractionDigits: 0 }).format(value)}`; }
function safeCatCount(value: string): number { return Math.min(MAX_CATS, Math.max(1, Math.floor(Number(value) || 1))); }
function dateKey(year: number, month: number, day: number): string { return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; }
function dateFromKey(key: string): Date { const [year, month, day] = key.split('-').map(Number); return new Date(year, month - 1, day); }

const zoneButtonStyles: Record<CoverageZone, string> = { 1: 'border-[#a8c9df] bg-[#dff1fb] text-[#3e6f8f]', 2: 'border-[#dfb4c9] bg-[#f8ddea] text-[#935b77]' };

export const BudgetCalculatorSection: React.FC = () => {
  const { rates } = useContent();
  const today = new Date();
  const [zone, setZone] = useState<CoverageZone>(1);
  const [cats, setCats] = useState(1);
  const [viewDate, setViewDate] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const prices = useMemo(() => { const surcharge = ZONE_SURCHARGE[zone]; return { weekday: parseArgentinePrice(rates.weekday, 18_000) + surcharge, saturday: parseArgentinePrice(rates.saturday, 21_000) + surcharge, sundayHoliday: parseArgentinePrice(rates.sundayHoliday, 25_000) + surcharge }; }, [rates.weekday, rates.saturday, rates.sundayHoliday, zone]);
  const selectedDateObjects = useMemo(() => selectedDates.map(dateFromKey).sort((a, b) => a.getTime() - b.getTime()), [selectedDates]);
  const counts = useMemo(() => selectedDateObjects.reduce((acc, date) => { const dayOfWeek = date.getDay(); if (dayOfWeek === 0) acc.sundaysAndHolidays += 1; else if (dayOfWeek === 6) acc.saturdays += 1; else acc.weekdays += 1; return acc; }, { weekdays: 0, saturdays: 0, sundaysAndHolidays: 0 }), [selectedDateObjects]);
  const totalDays = selectedDates.length;
  const exceedsDayLimit = totalDays > MAX_TOTAL_DAYS;
  const extraCats = Math.max(0, cats - 3);
  const extraPerVisit = extraCats * EXTRA_CAT_RATE;
  const total = counts.weekdays * (prices.weekday + extraPerVisit) + counts.saturdays * (prices.saturday + extraPerVisit) + counts.sundaysAndHolidays * (prices.sundayHoliday + extraPerVisit);
  const whatsappNumber = zone === 1 ? '5491161386748' : '5491166906291';
  const contactName = zone === 1 ? 'Bren' : 'Poli';
  const selectedDatesText = selectedDateObjects.length ? selectedDateObjects.map((date) => date.toLocaleDateString('es-AR')).join(', ') : 'Todavía no seleccioné fechas';
  const whatsappMessage = [`Hola ${contactName}! Calculé un presupuesto desde la página web.`, `• Zona de cobertura: Zona ${zone}`, `• Cantidad de gatos: ${cats}`, `• Fechas elegidas: ${selectedDatesText}`, `• Presupuesto estimado desde: ${formatPesos(total)}`, 'Quería consultar disponibilidad y confirmar el valor final.'].join('\n');
  const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappMessage);
  const year = viewDate.getFullYear(); const month = viewDate.getMonth(); const firstDay = new Date(year, month, 1); const daysInMonth = new Date(year, month + 1, 0).getDate(); const mondayFirstOffset = (firstDay.getDay() + 6) % 7;
  const calendarCells = Array.from({ length: mondayFirstOffset + daysInMonth }, (_, index) => index < mondayFirstOffset ? null : index - mondayFirstOffset + 1);
  const monthLabel = viewDate.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
  const todayKey = dateKey(today.getFullYear(), today.getMonth(), today.getDate());
  const toggleDate = (day: number) => { const key = dateKey(year, month, day); setSelectedDates((current) => { if (current.includes(key)) return current.filter((item) => item !== key); if (current.length >= MAX_TOTAL_DAYS) return current; return [...current, key]; }); };
  const canGoPreviousMonth = year > today.getFullYear() || month > today.getMonth();

  return (
    <div id="presupuesto" className="mt-6 border-t border-[#275240]/10 pt-6 sm:mt-7 sm:pt-7">
      <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[#275240]/10 bg-[#f7f8f4] p-5 sm:p-6 lg:p-7">
        <div className="mx-auto mb-5 max-w-xl text-center"><div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-[#275240] text-white"><Calculator className="h-4.5 w-4.5" /></div><h3 className="font-display text-2xl font-extrabold tracking-tight text-[#275240] sm:text-3xl">Calculá tu presupuesto</h3><p className="mt-1.5 text-xs text-[#275240]/65 sm:text-sm">Elegí tu zona, cantidad de gatos y las fechas de tus visitas para obtener un estimado.</p></div>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1.35fr_0.65fr]"><div><div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#275240]"><MapPin className="h-4 w-4" />¿De qué zona sos?</div><div className="grid grid-cols-2 gap-2">{([1,2] as CoverageZone[]).map((zoneOption) => { const selected = zone === zoneOption; return <button key={zoneOption} type="button" aria-pressed={selected} onClick={() => setZone(zoneOption)} className={`min-h-10 rounded-xl border px-2.5 py-2 text-sm font-extrabold transition ${zoneButtonStyles[zoneOption]} ${selected ? 'ring-2 ring-[#275240]/30 ring-offset-1' : 'opacity-75 hover:opacity-100'}`}>Zona {zoneOption}</button>; })}</div></div>
            <div><label htmlFor="cantidad-gatos" className="mb-2 flex items-center gap-2 text-sm font-bold text-[#275240]"><Cat className="h-4 w-4" />¿Cuántos gatos?</label><select id="cantidad-gatos" value={cats} onChange={(event) => setCats(safeCatCount(event.target.value))} className="min-h-10 w-full rounded-xl border border-[#275240]/20 bg-white px-3 text-sm text-[#275240] outline-none transition focus:border-[#275240] focus:ring-2 focus:ring-[#275240]/10">{Array.from({length:MAX_CATS},(_,index)=>index+1).map((quantity)=><option key={quantity} value={quantity}>{quantity} {quantity===1?'gato':'gatos'}</option>)}</select></div>
          </div>
          <fieldset><legend className="mb-1 flex items-center gap-2 text-sm font-bold text-[#275240]"><CalendarDays className="h-4 w-4" />Elegí las fechas de tus visitas</legend><p className="mb-3 text-[11px] text-[#275240]/50">Tocá cada fecha que necesitás. Podés seleccionar hasta {MAX_TOTAL_DAYS} días.</p>
            <div className="mx-auto max-w-[560px] rounded-2xl border border-[#275240]/10 bg-white p-2.5 sm:p-3">
              <div className="mb-2.5 flex items-center justify-between gap-2"><button type="button" aria-label="Mes anterior" disabled={!canGoPreviousMonth} onClick={()=>setViewDate(new Date(year,month-1,1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#275240]/15 text-[#275240] transition hover:bg-[#d7dfd2] disabled:cursor-not-allowed disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button><p className="text-sm font-extrabold capitalize text-[#275240]">{monthLabel}</p><button type="button" aria-label="Mes siguiente" onClick={()=>setViewDate(new Date(year,month+1,1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-[#275240]/15 text-[#275240] transition hover:bg-[#d7dfd2]"><ChevronRight className="h-4 w-4" /></button></div>
              <div className="grid grid-cols-7 gap-1 text-center text-[9px] font-bold text-[#275240]/45 sm:text-[11px]">{['L','M','X','J','V','S','D'].map((dayLabel)=><div key={dayLabel} className="py-0.5">{dayLabel}</div>)}</div>
              <div className="grid grid-cols-7 gap-1">{calendarCells.map((day,index)=>{ if(day===null)return <div key={`empty-${index}`} className="aspect-square" />; const key=dateKey(year,month,day); const selected=selectedDates.includes(key); const date=new Date(year,month,day); const isPast=key<todayKey; const isToday=key===todayKey; const disabled=isPast||(!selected&&totalDays>=MAX_TOTAL_DAYS); return <button key={key} type="button" disabled={disabled} aria-pressed={selected} aria-label={`${day} de ${monthLabel}`} onClick={()=>toggleDate(day)} className={`relative flex aspect-square items-center justify-center rounded-lg text-[11px] font-bold transition sm:text-xs ${selected?'bg-[#275240] text-white shadow-sm':'bg-[#f5f6f2] text-[#275240] hover:bg-[#d7dfd2]'} ${isToday&&!selected?'ring-2 ring-[#275240]/25':''} ${disabled?'cursor-not-allowed opacity-35':''}`}>{day}</button>; })}</div>
              <div className="mt-2 text-center text-[9px] text-[#275240]/50 sm:text-[10px]">Los fines de semana se calculan automáticamente con su tarifa correspondiente.</div>
            </div>
            {totalDays>0&&<div className="mt-3 rounded-xl bg-[#d7dfd2]/70 px-3 py-2 text-center text-xs font-semibold text-[#275240]">{totalDays} {totalDays===1?'fecha seleccionada':'fechas seleccionadas'}</div>}
          </fieldset>
        </div>
        <div className="mt-5 rounded-2xl bg-white p-4 text-center" aria-live="polite"><span className="text-xs font-semibold text-[#275240]/70">Presupuesto estimado desde</span><strong className="mt-0.5 block font-display text-3xl font-black text-[#275240] sm:text-4xl">{totalDays===0||exceedsDayLimit?'—':formatPesos(total)}</strong><p className="mt-1 text-xs text-[#275240]/70">Zona {zone} · {totalDays} {totalDays===1?'día':'días'} · {cats} {cats===1?'gato':'gatos'}</p>{totalDays>0&&<p className="mt-1 text-[11px] text-[#275240]/55">{counts.weekdays} de semana · {counts.saturdays} sábados · {counts.sundaysAndHolidays} domingos/feriados</p>}<p className="mt-1 text-[11px] font-bold text-[#275240]/65">Te respondo por WhatsApp.</p>{!exceedsDayLimit&&extraCats>0&&<p className="mt-1 text-[11px] font-semibold text-[#275240]/60">Incluye adicional por cantidad de gatos.</p>}</div>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-[#275240]/55 sm:text-xs">La entrevista previa se calcula aparte. Desde el cuarto gato aplico un adicional por visita.</p>
        {totalDays===0||exceedsDayLimit?<button type="button" disabled className="mt-4 flex min-h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#275240]/45 px-5 py-3 text-center text-sm font-bold text-white"><MessageCircle className="h-4 w-4" />Elegí al menos una fecha para continuar</button>:<a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#275240] px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-[#1e3f32] focus:outline-none focus:ring-4 focus:ring-[#275240]/20"><MessageCircle className="h-4 w-4" />Escribime por WhatsApp</a>}
      </div>
    </div>
  );
};