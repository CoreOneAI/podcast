// components/LoginForm.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) { setError(error.message || 'Sign in failed'); return; }
    router.replace('/dashboard');
  }

  return (
    <form onSubmit={onSubmit}
      className="w-full max-w-md bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold text-white">Encore Podcast Portal</h1>
        <p className="text-sm text-white/70">Sign in to manage shows, guests, and production.</p>
      </div>

      {error && (
        <div className="text-sm text-red-400 bg-red-950/40 border border-red-900/40 rounded-md p-2">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm text-white/80">Email</label>
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="you@studio.com"
          className="w-full rounded-md bg-black/50 border border-white/15 px-3 py-2 text-white placeholder-white/40"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm text-white/80">Password</label>
        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full rounded-md bg-black/50 border border-white/15 px-3 py-2 text-white placeholder-white/40"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md border border-white/20 bg-white/5 hover:bg-white/10 text-white py-2 transition disabled:opacity-50"
      >
        {submitting ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-xs text-white/50 text-center">
        Studio-only access. Contact your producer or admin if you need an account.
      </p>
    </form>
  );
}
