// app/(app)/layout.tsx
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { AppShell } from '@/components/layout/AppShell';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // No authenticated user → send back to login
    redirect('/auth/login');
  }

  return <AppShell user={user}>{children}</AppShell>;
}
