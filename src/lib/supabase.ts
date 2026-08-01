import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY) as string | undefined;

export const isSupabaseConfigured = Boolean(
  url &&
    key &&
    !url.includes('TU-PROYECTO') &&
    !key.includes('tu-anon-key') &&
    !key.includes('tu-publishable') &&
    !key.includes('pega_aqui'),
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, key!)
  : null;
