import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
              <span className="text-slate-900 font-bold text-sm">E</span>
            </div>
            <span className="font-semibold">Encore Podcast</span>
          </div>
          <Link 
            href="https://encorepodcast.netlify.app/login"
            className="text-sm text-slate-300 hover:text-white"
          >
            Sign in
          </Link>
        </div>
      </nav>

      {/* Hero section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Dating,
          <br />
          <span className="text-amber-400"></span>
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          A podcast exploring the wild world of modern dating.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="https://encorepodcast.netlify.app/dashboard"
            className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            Sign in to portal
          </Link>
          <span className="text-slate-400 text-sm">For producers and guests</span>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-400 font-bold">1</span>
            </div>
            <h3 className="font-semibold mb-2">Real Stories</h3>
            <p className="text-slate-400 text-sm">
              Authentic dating app experiences from real people navigating modern relationships.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-400 font-bold">2</span>
            </div>
            <h3 className="font-semibold mb-2">TV Format</h3>
            <p className="text-slate-400 text-sm">
              Produced like a television show with professional editing and storytelling.
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-amber-400 font-bold">3</span>
            </div>
            <h3 className="font-semibold mb-2">Expert Insights</h3>
            <p className="text-slate-400 text-sm">
              Dating coaches and relationship experts provide commentary and advice.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-400 text-sm">
            © 2024 Encore Podcast. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
