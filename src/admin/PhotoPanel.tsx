import React, { useMemo, useState } from 'react';
import { ArrowLeft, Camera, Cat, ImagePlus, Lock, Search, Upload, X, Trash2 } from 'lucide-react';

type CatRecord = { id: string; name: string; owner?: string; image: string; story?: string; personality?: string[]; favoriteActivity?: string; visitsCount?: number };
const blank = (): CatRecord => ({ id: crypto.randomUUID(), name: '', image: '', owner: '', story: '', personality: [], favoriteActivity: '', visitsCount: 0 });

async function preparePhoto(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1500 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext('2d'); if (!ctx) throw new Error('No se pudo procesar la foto.');
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.78);
}

export const PhotoPanel: React.FC = () => {
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [cats, setCats] = useState<CatRecord[]>([]);
  const [selected, setSelected] = useState<CatRecord>(blank());
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const r = await fetch('/api/cats', { cache: 'no-store' }); const d = await r.json();
    if (!r.ok) throw new Error(d.error || 'No se pudo cargar el catálogo.');
    setCats(Array.isArray(d.cats) ? d.cats : []);
  };
  const enter = async () => {
    setBusy(true); setStatus('Verificando clave…');
    try {
      const r = await fetch('/api/cats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'auth', password }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Clave incorrecta.');
      await load(); setUnlocked(true); setStatus('');
    } catch (e) { setStatus(e instanceof Error ? e.message : 'No se pudo entrar.'); }
    finally { setBusy(false); }
  };
  const visible = useMemo(() => cats.filter(c => c.name.toLowerCase().includes(query.toLowerCase())), [cats, query]);
  const save = async () => {
    if (!selected.name.trim()) { setStatus('Escribí el nombre del gato.'); return; }
    setBusy(true); setStatus('Guardando…');
    try {
      const r = await fetch('/api/cats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, cat: { ...selected, name: selected.name.trim() }, catalog: cats }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error || 'No se pudo guardar.');
      setCats(d.cats || cats); setSelected(blank()); setStatus('¡Listo! El gato y su foto ya están guardados en el sitio.');
    } catch (e) { setStatus(e instanceof Error ? e.message : 'No se pudo guardar.'); }
    finally { setBusy(false); }
  };
  const removeCat = async () => {
    if (!cats.some(c => c.id === selected.id)) return;
    if (!window.confirm(`¿Seguro que querés borrar a ${selected.name} del catálogo?`)) return;
    setBusy(true); setStatus('Borrando del catálogo…');
    try {
      const r = await fetch('/api/cats', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, id: selected.id }) });
      const d = await r.json(); if (!r.ok) throw new Error(d.error || 'No se pudo borrar.');
      setCats(d.cats || cats.filter(c => c.id !== selected.id));
      setSelected(blank());
      setStatus(`${selected.name} fue eliminado del catálogo.`);
    } catch (e) { setStatus(e instanceof Error ? e.message : 'No se pudo borrar.'); }
    finally { setBusy(false); }
  };
  const pick = async (file?: File) => {
    if (!file) return;
    try { setStatus('Preparando foto…'); const image = await preparePhoto(file); setSelected(s => ({ ...s, image })); setStatus('Foto lista para guardar.'); }
    catch (e) { setStatus(e instanceof Error ? e.message : 'No se pudo abrir la foto.'); }
  };

  if (!unlocked) return <main className="min-h-screen bg-[#e2e8dc] flex items-center justify-center p-5 text-[#275240]"><section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#275240] text-white"><Lock/></div><h1 className="text-center text-2xl font-bold">Panel de fotos</h1><p className="mt-2 mb-6 text-center text-sm opacity-60">Administración independiente de fotos de BrendaCatSitter.</p><input type="password" autoFocus value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&enter()} placeholder="Clave de acceso" className="mb-3 w-full rounded-xl bg-[#f0f4ed] px-4 py-3"/>{status&&<p className="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{status}</p>}<button disabled={busy||!password} onClick={enter} className="w-full rounded-xl bg-[#275240] p-3 font-bold text-white disabled:opacity-50">{busy?'Ingresando…':'Entrar'}</button><a href="/" className="mt-5 block text-center text-sm">Volver al sitio</a></section></main>;

  return <main className="min-h-screen bg-[#e2e8dc] p-4 text-[#275240] md:p-8"><div className="mx-auto max-w-7xl"><header className="mb-7 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#275240] text-white"><Camera/></div><div><h1 className="text-2xl font-bold">Panel de fotos</h1><p className="text-sm opacity-70">Agregá y actualizá las fotos de los michis</p></div></div><a href="/" className="rounded-xl bg-white px-4 py-2 text-sm font-semibold"><ArrowLeft className="mr-2 inline" size={16}/>Volver al sitio</a></header>
  <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]"><div className="rounded-3xl bg-white p-5 shadow-sm"><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">{cats.some(c=>c.id===selected.id)?'Editar michi':'Agregar un michi'}</h2>{selected.name&&<button onClick={()=>{setSelected(blank());setStatus('')}} aria-label="Limpiar"><X/></button>}</div><label className="mb-1 block text-sm font-semibold">Nombre</label><input value={selected.name} onChange={e=>setSelected(s=>({...s,name:e.target.value}))} placeholder="Ej. Teo" className="mb-4 w-full rounded-xl bg-[#f0f4ed] px-4 py-3"/><label className="mb-2 block text-sm font-semibold">Foto</label><label className="mb-4 flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-[#b7c9b8] bg-[#f7f9f5] text-center">{selected.image?<img src={selected.image} alt="Vista previa" className="h-56 w-full object-cover"/>:<><ImagePlus size={34}/><span className="mt-2 font-semibold">Elegir una foto</span><span className="mt-1 text-xs opacity-60">JPG, PNG o WEBP</span></>}<input type="file" accept="image/*" className="hidden" onChange={e=>pick(e.target.files?.[0])}/></label><button disabled={busy} onClick={save} className="w-full rounded-xl bg-[#275240] p-3 font-bold text-white disabled:opacity-50"><Upload className="mr-2 inline" size={17}/>{busy?'Guardando…':'Guardar en la página'}</button>{cats.some(c=>c.id===selected.id)&&<button disabled={busy} onClick={removeCat} className="mt-2 w-full rounded-xl border border-red-200 bg-red-50 p-3 font-semibold text-red-700 disabled:opacity-50"><Trash2 className="mr-2 inline" size={17}/>{busy?'Procesando…':'Borrar gato del catálogo'}</button>}{status&&<p className="mt-3 rounded-xl bg-[#f0f4ed] p-3 text-sm">{status}</p>}<p className="mt-3 text-xs text-gray-500">Las fotos se guardan como archivos separados y el catálogo existente se conserva.</p></div>
  <div className="rounded-3xl bg-white p-5 shadow-sm"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-bold">Catálogo actual</h2><p className="text-sm opacity-60">{cats.length} gatos cargados</p></div><div className="relative min-w-44 flex-1 sm:max-w-xs"><Search className="absolute left-3 top-3 opacity-50" size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar gato…" className="w-full rounded-xl bg-[#f0f4ed] py-2.5 pl-9 pr-3 text-sm"/></div></div><div className="grid max-h-[680px] grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3 xl:grid-cols-4">{visible.map(cat=><button key={cat.id} onClick={()=>{setSelected({...cat,personality:[...(cat.personality||[])]});setStatus('');window.scrollTo({top:0,behavior:'smooth'})}} className={'overflow-hidden rounded-2xl border text-left hover:shadow-md '+(selected.id===cat.id?'border-[#275240] ring-2 ring-[#275240]':'border-gray-100')}><div className="aspect-square bg-[#edf2e9]">{cat.image?<img src={cat.image} alt={cat.name} loading="lazy" className="h-full w-full object-cover"/>:<div className="flex h-full items-center justify-center opacity-30"><Cat size={35}/></div>}</div><p className="truncate p-3 text-sm font-bold">{cat.name}</p></button>)}</div>{visible.length===0&&<p className="py-10 text-center text-sm opacity-60">No encontramos gatos con ese nombre.</p>}</div></section><p className="py-5 text-center text-xs opacity-50">BrendaCatSitter · Administración de fotos</p></div></main>;
};
