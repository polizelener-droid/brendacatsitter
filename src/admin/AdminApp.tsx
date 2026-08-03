import React, { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { AdminLogin } from './AdminLogin';
import { AdminDashboard } from './AdminDashboard';

export const AdminApp: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured || !supabase) {
    return (
      <div className="min-h-screen bg-[#e2e8dc] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-[#e2e8dc] rounded-2xl p-6 shadow-sm">
          <h1 className="text-xl font-display font-bold text-[#275240] mb-2">Panel Admin</h1>
          <p className="text-sm text-[#275240] leading-relaxed mb-4">
            Falta configurar Supabase. Copiá <code className="text-[#275240]">.env.example</code> a{' '}
            <code className="text-[#275240]">.env.local</code> con tu URL y anon key, y corré el SQL de{' '}
            <code className="text-[#275240]">supabase/schema.sql</code>.
          </p>
          <a href="/" className="text-sm font-bold text-[#275240] hover:underline">
            Volver al sitio
          </a>
        </div>
      </div>
    );
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#e2e8dc] flex items-center justify-center text-sm text-[#275240]">
        Cargando panel…
      </div>
    );
  }

  if (!session) {
    return <AdminLogin />;
  }

  return <AdminDashboard email={session.user.email ?? ''} />;
};
