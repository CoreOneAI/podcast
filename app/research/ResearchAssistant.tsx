"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type Mode = "ai" | "manual";

export default function ResearchAssistant() {
  const router = useRouter();
  const DASHBOARD_PATH = "/"; // change to '/shows' if that is your home

  const [mode, setMode] = React.useState<Mode>("ai");
  const [aiLevel, setAiLevel] = React.useState<number>(70);
  const [topic, setTopic] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [beats, setBeats] = React.useState<string>("");
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print();
    }
  }

  async function handleGenerate() {
    if (mode !== "ai" || isGenerating) return;

    setIsGenerating(true);
    try {
      // Lightweight, local “generation” to avoid relying on any API.
      // You can replace this block with a real API call later.
      const t = topic.trim() || "Dating episode";
      const strength =
        aiLevel >= 85
          ? "highly produced"
          : aiLevel >= 60
          ? "well-structured"
          : aiLevel >= 30
          ? "lightly assisted"
          : "bare-bones";

      const nextTitle = title || `Episode: ${t}`;
      const nextDesc =
        description ||
        `A ${strength} interview exploring ${t.toLowerCase()}, balancing tension and empathy for an engaging, TV-style segment.`;

      const nextBeats =
        beats ||
        [
          "Open with the core dilemma and why it matters now.",
          "Establish stakes for each participant (what they stand to gain/lose).",
          "Surface the point of tension; ask for concrete examples.",
          "Invite a moment of vulnerability; clarify boundaries.",
          "Offer pivot questions to de-escalate and reveal intent.",
          "Close with a decision or next step that feels earned."
        ].join("\n");

      setTitle(nextTitle);
      setDescription(nextDesc);
      setBeats(nextBeats);
    } finally {
      setIsGenerating(false);
    }
  }

  const assistHelp =
    "0% = mostly manual prompts. 100% = let the assistant fully shape the episode structure.";

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* Page header (kept inside component to be self-contained). 
          If you already render a title elsewhere, you can remove this block. */}
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">AI Research Assistant</h1>
        <p className="mt-2 text-sm text-gray-500">
          Plan dating-app episodes with AI or manually. Save briefs so they can be used for guest prep and scheduling.
        </p>
      </header>

      {/* Card container */}
      <div className="rounded-xl border border-gray-800 bg-black/40 p-5 shadow-sm backdrop-blur">
        {/* Mode toggle and actions */}
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex overflow-hidden rounded-lg border border-gray-700">
            <button
              type="button"
              onClick={() => setMode("ai")}
              className={`px-3 py-2 text-sm ${mode === "ai" ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5"}`}
              aria-pressed={mode === "ai"}
            >
              AI mode
            </button>
            <button
              type="button"
              onClick={() => setMode("manual")}
              className={`px-3 py-2 text-sm ${mode === "manual" ? "bg-white/10 text-white" : "text-gray-300 hover:bg-white/5"}`}
              aria-pressed={mode === "manual"}
            >
              Manual
            </button>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={mode !== "ai" || isGenerating}
              className={`rounded-md px-4 py-2 text-sm ${
                mode !== "ai"
                  ? "cursor-not-allowed bg-gray-700 text-gray-400"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              aria-disabled={mode !== "ai" || isGenerating}
              title={mode !== "ai" ? "Switch to AI mode to generate" : undefined}
            >
              {mode !== "ai" ? "Generate (AI disabled)" : isGenerating ? "Generating…" : "Generate brief"}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-100 hover:bg-white/5"
            >
              Print
            </button>

            <button
              type="button"
              onClick={() => router.push(DASHBOARD_PATH)}
              className="rounded-md border border-gray-600 px-4 py-2 text-sm text-gray-100 hover:bg-white/5"
            >
              Back to dashboard
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mt-6 grid gap-6">
          {/* Topic */}
          <div className="grid gap-2">
            <label htmlFor="topic" className="text-sm font-medium text-gray-200">
              Topic / Keywords
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., ghosting after great first date, mixed signals, long-distance tension"
              className="w-full rounded-md border border-gray-700 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-gray-400"
            />
          </div>

          {/* AI Assist slider */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="assist" className="text-sm font-medium text-gray-200">
                AI Assist Level
              </label>
              <span className="text-xs text-gray-400">{aiLevel}%</span>
            </div>
            <input
              id="assist"
              type="range"
              min={0}
              max={100}
              step={1}
              value={aiLevel}
              onChange={(e) => setAiLevel(Number(e.target.value))}
              className="w-full"
              aria-describedby="assist-help"
            />
            <p id="assist-help" className="text-xs text-gray-500">
              {assistHelp}
            </p>
          </div>

          {/* Episode fields */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-200">
                Episode title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Confronting Mixed Signals"
                className="w-full rounded-md border border-gray-700 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-gray-400"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-200">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="A focused conversation that balances tension and empathy, helping both sides articulate needs and boundaries."
                className="w-full rounded-md border border-gray-700 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-gray-400"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="beats" className="text-sm font-medium text-gray-200">
                Key questions / beats
              </label>
              <textarea
                id="beats"
                value={beats}
                onChange={(e) => setBeats(e.target.value)}
                rows={6}
                placeholder={[
                  "• What changed after the first date?",
                  "• Where do expectations differ?",
                  "• What boundary needs to be stated clearly?",
                  "• What would a respectful next step look like?"
                ].join("\n")}
                className="w-full rounded-md border border-gray-700 bg-black/30 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
