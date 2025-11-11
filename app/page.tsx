// app/page.tsx
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function RootPage() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If no session, send to login
  if (!session) {
    redirect('/auth/login');
  }

  // If logged in, send to dashboard
  redirect('/dashboard');
}
