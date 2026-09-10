import React, { useState } from 'react';
import { Cat, ImagePlus, Save, Trash2, ArrowLeft, Lock } from 'lucide-react';
import { CAT_CLIENTS, type CatClient } from '../data/catData';
import { RECOVERED_CATS } from '../data/recoveredCats';

type StoredCat = CatClient & { imageFileName?: string };
const emptyCat = (): StoredCat => ({ id: crypto.randomUUID(), name: '', owner: '', image: '', story: '', personality: [], favoriteActivity: '', visitsCount: 0 });

const mergeAdminCats = (remoteCats: StoredCat[]): StoredCat[] => {
  const overrides = new Map(remoteCats.filter((cat) => cat?.id && cat?.name).map((cat) => [cat.id, cat]));
  const base = [...CAT_CLIENTS, ...RECOVERED_CATS];
  const result = base.map((cat) => overrides.get(cat.id) ?? cat);
  const ids = new Set(result.map((cat) => cat.id));
  for (const cat of remoteCats) {
    if (cat?.id && cat?.name && !ids.has(cat.id)) {
      result.push(cat);
      ids.add(cat.id);
    }
  }
  return result;
};

export const Admin2: React.FC = () => {
  const [cats, setCats] = useState<StoredCat[]>([]);
  const [selected, setSelected] = useState<StoredCat>(emptyCat());
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const loadCats = async () => {
    try {
      const r = await fetch('/api/cats', { cache: 'no-store' });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || 'No se pudo cargar el catálogo.');
      setCats(mergeAdminCats(Array.isArray(data.cats) ? data.cats : []));
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'No se pudo cargar el catálogo.');
    }
  };

  const unlock = async () => {
    if (!password) return setStatus('Ingresá la clave.');
    setStatus('Verificando…');
    try {
      const r = await fetch('/api/cats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'auth', password }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || 'Clave incorrecta.');
      setUnlocked(true);
      setStatus('');
      await loadCats();
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Clave incorrecta.');
    }
  };

  const saveCat = async () => {
    if (!selected.name.trim()) return setStatus('Poné el nombre del gato.');
    if (!password) return setStatus('Ingresá la clave del panel.');
    setSaving(true);
    setStatus('Guardando…');
    try {
      const r = await fetch('/api/cats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, cat: selected, catalog: cats }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || 'No se pudo guardar.');
      setCats(mergeAdminCats(d.cats || []));
      setSelected(emptyCat());
      setStatus('Gato guardado.');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'No se pudo guardar.');
    } finally {
      setSaving(false);
    }
  };

  const deleteCat = async (id: string) => {
    if (!confirm('¿Eliminar este gato del catálogo administrado?')) return;
    setSaving(true);
    setStatus('Eliminando…');
    try {
      const r = await fetch('/api/cats', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, id }) });
      const d = await r.json();
      if (!r.ok) throw new Error(d?.error || 'No se pudo eliminar.');
      setCats(mergeAdminCats(d.cats || []));
      setSelected(emptyCat());
      setStatus('Gato eliminado.');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'No se pudo eliminar.');
    } finally {
      setSaving(false);
    }
  };

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setSelected((p) => ({ ...p, image: String(reader.result || '') }));
    reader.readAsDataURL(file);
  };

  if (!unlocked) return <main className="min-h-screen bg-[#e2e8dc] flex items-center justify-center p-4 text-[#275240]"><section className="w-full max-w-md bg-white rounded-2xl p-7 shadow-sm"><div className="w-12 h-12 rounded-full bg-[#275240] text-white flex items-center justify-center mx-auto mb-4"><Lock/></div><h1 className="text-2xl font-bold text-center mb-2">Panel de gatos</h1><p className="text-sm text-center opacity-70 mb-6">Ingresá la clave para acceder.</p><input autoFocus type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==='Enter'&&unlock()} className="w-full mb-3 px-3 py-3 rounded-xl bg-[#e2e8dc]" placeholder="Clave"/>{status&&<p className="text-sm mb-3 rounded-xl bg-[#e2e8dc] px-3 py-2">{status}</p>}<button onClick={unlock} className="w-full px-4 py-3 rounded-xl bg-[#275240] text-white font-bold">Entrar</button></section></main>;

  return <main className="min-h-screen bg-[#e2e8dc] p-4 md:p-8 text-[#275240]"><div className="max-w-6xl mx-auto"><header className="flex items-center justify-between mb-6"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-[#275240] text-white flex items-center justify-center"><Cat/></div><div><h1 className="text-2xl font-bold">Panel de gatos</h1><p className="text-sm">Todos los michis del catálogo se pueden editar.</p></div></div><a href="/" className="px-4 py-2 rounded-xl bg-white font-bold text-sm"><ArrowLeft size={16} className="inline mr-2"/>Volver</a></header><section className="grid lg:grid-cols-[1.1fr_.9fr] gap-6"><div className="bg-white rounded-2xl p-5 shadow-sm"><div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">Todos los gatos</h2><button onClick={()=>{setSelected(emptyCat());setStatus('')}} className="px-4 py-2 rounded-xl bg-[#275240] text-white text-sm font-bold">+ Nuevo gato</button></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{cats.map(cat=><button key={cat.id} onClick={()=>setSelected({...cat,personality:[...(cat.personality||[])]})} className="text-left rounded-xl border overflow-hidden bg-[#f7f9f5]"><div className="aspect-square bg-[#e2e8dc]">{cat.image&&<img src={cat.image} alt={cat.name} className="w-full h-full object-cover"/>}</div><div className="p-3"><p className="font-bold">{cat.name}</p></div></button>)}</div>{cats.length===0&&<p className="text-sm opacity-60">Todavía no hay gatos en el catálogo.</p>}</div><div className="bg-white rounded-2xl p-5 shadow-sm h-fit"><h2 className="font-bold text-lg mb-4">{selected.name?'Editar gato':'Agregar gato'}</h2><label className="block text-xs font-bold mb-1">Nombre del gato</label><input value={selected.name} onChange={e=>setSelected({...selected,name:e.target.value})} className="w-full mb-5 px-3 py-3 rounded-xl bg-[#e2e8dc]" placeholder="Ej. Mishi"/><label className="block text-xs font-bold mb-1">Foto (opcional)</label><label className="flex items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed cursor-pointer bg-[#f7f9f5] mb-5 overflow-hidden">{selected.image?<img src={selected.image} alt="Vista previa" className="w-full h-full object-cover"/>:<><ImagePlus size={20}/><span className="text-sm">Elegir foto o dejar vacío</span></>}<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&handleImage(e.target.files[0])}/></label>{status&&<p className="text-sm mb-3 rounded-xl bg-[#e2e8dc] px-3 py-2">{status}</p>}<div className="flex gap-2"><button disabled={saving} onClick={saveCat} className="flex-1 px-4 py-3 rounded-xl bg-[#275240] text-white font-bold"><Save size={17} className="inline mr-2"/>{saving?'Guardando…':'Guardar gato'}</button>{selected.name&&cats.some(c=>c.id===selected.id)&&<button disabled={saving} onClick={()=>deleteCat(selected.id)} className="px-4 rounded-xl border border-red-200 text-red-700"><Trash2 size={17}/></button>}</div></div></section></div></main>;
};
