'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message ?? 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Gold animated E badge */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
            <span className="text-xl font-bold text-slate-950">E</span>
          </div>
        </div>

        <Card className="border border-white/10 bg-slate-900/80 backdrop-blur">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl font-semibold text-white text-center">
              Encore Podcast Portal
            </CardTitle>
            <CardDescription className="text-center text-slate-400">
              Sign in to manage dating-show style episodes and guests.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs text-slate-300">Email</label>
                <Input
                  type="email"
                  autoComplete="email"
                  className="mt-1 bg-slate-950/60 border-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs text-slate-300">Password</label>
                <Input
                  type="password"
                  autoComplete="current-password"
                  className="mt-1 bg-slate-950/60 border-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>
          </CardContent>

          <CardFooter>
            <p className="text-[11px] text-slate-500 mx-auto text-center">
              Powered by The Medford Group · For internal Encore Podcast use only
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
