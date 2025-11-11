// app/(app)/guide/page.tsx

export default function GuidePage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-white">Host Guide</h1>
        <p className="text-sm text-slate-400">
          How to use this portal to prep for Encore&apos;s dating-show style
          episodes.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium text-slate-200">
            1. Start with a show
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Go to <span className="font-medium">Shows</span> and create or
            select the show you&apos;re planning. Think of a show as the
            overall series: Encore&apos;s dating app format, spin-off specials,
            reunion episodes, etc.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium text-slate-200">
            2. Add guests
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Use <span className="font-medium">Guests</span> to add people you
            want to bring on. Include topic, date preferences, and any red
            flags or sensitive areas the host should avoid.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium text-slate-200">
            3. Use the AI Research Assistant (or go manual)
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            On the <span className="font-medium">AI Research Assistant</span>{' '}
            page, drop in keywords like &quot;first dates&quot;, &quot;ghosting&quot;,
            &quot;dating app fatigue&quot;. Use the slider to choose how much
            structure you want from the AI vs your own prompts.
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="text-sm font-medium text-slate-200">
            4. Check the calendar
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            The <span className="font-medium">Production Calendar</span> will
            show booked and pending recordings. As we evolve this, you&apos;ll
            be able to see prep status and guest confirmations at a glance.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-white/5 p-4">
        <h2 className="text-sm font-medium text-slate-200">
          On-air style tips for Encore
        </h2>
        <ul className="mt-2 space-y-1 text-xs text-slate-400 list-disc list-inside">
          <li>Use the notes fields to prep 3–5 strong opening questions.</li>
          <li>Mark any &quot;no-go&quot; topics so the host doesn&apos;t step on a landmine.</li>
          <li>Keep a short bio and pronouncer for each guest.</li>
          <li>For tough dating topics, plan one light question to reset the tone.</li>
        </ul>
      </section>
    </div>
  );
}
