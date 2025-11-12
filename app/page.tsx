// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/90 text-xs font-bold text-slate-950">
              E
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">
                Encore Podcast
              </span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                Studio Portal
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-xs">
            <Link
              href="/auth/login"
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-medium text-slate-50 hover:bg-white/10"
            >
              Sign in
            </Link>
          </nav>
        </header>

        <section className="mt-16 flex flex-1 flex-col items-start gap-10 md:flex-row md:items-center">
          <div className="max-w-xl space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-400">
              Encore Podcast Studio
            </p>
            <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-4xl">
              Central hub for your dating-show production.
            </h1>
            <p className="text-sm text-slate-300">
              One place for shows, guests, prep briefs, and scheduling — built
              for TV-style dating formats that record as a podcast.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href=""https://encorepodcast.netlify.app/dashboard""
                className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300"
              >
                Sign in to portal
              </Link>
              <span className="text-[11px] text-slate-400">
                Studio-only access. Ask your producer for an account.
              </span>
            </div>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
              What you can manage
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <span className="font-semibold text-slate-50">Shows</span> —
                keep formats, segments, and positioning in sync.
              </li>
              <li>
                <span className="font-semibold text-slate-50">Guests</span> —
                bios, dating context, and booking status.
              </li>
              <li>
                <span className="font-semibold text-slate-50">
                  AI prep briefs
                </span>{' '}
                — titles, descriptions, and talking points for each taping.
              </li>
              <li>
                <span className="font-semibold text-slate-50">
                  Board &amp; calendar
                </span>{' '}
                — see what&apos;s planned, booked, and released.
              </li>
            </ul>
          </div>
        </section>

        <footer className="mt-10 border-t border-white/5 pt-4 text-[11px] text-slate-500">
          © 2025 Encore Podcast.
        </footer>
      </div>
    </main>
  );
}
