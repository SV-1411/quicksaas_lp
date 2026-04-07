'use client';

import { createBrowserClient } from '@supabase/ssr';
import { env } from '../env';

export function createSupabaseBrowserClient() {
  // Check if environment variables are available
  if (!env.supabaseUrl || !env.supabaseAnonKey) {
    throw new Error('@supabase/ssr: Your project\'s URL and API key are required to create a Supabase client!\n\n' +
      'Check your Supabase project\'s API settings to find these values\n\n' +
      'https://supabase.com/dashboard/project/_/settings/api');
  }

  return createBrowserClient(env.supabaseUrl, env.supabaseAnonKey);
}
