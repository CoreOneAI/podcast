// lib/supabaseServer.ts
// Deprecated helper kept only for backwards compatibility.
// New code should import from `@/utils/supabase/server` instead.

import { createClient } from '@/utils/supabase/server';

export async function createSupabaseServerClient() {
  return await createClient();
}
