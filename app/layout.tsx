// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Encore Podcast',
  description: 'Studio hub for shows, guests, research, and scheduling',
};

const nav = [
  { href: '/', label: 'Dashboard' },
  { href: '/shows', label: 'Shows' },
  { href: '/guests', label: 'Guests' },
  { href: '/research', label: 'AI Research Assistant' },
  { href: '/board', label: 'Production Board' },
  { href: '/calendar', label: 'Production Calendar' },
  { href: '/settings', label: 'Settings' },
  { href: '/guide', label: 'User Guide' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 text-slate-900 antialiased">
        <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-8 md:px-6">
          {/* Left menu */}
          <aside className="hidden w-56 shrink-0 md:block">
            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur">
              <div className="mb-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Encore Podcast</div>
                <div className="text-lg font-semibold text-slate-900">Studio Portal</div>
              </div>
              <nav className="grid gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content (centered) */}
          <main className="mx-auto w-full max-w-4xl">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
