'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createSupabaseBrowserClient } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function NewShowForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();

      const { error } = await supabase.from('shows').insert({
        title: title.trim(),
        description: tagline.trim(),
      });

      if (error) {
        console.error(error);
        alert('Could not create show.');
        return;
      }

      // Reset local form
      setTitle('');
      setTagline('');

      // Refresh the server-rendered list
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-medium text-white">Create a new show</h2>
          <p className="text-xs text-slate-400">
            This is the umbrella for all the dating-app episodes.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400">Show title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Encore: City Love Stories"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs text-slate-400">Tagline / description</label>
        <Textarea
          rows={3}
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Live dating-app hotline breaking down real swipes, matches, and ghosting."
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={isSaving || !title.trim()}
          className="px-3 py-1 text-sm"
        >
          {isSaving ? 'Creating…' : 'Create show'}
        </Button>
      </div>
    </form>
  );
}
