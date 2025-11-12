// app/research/page.tsx
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
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
export default async function ResearchPage() {
  const supabase = await createClient();
  const {
0 commit commentsComments0 (0)
You're not receiving
