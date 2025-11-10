'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PrintButton } from '@/components/PrintButton';
// If you want to save to Supabase directly from here, you can also import your browser client:
// import { createSupabaseBrowserClient } from '@/lib/supabaseClient';

type Mode = 'ai' | 'manual';

export function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  async function handleGenerate() {
    if (!topic) return;
    setIsGenerating(true);

    try {
      // TODO: call your /api endpoint that uses Genkit + Google models.
      // Example (pseudo-code):
      //
      // const res = await fetch('/api/assistant', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ topic }),
      // });
      // const data = await res.json();
      // setTitle(data.title);
      // setDescription(data.description);
      // setQuestions(data.questions.join('\n'));

      // Temporary stub so it feels alive:
      setTitle('Ghosted After Three Great Dates');
      setDescription(
        'A deep dive into why modern dating leads to abrupt disappearances, and how to set healthier expectations.'
      );
      setQuestions(
        [
          'What first attracted you to this match?',
          'When did you first feel something was off?',
          'How did the ghosting impact your confidence?',
          'What would you do differently next time?',
        ].join('\n')
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSave() {
    if (!title) return;
    setIsSaving(true);

    try {
      // TODO: Save an `episode` in Supabase here so it shows on
      // dashboard + calendar as PENDING or BOOKED.
      //
      // Example idea:
      //
      // const supabase = createSupabaseBrowserClient();
      // await supabase.from('episodes').insert({
      //   title,
      //   description,
      //   status: 'pending',
      //   talking_points: questions,
      //   // scheduled_recording_at: selectedDate,
      //   // show_id, guest_id, etc.
      // });

      // For now we just simulate:
      alert('Episode brief saved (wire to Supabase next).');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <Tabs value={mode} onValueChange={v => setMode(v as Mode)} className="space-y-4">
        <TabsList>
          <TabsTrigger value="ai">AI Assisted</TabsTrigger>
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="ai" className="space-y-3">
          <label className="text-xs text-slate-400">
            Describe the episode (dating scenario, tension, desired angle)
          </label>
          <Input
            placeholder="e.g. ‘We matched on Hinge, had 3 amazing dates, then she vanished’"
            value={topic}
            onChange={e => setTopic(e.target.value)}
          />
          <Button onClick={handleGenerate} disabled={!topic || isGenerating} size="sm">
            {isGenerating ? 'Generating…' : 'Generate brief'}
          </Button>
        </TabsContent>

        <TabsContent value="manual" className="space-y-3">
          <p className="text-xs text-slate-400">
            Skip AI and write your own brief. Perfect when you already know exactly what you want
            to say.
          </p>
        </TabsContent>
      </Tabs>

      {/* Shared fields (used by both AI + Manual) */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs text-slate-400">Episode title</label>
          <Input
            placeholder="e.g. Ghosted After Three Great Dates"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs text-slate-400">Description</label>
          <Textarea
            rows={3}
            placeholder="Short description for your dashboard, calendar, and podcast apps."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs text-slate-400">Key questions / beats</label>
          <Textarea
            rows={5}
            placeholder="One question per line – especially good for TV-style pacing."
            value={questions}
            onChange={e => setQuestions(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button onClick={handleSave} disabled={isSaving || !title} size="sm">
          {isSaving ? 'Saving…' : 'Save episode brief'}
        </Button>

        <PrintButton />
      </div>
    </div>
  );
}
