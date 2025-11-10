// app/(app)/research/page.tsx
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ResearchResult = {
  suggestions: string[];
  description: string;
  talkingPoints: string[];
};

export default function ResearchPage() {
  const [keywords, setKeywords] = useState('');
  const [assistLevel, setAssistLevel] = useState(70);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResearchResult | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!keywords.trim()) {
      setError('Add a topic or some keywords first.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/ai/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords, assistLevel }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to generate ideas.');
      }

      const data = (await res.json()) as ResearchResult;
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-slate-50">
          AI Research Assistant
        </h1>
        <p className="text-xs text-slate-400">
          Generate episode titles, descriptions, and talking points based on your
          keywords. Use the slider to control how much help you want from the AI.
        </p>
      </header>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Topic / Keywords
          </label>
          <textarea
            className="w-full min-h-[80px] rounded-md border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            placeholder="e.g. AI in gospel music production, remote recording workflows, creative mixing for podcasts..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs text-slate-300">
            <span>AI Assist Level</span>
            <span className="font-semibold text-slate-100">
              {assistLevel}%
            </span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={assistLevel}
            onChange={(e) => setAssistLevel(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
          <p className="text-[11px] text-slate-500">
            0% = mostly manual prompts. 100% = let the assistant fully shape the
            episode structure.
          </p>
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-400">
            {error}
          </p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? 'Generating…' : 'Generate ideas'}
        </Button>
      </form>

      {result && (
        <section className="space-y-4 mt-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              Suggested Episode Titles
            </h2>
            <ul className="mt-2 space-y-1 text-xs text-slate-200">
              {result.suggestions.map((s, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-slate-500">{idx + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              Episode Description
            </h2>
            <p className="mt-2 text-xs text-slate-200 leading-relaxed">
              {result.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-50">
              Talking Points
            </h2>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-xs text-slate-200">
              {result.talkingPoints.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
