// lib/supabaseServer.ts
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        try {
          return cookies().get(name)?.value;
        } catch {
          return undefined;
        }
      },
      set(name: string, value: string, options: any) {
        try {
          // In some contexts (like pure server components) cookies().set
          // isn’t allowed, so we guard it.
          cookies().set({ name, value, ...options });
        } catch {
          // ignore if we can't set cookies in this context
        }
      },
      remove(name: string, options: any) {
        try {
          cookies().set({ name, value: '', ...options });
        } catch {
          // ignore if we can't set cookies in this context
        }
      },
    },
  });
}
