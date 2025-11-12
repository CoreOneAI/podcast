// components/research/ResearchAssistant.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { PrintButton } from '@/components/PrintButton';

type Mode = 'ai' | 'manual';

export function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [beats, setBeats] = useState('');
  const [aiLevel, setAiLevel] = useState(70);
  const [scheduledAt, setScheduledAt] = useState('');
  const [status, setStatus] = useState<'planning' | 'booked'>('planning');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      setMessage('Add a topic or keywords first.');
      return;
    }

    setIsGenerating(true);
    setMessage(null);

    try {
      const baseTitle = `Dating Dilemma: ${topic.trim()}`;
      const assistLabel =
        aiLevel >= 80
          ? 'AI-shaped episode'
          : aiLevel <= 20
          ? 'Host-driven episode'
          : 'Co-created episode';

      setTitle(baseTitle);
      setDescription(
        `${assistLabel} for a dating-app conversation built around: ${topic.trim()}. ` +
          'Explore red flags, green flags, and what this guest has learned from modern dating.'
      );
      setBeats(
        [
          'Open with how they use dating apps today.',
          'Ask about the most memorable date — best or worst — and what it revealed.',
          'Dig into their non-negotiables and hidden green flags.',
          'Close with advice they would give to someone swiping right now.',
        ].join('\n')
      );
    } finally {
      setIsGenerating(false);
    }
  }

  function handleSave() {
    if (!title.trim()) {
      setMessage('Add at least an episode title before saving.');
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      if (typeof window !== 'undefined') {
        const key = 'encore-episode-briefs';
        const existingRaw = window.localStorage.getItem(key);
        const existing = existingRaw ? JSON.parse(existingRaw) : [];
        const next = [
          ...existing,
          {
            topic,
            title,
            description,
            beats,
            status,
            scheduledAt,
            mode,
            savedAt: new Date().toISOString(),
          },
        ];
        window.localStorage.setItem(key, JSON.stringify(next));
      }

      setMessage(
        'Saved in this browser. Use Print to create a PDF or send to your guest.'
      );
    } catch (error) {
      console.error(error);
      setMessage('Could not save this brief locally. You can still print it.');
    } finally {
      setIsSaving(false);
    }
  }

  const previewTitle = title || 'Working title goes here';
  const previewDescription =
    description ||
    'One-paragraph setup of the dating situation, the tension, and what we want the audience to feel.';
  const previewBeats =
    beats ||
    '- How they describe their dating-app personality\n' +
      '- One great date and what made it work\n' +
      '- One disastrous date and what it revealed\n' +
      '- Where they are now and what they want next';

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header row with back link */}
      <div className="flex items-start justify-between gap-4">
        <div className="text-left">
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            AI Research Assistant
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Plan dating-app episodes with AI or manually. Save briefs so they can be
            used for guest prep and scheduling.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-slate-300 underline-offset-4 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>

      {/* Mode + slider */}
      <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-black/40 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-300">
            Assistant mode
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Toggle between AI-assisted or fully manual planning. The slider controls
            how strongly the assistant steers the episode.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:w-72">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={`rounded-full px-3 py-1 text-xs ${
                mode === 'manual'
                  ? 'bg-white text-black'
                  : 'border border-white/20 text-slate-300 hover:border-white/40'
              }`}
            >
              Manual
            </button>
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={`rounded-full px-3 py-1 text-xs ${
                mode === 'ai'
                  ? 'bg-white text-black'
                  : 'border border-white/20 text-slate-300 hover:border-white/40'
              }`}
            >
              AI Assist
            </button>
          </div>
          <div className="space-y-1">
            <input
              type="range"
              min={0}
              max={100}
              value={aiLevel}
              onChange={(e) => setAiLevel(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-[0.7rem] text-slate-400">
              <span>0% — host-driven</span>
              <span>{aiLevel}%</span>
              <span>100% — AI-shaped</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        {/* Left: inputs */}
        <Card className="border-white/10 bg-black/40">
          <div className="border-b border-white/5 px-4 py-3">
            <h2 className="text-sm font-medium text-white">Episode inputs</h2>
            <p className="mt-1 text-xs text-slate-400">
              Dating scenario, tension, and the angle you want the guest to help
              explore.
            </p>
          </div>

          <div className="space-y-4 px-4 py-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Topic / keywords
              </label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Example: ‘Ghosted after 3 great dates’, ‘Dating while co-parenting’"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Episode title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Dating Dilemma: …"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Short description
              </label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="One-paragraph description for the run-of-show or show notes."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-200">
                Key questions / beats
              </label>
              <Textarea
                rows={5}
                value={beats}
                onChange={(e) => setBeats(e.target.value)}
                placeholder="Bullet points for segment flow, must-ask questions, and reveals."
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Tentative recording date
                </label>
                <Input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-200">
                  Episode status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as 'planning' | 'booked')
                  }
                  className="h-9 w-full rounded-md border border-white/20 bg-black/60 px-2 text-xs text-slate-100"
                >
                  <option value="planning">Planning</option>
                  <option value="booked">Booked</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating || mode !== 'ai'}
                  className="text-xs"
                >
                  {isGenerating ? 'Generating…' : 'Generate with AI'}
                </Button>
                <Button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="text-xs"
                >
                  {isSaving ? 'Saving…' : 'Save brief'}
                </Button>
              </div>
              <PrintButton />
            </div>

            {message && (
              <p className="text-[0.72rem] text-slate-300" role="status">
                {message}
              </p>
            )}
          </div>
        </Card>

        {/* Right: preview */}
        <Card className="border-white/10 bg-black/30">
          <div className="border-b border-white/5 px-4 py-3">
            <h2 className="text-sm font-medium text-white">Guest-facing brief</h2>
            <p className="mt-1 text-xs text-slate-400">
              This is what you can email or print for your guest and producer.
            </p>
          </div>

          <div className="space-y-3 px-4 py-4 text-sm">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Episode title
              </p>
              <p className="mt-1 text-base font-semibold text-white">
                {previewTitle}
              </p>
            </div>

            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Setup
              </p>
              <p className="mt-1 text-sm text-slate-200">{previewDescription}</p>
            </div>

            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                Key beats
              </p>
              <pre className="mt-1 whitespace-pre-wrap rounded-md bg-black/40 p-3 text-[0.78rem] text-slate-100">
                {previewBeats}
              </pre>
            </div>

            <div className="grid gap-3 border-t border-white/5 pt-3 text-[0.78rem] text-slate-300 sm:grid-cols-2">
              <div>
                <span className="block text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                  Record status
                </span>
                <span className="mt-1 inline-flex rounded-full bg-white/5 px-2 py-0.5 text-[0.7rem]">
                  {status === 'booked' ? 'Booked' : 'Planning'}
                </span>
              </div>
              <div>
                <span className="block text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400">
                  Tentative recording time
                </span>
                <span className="mt-1 block">
                  {scheduledAt
                    ? new Date(scheduledAt).toLocaleString()
                    : 'Not set yet'}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResearchAssistant;
