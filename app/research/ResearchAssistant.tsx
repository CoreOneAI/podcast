'use client';

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
