import React, { useState } from 'react';
import { Cat } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#e2e8dc] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border border-[#e2e8dc] rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-10 h-10 rounded-full bg-[#275240] text-white flex items-center justify-center">
            <Cat className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-display font-bold text-[#275240]">Admin Brenda</h1>
            <p className="text-xs text-[#275240]">Ingresá para editar el contenido</p>
          </div>
        </div>

        <label className="block text-xs font-bold text-[#275240] mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 px-3 py-2.5 rounded-xl border border-[#e2e8dc] bg-[#e2e8dc] text-sm focus:outline-none focus:ring-2 focus:ring-[#275240]"
        />

        <label className="block text-xs font-bold text-[#275240] mb-1">Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-3 py-2.5 rounded-xl border border-[#e2e8dc] bg-[#e2e8dc] text-sm focus:outline-none focus:ring-2 focus:ring-[#275240]"
        />

        {error && (
          <p className="text-xs text-red-600 mb-3 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-[#275240] hover:bg-[#275240] text-white text-sm font-bold disabled:opacity-60"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </button>

        <a href="/" className="block text-center text-xs text-[#275240] mt-4 hover:text-[#275240]">
          ← Volver al sitio
        </a>
      </form>
    </div>
  );
};
