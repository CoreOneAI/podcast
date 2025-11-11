// components/shows/NewShowForm.tsx
"use client";

import React, { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewShowForm() {
  const supabase = createSupabaseBrowserClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);
    setError(null);

    const { error } = await supabase.from("shows").insert({
      name,
      description,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Show created. Refresh to see it in the list.");
      setName("");
      setDescription("");
    }

    setIsSaving(false);
  }

  return (
    <section className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <h2 className="text-sm font-medium text-slate-200">Create show</h2>
      <p className="text-xs text-slate-400">
        Set up a named dating show (or segment) so you can attach episodes and
        guests.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="text-xs text-slate-300">Show name</label>
          <Input
            placeholder="Ex: Swipe Right Stories"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs text-slate-300">Description</label>
          <Textarea
            placeholder="Quick description of the show’s vibe and angle..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save show"}
          </Button>

          {message && (
            <span className="text-xs text-emerald-300">{message}</span>
          )}
          {error && (
            <span className="text-xs text-rose-300">Error: {error}</span>
          )}
        </div>
      </form>
    </section>
  );
}
