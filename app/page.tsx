// app/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import { createClient } from '@/utils/supabase/client';

export default function Page() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (mounted && user) {
        router.replace('/dashboard');
      }
    })();
    return () => { mounted = false; };
  }, [router, supabase]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <div className="mx-auto max-w-6xl px-4">
        <div className="min-h-screen flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
