'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);

    try {
      const supabase = createSupabaseBrowserClient();

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // after clicking the magic link, user comes back here logged in
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        throw error;
      }

      setStatus('sent');
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message || 'Something went wrong sending your login link.'
      );
      setStatus('error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md border-white/10 bg-white/5">
        <CardHeader className="space-y-1">
          <CardTitle className="text-xl text-white">
            Encore Podcast Portal
          </CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to manage shows, guests, and production.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-slate-400">
            Studio-only access. Enter your email and we&apos;ll send you a magic
            login link.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-300"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/60 border-white/10 text-white placeholder:text-slate-500"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400">
                {error}
              </p>
            )}

            {status === 'sent' && (
              <p className="text-xs text-emerald-400">
                Check your email for a login link. You can close this tab after
                you click it.
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={status === 'sending' || !email}
            >
              {status === 'sending'
                ? 'Sending link…'
                : status === 'sent'
                ? 'Link sent'
                : 'Send magic link'}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex items-center justify-between text-xs text-slate-500">
          <span>&copy; {new Date().getFullYear()} Encore Podcast.</span>
          <Link
            href="/"
            className="text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline"
          >
            Back to portal
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
