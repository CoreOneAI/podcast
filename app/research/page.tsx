// app/research/page.tsx
import React from 'react';
import ResearchAssistant from '@/components/research/ResearchAssistant';

export default function Page() {
  // No extra <h1> or <p> here — the component handles its own header.
  return (
    <main className="p-4 sm:p-6">
      <ResearchAssistant />
    </main>
  );
}
