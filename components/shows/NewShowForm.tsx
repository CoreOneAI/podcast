'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

export default function NewShowForm() {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSaving(true);

    try {
      const { error } = await supabase.from('shows').insert({
        title,
        tagline,
        description,
      });

      if (error) throw error;

      setSuccess('Show created!');
      setTitle('');
      setTagline('');
      setDescription('');
    } catch (err: any) {
      setError(err.message ?? 'Failed to create show');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="text-sm text-slate-200">Show title</label>
        <Input
          className="mt-1 bg-slate-900/60 border-slate-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Encore: Date Night Debrief"
          required
        />
      </div>

      <div>
        <label className="text-sm text-slate-200">Tagline</label>
        <Input
          className="mt-1 bg-slate-900/60 border-slate-700"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="A TV-style dating show breakdown for modern singles"
        />
      </div>

      <div>
        <label className="text-sm text-slate-200">Description</label>
        <Textarea
          className="mt-1 bg-slate-900/60 border-slate-700 min-h-[120px]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What’s the format? What kind of guests? What’s the vibe?"
        />
      </div>

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
      {success && (
        <p className="text-sm text-emerald-400">
          {success}
        </p>
      )}

      <Button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving…' : 'Create show'}
      </Button>
    </form>
  );
}
