// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Encore Podcast',
  description: 'Studio hub for shows, guests, research, and scheduling',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 text-slate-900 antialiased">
        {/* Shell keeps the left menu consistent across pages if you have one */}
        <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
