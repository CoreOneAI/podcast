'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const DASHBOARD_PATH = '/'; // set this to your dashboard route

export default function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [assist, setAssist] = useState(70);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [points, setPoints] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      // Stub: your generate logic here
      if (!title) setTitle('Working episode title');
      if (!desc) setDesc('One-paragraph description generated from your topic.');
      if (!points) setPoints('• Opening beat\n• Conflict beat\n• Resolution beat');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      {/* Page heading + Back to Dashboard (explicit link, not history.back()) */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">AI Research Assistant</h1>
          <p className="mt-1 text-sm text-white/70">
            Plan dating-app episodes with AI or manually. Save briefs so they can be used for guest prep and scheduling.
          </p>
        </div>

        <Link href={DASHBOARD_PATH} prefetch={false} className="inline-flex items-center rounded-md border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/10">
          ← Back to Dashboard
        </Link>
      </div>

      <Card className="border-white/10 bg-black/40">
        <CardHeader className="border-b border-white/5">
          <CardTitle className="text-base text-white">Episode Brief</CardTitle>
          <CardDescription className="text-white/70">
            0% = mostly manual prompts. 100% = let the assistant fully shape the episode structure.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <label className="block text-sm text-white/80">Describe the episode (dating scenario, tension, desired angle)</label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={4}
              placeholder="e.g., High-stakes blind date with conflicting goals..."
              className="bg-black/30 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm text-white/80">AI Assist Level</label>
              <span className="text-xs text-white/60">{assist}%</span>
            </div>
            {/* Use native range to avoid any missing UI imports */}
            <input
              type="range"
              min={0}
              max={100}
              value={assist}
              onChange={(e) => setAssist(parseInt(e.target.value, 10))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-white/80">Episode title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a compelling episode title"
              className="bg-black/30 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-white/80">Description</label>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="One-paragraph description the team can align on"
              className="bg-black/30 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-white/80">Key questions / beats</label>
            <Textarea
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              rows={5}
              placeholder="• Opening beat…"
              className="bg-black/30 text-white placeholder:text-white/40"
            />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-3 border-t border-white/5">
          <Link
            href={DASHBOARD_PATH}
            prefetch={false}
            className="inline-flex items-center rounded-md border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            Cancel
          </Link>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="rounded-md bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-50"
            >
              {isGenerating ? 'Generating…' : 'Generate brief'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
