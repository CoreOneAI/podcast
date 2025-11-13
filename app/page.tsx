// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Encore Podcast Studio</h1>
        <p className="text-sm text-zinc-300">
          Central hub for your production — shows, guests, prep, and scheduling.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
          <h2 className="text-lg font-medium text-white">Shows</h2>
          <p className="mt-1 text-sm text-zinc-400">Manage formats and plan episodes.</p>
          <Link
            href="/shows"
            className="mt-3 inline-block rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Open Shows
          </Link>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
          <h2 className="text-lg font-medium text-white">Guests</h2>
          <p className="mt-1 text-sm text-zinc-400">Build your recurring guest roster.</p>
          <Link
            href="/guests"
            className="mt-3 inline-block rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Open Guests
          </Link>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
          <h2 className="text-lg font-medium text-white">AI Research Assistant</h2>
          <p className="mt-1 text-sm text-zinc-400">Generate titles, descriptions, and beats.</p>
          <Link
            href="/research"
            className="mt-3 inline-block rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Open Research
          </Link>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
          <h2 className="text-lg font-medium text-white">Production Board</h2>
          <p className="mt-1 text-sm text-zinc-400">Pipeline from Planning → Published.</p>
          <Link
            href="/board"
            className="mt-3 inline-block rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Open Board
          </Link>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
          <h2 className="text-lg font-medium text-white">Production Calendar</h2>
          <p className="mt-1 text-sm text-zinc-400">Track recordings and releases.</p>
          <Link
            href="/calendar"
            className="mt-3 inline-block rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Open Calendar
          </Link>
        </section>

        <section className="rounded-2xl border border-white/10 bg-black/50 p-5">
          <h2 className="text-lg font-medium text-white">Settings</h2>
          <p className="mt-1 text-sm text-zinc-400">Studio roles and integrations.</p>
          <Link
            href="/settings"
            className="mt-3 inline-block rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-black hover:bg-white"
          >
            Open Settings
          </Link>
        </section>
      </div>
    </main>
  );
}
