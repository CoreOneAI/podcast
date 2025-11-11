// components/shows/NewShowForm.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function NewShowForm() {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: optional: Supabase insert for shows
      console.log('Create show', { name, tagline, description });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-4 space-y-4 rounded-xl border border-white/10 bg-white/5 p-4"
    >
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-200">
          Show name
        </label>
        <Input
          placeholder="Encore Love Lab"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-slate-900/70 border-white/10 text-white"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-200">
          Tagline
        </label>
        <Input
          placeholder="Smart, real-talk dating show for grown folks."
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          className="bg-slate-900/70 border-white/10 text-white"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-200">
          Description
        </label>
        <Textarea
          placeholder="Describe the show format, vibe, and who it's for..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-slate-900/70 border-white/10 text-white min-h-[120px]"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving…' : 'Create show'}
        </Button>
      </div>
    </form>
  );
}
