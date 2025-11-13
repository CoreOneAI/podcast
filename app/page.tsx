// app/page.tsx
import { redirect } from 'next/navigation';
import LoginForm from '../components/LoginForm'; // relative import avoids @ alias issues
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user) redirect('/dashboard');

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex min-h-screen items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
