import React, { useCallback, useEffect, useState } from 'react';
import {
  Cat,
  LogOut,
  MessageSquareQuote,
  MapPin,
  Phone,
  DollarSign,
  ListChecks,
  Plus,
  Trash2,
  Save,
  Upload,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { CatClient, ContactInfo, ServiceItem, ServiceRates, Testimonial } from '../data/catData';
import { DEFAULT_CONTENT } from '../content/fetchContent';

type Tab = 'cats' | 'rates' | 'testimonials' | 'contact' | 'neighborhoods' | 'services';

const AVATAR_OPTIONS = [
  'bg-emerald-100 text-emerald-800',
  'bg-cyan-100 text-cyan-800',
  'bg-blue-100 text-blue-800',
  'bg-teal-100 text-teal-800',
  'bg-fuchsia-100 text-fuchsia-800',
  'bg-amber-100 text-amber-800',
  'bg-rose-100 text-rose-800',
];

const ICON_OPTIONS = ['Clock', 'Utensils', 'Sparkles', 'Heart', 'Camera', 'Home'];

const inputClass =
  'w-full px-3 py-2 rounded-xl border border-[#CCE7E5] bg-[#F2F9F8] text-sm focus:outline-none focus:ring-2 focus:ring-[#0E9F8F]';
const labelClass = 'block text-xs font-bold text-[#132E35] mb-1';
const btnPrimary =
  'inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#0E9F8F] hover:bg-[#0B8276] text-white text-xs font-bold disabled:opacity-60';
const btnGhost =
  'inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[#CCE7E5] bg-white text-[#132E35] text-xs font-bold hover:bg-[#E0F2F1]';

export const AdminDashboard: React.FC<{ email: string }> = ({ email }) => {
  const [tab, setTab] = useState<Tab>('cats');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const [cats, setCats] = useState<CatClient[]>([]);
  const [rates, setRates] = useState<ServiceRates>(DEFAULT_CONTENT.rates);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTENT.contact);
  const [neighborhoods, setNeighborhoods] = useState<{ id: string; name: string }[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);

  const flash = (msg: string) => {
    setStatus(msg);
    window.setTimeout(() => setStatus(''), 3500);
  };

  const loadAll = useCallback(async () => {
    if (!supabase) return;

    const [catsRes, ratesRes, testiRes, contactRes, hoodsRes, servicesRes] = await Promise.all([
      supabase.from('cats').select('*').order('sort_order'),
      supabase.from('service_rates').select('*').eq('id', 1).maybeSingle(),
      supabase.from('testimonials').select('*').order('sort_order'),
      supabase.from('site_contact').select('*').eq('id', 1).maybeSingle(),
      supabase.from('neighborhoods').select('*').order('sort_order'),
      supabase.from('services').select('*').order('sort_order'),
    ]);

    if (catsRes.data) {
      setCats(
        catsRes.data.map((r) => ({
          id: r.id,
          name: r.name,
          owner: r.owner ?? '',
          image: r.image_url ?? '',
          story: r.story ?? '',
          personality: r.personality ?? [],
          favoriteActivity: r.favorite_activity ?? '',
          visitsCount: r.visits_count ?? 0,
        })),
      );
    }

    if (ratesRes.data) {
      setRates({
        duration: ratesRes.data.duration,
        periodNotice: ratesRes.data.period_notice,
        weekday: ratesRes.data.weekday,
        saturday: ratesRes.data.saturday,
        sundayHoliday: ratesRes.data.sunday_holiday,
        interview: ratesRes.data.interview,
        interviewDesc: ratesRes.data.interview_desc,
        keyHandover: ratesRes.data.key_handover,
        paymentTerms: ratesRes.data.payment_terms,
        cancellationPolicy: ratesRes.data.cancellation_policy,
      });
    }

    if (testiRes.data) {
      setTestimonials(
        testiRes.data.map((r) => ({
          id: r.id,
          quote: r.quote,
          author: r.author,
          verified: r.verified,
          catName: r.cat_name ?? undefined,
          avatarBg: r.avatar_bg,
          date: r.date_label ?? '',
        })),
      );
    }

    if (contactRes.data) {
      setContact({
        whatsapp: contactRes.data.whatsapp,
        phoneFormatted: contactRes.data.phone_formatted,
        email: contactRes.data.email,
        instagram: contactRes.data.instagram,
        instagramUrl: contactRes.data.instagram_url,
        tiktok: contactRes.data.tiktok,
        tiktokUrl: contactRes.data.tiktok_url,
        whatsappBaseMessage: contactRes.data.whatsapp_base_message,
      });
    }

    if (hoodsRes.data) {
      setNeighborhoods(hoodsRes.data.map((r) => ({ id: r.id, name: r.name })));
    }

    if (servicesRes.data) {
      setServices(
        servicesRes.data.map((r) => ({
          id: r.id,
          title: r.title,
          description: r.description,
          iconName: r.icon_name,
          highlight: r.highlight ?? undefined,
        })),
      );
    }
  }, []);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const logout = async () => {
    await supabase?.auth.signOut();
  };

  const saveRates = async () => {
    if (!supabase) return;
    setSaving(true);
    const { error } = await supabase.from('service_rates').upsert({
      id: 1,
      duration: rates.duration,
      period_notice: rates.periodNotice,
      weekday: rates.weekday,
      saturday: rates.saturday,
      sunday_holiday: rates.sundayHoliday,
      interview: rates.interview,
      interview_desc: rates.interviewDesc,
      key_handover: rates.keyHandover,
      payment_terms: rates.paymentTerms,
      cancellation_policy: rates.cancellationPolicy,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    flash(error ? `Error: ${error.message}` : 'Tarifas guardadas');
  };

  const saveContact = async () => {
    if (!supabase) return;
    setSaving(true);
    const { error } = await supabase.from('site_contact').upsert({
      id: 1,
      whatsapp: contact.whatsapp,
      phone_formatted: contact.phoneFormatted,
      email: contact.email,
      instagram: contact.instagram,
      instagram_url: contact.instagramUrl,
      tiktok: contact.tiktok,
      tiktok_url: contact.tiktokUrl,
      whatsapp_base_message: contact.whatsappBaseMessage,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    flash(error ? `Error: ${error.message}` : 'Contacto guardado');
  };

  const addCat = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('cats')
      .insert({
        name: 'Nuevo gato',
        owner: '',
        image_url: '',
        sort_order: cats.length,
      })
      .select()
      .single();
    if (error) return flash(`Error: ${error.message}`);
    if (data) {
      setCats((prev) => [
        ...prev,
        {
          id: data.id,
          name: data.name,
          owner: data.owner ?? '',
          image: data.image_url ?? '',
          story: '',
          personality: [],
          favoriteActivity: '',
          visitsCount: 0,
        },
      ]);
      flash('Gato agregado');
    }
  };

  const updateCat = async (cat: CatClient) => {
    if (!supabase) return;
    setSaving(true);
    const { error } = await supabase
      .from('cats')
      .update({
        name: cat.name,
        owner: cat.owner,
        image_url: cat.image,
        story: cat.story,
        personality: cat.personality,
        favorite_activity: cat.favoriteActivity,
        visits_count: cat.visitsCount,
      })
      .eq('id', cat.id);
    setSaving(false);
    flash(error ? `Error: ${error.message}` : `Guardado: ${cat.name}`);
  };

  const deleteCat = async (id: string) => {
    if (!supabase || !confirm('¿Eliminar este gato?')) return;
    const { error } = await supabase.from('cats').delete().eq('id', id);
    if (error) return flash(`Error: ${error.message}`);
    setCats((prev) => prev.filter((c) => c.id !== id));
    flash('Gato eliminado');
  };

  const uploadCatImage = async (catId: string, file: File) => {
    if (!supabase) return;
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${catId}-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('cat-images').upload(path, file, {
      upsert: true,
      contentType: file.type,
    });
    if (upErr) return flash(`Error subida: ${upErr.message}`);

    const { data } = supabase.storage.from('cat-images').getPublicUrl(path);
    const imageUrl = data.publicUrl;

    const { error } = await supabase.from('cats').update({ image_url: imageUrl }).eq('id', catId);
    if (error) return flash(`Error: ${error.message}`);

    setCats((prev) => prev.map((c) => (c.id === catId ? { ...c, image: imageUrl } : c)));
    flash('Foto actualizada');
  };

  const addTestimonial = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        quote: 'Nueva reseña…',
        author: '@usuario',
        verified: true,
        avatar_bg: AVATAR_OPTIONS[0],
        date_label: 'Reciente',
        sort_order: testimonials.length,
      })
      .select()
      .single();
    if (error) return flash(`Error: ${error.message}`);
    if (data) {
      setTestimonials((prev) => [
        ...prev,
        {
          id: data.id,
          quote: data.quote,
          author: data.author,
          verified: data.verified,
          catName: data.cat_name ?? undefined,
          avatarBg: data.avatar_bg,
          date: data.date_label ?? '',
        },
      ]);
      flash('Reseña agregada');
    }
  };

  const updateTestimonial = async (item: Testimonial) => {
    if (!supabase) return;
    setSaving(true);
    const { error } = await supabase
      .from('testimonials')
      .update({
        quote: item.quote,
        author: item.author,
        verified: item.verified,
        cat_name: item.catName || null,
        avatar_bg: item.avatarBg,
        date_label: item.date,
      })
      .eq('id', item.id);
    setSaving(false);
    flash(error ? `Error: ${error.message}` : 'Reseña guardada');
  };

  const deleteTestimonial = async (id: string) => {
    if (!supabase || !confirm('¿Eliminar esta reseña?')) return;
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return flash(`Error: ${error.message}`);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    flash('Reseña eliminada');
  };

  const addNeighborhood = async () => {
    if (!supabase) return;
    const name = prompt('Nombre del barrio');
    if (!name?.trim()) return;
    const { data, error } = await supabase
      .from('neighborhoods')
      .insert({ name: name.trim(), sort_order: neighborhoods.length })
      .select()
      .single();
    if (error) return flash(`Error: ${error.message}`);
    if (data) setNeighborhoods((prev) => [...prev, { id: data.id, name: data.name }]);
    flash('Barrio agregado');
  };

  const renameNeighborhood = async (id: string, name: string) => {
    if (!supabase) return;
    const { error } = await supabase.from('neighborhoods').update({ name }).eq('id', id);
    if (error) return flash(`Error: ${error.message}`);
    setNeighborhoods((prev) => prev.map((n) => (n.id === id ? { ...n, name } : n)));
  };

  const deleteNeighborhood = async (id: string) => {
    if (!supabase || !confirm('¿Eliminar barrio?')) return;
    const { error } = await supabase.from('neighborhoods').delete().eq('id', id);
    if (error) return flash(`Error: ${error.message}`);
    setNeighborhoods((prev) => prev.filter((n) => n.id !== id));
    flash('Barrio eliminado');
  };

  const addService = async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('services')
      .insert({
        title: 'Nuevo servicio',
        description: 'Descripción…',
        icon_name: 'Heart',
        highlight: '',
        sort_order: services.length,
      })
      .select()
      .single();
    if (error) return flash(`Error: ${error.message}`);
    if (data) {
      setServices((prev) => [
        ...prev,
        {
          id: data.id,
          title: data.title,
          description: data.description,
          iconName: data.icon_name,
          highlight: data.highlight ?? undefined,
        },
      ]);
      flash('Servicio agregado');
    }
  };

  const updateService = async (item: ServiceItem) => {
    if (!supabase) return;
    setSaving(true);
    const { error } = await supabase
      .from('services')
      .update({
        title: item.title,
        description: item.description,
        icon_name: item.iconName,
        highlight: item.highlight || null,
      })
      .eq('id', item.id);
    setSaving(false);
    flash(error ? `Error: ${error.message}` : 'Servicio guardado');
  };

  const deleteService = async (id: string) => {
    if (!supabase || !confirm('¿Eliminar servicio?')) return;
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) return flash(`Error: ${error.message}`);
    setServices((prev) => prev.filter((s) => s.id !== id));
    flash('Servicio eliminado');
  };

  const importLocalTestimonials = async () => {
    if (!supabase || !confirm('¿Importar las reseñas locales actuales a Supabase?')) return;
    setSaving(true);
    const rows = DEFAULT_CONTENT.testimonials.map((t, i) => ({
      quote: t.quote,
      author: t.author,
      verified: t.verified,
      cat_name: t.catName || null,
      avatar_bg: t.avatarBg,
      date_label: t.date,
      sort_order: i,
    }));
    const { error } = await supabase.from('testimonials').insert(rows);
    setSaving(false);
    if (error) return flash(`Error: ${error.message}`);
    await loadAll();
    flash('Reseñas importadas');
  };

  const importLocalServices = async () => {
    if (!supabase || !confirm('¿Importar los servicios locales a Supabase?')) return;
    setSaving(true);
    const rows = DEFAULT_CONTENT.services.map((s, i) => ({
      title: s.title,
      description: s.description,
      icon_name: s.iconName,
      highlight: s.highlight || null,
      sort_order: i,
    }));
    const { error } = await supabase.from('services').insert(rows);
    setSaving(false);
    if (error) return flash(`Error: ${error.message}`);
    await loadAll();
    flash('Servicios importados');
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'cats', label: 'Gatos', icon: <Cat className="w-3.5 h-3.5" /> },
    { id: 'rates', label: 'Tarifas', icon: <DollarSign className="w-3.5 h-3.5" /> },
    { id: 'testimonials', label: 'Reseñas', icon: <MessageSquareQuote className="w-3.5 h-3.5" /> },
    { id: 'contact', label: 'Contacto', icon: <Phone className="w-3.5 h-3.5" /> },
    { id: 'neighborhoods', label: 'Barrios', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'services', label: 'Servicios', icon: <ListChecks className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F2F9F8]">
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-[#CCE7E5]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <h1 className="font-display font-bold text-[#132E35]">Panel Admin</h1>
            <p className="text-[11px] text-[#3B5259]">{email}</p>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" target="_blank" rel="noreferrer" className={btnGhost}>
              <ExternalLink className="w-3.5 h-3.5" /> Ver sitio
            </a>
            <button type="button" onClick={logout} className={btnGhost}>
              <LogOut className="w-3.5 h-3.5" /> Salir
            </button>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 flex gap-1.5 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                tab === t.id
                  ? 'bg-[#0E9F8F] text-white'
                  : 'bg-white text-[#3B5259] border border-[#CCE7E5] hover:bg-[#E0F2F1]'
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </header>

      {status && (
        <div className="max-w-5xl mx-auto px-4 pt-3">
          <div className="text-xs font-medium bg-[#E0F2F1] border border-[#B2DDD9] text-[#132E35] rounded-xl px-3 py-2">
            {status}
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-5 space-y-4">
        {tab === 'cats' && (
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#3B5259]">
                {cats.length} gatos. Subí una foto para que aparezcan en el sitio.
              </p>
              <button type="button" onClick={addCat} className={btnPrimary}>
                <Plus className="w-3.5 h-3.5" /> Agregar
              </button>
            </div>
            {cats.length === 0 && (
              <p className="text-xs text-[#3B5259] bg-white border border-[#CCE7E5] rounded-xl p-4">
                Todavía no hay gatos en la base. Mientras tanto el sitio muestra los de respaldo locales.
              </p>
            )}
            {cats.map((cat, idx) => (
              <div key={cat.id} className="bg-white border border-[#CCE7E5] rounded-2xl p-4 space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#E8F4F2] shrink-0 border border-[#CCE7E5]">
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#0E9F8F]">
                        <Cat className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 grid sm:grid-cols-2 gap-2 min-w-0">
                    <div>
                      <label className={labelClass}>Nombre</label>
                      <input
                        className={inputClass}
                        value={cat.name}
                        onChange={(e) =>
                          setCats((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, name: e.target.value } : c)),
                          )
                        }
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Dueño / familia</label>
                      <input
                        className={inputClass}
                        value={cat.owner}
                        onChange={(e) =>
                          setCats((prev) =>
                            prev.map((c, i) => (i === idx ? { ...c, owner: e.target.value } : c)),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <label className={`${btnGhost} cursor-pointer`}>
                    <Upload className="w-3.5 h-3.5" />
                    Subir foto
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void uploadCatImage(cat.id, file);
                      }}
                    />
                  </label>
                  <button type="button" className={btnPrimary} disabled={saving} onClick={() => updateCat(cat)}>
                    <Save className="w-3.5 h-3.5" /> Guardar
                  </button>
                  <button type="button" className={btnGhost} onClick={() => deleteCat(cat.id)}>
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {tab === 'rates' && (
          <section className="bg-white border border-[#CCE7E5] rounded-2xl p-4 space-y-3">
            {(
              [
                ['periodNotice', 'Vigencia'],
                ['duration', 'Duración'],
                ['weekday', 'Lunes a viernes'],
                ['saturday', 'Sábados'],
                ['sundayHoliday', 'Domingos y feriados'],
                ['interview', 'Entrevista previa (precio)'],
                ['interviewDesc', 'Texto entrevista'],
                ['keyHandover', 'Llaves'],
                ['paymentTerms', 'Pagos'],
                ['cancellationPolicy', 'Cancelaciones'],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                {key === 'interviewDesc' ||
                key === 'keyHandover' ||
                key === 'paymentTerms' ||
                key === 'cancellationPolicy' ? (
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={rates[key]}
                    onChange={(e) => setRates((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                ) : (
                  <input
                    className={inputClass}
                    value={rates[key]}
                    onChange={(e) => setRates((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
            <button type="button" className={btnPrimary} disabled={saving} onClick={saveRates}>
              <Save className="w-3.5 h-3.5" /> Guardar tarifas
            </button>
          </section>
        )}

        {tab === 'testimonials' && (
          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-[#3B5259]">{testimonials.length} reseñas</p>
              <div className="flex gap-2">
                {testimonials.length === 0 && (
                  <button type="button" className={btnGhost} onClick={importLocalTestimonials}>
                    Importar actuales
                  </button>
                )}
                <button type="button" className={btnPrimary} onClick={addTestimonial}>
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>
            {testimonials.map((item, idx) => (
              <div key={item.id} className="bg-white border border-[#CCE7E5] rounded-2xl p-4 space-y-2">
                <label className={labelClass}>Cita</label>
                <textarea
                  rows={3}
                  className={inputClass}
                  value={item.quote}
                  onChange={(e) =>
                    setTestimonials((prev) =>
                      prev.map((t, i) => (i === idx ? { ...t, quote: e.target.value } : t)),
                    )
                  }
                />
                <div className="grid sm:grid-cols-3 gap-2">
                  <div>
                    <label className={labelClass}>Autor</label>
                    <input
                      className={inputClass}
                      value={item.author}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, author: e.target.value } : t)),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Gato</label>
                    <input
                      className={inputClass}
                      value={item.catName ?? ''}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, catName: e.target.value } : t)),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Fecha</label>
                    <input
                      className={inputClass}
                      value={item.date}
                      onChange={(e) =>
                        setTestimonials((prev) =>
                          prev.map((t, i) => (i === idx ? { ...t, date: e.target.value } : t)),
                        )
                      }
                    />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Color avatar</label>
                  <select
                    className={inputClass}
                    value={item.avatarBg}
                    onChange={(e) =>
                      setTestimonials((prev) =>
                        prev.map((t, i) => (i === idx ? { ...t, avatarBg: e.target.value } : t)),
                      )
                    }
                  >
                    {AVATAR_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={btnPrimary}
                    disabled={saving}
                    onClick={() => updateTestimonial(item)}
                  >
                    <Save className="w-3.5 h-3.5" /> Guardar
                  </button>
                  <button type="button" className={btnGhost} onClick={() => deleteTestimonial(item.id)}>
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}

        {tab === 'contact' && (
          <section className="bg-white border border-[#CCE7E5] rounded-2xl p-4 space-y-3">
            {(
              [
                ['whatsapp', 'WhatsApp (solo números, ej. 54911…)'],
                ['phoneFormatted', 'Teléfono visible'],
                ['email', 'Email'],
                ['instagram', 'Instagram (usuario)'],
                ['instagramUrl', 'Instagram URL'],
                ['tiktok', 'TikTok (usuario)'],
                ['tiktokUrl', 'TikTok URL'],
                ['whatsappBaseMessage', 'Mensaje base WhatsApp'],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                {key === 'whatsappBaseMessage' ? (
                  <textarea
                    rows={2}
                    className={inputClass}
                    value={contact[key]}
                    onChange={(e) => setContact((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                ) : (
                  <input
                    className={inputClass}
                    value={contact[key]}
                    onChange={(e) => setContact((prev) => ({ ...prev, [key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
            <button type="button" className={btnPrimary} disabled={saving} onClick={saveContact}>
              <Save className="w-3.5 h-3.5" /> Guardar contacto
            </button>
          </section>
        )}

        {tab === 'neighborhoods' && (
          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#3B5259]">{neighborhoods.length} barrios</p>
              <button type="button" className={btnPrimary} onClick={addNeighborhood}>
                <Plus className="w-3.5 h-3.5" /> Agregar
              </button>
            </div>
            {neighborhoods.map((n) => (
              <div key={n.id} className="flex gap-2 bg-white border border-[#CCE7E5] rounded-xl p-3">
                <input
                  className={inputClass}
                  value={n.name}
                  onChange={(e) =>
                    setNeighborhoods((prev) =>
                      prev.map((x) => (x.id === n.id ? { ...x, name: e.target.value } : x)),
                    )
                  }
                  onBlur={() => renameNeighborhood(n.id, n.name)}
                />
                <button type="button" className={btnGhost} onClick={() => deleteNeighborhood(n.id)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </section>
        )}

        {tab === 'services' && (
          <section className="space-y-3">
            <div className="flex flex-wrap justify-between gap-2">
              <p className="text-sm text-[#3B5259]">{services.length} servicios</p>
              <div className="flex gap-2">
                {services.length === 0 && (
                  <button type="button" className={btnGhost} onClick={importLocalServices}>
                    Importar actuales
                  </button>
                )}
                <button type="button" className={btnPrimary} onClick={addService}>
                  <Plus className="w-3.5 h-3.5" /> Agregar
                </button>
              </div>
            </div>
            {services.map((item, idx) => (
              <div key={item.id} className="bg-white border border-[#CCE7E5] rounded-2xl p-4 space-y-2">
                <div className="grid sm:grid-cols-2 gap-2">
                  <div>
                    <label className={labelClass}>Título</label>
                    <input
                      className={inputClass}
                      value={item.title}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s, i) => (i === idx ? { ...s, title: e.target.value } : s)),
                        )
                      }
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Ícono</label>
                    <select
                      className={inputClass}
                      value={item.iconName}
                      onChange={(e) =>
                        setServices((prev) =>
                          prev.map((s, i) => (i === idx ? { ...s, iconName: e.target.value } : s)),
                        )
                      }
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <label className={labelClass}>Descripción</label>
                <textarea
                  rows={2}
                  className={inputClass}
                  value={item.description}
                  onChange={(e) =>
                    setServices((prev) =>
                      prev.map((s, i) => (i === idx ? { ...s, description: e.target.value } : s)),
                    )
                  }
                />
                <label className={labelClass}>Highlight</label>
                <input
                  className={inputClass}
                  value={item.highlight ?? ''}
                  onChange={(e) =>
                    setServices((prev) =>
                      prev.map((s, i) => (i === idx ? { ...s, highlight: e.target.value } : s)),
                    )
                  }
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={btnPrimary}
                    disabled={saving}
                    onClick={() => updateService(item)}
                  >
                    <Save className="w-3.5 h-3.5" /> Guardar
                  </button>
                  <button type="button" className={btnGhost} onClick={() => deleteService(item.id)}>
                    <Trash2 className="w-3.5 h-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
