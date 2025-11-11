'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    // ✅ On success, go straight to dashboard
    router.push('/dashboard');
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-400">
              Encore Podcast
            </p>
            <CardTitle className="mt-1 text-xl">
              Encore Podcast Portal
            </CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to manage shows, guests, and production.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-200">
                  Email
                </label>
                <Input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="producer@encorepodcast.com"
                  className="bg-slate-900/80 border-white/10 text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-200">
                  Password
                </label>
                <Input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-slate-900/80 border-white/10 text-sm"
                />
              </div>
              {errorMessage && (
                <p className="text-xs text-red-400">{errorMessage}</p>
              )}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 text-xs text-slate-500">
            <p>
              Studio-only access. Contact your producer or admin if you need an account.
            </p>
            <Link
              href="/"
              className="text-amber-400 hover:text-amber-300"
            >
              ← Back to portal
            </Link>
          </CardFooter>
        </Card>
      </div>
      <footer className="pb-6 pt-2 text-center text-[10px] text-slate-500">
        © {new Date().getFullYear()} Encore Podcast.
      </footer>
    </main>
  );
}
