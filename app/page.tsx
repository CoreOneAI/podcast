// app/page.tsx
import { redirect } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    redirect('/dashboard');
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="mx-auto max-w-6xl px-4">
        {/* Center column */}
        <div className="flex min-h-screen items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
