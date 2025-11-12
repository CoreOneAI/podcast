'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Keep UI imports minimal to avoid export mismatches.
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ResearchAssistant() {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Simple, local stub to avoid API/config issues.
      const base = topic.trim() || 'Dating-show episode';
      setTitle(`${base}: Tension, Choice, and Chemistry`);
      setDesc(
        `Hook: A high-stakes first date where expectations clash with reality.\n\n` +
          `Beats:\n• Setup: Why these two matched and what each hopes for\n` +
          `• Conflict: A values or schedule mismatch surfaces early\n` +
          `• Turn: An unexpected reveal forces a decision\n` +
          `• Resolution: A clear “try again” plan or a respectful pass\n\n` +
          `Takeaway: Authenticity over performance; let the audience feel the dilemma.`
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
      {/* Centered page header */}
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
        <CardContent className="space-y-4 pt-4">
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
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="px-4 py-2 text-sm"
            >
              {isGenerating ? 'Generating…' : 'Generate brief'}
            </Button>

            <Button
              onClick={handlePrint}
              className="px-4 py-2 text-sm"
            >
              Print
            </Button>

            <Link href="/" className="ml-auto">
              <Button className="px-4 py-2 text-sm">Back to dashboard</Button>
            </Link>
          </div>

          {/* Live region for accessibility */}
          <div aria-live="polite" className="sr-only">
            {isGenerating ? 'Generating episode brief' : 'Ready'}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
