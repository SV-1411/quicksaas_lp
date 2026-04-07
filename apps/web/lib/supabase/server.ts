import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { env } from '../env';

export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  // Check if environment variables are available
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('@supabase/ssr: Your project\'s URL and API key are required to create a Supabase client!\n\n' +
      'Check your Supabase project\'s API settings to find these values\n\n' +
      'https://supabase.com/dashboard/project/_/settings/api');
  }

  return createServerClient(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Parameters<typeof cookieStore.set>[2] }>) {
        cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
      },
    },
  });
}

export function createSupabaseServiceClient() {
  // Check if environment variables are available
  if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
    throw new Error('@supabase/ssr: Your project\'s URL and service role key are required to create a Supabase service client!\n\n' +
      'Check your Supabase project\'s API settings to find these values\n\n' +
      'https://supabase.com/dashboard/project/_/settings/api');
  }

  // Uses service_role key — has full DB access, bypasses RLS.
  // NEVER call this from client-side code.
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
