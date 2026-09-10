import React, { useEffect, useMemo, useState } from 'react';
import { Cat, ImagePlus, Save, Trash2, ArrowLeft, Lock } from 'lucide-react';
import type { CatClient } from '../data/catData';
import { CAT_CLIENTS } from '../data/catData';

type StoredCat = CatClient & { imageFileName?: string };

const emptyCat = (): StoredCat => ({
  id: crypto.randomUUID(), name: '', owner: '', image: '', story: '', personality: [], favoriteActivity: '', visitsCount: 0,
});

export const Admin2: React.FC = () => {
  const [cats, setCats] = useState<StoredCat[]>([]);
  const [selected, setSelected] = useState<StoredCat>(emptyCat());
  const [password, setPassword] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);
  const localCats = useMemo(() => CAT_CLIENTS, []);

  useEffect(() => {
    if (!unlocked) return;
    fetch('/cats.json', { cache: 'no-store' }).then((r) => (r.ok ? r.json() : []))
      .then((data) => setCats(Array.isArray(data) ? data : [])).catch(() => setCats([]));
  }, [unlocked]);

  const unlock = async () => {
    if (!password) return setStatus('Ingresá la clave.');
    setStatus('Verificando…');
    try {
      const response = await fetch('/api/cats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'auth', password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || 'Clave incorrecta.');
      setUnlocked(true); setStatus('');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'Clave incorrecta.'); }
  };

  const editCat = (cat: StoredCat) => setSelected({ ...cat, personality: [...(cat.personality || [])] });
  const addNew = () => setSelected(emptyCat());

  const saveCat = async () => {
    if (!selected.name.trim()) return setStatus('Poné el nombre del gato.');
    if (!selected.image) return setStatus('Subí una foto antes de guardar.');
    if (!password) return setStatus('Ingresá la clave del panel.');
    setSaving(true); setStatus('Guardando…');
    try {
      const response = await fetch('/api/cats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, cat: selected }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || 'No se pudo guardar');
      setCats(result.cats || []); setSelected(emptyCat()); setStatus('Gato guardado.');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'No se pudo guardar.'); }
    finally { setSaving(false); }
  };

  const deleteCat = async (id: string) => {
    if (!password) return setStatus('Ingresá la clave del panel.');
    if (!confirm('¿Eliminar este gato del nuevo catálogo?')) return;
    setSaving(true);
    try {
      const response = await fetch('/api/cats', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, id }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result?.error || 'No se pudo eliminar');
      setCats(result.cats || []); setStatus('Gato eliminado.');
    } catch (error) { setStatus(error instanceof Error ? error.message : 'No se pudo eliminar.'); }
    finally { setSaving(false); }
  };

  const handleImage = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setSelected((prev) => ({ ...prev, image: String(reader.result || '') }));
    reader.readAsDataURL(file);
  };

  if (!unlocked) return (
    <main className="min-h-screen bg-[#e2e8dc] flex items-center justify-center p-4 text-[#275240]">
      <section className="w-full max-w-md bg-white rounded-2xl border border-[#d0dacb] p-7 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#275240] text-white flex items-center justify-center mx-auto mb-4"><Lock /></div>
        <h1 className="text-2xl font-bold text-center mb-2">Panel de gatos</h1>
        <p className="text-sm text-center opacity-70 mb-6">Ingresá la clave para acceder.</p>
        <input autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && unlock()} className="w-full mb-3 px-3 py-3 rounded-xl bg-[#e2e8dc] border-0" placeholder="Clave" />
        {status && <p className="text-sm mb-3 rounded-xl bg-[#e2e8dc] px-3 py-2">{status}</p>}
        <button onClick={unlock} className="w-full px-4 py-3 rounded-xl bg-[#275240] text-white font-bold">Entrar</button>
      </section>
    </main>
  );

  const allVisible = [...localCats, ...cats];
  return (
    <main className="min-h-screen bg-[#e2e8dc] p-4 md:p-8 text-[#275240]">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3"><div className="w-11 h-11 rounded-full bg-[#275240] text-white flex items-center justify-center"><Cat /></div><div><h1 className="text-2xl font-bold">Nuevo panel de gatos</h1><p className="text-sm">Agregá los gatos uno por uno.</p></div></div>
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#d0dacb] text-sm font-bold"><ArrowLeft size={16} /> Volver al sitio</a>
        </header>
        <section className="grid lg:grid-cols-[1.1fr_.9fr] gap-6">
          <div className="bg-white rounded-2xl border border-[#d0dacb] p-5 shadow-sm"><div className="flex items-center justify-between mb-4"><h2 className="font-bold text-lg">Catálogo</h2><button onClick={addNew} className="px-4 py-2 rounded-xl bg-[#275240] text-white text-sm font-bold">+ Nuevo gato</button></div><div className="grid grid-cols-2 md:grid-cols-3 gap-3">{allVisible.map((cat) => <button key={cat.id} onClick={() => cats.some((c) => c.id === cat.id) && editCat(cat as StoredCat)} className="text-left rounded-xl border border-[#d0dacb] overflow-hidden bg-[#f7f9f5]"><div className="aspect-square bg-[#e2e8dc]">{cat.image && <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />}</div><div className="p-3"><p className="font-bold">{cat.name}</p><p className="text-xs opacity-70">{cats.some((c) => c.id === cat.id) ? 'Nuevo catálogo' : 'Catálogo actual'}</p></div></button>)}</div></div>

          <div className="bg-white rounded-2xl border border-[#d0dacb] p-5 shadow-sm h-fit">
            <h2 className="font-bold text-lg mb-4">{selected.name ? 'Editar gato' : 'Agregar gato'}</h2>
            <label className="block text-xs font-bold mb-1">Nombre del gato</label>
            <input value={selected.name} onChange={(e) => setSelected({ ...selected, name: e.target.value })} className="w-full mb-5 px-3 py-3 rounded-xl bg-[#e2e8dc] border-0" placeholder="Ej. Mishi" />
            <label className="block text-xs font-bold mb-1">Foto</label>
            <label className="flex items-center justify-center gap-2 w-full h-28 rounded-xl border-2 border-dashed border-[#b9c8b7] cursor-pointer bg-[#f7f9f5] mb-5 overflow-hidden">{selected.image ? <img src={selected.image} alt="Vista previa" className="w-full h-full object-cover" /> : <><ImagePlus size={20} /><span className="text-sm">Elegir foto</span></>}<input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} /></label>
            {status && <p className="text-sm mb-3 rounded-xl bg-[#e2e8dc] px-3 py-2">{status}</p>}
            <div className="flex gap-2"><button disabled={saving} onClick={saveCat} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#275240] text-white font-bold disabled:opacity-50"><Save size={17} /> {saving ? 'Guardando…' : 'Guardar gato'}</button>{selected.name && cats.some((c) => c.id === selected.id) && <button disabled={saving} onClick={() => deleteCat(selected.id)} className="px-4 rounded-xl border border-red-200 text-red-700"><Trash2 size={17} /></button>}</div>
          </div>
        </section>
      </div>
    </main>
  );
};
