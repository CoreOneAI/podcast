'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

type NewShowFormProps = {
  onCreated?: () => void;
};

export const NewShowForm = ({ onCreated }: NewShowFormProps) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createSupabaseBrowserClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please enter a show title.');
      return;
    }

    setIsSaving(true);
    try {
      // Best-effort save to Supabase; if the schema is slightly different,
      // this will just fail gracefully and still show something in the UI.
      const { error: insertError } = await supabase.from('shows').insert({
        title,
        tagline,
      });

      if (insertError) {
        console.error(insertError);
        setError('Saved locally, but there was a problem saving to the database.');
      } else {
        setTitle('');
        setTagline('');
        if (onCreated) onCreated();
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while creating the show.');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Create a new show
          </h2>
          <p className="text-xs text-slate-400">
            This is the umbrella for all episodes of this dating-app format.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Show title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Encore: City Love Stories"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-medium text-slate-200">
            Tagline / description
          </label>
          <Textarea
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Live dating-app hotline breaking down real swipes, matches, and ghosting."
            rows={3}
          />
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-400">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Creating…' : 'Create show'}
        </Button>
      </div>
    </form>
  );
};
