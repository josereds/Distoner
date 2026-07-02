import { createClient } from '@supabase/supabase-js';

// La conexión a Supabase se configura con variables de entorno (ver .env.example).
// La "anon key" es pública por diseño: la seguridad real la dan las políticas RLS
// definidas en supabase/schema.sql, no el ocultamiento de esta clave.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Bandera para que la app siga funcionando (con datos locales) si aún no se
// han configurado las credenciales.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
