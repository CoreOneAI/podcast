'use client';

import React, { us'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Mode = 'ai' | 'manual';

export default function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [points, setPoints] = useState('');
  const [assist, setAssist] = useState(70);
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);
    try {
      if (!title) setTitle('Working title based on topic');
      if (!description)
        setDescription(
          'Short episode description goes here. Summarize the angle, tension, and outcome.'
        );
      if (!points)
        setPoints(
          [
            'Opening hook',
            'Backstory & stakes',
            'Main conflict',
            'Advice beats',
            'Closing CTA',
          ].join('\n')
        );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Top-only navigation control */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-transparent px-3 py-1.5 text-sm hover:bg-white/5"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">AI Research Assistant</h1>
        <p className="mt-2 text-sm text-gray-500">
          Plan dating-app episodes with AI or manually. Save briefs so they can be used for guest
          prep and scheduling.
        </p>
      </header>

      <Card className="border-white/10 bg-black/40">
        <CardHeader className="flex flex-col gap-3 border-b border-white/5 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">Episode Brief</CardTitle>

          {/* Manual / AI toggle */}
          <div className="inline-flex overflow-hidden rounded-md border border-white/10">
            <button
              type="button"
              onClick={() => setMode('manual')}
              className={
                'px-3 py-1 text-sm ' +
                (mode === 'manual' ? 'bg-white/10' : 'bg-transparent hover:bg-white/5')
              }
              aria-pressed={mode === 'manual'}
            >
              Manual
            </button>
            <button
              type="button"
              onClick={() => setMode('ai')}
              className={
                'px-3 py-1 text-sm ' +
                (mode === 'ai' ? 'bg-white/10' : 'bg-transparent hover:bg-white/5')
              }
              aria-pressed={mode === 'ai'}
            >
              AI Assist
            </button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 py-6">
          <form onSubmit={handleGenerate} className="space-y-6">
            {/* Topic / keywords */}
            <div>
              <label className="mb-2 block text-sm">Topic / Keywords</label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="ex: ghosting after great first date, long-distance red flags"
              />
            </div>

            {/* Assist slider */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm">AI Assist Level</label>
                <span className="text-xs text-gray-400">{assist}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={assist}
                onChange={(e) => setAssist(parseInt(e.target.value, 10))}
                className="w-full"
              />
              <p className="mt-1 text-xs text-gray-500">
                0% = mostly manual prompts • 100% = let the assistant fully shape the episode.
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm">Episode title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give it a compelling, show-ready title"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm">Description</label>
              <Textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="1–3 sentences that sell the premise and stakes"
              />
            </div>

            {/* Key points */}
            <div>
              <label className="mb-2 block text-sm">Key questions / beats</label>
              <Textarea
                rows={5}
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder="One item per line…"
              />
            </div>

            {/* Primary action only (no Cancel inside the form) */}
            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isGenerating} className="px-4 py-2 text-sm">
                {isGenerating ? 'Generating…' : mode === 'ai' ? 'Generate brief' : 'Save brief'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
eState } from 'react';
import Link from 'next/link';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Mode = 'ai' | 'manual';

export default function ResearchAssistant() {
  const [mode, setMode] = useState<Mode>('ai');
  const [assist, setAssist] = useState<number>(70);
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (mode !== 'ai') return;
    setIsGenerating(true);
    try {
      const base = topic.trim() || 'Dating-show episode';

      // Scale depth by assist level (simple stub so we don’t hit any APIs here)
      const depth = assist >= 66 ? 'Expanded' : assist >= 33 ? 'Standard' : 'Light';

      setTitle(`${base}: Tension, Choice, and Chemistry`);

      const beatsCore =
        `Beats:\n• Setup: Why these two matched and what each hopes for\n` +
        `• Conflict: A values or schedule mismatch surfaces early\n` +
        `• Turn: An unexpected reveal forces a decision\n` +
        `• Resolution: A clear “try again” plan or a respectful pass\n`;

      const extras =
        `Questions:\n• What does each person fear losing?\n• Where do timelines clash?\n• What small compromise feels fair?\n`;

      setDesc(
        `Hook: A high-stakes first date where expectations clash with reality.\n\n` +
          beatsCore +
          (depth !== 'Light' ? `\n${extras}` : '') +
          `\nTakeaway: Authenticity over performance; let the audience feel the dilemma.`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  return (
    <section className="mx-auto max-w-3xl px-2 sm:px-0">
      {/* Centered header (no duplicate page header elsewhere) */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">AI Research Assistant</h1>
        <p className="mt-2 text-sm text-gray-500">
          Plan dating-app episodes with AI or manually. Save briefs so they can be used for guest prep and scheduling.
        </p>
      </header>

      <Card className="border-white/10 bg-black/5 dark:bg-white/5">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-base">Episode Brief</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5 pt-4">
          {/* Mode toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Mode:</span>
            <div className="inline-flex rounded-md border border-white/10 overflow-hidden">
              <button
                type="button"
                onClick={() => setMode('ai')}
                className={`px-3 py-1 text-sm ${
                  mode === 'ai' ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
                }`}
                aria-pressed={mode === 'ai'}
              >
                AI
              </button>
              <button
                type="button"
                onClick={() => setMode('manual')}
                className={`px-3 py-1 text-sm ${
                  mode === 'manual' ? 'bg-white/10' : 'bg-transparent hover:bg-white/5'
                }`}
                aria-pressed={mode === 'manual'}
              >
                Manual
              </button>
            </div>
          </div>

          {/* Assist slider only for AI mode */}
          {mode === 'ai' && (
            <div className="space-y-2">
              <label htmlFor="assist" className="text-sm font-medium">
                AI Assist Level: <span className="tabular-nums">{assist}%</span>
              </label>
              <input
                id="assist"
                type="range"
                min={0}
                max={100}
                value={assist}
                onChange={(e) => setAssist(Number(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                0% = mostly manual prompts. 100% = let the assistant fully shape the structure.
              </p>
            </div>
          )}

          {/* Inputs */}
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Describe the episode (dating scenario, tension, desired angle)
            </label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., High-stakes first date where timelines and priorities clash"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Episode title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Fill automatically or write your own"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label htmlFor="desc" className="text-sm font-medium">
                Description / beats
              </label>
              <Textarea
                id="desc"
                rows={8}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Hook, key beats, questions, and resolution"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button
              onClick={handleGenerate}
              disabled={mode !== 'ai' || isGenerating}
              className="px-4 py-2 text-sm"
              aria-disabled={mode !== 'ai' || isGenerating}
              title={mode !== 'ai' ? 'Switch to AI mode to generate' : undefined}
            >
              {mode !== 'ai' ? 'Generate (AI disabled)' : isGenerating ? 'Generating…' : 'Generate brief'}
            </Button>

            <Button onClick={handlePrint} className="px-4 py-2 text-sm">
              Print
            </Button>

            <Link href="/" className="ml-auto">
              <Button className="px-4 py-2 text-sm">Back to dashboard</Button>
            </Link>
          </div>

          <div aria-live="polite" className="sr-only">
            {isGenerating ? 'Generating episode brief' : 'Ready'}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
